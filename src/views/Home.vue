<template>
    <form-creater v-if="config.queryElements.length>0" :config="config" ref="formCreater"></form-creater>
</template>
<script>
    import backendService from './../components/remoteService/backendService'
    import cookie from './../components/cookie/cookie'
    import formCreater from './../components/formCreater/baseFormCreater'

    let queryElements=[
        {
            label:'',
            type:'html',
            placeholder:'',
            default:'<div style="border-bottom:1px solid #eee;padding-bottom:4px;font-size:18px;width:100%;transform: translateX(-106px);color:#f00;">登录系统</div>',
            background:'transparent',
            prop:'tipLine',
        },
        {
            label:'用户名',
            type:'input',
            placeholder:'用户名',
            defaultValue:'',
            value:'',
            prop:'username',
            subText:'',
            span:10,
            style:{
                display:'inline-block',
                width:'auto',
                minWidth:'200px'
            },
            validateRules:[
                {
                    required:true,
                },
                {
                    validator:(validator,value,callback,validate)=>{
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
            label:'密码',
            type:'input',
            placeholder:'密码',
            defaultValue:'',
            value:'',
            prop:'password',
            inputType:'password',
            subText:'',
            span:10,
            style:{
                display:'inline-block',
                width:'auto',
                minWidth:'200px',
            },
            groupedStyle:{
                display: 'inline-block',
                width: '580px',
                border: '1px dashed #f0a',
                textAlign:' center',
                padding:' 20px',
                height: '300px',
                borderRadius:' 5px',
                margin: '0px auto',
                marginTop: '120px',
            },
            validateRules:[
                {
                    required:true,
                },
                {
                    validator:(validator,value,callback,validate)=>{
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
    ];

    export default {
        name: 'home',
        components:{
            'form-creater':formCreater
        },
        data(){
            return{
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
                    saveBtnlabel:'登录',
                    confirmBtnStyle:{
                        minWidth: '200px',
                        transform: 'translateY(-107px)',
                        left:0,
                        minWidth:'200px',
                    },
                    formStyle:{
                        textAlign:'center'
                    },
                    labelWidth:'220px',
                    btnContainerStyle:{
                        textAlign:'center',

                    }
                },
                timeDownId:0,
                canSendCode:true,
            }
        },
        methods:{
            saveDataStep1(params){
                console.log("****9999*****",params,this);
                let that=this;

                var templateData={

                };

                let postData=Object.assign(params,templateData)

                return backendService.getData({
                    url:'/login.json',
                    headers:{
                        "Content-Type":"application/json; charset=utf-8"
                    },
                    method:"post",
                    data:postData
                }).then(function (result) {
                    console.log("result",result)
                    if(result.code==1){
                        cookie.setCookie("username",postData.username,1)
                        cookie.setCookie("token",result.data.token,1)
                        that.$message({
                            message: '信息保存成功!',
                            type: 'success'
                        });
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
        },
        created() {
            let that=this;

            console.log("cookie",cookie)

            that.config.queryElements=queryElements;
            that.config.saveData=that.saveDataStep1;
            this.config.readonly=false;
        }
    }
</script>
