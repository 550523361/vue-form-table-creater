<template>
    <div>
        <div class="titleContainer">
            <div><span style="color: #00a2d4">盒子演示数字加减法</span></div>
        </div>
        <div class="frameContainer">
            <div  :index="index" v-for="(frame,index) in framesList" v-bind:key="index+'group'"   disabled3rag="true3" v-dragging='{item:{group:index,list:frame,target:"container",canPush:((frame||[]).filter(item=>item.canDrag===false).length==0)},list:[],group:index}'>
                <div class="titleLabel" style="position: relative;">第<span style="color: #f00">{{index+1}}</span>盒子 有{{frame.length}}个苹果
                    <span @click="moveFrame($event,frame,index)" style="width:20px;height:20px;border-radius: 50%;text-align: center;display:inline-block;width: 120px;cursor: pointer;color: #f00;">删除盒子</span>
                </div>
                <div class="frameGroupContainer" :style="{background:colorMap[index+1]}">
                    <div class="itemContainer"
                         :class="{
                              itemContainer:true,
                              showItemClass:item.id==showItemId&&showItemId!=''
                              }"
                         :index="index" v-if="item"
                         v-for="(item,seq) in frame" :key="'item'+seq" v-dragging="{item:{color:item,seq:seq,target:'item',group:index,dragItem:item,groupList:frame}, list: [], group: index}">
                        <div class="imageContainer" :style="{background:'url('+item.photoUrl+') no-repeat center center',height:'120px',width:'100%'}">

                        </div>
                        <div class="operateContainer">
                            <span @click="moveItem($event,frame,index,item,seq,'d',1)" style="width:20px;height:20px;border-radius: 50%;text-align: center;"></span>
                        </div>
                    </div>
                    <div class="addBtnContainer" @click="addItem(frame,index)" v-if="frame.length<100&&((frame||[]).filter(item=>item.canDrag===false).length==0)">
                        添加苹果
                    </div>
                </div>
            </div>

            <div class="addBtnContainer" style="align-self:center;margin-left:10px;font-size: 14px;background: #fff;">
                <div @click="addFram()" style="align-self:center;margin-left:10px;color:#fff;padding: 5px 15px;font-size: 14px;margin-bottom: 10px;position: relative;">
                    <el-button type="success">添加盒子</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    import draggable from 'vuedraggable'
    export default {
        components:{
            draggable,
        },
        name: 'list',
        data(){
            return{
                showItemId:0,
                applyRow:true,
                showView:false,
                draggingItem:null,
                framesList:[],
                spreadList:[],
                chooseTarget:{},
                colorMap:{
                    1:'#3720ff',
                    2:'#74ff0d',
                    3:'#f02b29',
                    4:'#feff0e',
                    5:'#ff41e9',
                    6:'#85fff3',
                    7:'#1cff65',
                },
                form: {
                    channelId:"0",
                    appId:0,
                    type:0
                },
                rules:{

                },
                choosedItemList:{},
                chooseType:1,
                chooseIds:[],
                canDragMap:{
                    0:true,
                    1:true,
                    2:false,
                    3:false
                },
            }
        },
        methods:{
            addItem(frame,seq){
                //console.log(frame,seq);
                frame.push({
                    name:'',
                    photoUrl:'http://img-steward-test.goodaa.com.cn/012ea40a83f24490b98c9eca4f044748.png',
                    canDrag:true,
                    contentPushId:''
                })
                this.$set(this,"framesList",JSON.parse(JSON.stringify(this.framesList)))
            },
            addFram(){
                this.framesList.push([])
                this.$set(this,"framesList",JSON.parse(JSON.stringify(this.framesList)))
            },
            moveItem(event,frame,index,item,seq,direction,moveType){
                event.preventDefault();
                event.stopPropagation();
                console.log(frame,index,item,seq,direction,moveType)
                if(direction == "v"){
                    let tempItem=frame.splice(seq,1)[0];
                    frame.splice(seq+moveType,0,tempItem);
                }else if(direction == "h"){
                    let targetFram=this.framesList[index+moveType];
                    let tempItem=frame.splice(seq,1)[0];
                    targetFram.push(tempItem);
                }else if(direction == "d"){
                    frame.splice(seq,1);
                    if(frame.length==0&&this.framesList.length>5){
                        this.framesList.splice(index,1);
                    }
                }
                this.$set(this,"framesList",JSON.parse(JSON.stringify(this.framesList)))
            },
            moveFrame(event,frame,index,item,seq,direction,moveType){
                event.preventDefault();
                event.stopPropagation();
                console.log(frame,index,item,seq,direction,moveType)
                this.framesList.splice(index,1);
                this.$set(this,"framesList",JSON.parse(JSON.stringify(this.framesList)))
            },
            draggItem(){
                if(this.draggingItem!=null){
                    let draggInfo=this.draggingItem;
                    let toItem=draggInfo.to;
                    let draggItem=draggInfo.draged;
                    let draggGroupIndex=draggItem.group;
                    let draggItenSeq=draggItem.seq;

                    if(draggItem.target == "container"){//整组交换
                        let removeDraggGroupFromSourceList=this.framesList.splice(draggItem.group,1)[0];
                        this.framesList.splice(toItem.group,0,removeDraggGroupFromSourceList);
                        return;
                    }
                    if(toItem.group!=draggGroupIndex&&this.framesList[toItem.group].length>=100){
                        this.$message({
                            message: '目标帧不能超过100个推广位',
                            type: 'error'
                        });
                        return;
                    }

                    if(toItem.target == "container"){//接收对象为容器  直接追加在最后
                        let targetGroupIndex=toItem.group;
                        let removeDraggItemFromSourceList=this.framesList[draggGroupIndex].splice(draggItenSeq,1)[0];
                        this.framesList[targetGroupIndex].push(removeDraggItemFromSourceList);
                    }else if(toItem.target == "item"){//接收对象为普通元素 直接放在其前面
                        let targetGroupIndex=toItem.group;
                        let targetSeq=toItem.seq;
                        let removeDraggItemFromSourceList=this.framesList[draggGroupIndex].splice(draggItenSeq,1)[0];
                        this.framesList[targetGroupIndex].splice(targetSeq,0,removeDraggItemFromSourceList);
                    }
                    this.$set(this,"framesList",JSON.parse(JSON.stringify(this.framesList)))
                    this.draggingItem=null;
                }
            },
            getContext(){
                return this;
            },
            showViewHandler(){
                if(this.showView){
                    this.showView=false;
                }else{
                    this.showView=true;
                }
            },
            draggItemFun(){
                if(this.draggingItem!=null){
                    let draggInfo=this.draggingItem;
                    //console.log("dragend",draggInfo);
                    let toItem=draggInfo.to;
                    let draggItem=draggInfo.draged;
                    let draggGroupIndex=draggItem.group;
                    let draggItenSeq=draggItem.seq;

                    if(draggItem.target == "container"){//整组交换
                        let removeDraggGroupFromSourceList=this.framesList.splice(draggItem.group,1)[0];
                        this.framesList.splice(toItem.group,0,removeDraggGroupFromSourceList);
                        this.$set(this,"framesList",JSON.parse(JSON.stringify(this.framesList)))
                        this.draggingItem=null;
                        return;
                    }
                    if(toItem.group!=draggGroupIndex&&this.framesList[toItem.group].length>=100){
                        this.$message({
                            message: '目标帧不能超过100个推广位',
                            type: 'error'
                        });
                        return;
                    }
                    if(toItem.target == "container"){//接收对象为容器  直接追加在最后
                        let targetGroupIndex=toItem.group;
                        let removeDraggItemFromSourceList=this.framesList[draggGroupIndex].splice(draggItenSeq,1)[0];
                        this.framesList[targetGroupIndex].push(removeDraggItemFromSourceList);
                    }else if(toItem.target == "item"){//接收对象为普通元素 直接放在其前面
                        //console.log("dragend",draggInfo);
                        let targetGroupIndex=toItem.group;
                        let targetSeq=toItem.seq;
                        let removeDraggItemFromSourceList=this.framesList[draggGroupIndex].splice(draggItenSeq,1)[0];
                        this.framesList[targetGroupIndex].splice(targetSeq,0,removeDraggItemFromSourceList);
                    }
                    this.$set(this,"framesList",JSON.parse(JSON.stringify(this.framesList)))
                    this.draggingItem=null;
                }
            },
            getColors(){
                let backgroundColorR=Math.ceil(Math.random()*255);
                let backgroundColorG=Math.ceil(Math.random()*255);
                let backgroundColorB=Math.ceil(Math.random()*255);
                let frendColor=255-backgroundColor;
                return {
                    backgroundColor:'rgb('+backgroundColorR+','+backgroundColorG+','+backgroundColorB+')',
                    frendColor
                }
            },
            mouseout(item){
                this.showItemId=0;
            },
            mouseover(item){
                this.showItemId=item.id;
            },
        },
        created() {

            this.appName = "演示";

        },
        mounted() {
            /*开始拖拽*/
            this.$dragging.$on('dragStart', (param) => {
                // this.draggingItem = param;
            })
            /*拖拽进入 */
            this.$dragging.$on('dragged', (param) => {
                this.draggingItem = param;
            })
            this.$dragging.$on('dragend', (...param) => {
                this.$emit("myDrop", {aa: 12})
            })

            let that=this;
            this.$on("myDrop", data => {

                if(!this.draggingItem) return;
                let draged=this.draggingItem.draged;
                let dragItem=draged.dragItem;
                let to=this.draggingItem.to;

                /*被拖拽为对象 目标允许进入*/
                if(draged.target == "item" && !dragItem.canDrag){

                    if(draged.group == to.group){
                        console.log("同帧内独占对象不必交换")
                        return ;
                    }

                    if(draged.group != to.group && to.target == 'container'){
                        let isEmpty=to.list.filter(item=>item.dbId>0).length==0;
                        console.log("*******",to,isEmpty,this.draggingItem)

                        if(isEmpty){
                            console.log("独占对象跨组拖拽 目标为空或者目标为 不包含任何 已配置对象")
                            /*允许拖进该对象 并清空内部空值*/
                            this.framesList[to.group]=[dragItem]
                            this.framesList[draged.group]=[]
                            this.$set(this,"framesList",JSON.parse(JSON.stringify(this.framesList)))
                        }else{
                            console.log("独占对象跨组拖拽 目标不为空!!!!!!!!!!!")
                            that.$message({
                                type:'error',
                                message:'本类型不支持移动'
                            })
                        }
                        return ;
                    }else if(draged.group != to.group && to.target == 'item'){
                        let isEmpty=to.groupList.filter(item=>item.dbId>0).length==0;
                        console.log("*******",to,isEmpty,this.draggingItem)
                        if(isEmpty){
                            console.log("独占对象跨组拖拽 目标为空对象,进行覆盖")
                            /*允许拖进该对象 并清空内部空值*/
                            this.framesList[to.group]=[dragItem]
                            this.framesList[draged.group]=[]
                            this.$set(this,"framesList",JSON.parse(JSON.stringify(this.framesList)))
                        }else{
                            console.log("独占对象跨组拖拽 目标不为空!!!!!!!!!!!")
                            that.$message({
                                type:'error',
                                message:'本类型不支持移动'
                            })
                        }
                        return ;
                    }
                }

                /*拖拽目标 为容器 和 对象  */
                if(to.target=="container"&&!to.canPush){
                    that.$message({
                        type:'error',
                        message:'本类型不支持移动ddd'
                    })
                    return ;
                }

                if(to.target=="item"&&!to.dragItem.canDrag){
                    that.$message({
                        type:'error',
                        message:'本类型不支持移动'
                    })
                    return ;
                }


                if((!this.draggingItem)||(!this.draggingItem.draged.dragItem)||this.draggingItem.draged.dragItem&&this.draggingItem.draged.dragItem.canDrag){
                    this.draggItemFun();
                }else{
                    that.$message({
                        type:'error',
                        message:'本类型不支持移动'
                    })
                }
            })
        }
    }
