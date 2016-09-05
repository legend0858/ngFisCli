require('../../component/widget');

module.exports = {
    url: '/tables',
    template: __inline('./tables.html'),
    //注意如果开启压缩，应采取此方式注入对象，否则压缩后将找不到
    controller : ["$resource","$scope","ngDialog",function($resource,$scope,ngDialog) {

        var vm = this;
        
        var agentInfoRes = $scope.agentInfoRes = $resource("http://localhost:90/BlueSky/agentInfo/:agentid",{agentid:"@agentid"});

        /*query获取列表,GET方法*/
        vm.agentArr = agentInfoRes.query();


        /*新增帐号,POST方法*/
        vm.add = function(){
            $scope.dialog = ngDialog.open({
                template:__inline('./dialog.html'),
                plain:true,
                controller:['$scope',function($scope){

                    var vm = $scope.vm = {};

                    vm.title = "添加";
                    vm.btnTxt = "添 加";

                    vm.submit = function(){
                        var agentInfo = new agentInfoRes(vm.form);
                        agentInfo.$save(function(){
                            vm.agentArr = agentInfoRes.query();
                            $scope.closeThisDialog();
                        });
                    };
                }]
            });
        };

        /*编辑帐号,POST方法*/
        vm.edit = function(agent){

            agentInfoRes.get({agentid:vm.agentArr[0].agentid});

            ngDialog.open({
                template:__inline('./dialog.html'),
                plain:true,
                controller:['$scope',function($scope){

                    var vm = $scope.vm = {};

                    vm.form = agent;

                    vm.title = "修改";
                    vm.btnTxt = "保存修改";

                    vm.submit = function(){
                        agent.$save(function(){
                            vm.agentArr = agentInfoRes.query();
                            $scope.closeThisDialog();
                        });
                    };
                }]
            });
        };

        /*delete删除操作,DELETE方法*/
        vm.delete = function(id){
            agentInfoRes.remove({
                agentid:id
            },function(data){
                alert("删除成功!");
                vm.agentArr = agentInfoRes.query();
            })
        };

    }],
    controllerAs:"vm"
};