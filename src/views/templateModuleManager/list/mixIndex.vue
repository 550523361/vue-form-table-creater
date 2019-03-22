<script>
  import backendService from '../../../components/remoteService/backendService'
  import listTable from '../../../components/tableList/listTable'
  import baseTableConfig from '../../../components/tableList/TabListConfig'
  import {formatDate} from '../../../components/format/format'

  let tableListConfig=JSON.parse(JSON.stringify(baseTableConfig));

  let baseBtnStyle=tableListConfig.baseBtnStyle;
  import moduleConfigTemplateData from './../config/moduleConfig'

  let moduleConfigData = moduleConfigTemplateData;

  export default {
      name: 'list',
      components:{
          'list-table':listTable,
      },
      data(){
          return{
              formatUtil:formatDate,
              tableListConfig:{colums:[],splitTables:1,operator:{width:200,colums:[]},url:'',selection:false,pager:{pageSize:10}},
              queryConfig:{queryElements:[]},
              moduleConfig:{editable:false},
              chooseIds:[],

          }
      },
      methods:{
          exportDataHandler(param,btnInfo){
              console.log("param,btnInfo>>>>>>",param,btnInfo,this.tableListConfig)
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
                          queryParam+="&"+key+"="+param[key]||(this.tableListConfig.query||{})[key];
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
                  let tarText=/(#+([a-zA-Z]+)#+)/g.exec(item)[0];
                  let propertyText=/(#+([a-zA-Z]+)#+)/g.exec(item)[2];
                  item=item.replace(tarText,rowData[propertyText]||'');
                  return item;
              })


              let deleteParam=JSON.parse(JSON.stringify(btnInfo.deleteParam));
              let deletePostParam={};
              Object.keys(deleteParam).forEach(key=>{
                  if(typeof deleteParam[key]  === "object"){
                      //console.log(key +"==>"+deleteParam[key]+"==>"+deleteParam[key][rowData[key]]+"-->"+rowData[key]);
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
          clickHandler(param,btnInfo){
              console.log("clickHandler",param,btnInfo)

              if(btnInfo.exportBtn){
                  this.exportDataHandler(param,btnInfo);
                  return;
              }
              if(btnInfo.url){
                  let url=btnInfo.url;
                  url=this.replaceTemplate(param,url);
                  this.$router.push(url);
                  return;
              }
              this.moduleConfig.clickHandler&&this.moduleConfig.clickHandler(this,param,btnInfo)
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
              console.log("clickConfig***++++++*****",param);
              this.moduleConfig.clickConfig&&this.moduleConfig.clickConfig(param)
          },
          handleClose(param){
              this.moduleConfig.handleClose&&this.moduleConfig.handleClose(param)
          },
          dataBus(configInfo,elementInfo,elementTypeInfo){
              this.moduleConfig.dataBus&&this.moduleConfig.dataBus(this,configInfo,elementInfo,elementTypeInfo)
          },
          enterHandler(...params){
              console.log("enterHandler",params)
              this.moduleConfig.enterHandler?this.moduleConfig.enterHandler(params):this.defaultHandler(params)
          },
          columnClickHandler(...params){
              //console.log("columnClickHandler",params)
              this.moduleConfig.columnClickHandler?this.moduleConfig.columnClickHandler(...params,this):this.defaultHandler(...params)
          },
          hoverHandler(...params){
              console.log("hoverHandler",params)
              this.moduleConfig.hoverHandler?this.moduleConfig.hoverHandler(params):this.defaultHandler(params)
          },
          defaultHandler(...params){
              console.log("defaultHandler",params)
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
                  if(elementInfo.columnHandlerText){
                      elementInfo.columnHandler=(data)=>{
                          console.log("*********>",Array.isArray(data),data)
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
                              compiledText=text.map((item,index)=>{
                                  let tarText=/(#+([a-zA-Z]+)#+)/g.exec(item)[0];
                                  let propertyText=/(#+([a-zA-Z]+)#+)/g.exec(item)[2];
                                  item=item.replace(tarText,data[propertyText]||'');
                                  return item;
                              })
                          }
                          return compiledText.join("");
                      }
                  }
              })
          },
          initPage(moduleName,options){
              let that = this;
              // console.log("moduleConfigData",moduleConfigData,this.$route.params.moduleName)
              let moduleConfig=moduleConfigData.getConfig()[moduleName||this.$route.params.moduleName];
              that.moduleConfig=moduleConfig;
              if(!moduleConfig){
                  alert("配置模块"+this.$route.params.moduleName+"未找到,请检查配置");
                  return;
              }
              let queryElements=moduleConfig.queryElements;
              tableListConfig.url=moduleConfig.url;
              tableListConfig.pager={
                  pageNum: 1,
                  pageSize:10*(moduleConfig.splitTables||1),
              }
              tableListConfig.query={

              };
              if(options){
                 Object.assign(tableListConfig.query,options.query)
                  if(options.query.pageSize){
                      tableListConfig.pager.pageSize=options.query.pageSize
                  }
              }

              tableListConfig.colums=moduleConfig.columns;
              that.queryConfig.queryElements=queryElements;
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
              tableListConfig.selection=moduleConfig.selection||false;
              tableListConfig.stripe=moduleConfig.stripe||false;
              tableListConfig.noBorder=moduleConfig.noBorder||false;
              tableListConfig.splitTables=moduleConfig.splitTables||that.tableListConfig.splitTables;
              tableListConfig.pagerDataHelper=moduleConfig.pagerDataHelper||that.pagerDataHelper;
              tableListConfig.errorDataHelper=moduleConfig.errorDataHelper||that.errorDataHelper;
              tableListConfig.chooseAllClick=that.chooseAllClick;

              that.tableListConfig=tableListConfig;
              //that.tableListConfig=Object.assign(that.tableListConfig,tableListConfig);

              this.initColumn();

              this.$watch("moduleConfig.columns",function (newData,oldData) {
                  this.tableListConfig.colums=newData;
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
              this.$refs.tableList&&this.$refs.tableList.fresh();
          },
          chooseAllClick(...params){
              //console.log("chooseAllClick",...params);
              this.chooseIds=params[0];
          },
          getObjectValue(target ,prop){//获取属性值 属性不争取返回空 可以获取类似 student.school.address.no 深层次获取
              let props=prop.split(".");
              let i=0;
              let tempValue=target;
              while (props.length-i>=1){
                  if(!tempValue){
                      console.log("****为空***=---->",props[i])
                      break;
                  }
                  tempValue=tempValue[props[i]];
                  i++;
              }
              return tempValue;
          },
          replaceTemplate(target,templateText) {
              let result=null;
              let patt = new RegExp("#{2}(\s+)?[\.a-zA-Z\d]+(\s+)?#{2}","g");
              let replaceText=[];
              while ((result=patt.exec(templateText))!=null){
                  let props=result[0];
                  let getResult=this.getObjectValue(target,props.replace(/#+/g,""));
                  replaceText.push({
                      template:result[0],
                      value:getResult
                  })
              }

              replaceText.forEach(replaceItem=>{
                  templateText=templateText.replace(replaceItem.template,replaceItem.value)
              })

              return templateText;
          }
      },
      created(){
         // this.initPage();
      },
      watch:{
          '$route'(to,from){
            //  this.initPage();
          }
      },
      computed:{
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

<style scoped>

</style>
