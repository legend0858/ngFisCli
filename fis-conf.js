// default settings. fis3 release

fis.set("project.files",["app/**"]);

fis.set("static","/static");


/******************目录规范**********************/
fis.match("**/*",{
        release:"${static}/$0"
    })
    .match("**/index.html",{
        release:"index.html"
    })
    .match("**/_*",{
        release:false
    })


/***************预编译语言处理***************/
fis.match("**/*.scss",{
    rExt:"css",
    parser:fis.plugin("node-sass")
})


/*************生产环境压缩代码*************/
fis.media("prod")
    .match("::packager",{
        postpackager:fis.plugin("loader")
    })
    .match("**/*.js",{
        preprocessor:fis.plugin("annotate"),
        optimizer:fis.plugin("uglify-js")
    })
    .match("**/*.css",{
        optimizer:fis.plugin("clean-css")
    })
    .match("**/*.png", {
        optimizer:fis.plugin("png-compressor")
    })
    .match("bower_components/**/*.js",{
        packTo:"pkg/vendor.js"
    })
    .match("bower_components/**/*.css",{
        packTo:"pkg/vendor.css"
    })
