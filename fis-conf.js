
fis.unhook('components');
fis.hook('commonjs');

fis.set("project.files",["app/**",'map.json','lib']);
fis.set("static","/static");


/***************less预编译语言处理***************/
fis.match("**/*.scss",{
    rExt:"css",
    parser:fis.plugin("node-sass",{
        "sourceMap":true
    })
})


/******************目录规范**********************/
fis.match("**/*",{
        release:"${static}/$0"
    })
    .match("app/(**/*)",{
        release:"${static}/$1"
    })
    .match("**/index.html",{
        release:"index.html"
    })
    .match(/^\/app\/modules\/(.*)\.(js)$/i, {
        isMod: true,
        id: '$1'     //id支持简写，去掉modules和.js后缀中间的部分
    })
    .match(/^\/app\/modules\/(pages|component)\/([^\/]+)\/\2\.(js)$/i, {
        id: '$1/$2'
    })


//打包基础配置
fis.match('::packager', {
    postpackager: fis.plugin('loader', {
        resourceType: 'mod',
        useInlineMap: true // 资源映射表内嵌
    }),
    packager: fis.plugin('map')
})

//设置发布目录
/*fis.match('*', {
    deploy: fis.plugin('local-deliver', {
        to: './output'
    })
})*/


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
    .match("app/lib/mod.js",{
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
