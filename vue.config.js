module.exports = {
    lintOnSave: false,
    css:{
        loaderOptions:{
            sass:{
                additionalData:`
                    @import "@/assets/scss/config.scss";
                    @import "@/assets/scss/variable.scss";
                    @import "@/assets/scss/mixin.scss";
                `
            }
        }
    },
    devServer:{
        // host:'localhost',
        // port:8080,
        // proxy:{
        //     '/admin':{
        //         target:'http://127.0.0.1/power/public/index.php',
        //         changeOrigin:true,
        //         ws:true,
        //         pathRewrite:{
                    
        //         }
        //     }
        // }
    }
}