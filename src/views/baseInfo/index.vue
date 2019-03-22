<template>
        <div>
                <div style="text-align: center;margin-bottom: 20px;">
                        <el-steps :active="2" align-center>
                                <el-step title="账号注册" description=""></el-step>
                                <el-step title="邮箱激活" description=""></el-step>
                                <el-step title="完善企业资料" description=""></el-step>
                        </el-steps>
                </div>
                <form-creater v-if="config.queryElements.length>0" :config="config" ref="formCreater"></form-creater>
        </div>

</template>
<script>
    import {mapState} from 'vuex'
    import backendService from './../../components/remoteService/backendService'
    import cityData from './../../components/cityData/data'
    import validate from './../../components/validate/validate'
    import formCreater from './../../components/formCreater/baseFormCreater'

    let queryElements=[
        {
            label:'',
            type:'html',
            placeholder:'',
            default:'<div style="border-bottom:1px solid #eee;padding-bottom:4px;font-size:18px;width:100%;transform: translateX(-106px);color:#f00;">审核信息</div>',
            background:'transparent',
            prop:'platformTypeCheckState',
        },
        {
            label:'详细信息',
            type:'html',
            placeholder:'',
            defaultValue:'',
            dataHandler(auditTypeName,...params){
                let testText='' +
                    '1、身份证已过期<br/>  ' +
                    '2、照片模糊不清<br/>  ' +
                    '3、企业信息不存在<br/>  ' +
                    '4、企业头像图片不清晰<br/>  ' +
                    '5、营业执照与企业信息不匹配<br/>  ' +
                    '6、身份证号码非法<br/>  ' +
                    '7、企业简介描述中含有非法内容<br/>  ' ;
                let remark=(params[0].remark||'').replace(/\n/g,"<br/>");
                return `<div style="color: #f00;font-size: 14px;background: transparent;color:#ff2222;line-height: 25px;word-break: break-all;width: 80%;padding-top: 7px;">
                    ${auditTypeName}
                    <p style="color:#222;">
                        ${params[0].auditType==0?'':remark}
                    </p>
                 </div>`
            },
            prop:'auditTypeName',
            subText:'',
            background:'transparent',
        },{
            label:'',
            type:'html',
            placeholder:'',
            defaultValue:'',
            dataHandler(auditTypeName,...params){
                return `<div style="color: #f00;font-size: 14px;background: transparent;color:#a00;margin-bottom: 20px;"></div>`
            },
            prop:'auditTypeNameNoProp',
            subText:'',
            background:'transparent',
        },{
            label:'',
            type:'html',
            placeholder:'',
            default:'<div style="border-bottom:1px solid #222;padding-bottom:4px;font-size:18px;width:100%;transform: translateX(-106px);">企业信息</div>',
            background:'transparent',
            prop:'platformType',
        },
        {
            label:'企业名称',
            type:'input',
            placeholder:'企业名称',
            defaultValue:'',
            value:'',
            prop:'enterpriseName',
            subText:'*最多15个字',
            span:18,
            style:{
                display:'inline-block',
                width:'auto',
                minWidth:'400px'
            },
            validateRules:[
                {
                    required:true,
                },
                {
                    validator:(validator,value,callback)=>{
                        let errorMessage=validate.validator(value,{required:true,maxlength:15});
                        errorMessage.then(data=>{
                            if(data.code==1){
                                callback();
                            }else{
                                callback(new Error(data.msg));
                            }
                        })
                    },
                    trigger:"change"
                }
            ],
        },
         
        {
            label:'企业简介',
            type:'input',
            placeholder:'企业简介',
            defaultValue:'',
            inputType:'textarea',
            rows:3,
            value:'',
            prop:'enterpriseIntroduction',
            subText:'最多100个字',
            span:18,
            style:{
                display:'inline-block',
                width:'auto',
                minWidth:'400px',
            },
            validateRules:[
                {
                    required:true,
                },
                {
                    validator:(validator,value,callback)=>{
                        let errorMessage=validate.validator(value,{required:true,maxlength:100});
                        errorMessage.then(data=>{
                            if(data.code==1){
                                callback();
                            }else{
                                callback(new Error(data.msg));
                            }
                        })
                    },
                    trigger:"change"
                }
            ],
            watch:{
                props:["enterpriseName"],
                watchValue:{
                    enterpriseName:{
                        "好好啊":true,
                        "ccc":true,
                    },
                    dddd: (...data)=>{
                        console.log(">>>>>",...data)
                         return false
                    },
                    ee:null
                }
            }
        },
        {
            label:'公司标签',
            prop:'enterpriseLabels',
            formData:[],
            type:'addInput',
            dataBus:true,
            validateRules:[
                {
                    required:true
                },
                {
                    validator:(validator,value,callback)=>{
                        //let errorMessage=validate.validator(value,{required:true,maxNumber:5});
                        console.log("value",value)
                        if(value.split("||||").length>5){
                            callback(new Error("标签最多不能大于5个"));
                        }else{
                            callback();
                        }
                        /*errorMessage.then(data=>{
                            if(data.code==1){
                                callback();
                            }else{
                                callback(new Error(data.msg));
                            }
                        })*/
                    },
                    trigger:"change"
                }
            ]
        },
        {
            label:'公司宣传图',
            prop:'enterpriseShowImages',
            formData:[],
            defaultValue:[],
            type:'addImages',
            dataBus:true,
            imagesListConfig:{
                imageConfig:{
                    //size:2.45*1024*1024,
                    width:430,
                    height:270
                },
                readonly:false,
                /*validatorHandler:validatorHandler,*/
                data:[],
                dataBus:true,
                maxNum:5,
                tip:'请上传高清图片430px*270px，仅支持PNG格式。最多5个图片',
                prop:'showUrls'
            },
            validateRules:[
                {
                    required:true
                },
                /*{
                    validator:(validator,value,callback)=>{
                        let errorMessage=validate.validator(value,{required:true,maxlength:100});
                        console.log("value",value)
                        errorMessage.then(data=>{
                            if(data.code==1){
                                callback();
                            }else{
                                callback(new Error(data.msg));
                            }
                        })
                    },
                    trigger:"change"
                }*/
            ]
        },
        {
            label:'公司省',
            prop:'enterpriseProvince',
            default:1,
            type:'hidden'
        },
        {
            label:'公司市',
            prop:'enterpriseCity',
            default:1,
            type:'hidden'
        },
        {
            label:'公司区',
            prop:'enterpriseArea',
            default:1,
            type:'hidden'
        },
        {
            label:'公司区省市区',
            prop:'enterpriseAreaLocal',
            cascaderOptions:cityData,
            type:'cascader',
            itemLabel:'label',
            itemValue:'areaId',
            default:[],
            span:12,
            validateRules:[
                {
                    required:true,
                }
            ]
        },
        {
            label:'详细地址',
            type:'input',
            placeholder:'详细地址',
            defaultValue:'',
            inputType:'textarea',
            rows:3,
            value:'',
            prop:'enterpriseAddress',
            subText:'最多100个字',
            span:18,
            style:{
                display:'inline-block',
                width:'auto',
                minWidth:'400px',
            },
            validateRules:[
                {
                    required:true,
                },
                {
                    validator:(validator,value,callback)=>{
                        let errorMessage=validate.validator(value,{required:true,maxlength:100});
                        errorMessage.then(data=>{
                            if(data.code==1){
                                callback();
                            }else{
                                callback(new Error(data.msg));
                            }
                        })
                    },
                    trigger:"change"
                }
            ],
        },
        {
            label:'企业头像',
            type:'upload',
            placeholder:'企业头像',
            defaultValue:1,
            value:'',
            prop:'enterpriseIconUrl',
            tip:'',
            validateRules:[
                {
                    required:true,
                }
            ]

        },
        {
            label:'营业执照',
            type:'upload',
            placeholder:'营业执照',
            defaultValue:1,
            value:'',
            prop:'businessLicense',
            tip:'请上传高清图片，仅支持PNG格式。',
            validateRules:[
                {
                    required:true,
                }
            ]
        },
        {
            label:'',
            type:'html',
            placeholder:'',
            default:'<div style="border-bottom:1px solid #222;padding-bottom:4px;font-size:18px;width:100%;transform: translateX(-106px);">注册人信息</div>',
            background:'transparent',
            prop:'labelInfoZCRXX',
        },
        {
            label:'真实名称',
            type:'input',
            placeholder:'真实名称',
            defaultValue:'',
            value:'',
            prop:'name',
            subText:'*最多15个字',
            span:18,
            style:{
                display:'inline-block',
                width:'auto',
                minWidth:'400px'
            },
            validateRules:[
                {
                    required:true,
                },
                {
                    validator:(validator,value,callback)=>{
                        let errorMessage=validate.validator(value,{required:true,maxlength:15});
                        errorMessage.then(data=>{
                            if(data.code==1){
                                callback();
                            }else{
                                callback(new Error(data.msg));
                            }
                        })
                    },
                    trigger:"change"
                }
            ],
        },
        {
            label:'手机号码',
            type:'input',
            placeholder:'手机号码',
            defaultValue:'',
            value:'',
            prop:'mobile',
            subText:'*11个数字',
            span:18,
            style:{
                display:'inline-block',
                width:'auto',
                minWidth:'400px'
            },
            validateRules:[
                {
                    required:true,
                },
                {
                    validator:(validator,value,callback)=>{
                        let errorMessage=validate.validator(value,{required:true,maxlength:11,mobile:true});
                        errorMessage.then(data=>{
                            if(data.code==1){
                                callback();
                            }else{
                                callback(new Error(data.msg));
                            }
                        })
                    },
                    trigger:"change"
                }
            ],
        },
        {
            label:'手机验证码',
            type:'input',
            placeholder:'手机验证码',
            defaultValue:'',
            value:'',
            prop:'verificationCode',
            subText:'*4位验证码',
            rightBtn:"<span style='border:1px solid green;padding:0px 15px;text-align:center;border-radius:5px;cursor: pointer;display:inline-block;margin-left:15px;'>获取验证码</span>",
            rightBtnClick:data=>{
                return '';
            },
            span:18,
            style:{
                display:'inline-block',
                width:'auto',
                minWidth:'250px'
            },
            validateRules:[
                {
                    required:true,
                },
                {
                    validator:(validator,value,callback)=>{
                        let errorMessage=validate.validator(value,{required:true,maxlength:4});
                        errorMessage.then(data=>{
                            if(data.code==1){
                                callback();
                            }else{
                                callback(new Error(data.msg));
                            }
                        })
                    },
                    trigger:"change"
                }
            ],
        },
        {
            label:'用户详细地址',
            type:'textare',
            placeholder:'用户详细地址',
            defaultValue:1,
            value:'',
            prop:'userAddress',
            items:[
                {
                    label:'周边商城',
                    value:1,
                    code:1
                },
                {
                    label:'物业缴费',
                    value:2,
                    code:2
                }
            ]
        },
        
        {
            label:'用户省',
            prop:'userProvince',
            default:1,
            type:'hidden'
        },
        {
            label:'用户市',
            prop:'userCity',
            default:1,
            type:'hidden'
        },
        {
            label:'用户区',
            prop:'userArea',
            default:1,
            type:'hidden'
        },
        {
            label:'用户区省市区',
            prop:'userAreaLocal',
            cascaderOptions:cityData,
            type:'cascader',
            itemLabel:'label',
            itemValue:'areaId',
            default:[],
            span:12,
            validateRules:[
                {
                    required:true,
                }
            ]
        },
        {
            label:'详细地址',
            type:'input',
            placeholder:'详细地址',
            defaultValue:'',
            inputType:'textarea',
            rows:3,
            value:'',
            prop:'userAddress',
            subText:'最多100个字',
            span:18,
            style:{
                display:'inline-block',
                width:'auto',
                minWidth:'400px',
            },
            validateRules:[
                {
                    required:true,
                },
                {
                    validator:(validator,value,callback)=>{
                        let errorMessage=validate.validator(value,{required:true,maxlength:100});
                        errorMessage.then(data=>{
                            if(data.code==1){
                                callback();
                            }else{
                                callback(new Error(data.msg));
                            }
                        })
                    },
                    trigger:"change"
                }
            ],
        },
        {
            label:'身份证号码',
            type:'input',
            placeholder:'身份证号码',
            defaultValue:'',
            value:'',
            subText:'<span style="margin-left: 20px;color:#21211f;">请输入正确的身份证号码</span>',
            span:18,
            style:{
                display:'inline-block',
                width:'auto'
            },
            prop:'idCard',
            tip:'',
            validateRules:[
                {
                    required:true,
                },
                {
                    validator:(validator,value,callback)=>{
                        let errorMessage=validate.validator(value,{required:true,minlength:16,maxlength:18});
                        errorMessage.then(data=>{
                            if(data.code==1){
                                callback();
                            }else{
                                callback(new Error(data.msg));
                            }
                        })
                    },
                    trigger:"change"
                }
            ],
        },
        {
            label:'身份证正面',
            type:'upload',
            placeholder:'身份证正面',
            defaultValue:'',
            value:'',
            groupedName:'idCardGroup',
            style:{
                width:'auto'
            },
            containerStyle:{
                width:'auto'
            },
            prop:'cardFrontUrl',
            validateRules:[
                {
                    required:true,
                }
            ],
        },
        {
            label:'身份证背面',
            type:'upload',
            placeholder:'身份证背面',
            groupedName:'idCardGroup',
            defaultValue:'',
            value:'',
            style:{
                width:'auto'
            },
            containerStyle:{
                width:'auto'
            },
            groupedStyle:{
                display:'flex',
                flexDirection:'row',
                justContent:'flex-start',
                alignItems:'center',
                backgroundColor:'linear-gradient(180deg,#67c23a61, #409eff8c)',
                width:'80%',
                marginLeft:'10%',
                padding: '20px 0px',
            },
            prop:'cardBackUrl',
            validateRules:[
                {
                    required:true,
                }
            ],
        },
        
         
        
    ];

    export default {
        name: 'list',
        components:{
            'form-creater':formCreater
        },
        data(){
            return{
                validate:validate,
                couponId:0,
                dataQuery:{
                    query:{}
                },
                config:{
                    queryElements:[],
                    cancle:this.cancle,
                    cancleBtnStyle:{
                        display:'none'
                    },
                    saveBtnlabel:'保存信息'
                },
                timeDownId:0,
                canSendCode:true,
            }
        },
        methods:{
            operateClick:function (data,operate) {
                operate['click']&&operate['click'](data)
            },
            saveDataStep1(params){
                console.log("****9999*****",params,this);
                let that=this;

                if(params.enterpriseAreaLocal.length==0){
                    params.enterpriseArea=[0,0,0]
                }
                if(params.userAreaLocal.length==0){
                    params.enterpriseAreaLocal=[0,0,0]
                }

                params.enterpriseProvince=params.enterpriseAreaLocal[0];
                params.enterpriseCity=params.enterpriseAreaLocal[1];
                params.enterpriseArea=params.enterpriseAreaLocal[2]; 

                params.userProvince=params.userAreaLocal[0];
                params.userCity=params.userAreaLocal[1];
                params.userArea=params.userAreaLocal[2]; 

                var templateData={
                      
                };

                

                let postData=Object.assign(params,templateData)
                postData.userName="";
                postData.userId=this.uid;

                delete postData.labelInfoZCRXX;
                delete postData.platformType;
                delete postData.scopeValue;
                delete postData.enterpriseAreaLocal;
                delete postData.userAreaLocal;

                return backendService.getData({
                    url:'/user/saveUserExtend.json',
                    headers:{
                        "Content-Type":"application/json; charset=utf-8"
                    },
                    method:"post",
                    data:postData
                }).then(function (result) {
                    console.log("result",result)
                    if(result.code==1){
                        that.$message({
                            message: '信息保存成功!',
                            type: 'success'
                        });
                        if(that.userInfo.userInfo.step==2){
                            that.getUserState()
                        }else{
                            that.$router.push("/mainLayout/appManager/list/appList2");
                        }
                    }else{
                        that.$message({
                            message: result.msg,
                            type: 'error'
                        });
                    }

                })

            },
            cancle(){
                this.$router.push("/mainLayout/appManager/list/appList2");
            },
            getUserState(){
                let that = this;
                this.$store.commit('GET_USER_STATE',{
                    cb: (data)=>{
                        if(data==1){
                            that.$router.push('/mainLayout/activationEmail/activationEmail/'+that.form.username)
                        }else if(data==2){
                            that.$router.push('/mainLayout/baseInfo/companyInfo')
                            that.queryItemInfo()
                        }else if(data==3){
                            that.$router.push('/mainLayout/appManager/list/appList2/')
                        }
                    }
                })
            },
            queryItemInfo(id){
                let url="/user/getUserInfo.json";
                let that = this;
                backendService.getData({
                    url:url,
                    method:"post",
                    data:{
                    }
                }).then(function (data) {
                    if(data.code == '1'){

                        data.data.enterpriseAreaLocal=[data.data.enterpriseProvince,data.data.enterpriseCity,data.data.enterpriseArea];
                        data.data.userAreaLocal=[data.data.userProvince,data.data.userCity,data.data.userArea];

                        that.config.queryElements=[];
                        that.config.queryElements=queryElements;
                        that.config.saveData=that.saveDataStep1;
                        that.config.formData=data.data;
                        if(data.data.auditType==0){
                            that.config.readonly=true;
                        }else if(data.data.auditType==2){
                            that.config.readonly=false;
                        }else{
                            that.config.readonly=true;
                        }
                    }else{
                        that.$message({
                            message: data.msg,
                            type: 'error'
                        });
                    }
                })
            },
            sendMobileCode(data,queryItem){
                let url="/user/sendVrificationCode.json";
                let that = this;
                if(!that.canSendCode){
                    return;
                }
                let i=0;
                let seconds=120;
                let normalBtn="<span style='border:1px solid green;padding:0px 15px;text-align:center;border-radius:5px;cursor: pointer;display:inline-block;margin-left:15px;'>获取验证码</span>"
                if(this.timeDownId){
                    this.$message({type:'error',message:"请倒计时结束再获取!"})
                    return;
                }
                if(!/^\d{11}$/.test(data.mobile)){
                    that.$message({
                            message: '请填写手机号码',
                            type: 'error'
                    });  
                    return;    
                }
                that.canSendCode=false;
                backendService.getData({
                    url:url,
                    method:"post",
                    data:{
                        mobile:data.mobile
                    }
                }).then(function (data) {
                    if(data.code == '1'){
                        that.$message({
                            message: '验证码已发送',
                            type: 'success'
                        });
                        that.timeDownId&&clearInterval(that.timeDownId)
                        that.timeDownId=setInterval(data=>{
                            queryItem.rightBtn=`<span style='border:1px solid #eee;padding:0px 15px;text-align:center;border-radius:5px;display:inline-block;margin-left:15px;color:#ddd;'><span style="color: #f00;">${seconds-++i}</span>秒后重新获取</span>`
                            if(seconds-i<=0){
                                clearInterval(that.timeDownId);
                                that.timeDownId=0;
                                queryItem.rightBtn=normalBtn;
                                that.canSendCode=true;
                            }
                        },1000)
                    }else{
                        that.$message({
                            message: data.msg,
                            type: 'error'
                        });
                        that.canSendCode=true;
                    }
                })
            }

        },
        computed:mapState({
            userInfo: state => state.login,
            uid: state => state.login.uid,
            username: state => state.login.username,
        }),
        created() {

            let that=this;
                that.config.queryElements=queryElements;
                that.config.saveData=that.saveDataStep1;
                this.config.readonly=false;
        }
    }
</script>

<style scoped>
    #container {
        height: 300px;
        width:800px;
    }

    .queryElement{
        display: block;
        width: 100%;
        border:0px solid #f00;
    }
</style>
<style>
        .el-step__title,.el-step__description{
                text-align: center;
        }
</style>
