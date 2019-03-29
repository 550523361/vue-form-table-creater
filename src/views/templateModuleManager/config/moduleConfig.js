/* eslint-disable */
import baseTableConfig from '../../../components/tableList/TabListConfig'
let tableListConfig = JSON.parse(JSON.stringify(baseTableConfig));
let baseBtnStyle = tableListConfig.baseBtnStyle;




function getConfig() {
    let moduleConfigData = {
            'questionList': {
                "url": "/channel/task/list.json",
                splitTables: 1,
                selection: true,
                noBorder: true,
                stripe: false,
                "columns": [{
                            "label": "题目",
                            "type": "",
                            "placeholder": "",
                            width: 200,
                            "prop": "taskBeginTime",
                            "addEventListener": [
                                "enter"
                            ],
                            html: true,
                            //"url": "/robot/channelNew/list/##id##",
                            columnHandler(id, rowData) {
                                return `
                        <div>
                            <div>${rowData.no}、${rowData.name}</div>
                            <div style="padding:10px 0px;">${rowData.options.map(item=>{
                                return `
                                    <span style="padding-right:20px;">${item}</span>
                                `
                            }).join("")}</div>
                            <div style="border-bottom:1px dashed;margin: 30px 0px;"></div>
                            <div>${rowData.answer.map(answerItem=>{
                                return `
                                    <div style="display:flex;flex-direction:row;just-content:flex-start;align-items:flex-start;">
                                        <span style="font-weight:800;margin-right:10px">${answerItem.title}</span>    
                                        <span>${answerItem.items.map(answerText=>{
                                            return `
                                                <div style="margin-bottom:10px">${answerText}</div>
                                            `
                                        }).join("")}</span>    
                                    </div>
                                `
                            }).join("")}</div> 
                        </div> 
                    `
                },
            }, ],
            "operator": {
                "width": 100,
                label: '操作',
                "column": [{
                    "label": "删除",
                    "type": "button",
                    "placeholder": "",
                    "prop": "id",
                    //"url": "/robot/channelNew/list/##id##",
                    "style": {
                        "backgroundColor": "#3e4d5f",
                        "padding": "3px 15px",
                        "color": "#fff",
                        "cursor": "pointer",
                        "borderRadius": "5px",
                        "marginRight": "5px",
                        "fontSize": "13px"
                    }
                }]
            },
            "query": {
                "pageNum": 1,
                "pageSize": 15,
                channelId: "param1" //路由之后的参数 由于不支持可变参数 使用param1,param2,param3,param4,param5,作为占位符号,这里配置的参数将会被替换成真是的路由值
            },
            "httpMethod": "post",
            "listAdapter": {},
            "pager": {
                "pageSizeProp": "rowsPerPage",
                "pageSizeQueryProp": "pageSize",
                "pageNumProp": "currentPage",
                "pageNumQueryProp": "pageNum",
                "totalRowsProp": "totalRows",
                "pageSize": 28
            },
            "baseBtnStyle": {
                "backgroundColor": "#f00",
                "padding": "3px 15px",
                "color": "#fff",
                "cursor": "pointer",
                "borderRadius": "5px",
                "marginRight": "5px",
                "fontSize": "13px"
            },
            "headerClick": null,
            "selection": true,
            "queryElements": [{
                    label: "",
                    type: "tipHtml",
                    items: [
                        `<div style="padding: 5px;margin-bottom:15px;">
                            <input type="checkbox" style="margin-right:10px;"/>选中本页试题
                            <span style="display:inline-block;padding:8px 15px;border:1px solid #faa;cursor:pointer;border-radius:5px;font-size:14px;margin-left:15px;margin-right:15px;">选中全部删除</span>
                        </div>`,
                    ]
                },
                {
                    "label": "搜索",
                    "type": "search"
                }
            ],
            errorDataHelper() {
                return {
                    content: [{
                        name: 1,
                        age: 212,
                        no: 1,
                        name: '读一读,下列读音全部正确的一组是',
                        options: [
                            "A、则(ce) 截(jie)",
                            "B、则(ce) 截(jie)",
                            "C、则(ce) 截(jie)",
                            "D、则(ce) 截(jie)",
                        ],
                        answer: [{
                                title: '[考点]',
                                items: [
                                    "词义;登鹳雀楼"
                                ]
                            },
                            {
                                title: '[答案]',
                                items: [
                                    "A"
                                ]
                            },
                            {
                                title: '[解析]',
                                items: [
                                    "[分析] 这类提米啊啊啊大撒旦法是的发送到发双方都阿萨德发的是发电房阿道夫",
                                    "[点评] 这类提米啊啊啊大撒旦法是的发送到发双方都阿萨德发的是发电房阿道夫",
                                ]
                            }
                        ]
                    },{
                        name: 1,
                        age: 212,
                        no: 2,
                        name: '(5分)读一读,下列读音全部正确的一组是',
                        options: [
                            "A、则(ce) 截(jie)",
                            "B、则(ce) 截(jie)",
                            "C、则(ce) 截(jie)",
                            "D、则(ce) 截(jie)",
                        ],
                        answer: [{
                                title: '[考点]',
                                items: [
                                    "词义;登鹳雀楼"
                                ]
                            },
                            {
                                title: '[答案]',
                                items: [
                                    "A"
                                ]
                            },
                            {
                                title: '[解析]',
                                items: [
                                    "[分析] 这类提米啊啊啊大撒旦法是的发送到发双方都阿萨德发的是发电房阿道夫",
                                    "[点评] 这类提米啊啊啊大撒旦法是的发送到发双方都阿萨德发的是发电房阿道夫",
                                ]
                            }
                        ]
                    }]
                }
            },
            clickHandler: (context, rowData, btnInfo) => {
                //console.log("8888=>>>>****",btnInfo,context)
                //context.$message("不能删除")
                if (btnInfo.type == "search") return;

                if (rowData.taskState != 2) {
                    context.$message("任务进行中!不能查看!")
                    return;
                }
                if (btnInfo.label == '查看') {
                    context.$router.push("/robot/detailTask/" + rowData.id + '/' + context.channelId)
                }
            },
            selection: false,
        },

        teacherManager: { //教师管理
            "url": "/thirdparty/upgrade/getUpgradeInfoList.json",
            readonly: true,
            "operator": {
                "width": 200,
                "column": [{
                    "label": "查看",
                    "type": "button",
                    "placeholder": "",
                    "prop": "sourceType",
                    "url": "/mainLayout/appManager/addApp/##id##",
                    "style": {
                        "backgroundColor": "#333",
                        "padding": "3px 15px",
                        "color": "#fff",
                        "cursor": "pointer",
                        "borderRadius": "5px",
                        "marginRight": "5px",
                        "fontSize": "13px"
                    }
                }, ]
            },
            "query": {
                "pageNum": 1,
                "pageSize": 15,
                categoryId: "param1", //路由之后的参数 由于不支持可变参数 使用param1,param2,param3,param4,param5,作为占位符号,这里配置的参数将会被替换成真是的路由值
                categoryName: "param2",
                categoryId2: "param3", //路由之后的参数 由于不支持可变参数 使用param1,param2,param3,param4,param5,作为占位符号,这里配置的参数将会被替换成真是的路由值
                category2Name: "param4",
                sourceType: "param5",
            },
            "httpMethod": "post",
            "listAdapter": {},
            "pager": {
                "pageSizeProp": "rowsPerPage",
                "pageSizeQueryProp": "pageSize",
                "pageNumProp": "currentPage",
                "pageNumQueryProp": "pageNum",
                "totalRowsProp": "totalRows",
                "pageSize": 10
            },
            "baseBtnStyle": {
                "backgroundColor": "#f00",
                "padding": "3px 15px",
                "color": "#fff",
                "cursor": "pointer",
                "borderRadius": "5px",
                "marginRight": "5px",
                "fontSize": "13px"
            },
            "headerClick": null,
            "splitTables": 1,
            "selection": false,
            "columns": [{
                    "label": "年级",
                    "type": "",
                    "prop": "appIconUrl",
                    "width": 100,
                    html: true,
                    columnHandler(appIconUrl, rowData) {
                        return '<div style="text-align:center"><img src="' + appIconUrl + '" style="width:80px;"/>   <div>' + rowData.applicationName + '</div></div>'
                    }
                },
                {
                    "label": "班级数量",
                    "type": "input",
                    width: '140',
                    "prop": "classNum",
                    addEventListener: [
                        "enter"
                    ]
                },
                {
                    "label": "学科",
                    "type": "",
                    "prop": "typeName",
                    "width": 'auto'
                },
            ],
            "queryElements": [{
                    type: 'button',
                    label: '',
                    html: true,
                    style: { width: '100%', height: '0px' },
                    viewHandler(...params) {
                        //console.log(params[1])
                        return "<div style='color: #000;font-weight:800;margin-bottom: 15px;border-bottom:1px solid #222;padding-bottom:20px;    transform: translateY(8px);'>基础设置（年级、班级、学科)</div>";
                    }
                },
                {
                    "label": "下载导入模板",
                    "type": "button",
                    style: {
                        display: 'inline-block',
                        textAlign: 'right',
                        position: 'relative',
                        left: '30%'
                    },
                    "param": true,
                    html: true,
                    viewHandler(...params) {
                        //console.log(params[1])
                        return '<span class="btn btn-default el-button el-button--default">创建三级分类</span>';
                    }

                },
                {
                    "label": "批量导入",
                    "type": "button",
                    style: {
                        display: 'inline-block',
                        textAlign: 'right',
                        position: 'relative',
                        left: '30%',
                        marginLeft: '20px'
                    },
                    "param": true,
                    html: true,
                    viewHandler(...params) {
                        //console.log(params[1])
                        return '<span class="btn btn-default el-button el-button--default">批量导入</span>';
                    }

                },
                {
                    "label": "导出现有数据",
                    "type": "button",
                    style: {
                        display: 'inline-block',
                        textAlign: 'right',
                        position: 'relative',
                        left: '30%',
                        marginLeft: '20px'
                    },
                    "param": true,
                    html: true,
                    viewHandler(...params) {
                        //console.log(params[1])
                        return '<span class="btn btn-default el-button el-button--default">导出现有数据</span>';
                    }

                },
            ],
            clickHandler: (context, rowData, btnInfo) => {

                console.log("rowData", rowData.name)

                if (btnInfo.type == "search") return;

                if (btnInfo.label == "返回") {
                    context.$router.push("/commonModule/category2Manager/" + context.moduleConfig.query.categoryId + "/" + context.moduleConfig.query.categoryName + "/" + context.moduleConfig.query.sourceType);
                    return;
                }

                if (btnInfo.label == "创建三级分类") {
                    let that = context;
                    const h = that.$createElement;

                    let validate = that.validate;
                    let queryElements = [{
                            label: '三级分类名称',
                            type: 'input',
                            placeholder: '分类名称,最多10个字',
                            prop: 'name',
                            span: 14,
                            validateRules: [
                                { required: true, message: '不能为空', trigger: 'change' },
                                {
                                    validator: (validator, value, callback) => {
                                        let errorMessage = validate.validator(value, { required: true, maxlength: 10 });
                                        errorMessage.then(data => {
                                            if (data.code == 1) {
                                                callback();
                                            } else {
                                                callback(new Error(data.msg));
                                            }
                                        })
                                    },
                                    trigger: "change"
                                }
                            ]
                        },
                        {
                            label: '分类排序',
                            type: 'input',
                            placeholder: '分类排序',
                            prop: 'sortNum',
                            validateRules: [
                                { required: false, message: '不能为空', trigger: 'change' },
                                {
                                    validator: (validator, value, callback) => {
                                        let errorMessage = validate.validator(value, { required: false, maxlength: 10 });
                                        errorMessage.then(data => {
                                            if (data.code == 1) {
                                                callback();
                                            } else {
                                                callback(new Error(data.msg));
                                            }
                                        })
                                    },
                                    trigger: "change"
                                }
                            ]
                        },
                        {
                            label: '分类图标',
                            type: 'upload',
                            placeholder: '店铺首图',
                            tip: '尺寸要求:将用于音频默认展示图,格式为jpg,jpeg,pn文件上传较大时，请耐心等待',
                            prop: 'showUrl',
                            validateRules: [
                                { required: false, message: '不能为空', trigger: 'change' },
                            ],
                            imgUploadConfig: {
                                /*beforeUpload:function (fileInfo) {
                                   // console.log("fileInfo",fileInfo)
                                },
                                beforeUploadImageSize:function (imageWidth,imageHeight,file,queryItem) {
                                   // console.log("imageWidth,imageHeight,file,queryItem",imageWidth,imageHeight,file,queryItem)
                                    return Promise.resolve({code:0,msg:'请上传高清图片'})
                                },*/
                                successUpload: function(responed, file, item) {
                                    return Promise.resolve({ data: responed.data.fileUrls[0] })
                                },
                                onChange: function(fileInfo) {

                                },
                                //width:80,
                                //height:80
                            }
                        },
                    ];

                    let callBackDone = data => {};

                    let formPop = h('form-creater', {
                        attrs: {
                            config: {
                                noneSaveBtn: true,
                                queryElements: queryElements,
                                formData: {
                                    name: '',
                                    sortNum: '',
                                    showUrl: '',
                                },
                                cancle: data => {
                                    console.log(data)
                                },
                                saveData: data => {
                                    console.log("saveData", data, formPop);
                                    let backendService = context.getService();
                                    backendService.getData({
                                        url: '/ystCategoryL3/createOrUpdate.json',
                                        method: "post",
                                        data: {
                                            name: data.name,
                                            sortNum: data.sortNum,
                                            showUrl: data.showUrl,
                                            categoryId: context.moduleConfig.query.categoryId2,
                                            sourceType: context.moduleConfig.query.sourceType
                                        }
                                    }).then(function(data) {
                                        if (data.code == '1') {
                                            callBackDone && callBackDone();

                                            context.$refs.tableList.fresh();
                                        } else {
                                            context.$message({
                                                type: 'info',
                                                message: data.msg
                                            });
                                        }
                                    })

                                },
                                saveBtnlabel: "",
                                readonly: false,
                            },

                        },
                    }, null);

                    that.$msgbox({
                        title: '创建三级分类',
                        message: formPop,
                        customClass: "formMessage",
                        showCancelButton: false,
                        showConfirmButton: true,
                        showCloseBtn: false,
                        beforeClose: (action, instance, done) => {
                            if (action === 'confirm') {
                                formPop.componentInstance.submitForm('form');
                                callBackDone = done;
                            } else {
                                if (action == "cancel") {
                                    done();
                                    formPop.componentInstance.resetForm('form');
                                }
                            }
                        }
                    }).then(action => {
                        that.$message({
                            type: 'info',
                            message: '三级分类创建成功!'
                        });
                        formPop.componentInstance.resetForm('form');
                    }).catch(action => {
                        formPop.componentInstance.resetForm('form');
                    });

                    return;
                } else if (btnInfo.label == "编辑") {
                    //context.prompt(context);
                    console.log("rowData", rowData.name)
                    let that = context;
                    const h = that.$createElement;

                    let validate = that.validate;
                    let queryElements = [{
                            label: '三级分类名称',
                            type: 'input',
                            placeholder: '分类名称,最多10个字',
                            prop: 'name',
                            span: 14,
                            // defaultValue:rowData.name,
                            validateRules: [
                                { required: true, message: '不能为空', trigger: 'change' },
                                {
                                    validator: (validator, value, callback) => {
                                        let errorMessage = validate.validator(value, { required: true, maxlength: 10 });
                                        errorMessage.then(data => {
                                            if (data.code == 1) {
                                                callback();
                                            } else {
                                                callback(new Error(data.msg));
                                            }
                                        })
                                    },
                                    trigger: "change"
                                }
                            ]
                        },
                        {
                            label: '分类排序',
                            type: 'input',
                            placeholder: '分类排序',
                            prop: 'sortNum',
                            //defaultValue:rowData.sortNum+'',
                            validateRules: [
                                { required: false, message: '不能为空', trigger: 'change' },
                                {
                                    validator: (validator, value, callback) => {
                                        let errorMessage = validate.validator(value, { required: false, number: "#########" });
                                        errorMessage.then(data => {
                                            if (data.code == 1) {
                                                callback();
                                            } else {
                                                callback(new Error(data.msg));
                                            }
                                        })
                                    },
                                    trigger: "change"
                                }
                            ]
                        },
                        {
                            label: '分类图标',
                            type: 'upload',
                            placeholder: '分类图标',
                            tip: '尺寸要求:将用于音频默认展示图,格式为jpg,jpeg,png文件上传较大时，请耐心等待',
                            prop: 'showUrl',
                            //defaultValue:rowData.showUrl,//||'http://img-steward-dev.goodaa.com.cn/173b798516c941f5ba085b69cab5bc36.png',
                            validateRules: [
                                { required: false, message: '不能为空', trigger: 'change' },
                            ],
                            imgUploadConfig: {
                                /*beforeUpload:function (fileInfo) {
                                   // console.log("fileInfo",fileInfo)
                                },
                                beforeUploadImageSize:function (imageWidth,imageHeight,file,queryItem) {
                                   // console.log("imageWidth,imageHeight,file,queryItem",imageWidth,imageHeight,file,queryItem)
                                    return Promise.resolve({code:0,msg:'请上传高清图片'})
                                },*/
                                successUpload: function(responed, file, item) {
                                    return Promise.resolve({ data: responed.data.fileUrls[0] })
                                },
                                onChange: function(fileInfo) {

                                },
                                //width:80,
                                //height:80
                            }
                        },
                    ];

                    let callBackDone = data => {};

                    let formPop = h('form-creater', {
                        attrs: {
                            key: Math.ceil(Math.random() * 100000),
                            config: {
                                noneSaveBtn: true,
                                queryElements: queryElements,
                                cancle: data => {
                                    console.log(data)
                                },
                                formData: {
                                    name: rowData.name,
                                    showUrl: rowData.showUrl,
                                    sortNum: rowData.sortNum + '',
                                },
                                saveData: data => {
                                    console.log("saveData", data, formPop);
                                    let backendService = context.getService();
                                    backendService.getData({
                                        url: '/ystCategoryL3/createOrUpdate.json',
                                        method: "post",
                                        data: {
                                            id: rowData.id,
                                            name: data.name,
                                            sortNum: data.sortNum,
                                            showUrl: data.showUrl,
                                            categoryId: context.moduleConfig.query.categoryId2,
                                            sourceType: context.moduleConfig.query.sourceType
                                        }
                                    }).then(function(data) {
                                        if (data.code == '1') {
                                            callBackDone && callBackDone();

                                            context.$refs.tableList.fresh();
                                        } else {
                                            context.$message({
                                                type: 'info',
                                                message: data.msg
                                            });
                                        }
                                    })

                                },
                                saveBtnlabel: "",
                                readonly: false,
                            },

                        },
                    }, null);

                    that.$msgbox({
                        title: '编辑三级分类',
                        message: formPop,
                        customClass: "formMessage",
                        showCancelButton: false,
                        showConfirmButton: true,
                        beforeClose: (action, instance, done) => {
                            if (action === 'confirm') {
                                formPop.componentInstance.submitForm('form');
                                callBackDone = done;
                            } else {
                                if (action == "cancel") {
                                    done();
                                    formPop.componentInstance.resetForm('form');
                                }
                            }
                        }
                    }).then(action => {
                        that.$message({
                            type: 'info',
                            message: '三级分类修改成功!'
                        });
                        formPop.componentInstance.resetForm('form');
                    }).catch(action => {
                        formPop.componentInstance.resetForm('form');
                    });
                    return;
                }
            },
        },
        studentManager: { //教师管理
            "url": "/thirdparty/upgrade/getUpgradeInfoList.json",
            readonly: true,
            "operator": {
                "width": 200,
                "columns": [{
                    "label": "查看",
                    "type": "button",
                    "placeholder": "",
                    "prop": "sourceType",
                    "url": "/mainLayout/appManager/addApp/##id##",
                    "style": {
                        "backgroundColor": "#333",
                        "padding": "3px 15px",
                        "color": "#fff",
                        "cursor": "pointer",
                        "borderRadius": "5px",
                        "marginRight": "5px",
                        "fontSize": "13px"
                    }
                }, ]
            },
            "query": {
                "pageNum": 1,
                "pageSize": 15,
                categoryId: "param1", //路由之后的参数 由于不支持可变参数 使用param1,param2,param3,param4,param5,作为占位符号,这里配置的参数将会被替换成真是的路由值
                categoryName: "param2",
                categoryId2: "param3", //路由之后的参数 由于不支持可变参数 使用param1,param2,param3,param4,param5,作为占位符号,这里配置的参数将会被替换成真是的路由值
                category2Name: "param4",
                sourceType: "param5",
            },
            "httpMethod": "post",
            "listAdapter": {},
            "pager": {
                "pageSizeProp": "rowsPerPage",
                "pageSizeQueryProp": "pageSize",
                "pageNumProp": "currentPage",
                "pageNumQueryProp": "pageNum",
                "totalRowsProp": "totalRows",
                "pageSize": 10
            },
            "baseBtnStyle": {
                "backgroundColor": "#f00",
                "padding": "3px 15px",
                "color": "#fff",
                "cursor": "pointer",
                "borderRadius": "5px",
                "marginRight": "5px",
                "fontSize": "13px"
            },
            "headerClick": null,
            "splitTables": 1,
            "selection": false,
            "columns": [
                {
                    "label": "学籍号",
                    "type": "",
                    "prop": "appIconUrl",
                    "width": 100,
                    html: true,
                    columnHandler(appIconUrl, rowData) {
                        return '<div style="text-align:center"><img src="' + appIconUrl + '" style="width:80px;"/>   <div>' + rowData.applicationName + '</div></div>'
                    }
                },
                {
                    "label": "姓名",
                    "type": "input",
                    width: '140',
                    "prop": "studentName",
                },
                {
                    "label": "性别",
                    "type": "",
                    "prop": "typeName",
                    "width": 'sex'
                },
                {
                    "label": "手机号",
                    "type": "",
                    "prop": "typeName",
                    "width": 'mobile'
                },
                {
                    "label": "年级",
                    "type": "",
                    "prop": "typeName",
                    "width": 'gradeNo'
                },
                {
                    "label": "班级",
                    "type": "",
                    "prop": "classNo",
                    "width": 'auto'
                },
            ],
            containerStyle:{
                border:'10x solid #fa0',
                paddingBottom:'20px'
            },
            "queryElements": [
                {
                    "label": "查询模块1",
                    "type": "tipHtml",
                    "param": true,
                    prop: 'groupBtns',
                    groupedStyle: {
                        background: 'linear-gradient(180deg, #6cb4ff, rgb(255, 255, 255))',
                    },
                    style: {
                        display: 'flex',
                        flexDirection: 'row',
                        justContent: 'flex-start',
                        alignItem: 'center',
                        width: '100%',
                        'justify-content': 'space-between',
                        padding: '0px 0px',
                        'border-bottom': '0px solid #000'
                    },
                    items: ["<span style='display:inline-block;margin-right:10px;color:#000;font-weight:800;'>基础设置（年级、班级、学科)</span>", {
                            style: {
                                display: 'inline-block',
                            },
                            items: [
                                "<span style='display:inline-block;margin-right:10px;color:#a0f;border:1px solid #aaa;padding:3px 5px;cursor:pointer;border-radius:5px;font-size:14px;'>下载导入模板</span>",
                                "<span style='display:inline-block;margin-right:10px;color:#12f;border:1px solid #aaa;padding:3px 5px;cursor:pointer;border-radius:5px;font-size:14px;'>批量导入</span>",
                                "<span style='display:inline-block;margin-right:10px;color:#f0a;border:1px solid #aaa;padding:3px 5px;cursor:pointer;border-radius:5px;font-size:14px;'>导出现有数据</span>",
                            ]
                        },
                        "<span style='display:inline-block;margin-right:10px;color:#009'></span>",
                    ]
                },
                {
                    "label": "查询A",
                    "type": "html",
                    prop: 'line1',
                    style: {
                        display: 'inline-block',
                        width: '100%',
                        height: '15px',
                        'border-bottom': '0px solid #222',
                        'margin-bottom': '15px'
                    },
                },
                {
                    type: 'select',
                    label: '查询B:',
                    groupName: '操作按钮',
                    groupedStyle: {
                        border: '0px solid #eee',
                        background: '#fff',
                        marginBottom: '10px',
                        paddingTop: '20px'
                    },
                    labelStyle: {
                        minWidth: 'auto',
                        display: 'inline-block',
                    },
                    groupStyle: {
                        display: 'flex',
                        flexDirection: 'row',
                        justContent: 'flex-start',
                        alignItems: 'center',
                        'margin-bottom': '15px'
                    },
                    style: {
                        width: '180px'
                    },
                    selectStyle: {
                        width: '100px',
                        'margin-bottom': '-15px',
                    },
                    options: [{
                        label: '全部',
                        value: 0
                    }, {
                        label: '一年级',
                        value: 1
                    }, {
                        label: '二年级',
                        value: 2
                    }],
                    prop: 'grate'
                },
                {
                    type: 'select',
                    label: '班级:',
                    groupedStyle: {
                        background: 'linear-gradient(180deg,  rgb(255, 255, 255),#6cb4ff)',
                    },
                    groupName: '操作按钮',
                    labelStyle: {
                        minWidth: '60px',
                        display: 'inline-block',
                    },
                    groupStyle: {
                        display: 'flex',
                        flexDirection: 'row',
                        justContent: 'flex-start',
                        alignItems: 'center',
                        'margin-bottom': '15px'
                    },
                    style: {
                        width: '180px'
                    },
                    selectStyle: {
                        width: '100px',
                        'margin-bottom': '-15px',
                    },
                    options: [{
                        label: '全部',
                        value: 0
                    }, {
                        label: '一班',
                        value: 1
                    }, {
                        label: '二班',
                        value: 2
                    }],
                    prop: 'class'
                },
                {
                    label: '姓名:',
                    prop: 'name',
                    type: 'input',
                    groupedStyle: {
                        border: '1px solid #f0a',
                        background: '#faa'
                    },
                    groupName: '操作按钮',
                    labelStyle: {
                        minWidth: 'auto',
                        display: 'inline-block',
                    },
                },
                {
                    type: 'search',
                    groupedStyle: {
                        border: '1px solid #f0a',
                        background: '#faa'
                    },
                    groupName: '操作按钮',
                },
                {
                    type: 'button',
                    groupedStyle: {
                        border: '1px solid #f0a',
                        background: '#faa'
                    },
                    prop: 'addStudent',
                    groupName: '操作按钮',
                    label: '增加'
                },
                {
                    type: 'button',
                    groupedStyle: {
                        border: '1px solid #f0a',
                        background: '#faa'
                    },
                    prop: 'addStudent',
                    groupName: '操作按钮',
                    label: '导入功能'
                },
                {
                    type: 'tab',
                    components:[
                        {
                            value:1,
                            label:"全部"
                        },
                        {
                            value:2,
                            label:"待支付"
                        },
                        {
                            value:3,
                            label:"已完成"
                        }
                    ],
                    groupedStyle: {
                        background: 'linear-gradient(180deg,  rgb(255, 255, 255),#6cb4ff)',
                        paddingBottom:'0px'
                    },
                    prop: 'addStudent',
                    groupName: 'tabs',
                    label: '导入功能'
                },
            ],
            clickHandler: (context, rowData, btnInfo) => {

                console.log("rowData", rowData.name)

                if (btnInfo.type == "search") return;

                if (btnInfo.label == "返回") {
                    context.$router.push("/commonModule/category2Manager/" + context.moduleConfig.query.categoryId + "/" + context.moduleConfig.query.categoryName + "/" + context.moduleConfig.query.sourceType);
                    return;
                }

                if (btnInfo.label == "创建三级分类") {
                    let that = context;
                    const h = that.$createElement;

                    let validate = that.validate;
                    let queryElements = [{
                            label: '三级分类名称',
                            type: 'input',
                            placeholder: '分类名称,最多10个字',
                            prop: 'name',
                            span: 14,
                            validateRules: [
                                { required: true, message: '不能为空', trigger: 'change' },
                                {
                                    validator: (validator, value, callback) => {
                                        let errorMessage = validate.validator(value, { required: true, maxlength: 10 });
                                        errorMessage.then(data => {
                                            if (data.code == 1) {
                                                callback();
                                            } else {
                                                callback(new Error(data.msg));
                                            }
                                        })
                                    },
                                    trigger: "change"
                                }
                            ]
                        },
                        {
                            label: '分类排序',
                            type: 'input',
                            placeholder: '分类排序',
                            prop: 'sortNum',
                            validateRules: [
                                { required: false, message: '不能为空', trigger: 'change' },
                                {
                                    validator: (validator, value, callback) => {
                                        let errorMessage = validate.validator(value, { required: false, maxlength: 10 });
                                        errorMessage.then(data => {
                                            if (data.code == 1) {
                                                callback();
                                            } else {
                                                callback(new Error(data.msg));
                                            }
                                        })
                                    },
                                    trigger: "change"
                                }
                            ]
                        },
                        {
                            label: '分类图标',
                            type: 'upload',
                            placeholder: '店铺首图',
                            tip: '尺寸要求:将用于音频默认展示图,格式为jpg,jpeg,pn文件上传较大时，请耐心等待',
                            prop: 'showUrl',
                            validateRules: [
                                { required: false, message: '不能为空', trigger: 'change' },
                            ],
                            imgUploadConfig: {
                                /*beforeUpload:function (fileInfo) {
                                   // console.log("fileInfo",fileInfo)
                                },
                                beforeUploadImageSize:function (imageWidth,imageHeight,file,queryItem) {
                                   // console.log("imageWidth,imageHeight,file,queryItem",imageWidth,imageHeight,file,queryItem)
                                    return Promise.resolve({code:0,msg:'请上传高清图片'})
                                },*/
                                successUpload: function(responed, file, item) {
                                    return Promise.resolve({ data: responed.data.fileUrls[0] })
                                },
                                onChange: function(fileInfo) {

                                },
                                //width:80,
                                //height:80
                            }
                        },
                    ];

                    let callBackDone = data => {};

                    let formPop = h('form-creater', {
                        attrs: {
                            config: {
                                noneSaveBtn: true,
                                queryElements: queryElements,
                                formData: {
                                    name: '',
                                    sortNum: '',
                                    showUrl: '',
                                },
                                cancle: data => {
                                    console.log(data)
                                },
                                saveData: data => {
                                    console.log("saveData", data, formPop);
                                    let backendService = context.getService();
                                    backendService.getData({
                                        url: '/ystCategoryL3/createOrUpdate.json',
                                        method: "post",
                                        data: {
                                            name: data.name,
                                            sortNum: data.sortNum,
                                            showUrl: data.showUrl,
                                            categoryId: context.moduleConfig.query.categoryId2,
                                            sourceType: context.moduleConfig.query.sourceType
                                        }
                                    }).then(function(data) {
                                        if (data.code == '1') {
                                            callBackDone && callBackDone();

                                            context.$refs.tableList.fresh();
                                        } else {
                                            context.$message({
                                                type: 'info',
                                                message: data.msg
                                            });
                                        }
                                    })

                                },
                                saveBtnlabel: "",
                                readonly: false,
                            },

                        },
                    }, null);

                    that.$msgbox({
                        title: '创建三级分类',
                        message: formPop,
                        customClass: "formMessage",
                        showCancelButton: false,
                        showConfirmButton: true,
                        showCloseBtn: false,
                        beforeClose: (action, instance, done) => {
                            if (action === 'confirm') {
                                formPop.componentInstance.submitForm('form');
                                callBackDone = done;
                            } else {
                                if (action == "cancel") {
                                    done();
                                    formPop.componentInstance.resetForm('form');
                                }
                            }
                        }
                    }).then(action => {
                        that.$message({
                            type: 'info',
                            message: '三级分类创建成功!'
                        });
                        formPop.componentInstance.resetForm('form');
                    }).catch(action => {
                        formPop.componentInstance.resetForm('form');
                    });

                    return;
                } else if (btnInfo.label == "编辑") {
                    //context.prompt(context);
                    console.log("rowData", rowData.name)
                    let that = context;
                    const h = that.$createElement;

                    let validate = that.validate;
                    let queryElements = [{
                            label: '三级分类名称',
                            type: 'input',
                            placeholder: '分类名称,最多10个字',
                            prop: 'name',
                            span: 14,
                            // defaultValue:rowData.name,
                            validateRules: [
                                { required: true, message: '不能为空', trigger: 'change' },
                                {
                                    validator: (validator, value, callback) => {
                                        let errorMessage = validate.validator(value, { required: true, maxlength: 10 });
                                        errorMessage.then(data => {
                                            if (data.code == 1) {
                                                callback();
                                            } else {
                                                callback(new Error(data.msg));
                                            }
                                        })
                                    },
                                    trigger: "change"
                                }
                            ]
                        },
                        {
                            label: '分类排序',
                            type: 'input',
                            placeholder: '分类排序',
                            prop: 'sortNum',
                            //defaultValue:rowData.sortNum+'',
                            validateRules: [
                                { required: false, message: '不能为空', trigger: 'change' },
                                {
                                    validator: (validator, value, callback) => {
                                        let errorMessage = validate.validator(value, { required: false, number: "#########" });
                                        errorMessage.then(data => {
                                            if (data.code == 1) {
                                                callback();
                                            } else {
                                                callback(new Error(data.msg));
                                            }
                                        })
                                    },
                                    trigger: "change"
                                }
                            ]
                        },
                        {
                            label: '分类图标',
                            type: 'upload',
                            placeholder: '分类图标',
                            tip: '尺寸要求:将用于音频默认展示图,格式为jpg,jpeg,png文件上传较大时，请耐心等待',
                            prop: 'showUrl',
                            //defaultValue:rowData.showUrl,//||'http://img-steward-dev.goodaa.com.cn/173b798516c941f5ba085b69cab5bc36.png',
                            validateRules: [
                                { required: false, message: '不能为空', trigger: 'change' },
                            ],
                            imgUploadConfig: {
                                /*beforeUpload:function (fileInfo) {
                                   // console.log("fileInfo",fileInfo)
                                },
                                beforeUploadImageSize:function (imageWidth,imageHeight,file,queryItem) {
                                   // console.log("imageWidth,imageHeight,file,queryItem",imageWidth,imageHeight,file,queryItem)
                                    return Promise.resolve({code:0,msg:'请上传高清图片'})
                                },*/
                                successUpload: function(responed, file, item) {
                                    return Promise.resolve({ data: responed.data.fileUrls[0] })
                                },
                                onChange: function(fileInfo) {

                                },
                                //width:80,
                                //height:80
                            }
                        },
                    ];

                    let callBackDone = data => {};

                    let formPop = h('form-creater', {
                        attrs: {
                            key: Math.ceil(Math.random() * 100000),
                            config: {
                                noneSaveBtn: true,
                                queryElements: queryElements,
                                cancle: data => {
                                    console.log(data)
                                },
                                formData: {
                                    name: rowData.name,
                                    showUrl: rowData.showUrl,
                                    sortNum: rowData.sortNum + '',
                                },
                                saveData: data => {
                                    console.log("saveData", data, formPop);
                                    let backendService = context.getService();
                                    backendService.getData({
                                        url: '/ystCategoryL3/createOrUpdate.json',
                                        method: "post",
                                        data: {
                                            id: rowData.id,
                                            name: data.name,
                                            sortNum: data.sortNum,
                                            showUrl: data.showUrl,
                                            categoryId: context.moduleConfig.query.categoryId2,
                                            sourceType: context.moduleConfig.query.sourceType
                                        }
                                    }).then(function(data) {
                                        if (data.code == '1') {
                                            callBackDone && callBackDone();

                                            context.$refs.tableList.fresh();
                                        } else {
                                            context.$message({
                                                type: 'info',
                                                message: data.msg
                                            });
                                        }
                                    })

                                },
                                saveBtnlabel: "",
                                readonly: false,
                            },

                        },
                    }, null);

                    that.$msgbox({
                        title: '编辑三级分类',
                        message: formPop,
                        customClass: "formMessage",
                        showCancelButton: false,
                        showConfirmButton: true,
                        beforeClose: (action, instance, done) => {
                            if (action === 'confirm') {
                                formPop.componentInstance.submitForm('form');
                                callBackDone = done;
                            } else {
                                if (action == "cancel") {
                                    done();
                                    formPop.componentInstance.resetForm('form');
                                }
                            }
                        }
                    }).then(action => {
                        that.$message({
                            type: 'info',
                            message: '三级分类修改成功!'
                        });
                        formPop.componentInstance.resetForm('form');
                    }).catch(action => {
                        formPop.componentInstance.resetForm('form');
                    });
                    return;
                }
            },
        },
        createTable: { //创建列表功能页面
            queryElements: [
            ],
            editable: 'add-element',
            url: "/mall/order/queryListPage.json",
            selection: true,
            columns: [
                /* {"prop":"test",label:"ID",width:'auto'},*/
            ],
            operator: {
                width: 320,
                columns: [
                    //{"prop":"state",label:"",map:{2:'关闭',3:'开启'},viewHandler:true}
                ]
            },
            pagerDataHelper: data => {
                return data; //[{name:12,id:1212}]
            },
            errorDataHelper: data => {
                return { content: [{ name: 12, id: 1212, url: 'http://img-steward-test.goodaa.com.cn/592a56e356da4361a9e313298f1b5e21.jpg' }] }
            },
            clickHandler: (context, rowData, btnInfo) => {
                console.log(btnInfo, context)
                if (btnInfo.label == '添加查询条件') {
                    //context.$router.push("/merchant/change/"+rowData.merchantId);
                    context.queryConfig.queryElements.push({
                        label: '订单状态' + Math.ceil(Math.random() * 1000),
                        prop: 'prop' + Math.ceil(Math.random() * 1000),
                        defaultValue: 'defaultValue' + Math.ceil(Math.random() * 1000),
                        type: 'select',
                        options: [{
                                value: '1',
                                code: 1,
                                label: '全部'
                            },
                            {
                                value: '2',
                                code: 2,
                                label: '已完成'
                            },
                            {
                                value: '3',
                                code: 3,
                                label: '已关闭'
                            },
                        ]
                    })
                } else if (btnInfo.label == '添加显示列') {
                    //context.$router.push("/merchant/info/"+rowData.merchantId);
                    context.moduleConfig.columns.push({
                        label: 'column' + Math.ceil(Math.random() * 1000),
                        prop: 'prop' + Math.ceil(Math.random() * 1000),
                        defaultValue: 'defaultValue' + Math.ceil(Math.random() * 1000),
                        width: 180
                    })
                } else if (btnInfo.label == '添加列操作按钮') {
                    //context.$router.push("/merchant/info/"+rowData.merchantId);
                    context.moduleConfig.operator.column.push({
                        prop: "id" + Math.ceil(Math.random() * 10),
                        label: "修改" + Math.ceil(Math.random() * 10),
                        style: Object.assign(JSON.parse(JSON.stringify(baseBtnStyle)), { backgroundColor: '#bfcbd9', color: '#fff' })
                    })

                    context.moduleConfig.operator.width = context.moduleConfig.operator.column.length > 4 ? 400 : context.moduleConfig.operator.column.length * 100;
                }
            },
            handleClose: null,
            clickConfig: null,
            enterHandler(...params) {
                console.log("moduleConfig enterHandler", ...params)
            },
            dataBus: (context, configInfo, elementInfo, elementTypeInfo) => {
                //console.log("*******configInfo,elementInfo*****",context,configInfo,elementInfo,elementTypeInfo);
                if (elementTypeInfo.functionType == 'operators') {
                    elementInfo.style = Object.assign(JSON.parse(JSON.stringify(baseBtnStyle)), { backgroundColor: '#bfcbd9', color: '#fff' });
                    context.moduleConfig.operator.columns.push(elementInfo)
                    context.moduleConfig.operator.width = context.moduleConfig.operator.columns.length > 4 ? 600 : context.moduleConfig.operator.columns.length * 100;
                } else if (elementTypeInfo.functionType == 'queryParams') {
                    if (elementInfo.check) {
                        //eval("var checkFunc=" + elementInfo.check);
                        //console.log(elementInfo.check)
                        elementInfo.check = eval(elementInfo.check);
                        //console.log("elementInfo.check",checkFunc())
                    }
                    Object.keys(elementInfo).map(key=>{
                        if(key.indexOf("Handler")!=-1){
                            elementInfo[key]=eval(elementInfo[key]);
                        }
                    })
                    if (elementInfo.check) {
                        //eval("var checkFunc=" + elementInfo.check);
                        //console.log(elementInfo.check)
                        elementInfo.check = eval(elementInfo.check);
                        //console.log("elementInfo.check",checkFunc())
                    }
                    context.queryConfig.queryElements.push(elementInfo);
                } else if (elementTypeInfo.functionType == 'columns') {
                    if (elementInfo.viewHandler && typeof elementInfo.viewHandler === "string") {
                        elementInfo.viewHandler = data => 123123;
                        elementInfo.columnHandler = data => `<span style="text-align: center;color: #f0a">${elementInfo.columnHandlerText}</span>`;
                    }
                    if (elementInfo.columnHandler && typeof elementInfo.columnHandler === "string") {
                        elementInfo.viewHandler = data => 123123;
                        elementInfo.columnHandler = data => {
                            //console.log(Array.isArray(data),data)
                            let compiledText = "";
                            if (Array.isArray(data)) {
                                compiledText = data.map(objectItem => {
                                    let textTemplate = JSON.parse(JSON.stringify(elementInfo.columnHandlerText));
                                    textTemplate = textTemplate.map((item, index) => {
                                        let tarText = /(#+([a-zA-Z]+)#+)/g.exec(item)[0];
                                        let propertyText = /(#+([a-zA-Z]+)#+)/g.exec(item)[2];
                                        item = item.replace(tarText, objectItem[propertyText] || '');
                                        return item;
                                    })
                                    return textTemplate.join("");
                                })
                            } else {
                                let text = elementInfo.columnHandlerText;
                                compiledText = text.map((item, index) => {
                                    let tarText = /(#+([a-zA-Z]+)#+)/g.exec(item)[0];
                                    let propertyText = /(#+([a-zA-Z]+)#+)/g.exec(item)[2];
                                    item = item.replace(tarText, data[propertyText] || '');
                                    return item;
                                })
                            }
                            return compiledText.join("");
                        }
                    }
                    context.moduleConfig.columns.push(elementInfo);
                } else if (elementTypeInfo.functionType == 'dataUrl') {
                    context.moduleConfig.url = elementInfo.url;
                    context.moduleConfig.httpMethod = elementInfo.httpMethod;
                    // console.log("url****",context.tableListConfig.url)
                    context.$nextTick(function() {
                        context.$refs.tableList.fresh();
                    })

                }
            }
        },
        createForm: { //创建列表功能页面
            formElements: [
                 
            ],
            queryElements: [
                {
                    label: "注意:",
                    type: "tipHtml",
                    items: [
                        `<div style="color: #fff;background: #0056aa;padding: 5px;">列表创建</div>`
                    ]

                }
            ],
            editable: 'create-form-element',
            url: "/mall/order/queryListPage.json",
            selection: true,
            columns: [
                /* {"prop":"test",label:"ID",width:'auto'},*/
            ],
            operator: {
                width: 320,
                columns: [
                    //{"prop":"state",label:"",map:{2:'关闭',3:'开启'},viewHandler:true}
                ]
            },
            pagerDataHelper: data => {
                return data; //[{name:12,id:1212}]
            },
            errorDataHelper: data => {
                return { content: [{ name: 12, id: 1212, url: 'http://img-steward-test.goodaa.com.cn/592a56e356da4361a9e313298f1b5e21.jpg' }] }
            },
            clickHandler: (context, rowData, btnInfo) => {
                console.log(btnInfo, context)
                if (btnInfo.label == '添加查询条件') {
                    //context.$router.push("/merchant/change/"+rowData.merchantId);
                    context.queryConfig.queryElements.push({
                        label: '订单状态' + Math.ceil(Math.random() * 1000),
                        prop: 'prop' + Math.ceil(Math.random() * 1000),
                        defaultValue: 'defaultValue' + Math.ceil(Math.random() * 1000),
                        type: 'select',
                        options: [{
                            value: '1',
                            code: 1,
                            label: '全部'
                        },
                            {
                                value: '2',
                                code: 2,
                                label: '已完成'
                            },
                            {
                                value: '3',
                                code: 3,
                                label: '已关闭'
                            },
                        ]
                    })
                } else if (btnInfo.label == '添加显示列') {
                    //context.$router.push("/merchant/info/"+rowData.merchantId);
                    context.moduleConfig.columns.push({
                        label: 'column' + Math.ceil(Math.random() * 1000),
                        prop: 'prop' + Math.ceil(Math.random() * 1000),
                        defaultValue: 'defaultValue' + Math.ceil(Math.random() * 1000),
                        width: 180
                    })
                } else if (btnInfo.label == '添加列操作按钮') {
                    //context.$router.push("/merchant/info/"+rowData.merchantId);
                    context.moduleConfig.operator.column.push({
                        prop: "id" + Math.ceil(Math.random() * 10),
                        label: "修改" + Math.ceil(Math.random() * 10),
                        style: Object.assign(JSON.parse(JSON.stringify(baseBtnStyle)), { backgroundColor: '#bfcbd9', color: '#fff' })
                    })

                    context.moduleConfig.operator.width = context.moduleConfig.operator.column.length > 4 ? 400 : context.moduleConfig.operator.column.length * 100;
                }
            },
            handleClose: null,
            clickConfig: null,
            enterHandler(...params) {
                console.log("moduleConfig enterHandler", ...params)
            },
            editorFormHandler(...params){
                let context=params[0];
                let operateType=params[1];
                let elementItem=params[2];
                let elementSeq=params[3];
                //console.log(context,operateType,elementItem,elementSeq)
                if(operateType=="del"){
                    context.formCreateConfig.queryElements.splice(elementSeq,1);
                }else if(operateType=="up"){
                    let deleteElement=context.formCreateConfig.queryElements.splice(elementSeq,1)[0];
                    context.formCreateConfig.queryElements.splice(elementSeq-1,0,deleteElement)
                }else if(operateType=="down"){
                    let deleteElement=context.formCreateConfig.queryElements.splice(elementSeq,1)[0];
                    context.formCreateConfig.queryElements.splice(elementSeq+1,0,deleteElement)
                }
                
            },
            dataBus: (context, configInfo, elementInfo, elementTypeInfo) => {
                //console.log("*******configInfo,elementInfo*****",context,configInfo,elementInfo,elementTypeInfo);
                //if (elementTypeInfo.functionType =="inputElement") {
                    let copyElementInfo=JSON.parse(JSON.stringify(elementInfo))

                console.log(elementInfo)

                    Object.keys(copyElementInfo).map(prop=>{
                        if(prop.indexOf("Handler")!=-1){
                            copyElementInfo[prop]=eval(copyElementInfo[prop])
                            console.log("prop",prop)
                        }
                    })

                    if(copyElementInfo.type=='upload'){
                        if(copyElementInfo.imgUploadConfig&&copyElementInfo.imgUploadConfig.beforeUpload){
                            copyElementInfo.imgUploadConfig.beforeUpload=eval(copyElementInfo.imgUploadConfig.beforeUpload)
                        }
                        if(copyElementInfo.imgUploadConfig&&copyElementInfo.imgUploadConfig.successUpload){
                            copyElementInfo.imgUploadConfig.successUpload=eval(copyElementInfo.imgUploadConfig.successUpload)
                        }
                    }

                    context.formCreateConfig.queryElements.push(copyElementInfo);
                //}
            }
        },
    }
    return moduleConfigData;
}

export default { getConfig };