</script>

<style scoped>
  #container {
    height: 300px;
    width:800px;
  }
  .showItemClass{
      animation: colors 3s  infinite ;
      /*box-shadow: 1px 1px  10px #000,1px -1px  10px #000,-1px -1px  10px #000;*/
  }

  @keyframes colors {
      0%{
          background: #000!important;
          transform: rotateY(0deg);
      }

      100%{
          background: #ff0!important;
          transform: rotateY(360deg);
      }
  }
  .popContainer{
  }
  .frameContainer{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    background: #fff;
    text-align: center;
  }
  .frameGroupContainer{
    border: 0px solid #aaa;
    border-radius: 3px;
    margin-right: 12px;
    min-height: 350px;
    padding: 4px 4px;
    text-align: center;
    box-shadow: 2px 2px 6px #8391a5;
    overflow-y: auto;
    min-width: 165px;
    width: 400px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    position: relative;
    padding-bottom: 60px;
  }
  .itemContainer{
    margin-bottom: 10px;
    border: 0px solid #e8e8e8;
    border-radius: 5px;
    position: relative;
    cursor: move;
    width: 120px;
    display: inline-block;
  }
  .itemContainer img{
    height: 120px;
    width: auto;
  }
  .titleLabel{
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: move;
  }
  .addBtnContainer{
    cursor: pointer;
    background: #bfcbd9;
    border-radius: 4px;
    padding: 7px 17px;
    color: #fff;
      position: absolute;
      bottom:10px;
      left:50%;
      margin-left: -52px;
  }
  .operateContainer{
    position: absolute;
    top:0px;
    right: 0px;
    display: none;
  }

  .operateContainer span{
    background: url("http://ejiaziimg.goodaa.com.cn/pic_eaddbf41-852e-4fe8-a72d-0a52c360b77e.png") no-repeat center center;
    background-size: cover;
    cursor: pointer;
    margin-bottom: 0px;
    border:1px solid #fff;
    text-align: center;
    color: #fff;
    display: inline-block;
  }
  .itemContainer .operateContainer{
    width: 100%;
    height: 100%;
    padding-top: -10px;
    padding-right: -10px;
    display: block;
    text-align: right;

  }
  .btnsContainer{
    position: relative;
    margin-top: 80px;
    margin-top: 40px;
  }
  .imageContainer{
    -webkit-background-size: contain!important;
    background-size: contain!important;
    position: relative;
    overflow: hidden;
    width: 120px!important;
    height: 100px!important;
  }
  .titleContainer{
    background: #f0f0f0;
    padding: 10px;
  }
  .titleContainer div:first-child{
    margin-bottom: 10px;
  }

  .preViewContainer{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
    border:0px solid #32a;
    width: 700px;
    margin-top: 20px;
    padding-top: 10px;

    box-shadow: 1px 1px 10px;
    margin-bottom: 20px;
  }

  .preViewItemContainer{
    background: #fff;
    margin-bottom: 10px;
    min-height: 120px;
    border: 1px solid #e8e8e8;
    border-radius: 5px;
    position: relative;
    width: 130px;
    padding-top: 10px;
    flex-shrink: 0;

  }

  .machineContainer{
    background: url(https://img.yzcdn.cn/upload_files/2018/05/25/FhNoqgRgCGcyD6M1ehLO13ii9WjO.jpg?imageView2/2/w/580/h/580/q/75/format/jpg) no-repeat center center;
    background-size: 880px auto;
    height: 800px;
    position: relative;
    text-align: center;
    width: 750px;
  }
  .carouselContainer{
    background: transparent;
    width: 437px;
    height: 262px;
    transform: translateY(111px);
    display: inline-block;
  }
  .el-carousel,.el-carousel__container{
    height: 100%;
  }
  .carouselImageContainer{
    text-align: center;
    background: #fff;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
  }
  .carouselImageContainer img{
    width: 100%;
    height: 100%;
  }
  .el-carousel__indicator{
    display: none;
  }

  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar
  {
    width: 4px;
    height: 4px;
    background-color: #F5F5F5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #fff;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #666;
  }

  .tipLabel{
    position: absolute;
    display: inline-block;
    background: rgba(23, 106, 249, 0.65);
    color: rgb(255, 255, 255);
    font-size: 12px;
    padding: 1px 8px;
    border-radius: 0px;
    transform: rotateZ(-45deg);
    left: -19px;
    width: 70px;
    top: 14px;
  }

  .chooseItem{
      display: none;
  }
  .chooseItem + label{
      background: #fff url('http://img-steward-test.goodaa.com.cn/47b8be2b6fd441eabd319abaf9677115.png') no-repeat !important;
      background-position: 3px 1px!important;
      background-size: 51px 23px!important;
  }
  .chooseItem:checked + label{
      background: #fff url('http://img-steward-test.goodaa.com.cn/47b8be2b6fd441eabd319abaf9677115.png') no-repeat !important;
      background-position: -27px 1px!important;
      background-size: 52px 23px!important;
  }
  .checkItem{
      display: inline-block;
      width: 28px;
      height: 28px;
  }
</style>

<!--
Indicates the type of validator to use. Recognised type values are:

string: Must be of type string. This is the default type.
number: Must be of type number.
boolean: Must be of type boolean.
method: Must be of type function.
regexp: Must be an instance of RegExp or a string that does not generate an exception when creating a new RegExp.
integer: Must be of type number and an integer.
float: Must be of type number and a floating point number.
array: Must be an array as determined by Array.isArray.
object: Must be of type object and not Array.isArray.
enum: Value must exist in the enum.
date: Value must be valid as determined by Date
url: Must be of type url.
hex: Must be of type hex.
email: Must be of type email.



-->
