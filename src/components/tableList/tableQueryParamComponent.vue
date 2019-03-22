<template>
    <div :style="$attrs.queryConfig.containerStyle||{}">
        <div v-for="(groupName,groupElementIndex) in Object.keys(groupedElements)" :style="groupedStyle(groupedElements[groupName])" class="searchContainer" :key="groupElementIndex+'_'+groupName" >
            <div class="elementsContainer" :style="$attrs.queryConfig.elementsContainer||{}">
              <span class="queryElement" :style="queryItem.style||{}" :class="{hidden:queryItem.type=='hidden',switchElementContainer:queryItem.switchElements,tabContainer:queryItem.type=='tab',datetimerange:queryItem.type=='datetimerange',tipHtml:queryItem.type=='tipHtml'}" v-for="(queryItem,paramIndex) in  groupedElements[groupName]" :key="paramIndex+'_'+queryItem.prop+'_query'+queryItem.label">
                    <template v-if="queryItem.type=='input'&&(queryItem.watch&&queryItem.watch.props?queryItem.watch.props.map(prop=>{
                        return queryItem.watch.watchValue[prop]&&queryItem.watch.watchValue[prop][queryParam[prop]]!=true
                    }).filter(item=>item==true).length==0:true)"
                    >
                        <span class="form-inline"   style="margin-top:10px;padding-right: 10px;">
                            <span class="queryItemLabel" v-if="queryItem.label">{{queryItem.label}}</span>
                            <el-input type="text" style="margin-bottom: 15px;"  :placeholder="queryItem.placeholder"  v-model="queryParam[queryItem.prop]"  @input="changeQueryParam(queryItem)" />
                            <span v-if="queryItem.rightBtn" @click="queryBtnClick(queryParam,queryItem.rightBtn)" class="rightBtnStyle" :style="queryItem.rightBtn.style">
                                {{queryItem.rightBtn.label||'搜索'}}
                            </span>
                        </span>
                    </template>
                    <template v-if="queryItem.type=='date'&&(queryItem.watch&&queryItem.watch.props?queryItem.watch.props.map(prop=>{
                        return queryItem.watch.watchValue[prop]&&queryItem.watch.watchValue[prop][queryParam[prop]]!=true
                    }).filter(item=>item==true).length==0:true)"
                    >
                        <span class="form-inline "   style="margin-top:10px;padding-right: 10px;">
                            <span class="queryItemLabel" v-if="queryItem.label">{{queryItem.label}}</span>
                            <input type="text"    :placeholder="queryItem.placeholder"  :id="queryItem.id"
                                   class="" v-model="queryParam[queryItem.prop]">
                        </span>
                    </template>
                    <template v-if="queryItem.type=='datetimerange'&&(queryItem.watch&&queryItem.watch.props?queryItem.watch.props.map(prop=>{
                        return queryItem.watch.watchValue[prop]&&queryItem.watch.watchValue[prop][queryParam[prop]]!=true
                    }).filter(item=>item==true).length==0:true)"
                    >
                        <span class="form-inline " v-if="queryItem.type=='datetimerange'"  style="margin-top:10px;padding-right: 10px;">
                                    <span class="queryItemLabel" v-if="queryItem.label">{{queryItem.label}}</span>
                                    <el-date-picker
                                            v-model="queryParam[queryItem.prop]"
                                            type="datetimerange"
                                            :picker-options="queryItem.options"
                                            :range-separator="queryItem.centerLabel||'至'"
                                            :placeholder="queryItem.placeholder||'请选择时间范围'"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            @change="data=>{
                                                queryParam[queryItem.prop]=data.split((queryItem.centerLabel||'至'))
                                            }"
                                            align="right"></el-date-picker>
                        </span>
                    </template>
                    <template v-if="queryItem.type=='composite'&&(queryItem.watch&&queryItem.watch.props?queryItem.watch.props.map(prop=>{
                        return queryItem.watch.watchValue[prop]&&queryItem.watch.watchValue[prop][queryParam[prop]]!=true
                    }).filter(item=>item==true).length==0:true)"
                    >
                        <span class="form-inline "   style="margin-top:10px;padding-right: 10px;">
                            <span class="queryItemLabel" v-if="queryItem.label">{{queryItem.label}}</span>
                            <span  v-for="component in queryItem.components" :key="component.prop+'_query'+queryItem.label+'_'+paramIndex">
                                <input type="text" class=" width170" v-model="queryParam[component.prop]" :placeholder="component.placeholder"
                                       :id="component.id" :maxelementid="component.maxelementid" :minelementid="component.minelementid"
                                >
                                        <span v-if="$index==0">{{queryItem.link}}</span>
                             </span>
                        </span>
                    </template>
                    <template v-if="queryItem.type=='select'&&(queryItem.watch&&queryItem.watch.props?JSON.parse(JSON.stringify(queryItem.watch.props)).map(prop=>{
                        if(Object.keys(queryItem.watch.watchValue[prop]).length==0){
                            return false;
                        }
                        return queryItem.watch.watchValue[prop]&&queryItem.watch.watchValue[prop][queryParam[prop]]!=true
                    }).filter(item=>item==true).length==0:true)"
                    >
                        <span class="form-inline " :class="{switchContainer:queryItem.switchElements}" style="margin-top:10px;padding-right: 10px;">
                                <span class="queryItemLabel" v-if="queryItem.label">{{queryItem.label}}</span>
                                <span v-if="!queryItem.dataUrl">
                                  <el-select    class=" width170" v-model="queryParam[queryItem.prop]" filterable  @change="changeQueryParam(queryItem)">
                                      <el-option value="">{{queryItem.placeholder||'请选择'}}</el-option>
                                      <el-option  v-for="component in queryItem.options" :value="component.value||component.code" :key="component.code+component.value+component.id+'_query'+component.label" :label="component.label||component.name">{{component.label||component.name}}</el-option>
                                  </el-select>
                                </span>
                                <span v-if="queryItem.dataUrl">
                                  <el-select  class=" width170" v-model="queryParam[queryItem.prop]" filterable  @change="changeQueryParam(queryItem)">
                                      <el-option value="">{{queryItem.placeholder||'请选择'}}</el-option>
                                      <el-option v-for="component in dataQuery.query[queryItem.propList]" :key="queryItem.prop+'_select_'+component.id+'_value_'+component.value+'_code_'+component.code" :value="component.code||component.id||component.value" :code="component.id||component.code||component.value" :label="component.label||component.name||component.desc">{{component.name||component.label||component.desc}}</el-option>
                                  </el-select>
                                </span>
                            </span>
                    </template>
                    <template  v-if="queryItem.type=='tipHtml'&&(queryItem.watch&&queryItem.watch.props?queryItem.watch.props.map(prop=>{
                        return queryItem.watch.watchValue[prop]&&queryItem.watch.watchValue[prop][queryParam[prop]]!=true
                    }).filter(item=>item==true).length==0:true)"
                    >
                        <span class="form-inline "  :style="queryItem.style||{'margin-top':'10px','padding-right': '10px'}">
                                <div v-for="(tip,indexTip) in queryItem.items" @click="(!tip.items)&&queryBtnClick(queryParam,queryItem,indexTip)" :key="indexTip+'_'+queryItem.prop">
                                    <template v-if="tip.items" >
                                        <span v-for="(innerItem,innerItemIndex) in tip.items" @click="queryBtnClick(queryParam,queryItem,indexTip,innerItemIndex)" :key="'innerItemIndex'+'_'+innerItemIndex" v-html="innerItem"></span>
                                    </template>
                                    <span  v-else v-html="tip"></span>
                                </div>
                        </span>
                    </template>
                    <template  v-if="queryItem.type=='tab'&&(queryItem.watch&&queryItem.watch.props?queryItem.watch.props.map(prop=>{
                        return queryItem.watch.watchValue[prop]&&queryItem.watch.watchValue[prop][queryParam[prop]]!=true
                    }).filter(item=>item==true).length==0:true)"
                    >
                            <ul class="myTabsContainer">
                                <li v-for="(component,labelIndex) in !(queryItem.dataUrl&&queryItem.initQuery)?queryItem.components:dataQuery.query[queryItem.propList]" :key="component.code+component.prop+component.id+'__query'+component.label">
                                    <input type="radio" :name="component.prop" :id="component.prop+'_'+labelIndex" :value="component.value||component.code"
                                           @change="queryBtnClick(queryParam,queryItem,component)"
                                           v-model="queryParam[queryItem.prop]">
                                    <label :for="component.prop+'_'+labelIndex" :class="['btn',{checkedStyle:queryParam[queryItem.prop]==component.value}]">{{component.label||component.desc||component.name}}</label>
                                </li>
                            </ul>
                    </template>
              </span>
              <span v-for="(queryItem,paramIndex) in groupedElements[groupName]" v-if="queryItem.type=='button'||queryItem.type=='search'" :style="queryItem.style||{paddingTop:'10px'}" v-bind:hidden="queryItem.hidden" :key="queryItem.prop+'_query'+queryItem.label+'_'+paramIndex"   @click="queryBtnClick(queryParam,queryItem)">
                  <template v-if="queryItem.viewHandler">
                      <template v-if="!queryItem.html">
                          <span v-if="queryItem.type!='search'" :class="['btn','btn-default','el-button el-button--default',queryItem.type=='search'?'el-button el-button--info':'',queryItem.btnClass]">
                                {{queryItem.viewHandler(queryItem,$route.params,queryParam,context)}}
                          </span>
                      </template>
                      <template v-else="!queryItem.html">
                          <span v-if="queryItem.type!='search'" v-html="queryItem.viewHandler(queryItem,$route.params,queryParam,context)"></span>
                      </template>
                  </template>
                  <template v-else="queryItem.viewHandler">
                      <span v-if="queryItem.type!='search'" :style="queryItem.style||{}" :class="['btn','btn-default','el-button el-button--default',queryItem.type=='search'?'el-button el-button--info':'',queryItem.btnClass]">
                            {{queryItem.label}}
                      </span>
                      <el-button v-else="queryItem.type=='search'" type="primary" icon="search">搜索</el-button>
                  </template>
              </span>
            </div>
        </div>
    </div>
