<template>
    <div style="">
        <span style="font-size:2rem;font-weight:600;display:inline-block;margin:15px auto;">数字<span style="color:#0aa">{{movedData.length+sourceData.length}}</span>的合成</span>
        <div></div>
        <div class="flexContainer">
            <template v-for="i in sourceData.length">
                <span class="itemContainer">
                    <span class="topSpan">
                        <span>{{i}}</span>
                        <span class="rightSpan">{{sourceData.length-i}}</span>
                    </span>
                    <span class="bottomSpan">{{sourceData.length}}</span>
                </span>
            </template>
        </div>
        <div></div>
        <span style="font-size:2rem;font-weight:600;display:inline-block;margin:15px auto;">数字<span style="color:#0aa">{{movedData.length+sourceData.length}}</span>的分解</span>
        <div></div>

        <div class="flexContainer">
            <template v-for="i in sourceData.length">
                <span class="itemContainerReverse">
                    <span class="bottomSpan">{{sourceData.length}}</span>
                    <span class="topSpan">
                        <span>{{i}}</span>
                        <span class="rightSpan">{{sourceData.length-i}}</span>
                    </span>
                </span>
            </template>
        </div>
        <div style="text-align:left;padding-left:40px;margin-top:40px;">更多数字学习 请点击下面数字</div>
        <div class="flexContainer1" style="text-align:center;padding:10px;">
                    <el-button v-for="item in 25" :key="'yke_'+item" @click="jumpTo(item)" type="success" style="margin-bottom:10px;">
                            <router-link style="display:inline-block" :to="'/hcfj/'+item">{{item}}</router-link>
                    </el-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'hcfj',
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
            this.$router.push('/hcfj/'+item)
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
        flex-wrap wrap
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
    .itemContainer
        display inline-block
        padding 10px
        font-size 3rem
        font-weight bolder
        border 1px solid #f6f4ff
        margin 5px
        background #74dbff
        border-radius 5px
        span
            display inline-block
            border 0px solid #f00
            border-radius 5rem
        .topSpan
            display block
            border 0px solid #f0a
            span
                display inline-block
                padding 0px 2.5rem
                border 1px solid #000
            .rightSpan
                margin-left 3rem
        .bottomSpan
            margin-top 2.5rem
            padding 0px 3rem
            display inline-block
            position relative
            border 1px solid #000
            color #e6a23c
            &:before
                display  inline-block
                content ""
                display: inline-block;
                content: "";
                width: 3rem;
                height: 2px;
                background: #285fff;
                transform: rotateZ(60deg);
                position: absolute;
                left: 0px;
                top: -22px;
            &:after
                display  inline-block
                content ""
                display: inline-block;
                content: "";
                width: 3rem;
                height: 2px;
                background: #285fff;
                transform: rotateZ(-60deg);
                position: absolute;
                right: 0px;
                top: -22px;
    .itemContainerReverse
        display inline-block
        padding 10px
        font-size 3rem
        font-weight bolder
        border 1px solid #f6f4ff
        margin 5px
        background #ffcee7
        border-radius 5px
        span
            display inline-block
            border 0px solid #f00
            border-radius 5rem
        .topSpan
            display block
            border 0px solid #f0a
            span
                display inline-block
                padding 0px 2.5rem
                border 1px solid #000
            .rightSpan
                margin-left 3rem
        .bottomSpan
            margin-bottom 2.5rem
            padding 0px 3rem
            display inline-block
            position relative
            border 1px solid #000
            color #e6a23c
            &:before
                display  inline-block
                content ""
                display: inline-block;
                content: "";
                width: 3rem;
                height: 2px;
                background: #285fff;
                transform: rotateZ(-60deg);
                position: absolute;
                left: 0px;
                bottom: -22px;
            &:after
                display  inline-block
                content ""
                display: inline-block;
                content: "";
                width: 3rem;
                height: 2px;
                background: #285fff;
                transform: rotateZ(60deg);
                position: absolute;
                right: 0px;
                bottom: -22px;

</style>

