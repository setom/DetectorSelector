angular.module('DetectorSelector.controllers', ['DetectorSelector.services', 'ngSanitize'])

.controller('MenuCtrl', function($scope, $state){

    $scope.goHome = function() {
        $state.go('app.home');
    };
    
    $scope.goSearch = function(){
        $state.go('app.search');
    };
    
    $scope.goAbout = function(){
        $state.go('app.about');
    };
})
        
.controller('HomeCtrl', function($scope, $rootScope, $state){
            
    //go to a list of detectors filtered by desired scenario
    $scope.goScenario = function(scen){
        $rootScope.userScenario = scen;
        $rootScope.userType = '';
        $state.go('app.detectors',
        {scenario:scen});
    };
    
    $scope.searchScenario = function(){
        $state.go('app.scenario');
    };
    
    $scope.searchType = function(){
        $state.go('app.type');
    };
    
})

.controller('ScenarioCtrl', function($scope, $rootScope, $state){

    //go to a list of detectors filtered by desired scenario
    $scope.goScenario = function(scen){
        //set the rootscope for the desired search param
        $rootScope.userScenario = scen;
        //reset the other rootscope params
        $rootScope.userType = '.';
        $state.go('app.detectors',
        {scenario:scen});
    };
})

.controller('TypeCtrl', function($scope, $rootScope, $state){

    //go to a list of detectors filtered by desired scenario
    $scope.goType = function(ty){
        //set the rootscope for the desired search param
        $rootScope.userType = ty;
        //reset the other rootscope params
        $rootScope.userScenario = '.';
        $state.go('app.detectors',
        {scenario:ty});
    };
})

.controller('SearchCtrl', function($scope, $rootScope, $state, DetectorFactory){
    
    //reset all the user selected values on instantiation of the page
//    $rootScope.userType = null;
//    $rootScope.userScenario = null;
//    $rootScope.userTier = null;
    
    $scope.typeChange = function(ty){
        ty = ty.toLowerCase();
        $rootScope.userType = ty;
    };
    $scope.scenarioChange = function(sc){
        sc = sc.toLowerCase();
        $rootScope.scenario = sc;
    };
    $scope.tierChange = function(ti){
        $rootScope.userTier = ti;
    };
    $scope.sysCostChange = function(sco){
        sco = sco.toLowerCase();
        sco = Number(sco.replace(/[^0-9\.]+/g,""));
        $rootScope.sysCost = sco;
    };
    
    $scope.search = function(){
        $state.go('app.detectors');
        console.log("Type: " + $rootScope.userType + " Tier: " + $rootScope.userTier + " Scenario: " +  $rootScope.scenario + " SysCost: " +  $rootScope.sysCost);
        //console.log($rootScope);
    };

})

.controller('DetectorsCtrl', function($scope, $state, $filter, $rootScope, DetectorFactory) {
    
    DetectorFactory.getCustomDetectors($rootScope.userType, $rootScope.userScenario, $rootScope.userTier).then(function(dets){
        $scope.detectors = dets;
    });
    
    //go to a specific detector
    $scope.goDetails = function(det){
        $rootScope.selected = det;
        $state.go('app.details', 
        {detectorDetails:det});
    };
})

.controller('DetectorDetailsCtrl', function($scope, $rootScope, $stateParams) {
    
    //set the proper rad/chem/bio image
    switch($rootScope.selected.type){
        case "bio":
            $scope.typeImage = "lib/detectorData/img/type-1.png";
            break;
        case "chem":
            $scope.typeImage = "lib/detectorData/img/type-2.png";
            break;
        case "rad":
            $scope.typeImage = "lib/detectorData/img/type-3.png";
            break;
        case "bio & chem":
            $scope.typeImage = "lib/detectorData/img/type-4.png";
            break;
        case "bio & rad":
            //no current detectors for this scenario, no image avail
            break;
        case "bio & chem & rad":
            $scope.typeImage = "lib/detectorData/img/type-6.png";
            break;
        case "chem & rad":
            $scope.typeImage = "lib.detectorData/img/type-7.png";
            break;
        default:
            $scope.typeImage = null;
    }

})

.controller('AboutCtrl', function(){
            
});