</template>

<script>
    import backendService from '../remoteService/backendService'
    import _ from 'lodash'

    export default {
        name: "mytablequery",
        props:{

        },
        data:function(){
            return {
                queryElements:[],
                dataQuery:{
                    query:{}
                },
                readonly:{},
                queryParam:{},
                watchMap:{},
                /*tabItem:{prop:'null'},*/
                context:null,
            }
        },
        methods:{
            queryListData(params){
                let requestParam=JSON.parse(JSON.stringify(params.queryParam))||{};
                delete requestParam["timeRange"];
                return backendService.getData({
                    url:params.url,
                    method:params.method||"post",
                    data:requestParam
                }).then(function (result) {
                    return Promise.resolve(result)
                })
            },
            changeQueryParam:function (data,operate) {
                let that=this;
                this.$nextTick(function () {
                    that.changeHelp(data,operate);
                })
            },
            changeHelp(prop){
                let that=this;
                let currentSwitchValue=this.queryParam[prop.prop];
                let watchElements=this.watchMap[prop.prop]||{};
                if(Object.keys(watchElements).length==0&&prop.type!="tab") return;
                that.initElementsPromise(watchElements,currentSwitchValue,prop).then(success=>{
                    console.log("changeHelp success**** ---",success)
                    if(prop.type=="tab"){
                        that.$parent.fresh();
                    }
                },error=>{
                    console.log("changeHelp error **** ---",error)
                })
            },
            restoreQueryParam(){
                let that=this;
                that.dataQuery.query={};
                this.queryParam={};
                this.initQueryElementPromise().then(success=>{
                    console.log("restoreQueryParam  ---> success--->",success)
                },error=>{
                    console.log("restoreQueryParam  ---> error--->",error)
                });
            },

            getElement(prop){
                let elementItem={};
                this.queryElements.forEach(item=>{
                    if(item.prop==prop){
                        elementItem=item;
                    }
                })
                return elementItem;
            },

            initQueryElementPromise(){
                let that=this;
                let watchMap={};
                /*n 级 级联查询开始*/
                if(this.queryElements==null||this.queryElements.length==0) return Promise.resolve({code:1,msg:'no elements need init!'});
                var requestUrlParam= [].filter.call(this.queryElements, function (item) {

                    /*发现关联关系 当值被观察的时候有变动会处理级联变动的相关元素 最常见是为 tab切换做相关下来元素的初始化*/
                    if(item.watch&&item.watch.props&&item.watch.props.length){
                        item.watch.props.forEach(watchKey=>{
                            if(watchMap[watchKey]){
                                watchMap[watchKey][item.prop]=item;
                            }else{
                                let tempKeyMap={};
                                tempKeyMap[item.prop]=item;
                                watchMap[watchKey]=tempKeyMap;
                            }
                        })
                    }

                    /*兼容之前老版本 start*/
                    if(item.casecadeChild){
                        if(watchMap[item.prop]){
                            watchMap[item.prop][item.casecadeChild]=that.getElement(item.casecadeChild);
                        }else{
                            let tempKeyMap={};
                            tempKeyMap[item.casecadeChild]=that.getElement(item.casecadeChild);
                            watchMap[item.prop]=tempKeyMap;
                        }
                    }

                    if(item.casecadeGrandsonList){
                        item.casecadeGrandsonList.forEach(childElementProp=>{
                            if(watchMap[item.prop]){
                                if(!watchMap[item.prop][childElementProp]){
                                    watchMap[item.prop][childElementProp]=that.getElement(childElementProp);
                                }
                            }else{
                                let tempKeyMap={};
                                tempKeyMap[childElementProp]=that.getElement(childElementProp);
                                watchMap[item.prop]=tempKeyMap;
                            }
                        })
                    }

                    if(item.casecadeParen){
                        if(watchMap[item.casecadeParen]){
                            watchMap[item.casecadeParen][item.prop]=item;
                        }else{
                            let tempKeyMap={};
                            tempKeyMap[item.prop]=item;
                            watchMap[item.casecadeParen]=tempKeyMap;
                        }
                    }

                    /*兼容之前老版本 end*/


                    if(item.dataUrl&&item.initQuery){
                        that.$set(that.queryParam,item.prop,item.defaultValue||item.value)
                        return item;
                    }else{
                        if(!(item.type=='search'||item.type=='button'||item.prop=='deleteProps')){
                            that.$set(that.queryParam,item.prop,item.defaultValue||item.value)
                        }
                    }
                });
                that.$set(that,"watchMap",watchMap);

                let promiseList=[];

                for(let seq in requestUrlParam){
                    let initElementPromise=new Promise(function (resolve,reject) {
                        let item=requestUrlParam[seq];
                        if(item.casecadeParen==null||item.casecadeParen==""||item.includeInit==true){
                            let submitParam=JSON.parse(JSON.stringify(that.queryParam));
                            if(submitParam.timeRange){
                                submitParam["startTime"]=that.queryParam.timeRange[0]||''
                                submitParam["endTime"]=that.queryParam.timeRange[1]||''
                            }

                            if(that.queryParam.deleteProps){
                                console.log(that.queryParam.deleteProps)
                                that.queryParam.deleteProps.forEach(item=>{
                                    delete submitParam[item];
                                })
                                delete submitParam["deleteProps"];
                            }
                            if(item.watchParams){
                                Object.keys(item.watchParams).forEach(key=>{
                                    submitParam[key]=that.readonly[key]||that.queryParam[key]||'';
                                })
                            }

                            if(item.otherParams){
                                Object.keys(item.otherParams).forEach(key=>{
                                    submitParam[key]=item.otherParams[key]||'';
                                })
                            }

                            /*顶级元素优先查询完成一级数据初始化*/
                            that.queryListData({url:item.dataUrl,queryParam:submitParam,method:item.httpMethod||"get"}).then((listData)=>{
                                if(!listData) return resolve({url:item.dataUrl,data:listData});
                                that.$set(that.dataQuery.query,item.propList,item.dataHandler?item.dataHandler(listData):listData[item.propValueList])
                                that.$set(that.queryParam,item.prop,item.defaultValue)
                                resolve({url:item.dataUrl,data:listData})
                                //console.log("****",this.dataQuery.query)
                            },(error)=>{
                                console.log(error);
                                reject({url:item.dataUrl,error})
                            });
                        }
                    })
                    promiseList.push(initElementPromise);
                }
                return Promise.all(promiseList);
            },

            initElementsPromise(elements,currentSwitchValue,parentElement){/*被关注的元素值发生变动执行的初始化操作*/
                let that=this;
                let promiseList=[];
                for(let seq in elements){
                    let initElementPromise=new Promise(function (resolve,reject) {
                        let item=elements[seq];
                        if(item){
                            let defaultPrevent={};
                            defaultPrevent[parentElement.prop]="";
                            item.preventRequestValue=item.preventRequestValue?item.preventRequestValue:defaultPrevent;
                            if(item.preventRequestValue){
                                let keys=Object.keys(item.preventRequestValue);
                                if(keys.length){

                                   let preventKeys=keys.filter(key=>{
                                        return that.queryParam[key]==item.preventRequestValue[key]
                                    })

                                    if(preventKeys.length){
                                        let listData=[];
                                        that.$set(that.dataQuery.query,item.propList,listData)
                                        that.$set(that.queryParam,item.prop,item.defaultValue)
                                        resolve({url:item.dataUrl,data:listData});
                                        return ;
                                    }
                                }
                            }

                            let submitParam=JSON.parse(JSON.stringify(that.queryParam));
                            if(submitParam.timeRange){
                                submitParam["startTime"]=that.queryParam.timeRange[0]||''
                                submitParam["endTime"]=that.queryParam.timeRange[1]||''
                            }

                            if(item.deleteProps){
                                console.log(item.deleteProps)
                                item.deleteProps.forEach(item=>{
                                    delete submitParam[item];
                                })
                                delete submitParam["deleteProps"];
                            }

                            if(item.watchParams){
                                Object.keys(item.watchParams).forEach(key=>{
                                    submitParam[key]=that.readonly[key]||that.queryParam[key]||'';
                                })
                            }

                            for(let key in item.dropProps){
                                delete submitParam[item.dropProps[key]];
                            }
                            //console.log("item",item)

                            if(item.watch&&item.watch.watchValue){
                               // console.log("needInitSelected.watch.watchValue",item.watch.watchValue)
                                Object.keys(item.watch.watchValue).forEach(key=>{
                                    submitParam[key]=that.readonly[key]||submitParam[key]||'';
                                })
                            }

                            if(item.otherParams){
                                Object.keys(item.otherParams).forEach(key=>{
                                    submitParam[key]=item.otherParams[key]||'';
                                })
                            }

                            if(item.extendsProp){
                                for(let seq in item.extendsProp){
                                    submitParam[item.extendsProp[seq]]=currentSwitchValue;
                                }
                            }

                            if(!item.dataUrl){
                                that.$set(that.queryParam,item.prop,item.defaultValue);
                                resolve({url:item.dataUrl,data:{}})
                                return;
                            }

                            /*顶级元素优先查询完成一级数据初始化*/
                            that.queryListData({url:item.dataUrl,queryParam:submitParam,method:item.httpMethod||"get"}).then((listData)=>{
                                if(!listData) return resolve({url:item.dataUrl,data:listData});
                                that.$set(that.dataQuery.query,item.propList,item.dataHandler?item.dataHandler(listData):listData[item.propValueList])
                                that.$set(that.queryParam,item.prop,item.defaultValue)
                                resolve({url:item.dataUrl,data:listData})
                                //console.log("****",this.dataQuery.query)
                            },(error)=>{
                                console.log(error);
                                reject({url:item.dataUrl,error})
                            });
                        }
                    })
                    promiseList.push(initElementPromise);
                }
                return Promise.all(promiseList);
            },

            queryBtnClick(params,btn,...otherParams){
                let that=this;
                console.log("queryBtnClick",params,btn,...otherParams);
                if(!params.timeRange){
                    params.timeRange=['',''];
                }

                if(btn.type=='tab'&&btn.needReinit){
                    //this.initQueryElement();
                    this.$nextTick(data=>{
                        console.log("queryBtnClick",params,btn);
                        this.reInitQueryElement();
                    })
                }

                if(btn.click&& typeof btn.click=="function"){
                    if(btn.check&& typeof btn.check=="function"){
                        let checkResult=btn.check(params,btn,this.dataQuery.query,...otherParams);
                        if(checkResult instanceof Promise){
                            checkResult.then(success=>{
                                btn.click(success.params,btn,...otherParams);
                            },error=>{
                                btn.errorTip&&typeof btn.errorTip === "function"&&btn.errorTip()
                                console.log("验证失败 不搜索!调用错误提示方法")
                                //btn.click(params,btn);
                            })
                        }else if(checkResult){
                            //console.log("checkResult",checkResult)
                            btn.click(checkResult.params,btn,this.dataQuery.query,...otherParams);
                        }else{
                            console.error("验证没有返回,请返回 {params:参数对象} 或 Promise对象")
                            that.$message({
                                type:'error',
                                message:"验证没有返回 不请求 请查看控制台帮助.."
                            })
                        }
                    }else{
                        btn.click(params,btn,...otherParams);
                    }

                }else{
                    if(this.$attrs.clickConfig&& typeof this.$attrs.clickConfig=="function"){
                        if(btn.check&& typeof btn.check=="function"){
                            let checkResult=btn.check(params,btn,...otherParams);
                            if(checkResult instanceof Promise){
                                checkResult.then(success=>{
                                    this.$parent.$emit(this.$attrs.queryConfig.listenerId,success.params)
                                    this.$attrs.clickConfig(success.params,btn,that.queryParam,...otherParams);
                                },error=>{
                                    if(btn.errorTip&&typeof btn.errorTip === "function"){
                                        btn.errorTip()
                                    }else{
                                        this.$message({type:'error',message:error.msg})
                                    }
                                    console.log("验证失败 不搜索!调用错误提示方法")
                                    //btn.click(params,btn);
                                })
                            }else if(checkResult){
                                console.log("checkResult***************",checkResult.params)
                                this.$parent.$emit(this.$attrs.queryConfig.listenerId,checkResult.params)
                                this.$attrs.clickConfig(checkResult.params,btn,that.queryParam,...otherParams);
                            }else{
                                console.error("验证没有返回,请返回 {params:参数对象} 或 Promise对象")
                                that.$message({
                                    type:'error',
                                    message:"验证没有返回 不请求 请查看控制台帮助.."
                                })
                            }
                        }else{
                            //this.$parent.$emit(this.$attrs.queryConfig.listenerId,params,btn)
                            this.$attrs.clickConfig(params,btn,that.queryParam,...otherParams)
                        }
                    }
                }
            },
            initPage(){
                let that=this;

                /*挑选出需要初始化的查询元素 组合成promise.all 排序依赖元素*/
                that.readonly=this.$attrs.readData||{};
                this.queryElements=that.$attrs.queryConfig.queryElements;

                //静态值和动态值均已初始化完毕 可以调用table 进行数据查询了
                that.initQueryElementPromise().then(success=>{
                    console.log("params init success  page init first",success)
                    that.$parent.fresh();
                },error=>{
                    console.log("error",error)
                })

                that.$watch('$attrs.queryConfig.queryElements',function (newValue,oldValue) {
                    that.$set(that,"queryElements",newValue)
                    that.$nextTick(function () {
                        that.restoreQueryParam();
                    })
                },{deep:true})
            },
            groupedStyle(groupElements){
                let groupStyle=null;
                groupElements.forEach(item=>{
                    if(!groupStyle&&item.groupedStyle){
                        groupStyle=item.groupedStyle;
                    }
                })
                console.log("groupElements",groupElements)
                return groupStyle||{};
            }
        },
        created:function () {
            this.initPage();
        },
        watch:{
            '$route'(to,from){
                //console.log("this.$route.params",this.$route.params)
                //this.initPage();
            }
        },
        computed:{
            groupedElements(){
                return _.groupBy(this.$attrs.queryConfig.queryElements,item=>item.groupName)||{}
            },
            tabItem(){
                return _.find(this.$attrs.queryConfig.queryElements,item=>item.type=='tabs')
            }
        }

    }
