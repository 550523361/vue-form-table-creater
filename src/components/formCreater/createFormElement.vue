<template>
    <div class="addElement">
        <div style="padding: 15px 5px;background:linear-gradient(-180deg, rgb(102, 177, 255), #3483de59, #228dfdad);">
            <el-radio v-model="type" :label="element" style="margin-left: 0px;margin:10px;" border  v-for="(element,index) in Object.keys(elementConfig)" :key="index+'_radio_'+element" >{{elementConfig[element].name}}</el-radio>
        </div>
        <div style="padding:10px;background:linear-gradient(-180deg, rgb(102, 177, 255), #c0c4cc, rgb(103, 194, 58)) !important;">
            <el-radio v-for="(element,index) in currentChoosed"  :key="index" v-model="elementItemType"  border style="margin-bottom:15px;margin-right:15px;margin-top:10px;" :label="element">{{elementConfig[type][element].name}}</el-radio>
        </div>
        <div class="operateContainer" style="background:#ddd" v-if="elementConfig[type][elementItemType]">
                    <span class="optionsElementContainer">
                            <el-input v-model="elementConfig[type][elementItemType].options" text-color="#fff" type="textarea" :rows="25" style="font-size:12px;" @keyup.enter.native="saveInput" ></el-input>
                    </span>
                    <el-button type="success" style="margin-top: 15px;" @click="addQueryElement">添加元素</el-button>
                </div>
                <div style="font-size: 12px;background:linear-gradient(-180deg, #66b1ff,rgba(0,0,0,.1),#67c23a)!important;margin-top:20px;" v-html="showTemplate(templateHtml)">
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
                            testProp:`
                                {
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
                                    viewHandler(...params){
                                        console.log(...params)    
                                    }    
                                },
                            `,
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
                        datetimerange:{
                            name:'时间范围',
                            options:JSON.stringify({
                                label:'时间范围',
                                type:'datetimerange',
                                placeholder:'请选择开始和结束时间',
                                prop:'timerange',
                                validateRules:[
                                    {
                                        required:true
                                    }
                                ]
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
                    selectElement:{
                        name:'下拉选择',
                        selectInputFirst:{
                            name:'下拉选择',
                            options:JSON.stringify({
                                label:'下拉选择跳转类型选择',
                                prop:'select',
                                dataUrl:'/jump/getJumpType.json',
                                initQuery:true,
                                type:'select',
                                casecadeChild:[],
                                casecadeGrandsonList:[],
                                dataHandler:`(data)=>{
                                    console.log(data)
                                    data.data.map(item=>{
                                        item.label=item.desc;
                                        item.value=item.code;
                                        return item;
                                    })
                                    return data.data
                                }`,
                                validateRules:[
                                    {
                                        required:true
                                    },
                                ]
                            },null,4)
                        },
                        selectInputSecond:{
                            name:'下拉选择有数据处理转换函数',
                            options:JSON.stringify({
                                label:'应用选择',
                                prop:'appId',
                                dataUrl:'/jump/getRobotApp.json',
                                initQuery:true,
                                type:'select',
                                propList:'appList',
                                casecadeChild:"appFunction",
                                casecadeGrandsonList:[],
                                dataHandler:`(data)=>{
                                    console.log(data)
                                    if(data.data.length==0) return [];
                                    data.data.map(item=>{
                                        item.label=item.appNameCn;
                                        item.value=item.appNameUs;
                                        return item;
                                    })
                                    return data.data
                                }`,
                                validateRules:[
                                    {
                                        required:true
                                    },
                                ]
                            },null,4)
                        },
                        selectInputThird:{
                            name:'下拉选择有衍生元素模板',
                            options:JSON.stringify({
                                label:'功能选择',
                                prop:'appFunction',
                                propList:'appFunctionList',
                                dataUrl:'/jump/getRobotAppTarget.json',
                                initQuery:false,
                                param:{
                                    appNameUs:"appNameUs"
                                },
                                extendsProp:["appNameUs"],
                                casecadeChild:"",
                                groupedName:'jumpParams',
                                casecadeGrandsonList:[],
                                extendChild:{
                                    dataUrl:'/jump/getParamTemplate.json',
                                    method:'post',
                                    prop:'appFunction',
                                    dataHandler:`(data,parent)=>{
                                        console.log(data,">>>>",parent)
                                        if(!data.data||data.data.length==0) return [];
                                        data.data.map((item,seq)=>{
                                            item.label=item.targetDesc;
                                            item.value=item.target;
                                            item.type='input';
                                            //item.inputType='textarea';
                                            //item.rows=5;
                                            item.label=item.paramLabel;
                                            item.groupedName='jumpParams';
                                            item.order=parent.order+1+seq;
                                            item.prop='temp_appFunction#'+item.paramName;
                                            item.validateRules=[
                                                                    {
                                                                        required:true
                                                                    },
                                                                ]
                                            return item;
                                        })
                                        return data.data
                                    }`,
                                    extendsProp:["target"]
                                },
                                type:'select',
                                dataHandler:`(data)=>{
                                    console.log(data)
                                    data.data.map(item=>{
                                        item.label=item.targetDesc;
                                        item.value=item.target;
                                        return item;
                                    })
                                    return data.data
                                }`,
                                validateRules:[
                                    {
                                        required:true
                                    },
                                ]
                            },null,4)
                        },
                    },
                    uploadFile:{
                        name:'文件上传',
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
                        fileUpload:{
                            name:'文件上传',
                            options:JSON.stringify({
                                label:'应用APK',
                                name:'文件上传',
                                type:'upload',
                                placeholder:'应用APK',
                                defaultValue:'',
                                span:24,
                                value:'',
                                prop:'apkUrl',
                                tip:'请上传高清图片作为应用ICON108*108像素，仅支持PNG格式，大小不超过300KB。',
                                imgUploadConfig:{
                                    notImage:true,
                                    beforeUpload:`
                                        (...params)=>{
                                        //console.log(">>>>>",...params);
                                        let file=params[0];
                                        const AndroidAppType ='application/vnd.android.package-archive';
                                        /*if(!(file.type==AndroidAppType||/\\.apk$/.test(file.name))){
                                            return Promise.reject({code:0,msg:'请选择apk文件'})
                                        }
                                        if(file.size>500*1024*1024){
                                            return Promise.reject({code:0,msg:'应用不能大于500Mb'})
                                        }*/
                                        return Promise.resolve({code:1,msg:'success'})
                                    }
                                    `,
                                    successUpload:`
                                        (response,file,queryItem,form)=>{
                                        //console.log(">>>>>",response,file,queryItem,form);
                                        form["appSizeView"]=(file.size/1024/1024).toFixed(2)+'Mb';
                                        form["appSize"]=file.size;
                                        return Promise.resolve({code:1,msg:'success',data:response.data.fileUrls[0]})
                                    }
                                    `
                                },
                            },null,4)},
                    },
                    getLine:{
                        name:'分割线',
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
                    },
                    buttons:{
                        name:'各种按钮',
                        chooseBtn:{
                            name:'选择按钮',
                            options:JSON.stringify({
                                label:'选择应用',
                                type:'chooseBtn',
                                placeholder:'',
                                default:'',
                                isPop:false,
                                readonly:false,
                                span:24,
                                width:'800px',
                                dataBus:true,
                                chooseBtnLabel:'选择应用',
                                chooseResultViewHandler:`(choosedResultArray,readonly)=>{
                                   // console.log(choosedResultArray)
                                    return _.flatten(Object.values(choosedResultArray)).map(item=>'<el-button type="info">'+item.applicationName+'</el-button>').join(",")
                                }`,
                                popChooseViewHandler:`(choosedResultArray,readonly)=>{
                                   // console.log(choosedResultArray)
                                    return _.flatten(Object.values(choosedResultArray)).map(item=>'<el-button type="info">'+item.applicationName+'</el-button>').join(",")
                                }`,
                                tableListConfig:{
                                   url:'/thirdparty/upgrade/getUpgradeInfoList.json',
                                   queryElements:[
                                       {type:'input',label:'应用名称',prop:'applicationName'},
                                       {type:'search',label:'应用名称',}
                                   ],
                                   selection:false,
                                   pager:{
                                       pageSize:5
                                   },
                                   columns:[
                                       {
                                           label:'名称',
                                           prop:'applicationName',
                                           width:'auto'
                                       },
                                       {
                                           label:'版本号',
                                           prop:'appVersion',
                                           width:'200px'
                                       },
                                       {
                                           label:'图标',
                                           prop:'appIconUrl',
                                           type:'img',
                                           width:'200px'
                                       }
                                   ],
                                   operator:{
                                       columns:[
                                           {
                                               label:'选择',
                                               type:'button'
                                           }
                                       ]
                                   }
                                },
                                prop:'appIds',
                            },null,4)
                        },
                    },
                },
                templateHtml:`
                    {
                        label:'属性名称',//属性名称
                        prop:'prop',//属性值 如name、 age、
                        type:'input',//字段类型 如 input,datetimerange,chooseBtn,addInput,upload,import,
                        inputType:'textarea',addImages,cascader,//input类型是否显示为多行文本输入
                        rows:'3',//显示多行文本行高
                        placeholder:'',//属性名称占位
                        defaultValue:'',//默认值
                        readonly:false,//是否为只读
                        value:'',//值
                        html:true,//是否显示html方式
                        viewHandler:(proValue,formValue){//<div style="display:inline-block;color:#f00;font-size:12px;">回调处理函数参数默认为</div>
                            console.log("aaa")
                        },
                        subText:'',//右侧提示文字  比如字数提示 用户名必须20个字以内 可以为html
                                    //<span style="color: #f0a">红色的字体</span>
                        style:{ //元素样式控制
                            display:'inline-block',
                            width:'auto',
                            minWidth:'400px'
                        },
                        span:18,//元素容器宽度现在 1-24,
                        validateRules:[//校验规则
                            { //对象配置模式
                                required:true
                            },
                            { //函数配置模式
                                validator:(
                                                validator,//校验所有规则
                                                value,//当前值
                                                callback,//处理完成之后的回调 如 next()
                                                validate, //校验辅助函数 有各种基础校验 如  mobile,数字类型,email,version,password,
                                                                        //required,maxvalue,minvalue,maxlength,minlength,
                                                allRuleInOne,//规则打包之后对象
                                                that.form,//当前表单所有值 为做关联校验时候使用
                                            )=>{//函数模式
                                                    let errorMessage=validate.validator(value,{required:true,maxlength:15});
                                                    errorMessage.then(data=>{
                                                        if(data.code==1){
                                                            callback();
                                                        }else{
                                                            callback(new Error(data.msg));
                                                        }
                                                    })
                                                },
                                trigger:"change"//校验函数触发方式 blur,change,click
                            }

                        ],
                        formData:[],//当type为addInput时 给属性自动赋值,
                        dataBus:true,//是否需要数据传输 适合自定义类元素有自己的处理逻辑 处理完成后同步数据函数
                        containerStyle:{//属性元素容器 适用于多个属性排列在一行等 有单独布局的情况
                            width:'auto'
                        },
                        groupedName:'默认分组',//分组名称
                        groupedStyle:{//分组样式对象  可以将多个不同的属性进行分组 以便更清晰明了的显示
                            display:'flex',
                            flexDirection:'row',
                            justContent:'flex-start',
                            alignItems:'center',
                            backgroundColor:'linear-gradient(180deg,#67c23a61, #409eff8c)',
                            width:'80%',
                            marginLeft:'10%',
                            padding: '20px 0px',
                        },
                        imagesListConfig:{//图片上传时候的各种校验
                            imageConfig:{//简单的高宽大小校验
                                //size:2.45*1024*1024,
                                width:430,
                                height:270
                            },
                            readonly:false,
                            /*validatorHandler:validatorHandler,*///函数式的校验你自己来决定是否能通过
                            data:[],
                            dataBus:true,//标记是否需要数据传输
                            maxNum:5,//多图上传 最大能上传个数
                            tip:'请上传高清图片430px*270px，仅支持PNG格式。最多5个图片',//多图上传的提示性文字
                            prop:'showUrls'
                        },
                        watch:{//级联或关联属性 观察其它属性的配置对象
                            props:["enterpriseName"],
                            watchValue:{
                                enterpriseName:{//枚举其它属性的某些值可以显示或隐藏
                                    "好好啊":true,//当观察属性enterpriseName为好好啊的时候可以显示
                                    "ccc":true,
                                    "看不见":false//当观察属性enterpriseName为"看不见"的时候不显示
                                },
                                dddd: (...data)=>{//函数式校验
                                    console.log(">>>>>",...data)
                                    return false
                                },
                                ee:null//无效的配置会被忽略掉
                            }
                        },
                        dataHandler(auditTypeName,...params){//根据数据动态显示内容
                            return <span style="color: #f00;font-size: 14px;background: transparent;color:#a00;margin-bottom: 20px;">hahahah</span>
                        },
                        cascaderOptions:[],//级联对象显示数据源
                        itemLabel:'label',//级联对象的显示名称
                        itemValue:'areaId',//级联对象的显示值
                        rightBtn:"<span style='border:1px solid green;padding:0px 15px;text-align:center;border-radius:5px;cursor: pointer;display:inline-block;margin-left:15px;'>获取验证码</span>",
                        rightBtnClick:data=>{//右侧需要有按钮的点击处理函数
                            return '';
                        },
                        dataUrl:'/jump/getJumpType.json',//下拉选择数据接口地址
                        initQuery:true,//是否需要初始化
                        dataHandler:\`(data)=>{//数据处理函数 下拉显示 label 或name  value或code
                            console.log(data)
                            (data.data||[]).map(item=>{
                                item.label=item.desc;
                                item.value=item.code;
                            })
                            return data.data
                        }\`,
                    }
                `,
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
            },
            showTemplate(template){
                return (template||'').replace(/\n/g,"<br/>").replace(/\s{4}/g,"<span style='display: inline-block;width: 10px;'></span>")
            }

        },
        computed:{
            currentChoosed(){
                return Object.keys(this.elementConfig[this.type]).filter((item,seq)=>seq)
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
