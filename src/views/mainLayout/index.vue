<template>
  <div class="main">
    <div class="content">
      <div class="list">
        <div style="padding:0px 10px;background: #fff;">
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import backendService from './../../components/remoteService/backendService'
  import {formatDate} from './../../components/format/format'
  import validate from './../../components/validate/validate'


  import moduleConfigTemplateData from './config/moduleConfig'

  let moduleConfigData = moduleConfigTemplateData;

  export default {
      name: 'list',
      components:{
      },
      data(){
          return{
              formatUtil:formatDate,
              moduleConfig:{editable:false,menuConfig:[]},
              validate:validate,
          }
      },
      methods:{
          initPage(){
              let that = this;
              let moduleConfig=moduleConfigData.getConfig()[this.$route.params.moduleName];
              that.moduleConfig=moduleConfig;
              //console.log("moduleConfig",moduleConfig,this.$route.params)
              if(!moduleConfig){
                  alert("配置模块"+this.$route.params.moduleName+"未找到,请检查配置");
                  return;
              }
              //console.log("*****===>>"+this.$route.params.moduleName+"-->",queryElements.forEach(item=>console.log(item.label)))
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
  }
</script>

<style>
  .formMessage{
    width: 600px;
  }
</style>
