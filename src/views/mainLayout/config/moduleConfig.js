import baseTableConfig from '../../../components/tableList/TabListConfig'
let tableListConfig = JSON.parse(JSON.stringify(baseTableConfig));
let baseBtnStyle = tableListConfig.baseBtnStyle;




function getConfig() {
    let moduleConfigData = {
        baseInfo: {
            menuConfig: [{
                "id": 17,
                "name": "信息修改",
                "url": "",
                "subMenus": [
                    { "id": 228, "name": "我的信息", "url": "/mainLayout/baseInfo/userInfo", "subMenus": null, "checked": false },
                    { "id": 2288, "name": "企业信息", "url": "/mainLayout/baseInfo/companyInfo", "subMenus": null, "checked": false },
                ],
                "checked": false
            }],
        },
        appManager: { //应用管理
            menuConfig: [{
                "id": 17,
                "name": "应用管理",
                "url": "",
                "subMenus": [
                    { "id": 18, "name": "我的应用", "url": "/mainLayout/appManager/appList", "subMenus": null, "checked": false },
                    { "id": 188, "name": "创建应用", "url": "/mainLayout/appManager/addApp", "subMenus": null, "checked": false },
                    { "id": 1882, "name": "测试列表", "url": "/mainLayout/appManager/list/appList2", "subMenus": null, "checked": false },
                ],
                "checked": false
            }],
        },
        setManager: { //设置管理
            menuConfig: [{
                "id": 18,
                "name": "设置",
                "url": "",
                "subMenus": [
                    { "id": 21128, "name": "学校信息", "url": "/mainLayout/setManager/schoolInfo", "subMenus": null, "checked": false },
                    { "id": 21188, "name": "基础设置", "url": "/mainLayout/setManager/baseInfo", "subMenus": null, "checked": false },
                    { "id": 211882, "name": "教师管理", "url": "/mainLayout/setManager/list/teacherManager", "subMenus": null, "checked": false },
                    { "id": 211884, "name": "学生管理", "url": "/mainLayout/setManager/list/studentManager", "subMenus": null, "checked": false },
                ],
                "checked": false
            }],
        },
        questionManager: { //题库管理
            menuConfig: [{
                "id": 18,
                "name": "题库",
                "url": "",
                "subMenus": [
                    { "id": 321128, "name": "章节", "url": "/mainLayout/questionManager/chapter", "subMenus": null, "checked": false },
                    { "id": 321188, "name": "选题组卷", "url": "/mainLayout/questionManager/createTestPaper", "subMenus": null, "checked": false },
                ],
                "checked": false
            }],
        },
        testPaperManager: { //试卷管理
            menuConfig: [{
                "id": 18,
                "name": "试卷管理",
                "url": "",
                "subMenus": [
                    { "id": 321128, "name": "试卷列表", "url": "/mainLayout/questionManager/schoolInfo", "subMenus": null, "checked": false },
                    { "id": 321188, "name": "创建试卷", "url": "/mainLayout/questionManager/baseInfo", "subMenus": null, "checked": false },
                ],
                "checked": false
            }],
        },
        learningSituationManager: { //学情管理
            menuConfig: [{
                "id": 18,
                "name": "学情管理",
                "url": "",
                "subMenus": [
                    { "id": 321128, "name": "学情列表", "url": "/mainLayout/questionManager/schoolInfo", "subMenus": null, "checked": false },
                    { "id": 321188, "name": "学情班级", "url": "/mainLayout/questionManager/baseInfo", "subMenus": null, "checked": false },
                ],
                "checked": false
            }],
        },
        coursewareManager: { //课件管理
            menuConfig: [{
                "id": 18,
                "name": "课件管理",
                "url": "",
                "subMenus": [
                    { "id": 321128, "name": "课件列表", "url": "/mainLayout/questionManager/schoolInfo", "subMenus": null, "checked": false },
                    { "id": 321188, "name": "课件查看", "url": "/mainLayout/questionManager/baseInfo", "subMenus": null, "checked": false },
                    { "id": 3211883, "name": "课件上传", "url": "/mainLayout/questionManager/upload", "subMenus": null, "checked": false },
                ],
                "checked": false
            }],
        },
    }
    return moduleConfigData;
}

export default { getConfig };