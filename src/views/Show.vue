/* eslint-disable */
<template>
    <div style="">
        <span style="font-size:2rem;font-weight:600;display:inline-block;margin:15px auto;">数字<span style="color:#0aa">{{movedData.length+sourceData.length}}</span>的分解与合成</span>
        <div class="flexContainer">
            <div class="imageContainer source">
                <img v-for="i in sourceData"  :key="'img'+i" src="http://img-steward-test.goodaa.com.cn/012ea40a83f24490b98c9eca4f044748.png" alt="">
                <!-- <span class="numberStyle" style="position:absolute">
                    {{sourceData.length}}
                </span> -->
            </div>
            <div style="text-align:center;padding-top:20px;width:120px;padding:10px">
                <el-button v-if="sourceData.length>0" @click="channgeNum(1)" style="margin-bottom:20px;">蓝色减一个</el-button>
                <div></div>
                <el-button v-if="movedData.length>0" @click="channgeNum(-1)">绿色减一个</el-button>
            </div>
            <div class="imageContainer target">
                <img v-for="i in movedData"  :key="'movedImg'+i" src="http://img-steward-test.goodaa.com.cn/012ea40a83f24490b98c9eca4f044748.png" alt="">
                <!-- <span class="numberStyle"  style="position:absolute">
                    {{movedData.length}}
                </span> -->
            </div>
        </div>
        <span class="numberStyle" style="color:#faa">
            <span style="color:#409eff">{{sourceData.length}}</span>+<span style="color:#67c23a">{{movedData.length}}</span>=<span style="color:#f0a">{{movedData.length+sourceData.length}}</span>
        </span>
        
        <div class="flexContainer" style="background:#20a">
            <div class="flexContainer" style="flex-direction:column;">
                <div class="numberStyle" style="color:#faa;font-size:3rem;" v-for="item in (movedData.length+sourceData.length)" :key="'allType'+item">
                    <span style="color:#409eff">{{item}}</span>+<span style="color:#67c23a">{{movedData.length+sourceData.length-item}}</span>=<span style="color:#f0a">{{movedData.length+sourceData.length}}</span>
                </div>
            </div>
            <div class="flexContainer" style="flex-direction:column;">
                <div class="numberStyle" style="color:#faa;font-size:3rem;" v-for="item in (movedData.length+sourceData.length)" :key="'allType'+item">
                    <span style="color:#409eff">{{movedData.length+sourceData.length-item}}</span>+<span style="color:#67c23a">{{item}}</span>=<span style="color:#f0a">{{movedData.length+sourceData.length}}</span>
                </div>
            </div>
        </div>
        <div style="text-align:left;padding-left:40px;margin-top:40px;">更多数字学习 请点击下面数字</div>
        <div class="flexContainer1" style="text-align:center;padding:10px;">
                    <el-button v-for="item in 25" :key="'yke_'+item" @click="jumpTo(item)" type="success" style="margin-bottom:10px;">
                            <router-link style="display:inline-block" :to="'/number/'+item">{{item}}</router-link>
                    </el-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'show',
    data:()=>{
        return {
            movedData:[],
            sourceData:[],
        }
    },
    methods:{
        channgeNum(changeNumber){
            if(changeNumber>0){
                this.movedData.push(this.sourceData.splice(0,1)[0]);
            }else{
                this.sourceData.push(this.movedData.splice(0,1)[0]);
            }
            
        },
        init(){
            this.movedData=[];
            this.sourceData=[];
            let i=0;
            while (i < this.$route.params.sum){
                this.sourceData.push(i+Math.ceil(Math.random()*1888888888));
                ++i;
            }
        },
        jumpTo(item){
            this.$router.push('/number/'+item)
        }
    },
    created(){
        this.init();
    },
    watch:{
        "$route":function(from ,to){
            this.init();
        }
    }
}
</script>
<style lang="stylus" scoped>
    .flexContainer
        display flex
        flex-direction row
        flex-direction: row;
        justify-content: space-around;
        align-items: stretch;
        width 100%
    .imageContainer
        position relative
        padding 10px
        width 45%
        min-height 200px
        text-align left 
        img 
            width 21%
            margin-right:5px
            vertical-align: middle;
            margin-bottom 15px
        .downLine
            position relative
            transform translateY(180px)

    .source
        border 0px solid #f0a;
        border-radius: 5px;
        background: #409eff;
    .target
        border 0px solid #000
        min-height 120px
        border-radius: 5px;
        background: #67c23a;
    .numberStyle
        font-size 8rem
        font-weight 800        
</style>

