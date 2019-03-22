<template>
    <div class="addElement">
        <div style="padding: 15px 5px;background: #f0f0f0;">
            <el-radio v-model="type" :label="element" style="margin-left: 0px;"  v-for="(element,index) in Object.keys(elementConfig)" :key="index+'_radio_'+element" >{{elementConfig[element].name}}</el-radio>
        </div>
        <div v-for="(element,index) in Object.keys(elementConfig)" v-if="type==element" style="background:#dfe6ec;padding: 10px 5px;"  :key="index+''+element">
            <span v-if="elementConfig[element][elementOption].name" v-for="(elementOption,index) in Object.keys(elementConfig[element])" :key="index+'_radio_option_'+element" class="chooseItemElementContainer">
                <div v-if="elementConfig[element][elementOption].name=='br'"  style="background: transparent;height: 15px;"></div>
                <template v-else="elementConfig[element][elementOption].name=='br'"  style="background: #f0a;">
                    <el-radio v-model="elementItemType"  :label="elementOption"   >{{elementConfig[element][elementOption].name}}</el-radio>
                </template>
            </span>
            <div style="margin-top: 15px;background: transparent"></div>
            <div class="operateContainer">
                <span v-for="(elementType,index) in Object.keys(elementConfig[element])" class="optionsElementContainer" v-if="element==type&&elementItemType==elementType"  :key="index+''+element+'_'+elementType">
                    <el-input v-model="elementConfig[type][elementItemType].options" type="textarea" :rows="10" @keyup.enter.native="saveInput" ></el-input>
                    <div style="font-size: 12px;color: #f00;margin-top: 5px;">{{elementConfig[element].name}}==>{{elementConfig[element][elementType].name}}--{{elementType}}---{{type}}--->{{elementItemType}}</div>
                </span>
                <el-button type="success" style="margin-top: 15px;" @click="addQueryElement">添加元素</el-button>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'create-form-element',
        data(){
            return{
                type:'inputElement',
                elementItemType:'input',
                config:{},
                form:{},
                items:[],
                elementConfig:{
                    inputElement:{
                        name:'输入框',
                        input:{
                            name:'输入框有验证功能',
                            options:JSON.stringify({
                                label:'属性名称',
                                type:'input',
                                placeholder:'属性名称占位',
                                defaultValue:'',
                                value:'',
                                prop:'propName',
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
                            },null,4)
                        },
                        addInput:{
                            name:'回车输入框',
                            options:JSON.stringify({
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
                            },null,4)
                        },
                        groupElementInput:{
                            name:'分组元素',
                            options:JSON.stringify({
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
                            },null,4)
                        },
                        imagesUpload:{
                            name:'图片批量上传',
                            options:JSON.stringify({
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
                            },null,4)
                        },
                        imageUpload:{
                            name:'图片上传',
                            options:JSON.stringify({
                                label:'头像',
                                type:'upload',
                                placeholder:'头像',
                                defaultValue:'',
                                value:'',
                                prop:'businessLicense',
                                tip:'请上传高清图片，仅支持PNG格式。',
                                validateRules:[
                                    {
                                        required:true,
                                    }
                                ]
                            },null,4)
                        },
                        watchElement:{
                            name:'观察元素 依赖其它元素值动态切换显示隐藏',
                            options:JSON.stringify({
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
                            },null,4)
                        },
                        fenGexian:{
                            name:'自定义分割线',
                            options:JSON.stringify({
                                label:'',
                                type:'html',
                                placeholder:'',
                                default:'<div style="border-bottom:1px solid #222;padding-bottom:4px;font-size:18px;width:100%;transform: translateX(-106px);">你的信息</div>',
                                background:'transparent',
                                prop:'labelInfoZCRXX',
                            },null,4)
                        },
                        callBackFenGeXian:{
                            name:'函数方式自定义分割线',
                            options:JSON.stringify({
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
                            },null,4)
                        },
                        provinceCityCasede:{
                            name:'省市县级联选择',
                            options:JSON.stringify({
                                label:'省市区',
                                prop:'userAreaLocal',
                                cascaderOptions:[],
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
                            },null,4)
                        },
                        multiLineInput:{
                            name:'多行文本输入框',
                            options:JSON.stringify({
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
                            },null,4)
                        },
                        rightBtnInput:{
                            name:'右侧有按钮的输入框',
                            options:JSON.stringify({
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
                            },null,4)
                        }
                    },
                }
            }
        },
        methods:{
            saveInput(param){
                console.log(param,this.form);
                if(!this.form[this.config.prop]) return;
                this.items.push(this.form[this.config.prop]);
                this.form[this.config.prop]="";
                if(this.config.dataBus){
                    if(typeof this.config.dataBus ==="function"){
                        this.config.dataBus(this.config,this.items);
                    }
                }
            },
            addQueryElement(){
                if(this.config.dataBus){
                    if(typeof this.config.dataBus ==="function"){
                        this.config.dataBus(this.config,JSON.parse(this.elementConfig[this.type][this.elementItemType].options),{
                            functionType:this.type,
                            elementType:this.elementItemType,
                        });
                    }
                }
            },
            deleteItem(item,index){
                this.items.splice(index,1);
                if(this.config.dataBus){
                    if(typeof this.config.dataBus ==="function"){
                        this.config.dataBus(this.config,this.items);
                    }
                }
            }
        },
        created() {
            let config=this.$attrs.config;
            //console.log("config",config);
            this.config=config;
            let formData=config.formData;
            if(formData){
                /*Object.keys(formData).forEach(key=>{
                    that.$set(that.form,key,formData[key]);
                })*/
                this.items=JSON.parse(JSON.stringify(formData))
                if(this.config.dataBus){
                    if(typeof this.config.dataBus ==="function"){
                        this.config.dataBus(this.config,this.items);
                    }
                }
            }

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
    .addInputItemContainer{
        display: inline-block;
        padding: 5px 10px;
        border:1px solid #f00;
        border-radius: 5px;
        color: #f00;
        line-height: 20px;
        margin-right: 10px;
        margin-bottom: 10px;
        position: relative;
    }
    .deleteIcon{
        display: inline-block;
        position: absolute;
        right: -8px;
        top: -8px;
        width: 16px;
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        background: #f00;
        color: #fff;
        border-radius: 50%;
        cursor: pointer;
    }
</style>
<style>
    .addElement{
        text-align: left;
    }
    .addElement .el-radio{
        min-width: 165px;
        margin-right: 10px;

    }
    .optionsElementContainer{
        display: inline-block;
        border: 0px dashed #faa;
        width: 60%;
        margin-right: 20px;
    }
    .chooseItemElementContainer{
        display: inline-block;
        border: 1px dashed #faa;
        padding: 10px 15px;
        margin-bottom: 15px;
        margin-right: 15px;
        border-radius: 5px;
    }
    .operateContainer{
        display: flex;
        width: 100%;
        border: 0px solid #f00;
        flex-direction: row;
        justify-content:flex-start;
        align-items: center;
    }
</style>
