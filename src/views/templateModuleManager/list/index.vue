<template>
  <div class="main">
    <div class="content">
      <div class="list">
        <div style="padding:0px 10px;background: #fff;">
          <list-table :config="{tableListConfig,queryConfig,clickHandler,form:'merchant',readonly:readonly}" ref="tableList"></list-table>
          <add-element v-show="moduleConfig.editable" :config="{dataBus:dataBus}"></add-element>
          <div style="margin-top: 20px;" v-show="moduleConfig.editable">
            <textarea style="width: 100%;" rows="35" readonly v-model="JSON.stringify(config,null,4)"/>
            <!--<button @click="downLoad()">导出内容</button>-->
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import backendService from '../../../components/remoteService/backendService'
  import listTable from '../../../components/tableList/listTable'
  import baseTableConfig from '../../../components/tableList/TabListConfig'
  import addQueryElement from '../../../components/formCreater/addQueryElement'
  import {formatDate} from '../../../components/format/format'
  import validate from './../../../components/validate/validate'
  import formCreater from './../../../components/formCreater/baseFormCreater'

  let tableListConfig=JSON.parse(JSON.stringify(baseTableConfig));

  let baseBtnStyle=tableListConfig.baseBtnStyle;
  import moduleConfigTemplateData from './../config/moduleConfig'

  let moduleConfigData = moduleConfigTemplateData;

  export default {
      name: 'list',
      components:{
          'list-table':listTable,
          'add-element':addQueryElement,
          'form-creater':formCreater,
      },
      data(){
          return{
              formatUtil:formatDate,
              tableListConfig:{colums:[],splitTables:1,operator:{width:200,colums:[]},url:'',selection:false},
              queryConfig:{queryElements:[]},
              moduleConfig:{editable:false,menuConfig:[]},
              chooseIds:[],
              readonly:{},
              validate:validate,
          }
      },
      methods:{
          prompt(context){
              context.$prompt('请输入邮箱', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                  inputErrorMessage: '邮箱格式不正确'
              }).then(({ value }) => {
                  context.$message({
                      type: 'success',
                      message: '你的邮箱是: ' + value
                  });
              }).catch(() => {
                  context.$message({
                      type: 'info',
                      message: '取消输入'
                  });
              });
          },
          exportDataHandler(param,btnInfo){
              //console.log("param,btnInfo",param,btnInfo)
              let url=btnInfo.url;
              let copyIds=JSON.parse(JSON.stringify(this.chooseIds));
              let ids=copyIds.map(item=>item.id).join(",");
              let queryParam="?1=1";
              if(ids){
                  queryParam+="&ids="+ids;
              }
              //console.log("param",param,this.chooseIds)
              Object.keys(param).forEach(key=>{
                  if(param[key]){
                      if(key == "timeRange"){
                          if(param["timeRange"]){
                              if(param["timeRange"][0]){
                                  queryParam+="&startTime="+this.formatUtil(param["timeRange"][0],"yyyy-MM-dd hh:mm:ss");
                              }
                              if(param["timeRange"][1]){
                                  queryParam+="&endTime="+this.formatUtil(param["timeRange"][1],"yyyy-MM-dd hh:mm:ss");
                              }
                          }
                      }else{
                          queryParam+="&"+key+"="+param[key];
                      }
                  }
              })

              if(btnInfo.exportsParam){
                  Object.keys(btnInfo.exportsParam).forEach(key=>{
                      if(!param[key]){
                          queryParam+="&"+key+"="+(param[key]||(this.tableListConfig.query||{})[key]);
                      }
                  })
              }

              backendService.download({
                  url:url+queryParam
              })
          },
          deleteRowHandler(rowData,btnInfo){
              console.log(rowData,btnInfo)
              let url=btnInfo.url;
              let that = this;
              let textTemplate=[JSON.parse(JSON.stringify(btnInfo.deleteTipText))];
              if(typeof btnInfo.deleteTipText === "string"){

              }else if(typeof btnInfo.deleteTipText === "object"){
                  textTemplate=[JSON.parse(JSON.stringify(btnInfo.deleteTipText[rowData[btnInfo.prop]]))]
              }

              textTemplate=textTemplate.map((item,index)=>{
                  if(/(#+([a-zA-Z]+)#+)/g.test(item)){
                      let tarText=/(#+([a-zA-Z]+)#+)/g.exec(item)[0];
                      let propertyText=/(#+([a-zA-Z]+)#+)/g.exec(item)[2];
                      item=item.replace(tarText,rowData[propertyText]||'');
                  }
                  return item;
              })


              let deleteParam=JSON.parse(JSON.stringify(btnInfo.deleteParam));
              let deletePostParam={};
              Object.keys(deleteParam).forEach(key=>{
                  if(typeof deleteParam[key]  === "object"){
                      console.log(key +"==>"+deleteParam[key]+"==>"+deleteParam[key][rowData[key]]+"-->"+rowData[key]);
                      deletePostParam[key]=deleteParam[key][rowData[key]];
                  }else{
                      deletePostParam[key]=rowData[key];
                      //console.log(key +"==>"+deleteParam[key]+"-->"+rowData[key])
                  }
              })
              return this.$confirm(textTemplate.join("")||'确定要删除该记录?',"确认信息", {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(success=>{
                  return backendService.getData({
                      url:url,
                      method:"post",
                      data:deletePostParam
                  }).then(function (data) {
                      if(data.code == '1'){
                          that.$message({
                              message: '操作成功',
                              type: 'success'
                          });
                          return Promise.resolve({code:1,msg:'freshPage'})
                      }else{
                          that.$message({
                              message: data.msg,
                              type: 'error'
                          });
                      }
                  })
              },error=>{
                  return Promise.reject({code:0,msg:"不用刷新列表用户取消操作"})
              })
          },
          clickHandler(param,btnInfo,...params){
              //console.log("clickHandler",param,btnInfo)
              if(btnInfo.exportBtn){
                  this.exportDataHandler(param,btnInfo,...params);
                  return;
              }
              if(btnInfo.url){
                  let url=btnInfo.url;
                  console.log(param,url,...params,this)
                  url=this.replaceTemplate(param,url,this.config.query);
                  this.$router.push(url);
                  return;
              }
              this.moduleConfig.clickHandler&&this.moduleConfig.clickHandler(this,param,btnInfo,...params)
          },
          pagerDataHelper(param){
              //console.log("pagerDataHelper********",param);
              param.content.map(item=>{return item;})
              return this.moduleConfig.pagerDataHelper&&this.moduleConfig.pagerDataHelper(param)||param;
          },
          errorDataHelper(param){
              //console.log("pagerDataHelper********",param);
              param.content.map(item=>{return item;})
              return this.moduleConfig.errorDataHelper&&this.moduleConfig.errorDataHelper(param)||param;
          },
          clickConfig(param){
              //console.log("clickConfig***++++++*****",param);
              this.moduleConfig.clickConfig&&this.moduleConfig.clickConfig(param)
          },
          handleClose(param){
              this.moduleConfig.handleClose&&this.moduleConfig.handleClose(param)
          },
          dataBus(configInfo,elementInfo,elementTypeInfo){
              this.moduleConfig.dataBus&&this.moduleConfig.dataBus(this,configInfo,elementInfo,elementTypeInfo)
          },
          enterHandler(...params){
              //console.log("enterHandler",params)
              this.moduleConfig.enterHandler?this.moduleConfig.enterHandler(params):this.defaultHandler(params)
          },
          columnClickHandler(...params){
              //console.log("columnClickHandler",params)
              this.moduleConfig.columnClickHandler?this.moduleConfig.columnClickHandler(...params,this):this.defaultHandler(...params)
          },
          hoverHandler(...params){
              //console.log("hoverHandler",params)
              this.moduleConfig.hoverHandler?this.moduleConfig.hoverHandler(params):this.defaultHandler(params)
          },
          defaultHandler(...params){
              //console.log("defaultHandler",params)
              this.moduleConfig.defaultHandler?this.moduleConfig.defaultHandler(params):''
          },
          initColumn(newData,oldData){
              let that=this;
              let columnWidthAuto=0;
              this.tableListConfig.colums.map((column,index)=>{
                  if(column.width=="auto"){
                      ++columnWidthAuto;
                  }

                  if(index==(that.tableListConfig.colums.length-1)&&columnWidthAuto==0){
                      column.width="auto";
                  }
                  if(column.addEventListener){
                      column.addEventListener.map(eventName=>{
                          let eventHandlerName=eventName;
                          //console.log(column.prop,"eventName",eventName)
                          if(eventName=="click"){
                              eventHandlerName="columnClick";
                          }
                          column[eventName]=that[eventHandlerName+"Handler"]||that.defaultHandler;
                      })
                  }
                  let elementInfo=column;
                  if(that.$route.params.moduleName!="createTableList"&&elementInfo.columnHandlerText){
                      elementInfo.columnHandler=(data)=>{
                          //console.log("*********>",Array.isArray(data),data)
                          let compiledText="";
                          if(Array.isArray(data)){
                              compiledText=data.map(objectItem=>{
                                  let textTemplate=JSON.parse(JSON.stringify(elementInfo.columnHandlerText));
                                  textTemplate=textTemplate.map((item,index)=>{
                                      let tarText=/(#+([a-zA-Z]+)#+)/g.exec(item)[0];
                                      let propertyText=/(#+([a-zA-Z]+)#+)/g.exec(item)[2];
                                      item=item.replace(tarText,objectItem[propertyText]||'');
                                      return item;
                                  })
                                  return textTemplate.join("");
                              })
                          }else{
                              let text=elementInfo.columnHandlerText;
                              if(!Array.isArray(text)){
                                  text=[text];
                              }
                              compiledText=text.map((item,index)=>{
                                  if(/(#+([a-zA-Z]+)#+)/g.test(item)){
                                      let tarText=/(#+([a-zA-Z]+)#+)/g.exec(item)[0];
                                      let propertyText=/(#+([a-zA-Z]+)#+)/g.exec(item)[2];
                                      item=item.replace(tarText,data[propertyText]||'');
                                  }
                                  return item;
                              })
                          }
                          return compiledText.join("");
                      }
                  }
              })
          },
          initPage(){
              let that = this;

              let moduleConfig=moduleConfigData.getConfig()[this.$route.params.moduleName];
              that.moduleConfig=moduleConfig;

              console.log("moduleConfig>>>>>>",moduleConfig,this.$route.params)

              if(!moduleConfig){
                  alert("配置模块"+this.$route.params.moduleName+"未找到,请检查配置");
                  return;
              }
              let queryElements=moduleConfig.queryElements;
              tableListConfig.url=moduleConfig.url;
              //tableListConfig.query=Object.assign(,moduleConfig.query);//moduleConfig.query||
              let queryParam=moduleConfig.query||{
                  pageNum: 1,
                  pageSize: 15,
              };
              Object.keys(moduleConfig.query||{}).forEach(key=>{
                  queryParam[key]=this.$route.params[moduleConfig.query[key]]||''
              })

              if(moduleConfig.readonly){
                  that.readonly=moduleConfig.query;
              }

              tableListConfig.query=queryParam;
              //console.log("----====>>>>",tableListConfig.query,queryParam)
              tableListConfig.colums=moduleConfig.columns;

              queryElements.map(item=>{
                  if(queryParam[item.prop]!=undefined&&queryParam[item.prop]!=""){
                      item.defaultValue=queryParam[item.prop];
                      item.value=queryParam[item.prop];
                  }
              })

              that.queryConfig.queryElements=queryElements;
              that.queryConfig.containerStyle=moduleConfig.containerStyle;
              //console.log("*****===>>"+this.$route.params.moduleName+"-->",queryElements.forEach(item=>console.log(item.label)))
              //that.queryConfig.queryElements=Object.assign(that.queryConfig.queryElements,queryElements);
              moduleConfig.operator.column.map(item=>{
                  //console.log(item)
                  if(!item.click){
                      if(item.confirmDel){
                          item.click=that.deleteRowHandler;
                      }else{
                          item.click=that.clickHandler;
                      }

                  }
                  if(item.viewHandler==true){
                      item.viewHandler=(btnInfo,rowData,queryParam,otherData)=>{
                          return btnInfo.map[rowData[btnInfo.prop]]
                      }
                  }
                  item.style=Object.assign(JSON.parse(JSON.stringify(baseBtnStyle)),item.style);
                  return item;
              });

              tableListConfig.operator=moduleConfig.operator;
              tableListConfig.selection=moduleConfig.selection;
              tableListConfig.splitTables=moduleConfig.splitTables||that.tableListConfig.splitTables;
              tableListConfig.pagerDataHelper=moduleConfig.pagerDataHelper||that.pagerDataHelper;
              tableListConfig.errorDataHelper=moduleConfig.errorDataHelper||that.errorDataHelper;
              tableListConfig.chooseAllClick=that.chooseAllClick;
              tableListConfig.clickConfig=that.clickConfig;

              that.tableListConfig=tableListConfig;
              //that.tableListConfig=Object.assign(that.tableListConfig,tableListConfig);

              this.initColumn();

              /*this.$watch("moduleConfig.columns",function (newData,oldData) {
                  this.tableListConfig.colums=newData;
              },{
                  deep:true
              })

              that.moduleConfig.menuConfig=JSON.parse(JSON.stringify(moduleConfig.menuConfig));*/

              this.$watch("moduleConfig.menuConfig",function (newData,oldData) {
                  this.moduleConfig.menuConfig=newData;
                  console.log("*******>menuConfig>>>>>>>>",newData)
              },{
                  deep:true
              })

              this.$watch("tableListConfig.colums",function (newData,oldData) {
                  this.initColumn(newData,oldData);
              },{
                  deep:true
              })
              this.$watch("moduleConfig.queryElements",function (newData,oldData) {
                  this.queryConfig.queryElements=newData;
                  //console.log("moduleConfig.queryElements<<<<<<<<<--8888--",this.queryConfig.queryElements.forEach(item=>console.log(item.label)))
              },{
                  deep:true
              })

              this.$watch("moduleConfig.operator.column",function (newData,oldData) {
                  moduleConfig.operator.column.map(item=>{
                      //console.log(item)
                      if(!item.click){
                          if(item.confirmDel){
                              item.click=that.deleteRowHandler;
                          }else{
                              item.click=that.clickHandler;
                          }

                      }
                      if(item.viewHandler==true){
                          item.viewHandler=(btnInfo,rowData,queryParam,otherData)=>{
                              return btnInfo.map[rowData[btnInfo.prop]]
                          }
                      }
                      item.style=Object.assign(JSON.parse(JSON.stringify(baseBtnStyle)),item.style);
                      return item;
                  });
              },{
                  deep:false
              })

              this.$watch("moduleConfig.url",function (newData,oldData) {
                  that.tableListConfig.url=newData;
              })
              this.$refs.tableList&&this.$refs.tableList.fresh('commonModule');
          },
          chooseAllClick(...params){
              //console.log("chooseAllClick",...params);
              this.chooseIds=params[0];
          },
          getObjectValue(target ,prop,otherParam){//获取属性值 属性不争取返回空 可以获取类似 student.school.address.no 深层次获取
              let props=prop.split(".");
              let i=0;
              let tempValue=target;
              while (props.length-i>=1){
                  if(!tempValue){
                      console.log("****为空***=---->",props[i])
                      break;
                  }
                  tempValue=tempValue[props[i]];
                  tempValue=tempValue==undefined?otherParam[props[i]]:tempValue;
                  i++;
              }
              return tempValue;
          },
          replaceTemplate(target,templateText,otherParam) {
              let result=null;
              let patt = new RegExp("#{2}(\s+)?[\.a-zA-Z\d]+(\s+)?#{2}","g");

              console.log("target,templateText,otherParam",target,templateText,otherParam)
              let replaceText=[];
              while ((result=patt.exec(templateText))!=null){
                  let props=result[0];
                  let getResult=this.getObjectValue(target,props.replace(/#+/g,""),otherParam);
                  if(getResult===''){
                      getResult=null;
                  }
                  replaceText.push({
                      template:result[0],
                      value:getResult
                  })
              }

              replaceText.forEach(replaceItem=>{
                  templateText=templateText.replace(replaceItem.template,replaceItem.value)
              })

              return templateText;
          },
          downLoad(){
              let file=new File(['let config='+JSON.stringify(this.config,null,4)],{
                  type: 'text',
                  encoding: 'UTF-8'
              });

              var a = document.createElement('a');
              a.href = URL.createObjectURL(file);
              a.download ='列表配置.js';
              a.click();

          },
          getService(){
              return backendService;
          }
      },
      created(){
          this.initPage();
      },
      watch:{
          '$route'(to,from){
              //console.log("this.$route.params",this.$route.params)
              this.initPage();
          }
      },
      computed:{
          config:function () {
              let copyData=JSON.parse(JSON.stringify(this.tableListConfig));
              copyData.columns=copyData.colums;
              delete copyData.colums;
              return Object.assign(copyData,this.queryConfig)
          },
          choosedIdMap:function () {
              let dataMap={};
              this.chooseIds.forEach(item=>{
                  dataMap[item.id]=item.id;
              })
              return dataMap;
          }
      }
  }
</script>

<style>
  .formMessage{
    width: 600px;
  }
</style>
