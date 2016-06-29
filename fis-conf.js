
fis.unhook('components');
fis.hook('commonjs');

fis.set("project.files",["app/**",'map.json','lib']);
fis.set("static","/static");


/***************scss预编译语言处理***************/
fis.match("**/*.scss",{
    rExt:"css",
    parser:fis.plugin("node-sass")
})


/******************目录规范**********************/
fis.match("**/*",{
        release:"${static}/$0"
    })
    .match("**/(**.html)",{
        release:"$1"
    })
    .match("**/_*",{
        release:false
    })
    .match(/^\/modules\/(.*)\.(js)$/i, {
        isMod: true,
        id: '$1'     //id支持简写，去掉modules和.js后缀中间的部分
    })
    //一级同名组件，可以引用短路径，比如modules/jquery/jquery.js
    //直接引用为var $ = require('jquery');
    .match(/^\/modules\/([^\/]+)\/\1\.(js)$/i, {
        id: '$1'
    })


//打包与css sprite基础配置
fis.match('::packager', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'mod',
        useInlineMap: true // 资源映射表内嵌
    }),
    packager: fis.plugin('map')
})


/*************生产环境压缩代码*************/
fis.media("prod")
    .match("**/*.js",{
        optimizer:fis.plugin("uglify-js"),
        preprocessor: fis.plugin('annotate')
    })
    .match("**/*.css",{
        optimizer:fis.plugin("clean-css")
    })
    .match("**/*.png", {
        optimizer:fis.plugin("png-compressor")
    })
    .match("lib/mod.js",{
        packTo:"pkg/vendor.js"
    })
    .match("bower_components/**/*.js",{
        packTo:"pkg/vendor.js"
    })
    .match("bower_components/**/*.css",{
        packTo:"pkg/vendor.css"
    })
    .match("::packager",{
        postpackager:fis.plugin("loader",{
            allInOne:true
        })
    })
