##项目脚手架


###Angular + Bootstrap + fis3 + bower + sass


####安装步骤:

1.node,bower 什么的就不说了

2.全局安装fis3

    npm install -g fis3

3.启动服务器

    fis3 server start

4.发布项目（加上-wL启动自动刷新）

    fis3 release -wL

5.release会自动发布到fis3的服务器,如果想指定目录,可以使用

    fis3 release -d ./output

6.如果不想每次输入参数,可以在配置里写好
<pre>
fis.match('*', {
    deploy: fis.plugin('local-deliver', {
        to: './output'
    })
})
</pre>


####依赖项目:
Angular,Bootstrap,sass,rdash-ui,Bower,fis3