</script>

<style scoped>
    input ,select,.queryParamInput{
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #bfcbd9;
        box-sizing: border-box;
        color: #1f2d3d;
        font-size: inherit;
        height: 36px;
        line-height: 1;
        outline: 0;
        padding: 3px 10px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);

        width: 220px;
    }

    input ,select,.queryParamInput,.el-select,.datetimerange{
        margin-bottom: 15px;
    }

    label.btn,.btn,.el-button {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        /*border: 1px solid #c4c4c4;*/
        /*color: #fff;*/
        margin: 0;
        padding: 10px 15px;
        border-radius: 4px;
        margin-bottom: 15px;
        margin-right: 10px;
    }
    label.btn{
        margin-right: 0px;
        border: 0px solid #fff;
        color: #48576a;
    }
    .searchContainer{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        background: rgba(0,0,0,.00);
        padding: 10px;
        border: 0px solid #f00;
        background: linear-gradient(180deg, #6cb4ff, rgb(255, 255, 255))
    }
    .elementsContainer{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
        flex-grow: 1;
        flex-shrink: 1;
        position: relative;
    }
    .queryElement{
        display: inline-block;
        flex-grow: 0;
        flex-shrink: 0;
        width: auto;
    }
    .queryElement  span[flagkey="hidden"],.hidden{
        display: none!important;
        background: #f00;
    }

    .tabContainer{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
    }
    .tabContainer ul{
         display: flex;
         flex-direction: row;
         justify-content: flex-start;
         align-items: flex-start;
     }
    .tabContainer ul li{
        display: inline-block;
        padding: 0px;
        margin: 0px;
        border-radius: 0px;
    }
    .tabContainer ul li label{
         display: inline-block;
         padding: 10px 35px;
         border-radius: 0px;
         margin-bottom: 0px;
        border-left: none;
     }
    .tabContainer ul li:nth-child(1) label{
        display: inline-block;
        padding: 10px 35px;
        border-left: 0px solid #1f2d3d;
    }
    .tabContainer > span{
        display: inline-block;
        width: 100%;
    }
    .tabContainer input{
        display: none;
    }
    .tabContainer .label_checkbox{
        display: inline-block;
        width: 100%;
        text-align:left;
        background: #f0a;
    }
    .tabContainer .form-inline{
        width: 100%;
    }
    .label_checkbox input:checked+label{
        background: #ffffff!important;
        color: #20a0ff;
        border-radius: 0px!important;
        border-top-left-radius: 5px!important;
        border-top-right-radius: 5px!important;
        border: 1px solid #1f2d3d;
        border-bottom: 1px solid #fff;
        transform: translateY(1px);
    }
    .datetimerange,.tipHtml{
       /* width: 100%;*/
        display: inline-block;
    }
    .tabContainer ul li label{
        border-radius: 0px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        border-right: 0px solid #1f2d3d;
        border-top: 0px solid #1f2d3d;
        transform: translateY(1px);
    }
    .queryItemLabel{
        display: inline-block;
        text-align: right;
        flex-grow: 0;
        flex-shrink: 0;
        margin-bottom: 15px;

    }

    .rightBtnStyle{
        background: #00a0e9;display: inline-block;padding: 5px 10px;color: #fff;cursor: pointer;border-radius: 5px;
    }

    .form-inline{
        display: flex;
        width: auto;
        border: 0px solid #f0a;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
    }
    .myTabsContainer{
        display: inline-block;
        border-bottom:0px solid #333;
        width: 100%;
        text-align: left;
        padding-left: 0px;
        margin: 0px;
    }
    .checkedStyle{
        color: green!important;
        background: #fff;
    }
</style>