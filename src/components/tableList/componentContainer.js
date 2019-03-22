export default {
    name:"any-component",
    component:function (resolve,reject) {
        resolve(
            {
                render(h){
                    return h(this.$attrs.componentName,{
                        attrs:{
                            readData:this.readData,
                            config:{
                                formData:[],
                                dataBus:this.$attrs.elementInfo.dataBus,
                            },
                            rowData:this.$attrs.rowData,
                            elementInfo:this.$attrs.elementInfo
                        },
                    })
                },
                data(){
                    return {
                        readData:{}
                    }
                },
                methods:{
                    clickHandler:data=>{
                    }
                },
                mounted(){
                    this.readData=this.$attrs;
                    this.$watch("readData",function(newValue,oldValue){
                        //console.log("newValue,oldValue",newValue,oldValue)
                    },{
                        deep:true
                    })
                },
            }
        )

    }}