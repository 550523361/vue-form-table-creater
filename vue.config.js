module.exports ={
    publicPath:'',
    devServer:{
        //proxy:'http://test-conbow-backend.goodaa.com.cn',
        proxy:{
            '^/api-backend/':{
                target:"http://test-conbow-backend.goodaa.com.cn",
                ws:true,
                changeOrigin:true
            }
        },
        overlay: {
            warnings: false,
            errors: false
          }
    },
    lintOnSave:true
}