import ChooseBtn from "./../components/formCreater/chooseBtn"
import BaseService from "./../components/remoteService/backendService"
import addInput from "./../components/formCreater/addInput"
import validate from "./../components/validate/validate"

const components=[addInput,ChooseBtn];

const install = function(Vue,options){
    components.forEach(component=>{
        Vue.component(component.name,component)
    })
}

let exports={ChooseBtn,BaseService,addInput,install,validate};

export default exports;