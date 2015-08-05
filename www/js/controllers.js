angular.module('DetectorSelector.controllers', ['DetectorSelector.services', 'ngSanitize'])

.controller('MenuCtrl', function($scope, $state){

    $scope.goHome = function() {
        $state.go('app.home');
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

.controller('SearchCtrl', function($scope, DetectorFactory){

})

.controller('DetectorsCtrl', function($scope, $state, $filter, $rootScope, DetectorFactory) {


//    DetectorFactory.getDetectors().then(function(dets){
//        //set the detectors depending on the userType selected
//        if($rootScope.userType === 'biological'){
//            $scope.detectors = $filter('filter')(dets, {type:'bio'});
//        }
//        else if ($rootScope.userType === 'chemical'){
//            $scope.detectors = $filter('filter')(dets, {type:'chem'});
//        }
//        else if ($rootScope.userType === 'radiological'){
//            $scope.detectors = $filter('filter')(dets, {type:'rad'});
//        }
//        else {
//            //default to show ALL detectors
//            $scope.detectors = dets;
//        } 
    //if the user is searching by type, then the scenario is .
    DetectorFactory.getDetectors().then(function(dets){
        if ($rootScope.userScenario === '.'){
            //set the detectors depending on the userType selected
            if($rootScope.userType === 'biological'){
                $scope.detectors = $filter('filter')(dets, {type:'bio'});
            }
            else if ($rootScope.userType === 'chemical'){
                $scope.detectors = $filter('filter')(dets, {type:'chem'});
            }
            else if ($rootScope.userType === 'radiological'){
                $scope.detectors = $filter('filter')(dets, {type:'rad'});
            }
            else {
                //default to show ALL detectors
                $scope.detectors = dets;
            } 
        }
        //if the user is searching by scenario, then the type is .
        //**** Note, the scenario doesn't actually filter results, rather, it
        //**** sorts the results piling the desired scenario at the top
        else if($rootScope.userType === '.'){
            //set the detectors depending on the userType selected
            if($rootScope.userScenario === 'field'){
                $scope.detectors = $filter('orderBy')(dets, ["bioFieldTier", "chemFieldTier", "radFieldTier"]);
            }
            else if ($rootScope.userScenario === 'mobile'){
                $scope.detectors = $filter('orderBy')(dets, ["bioMobDTier", "chemMobTier", "radMobTier"]);
            }
            else if ($rootScope.userScenario === 'diagnostic'){
                $scope.detectors = $filter('orderBy')(dets, ["bioDiagTier", "chemDiagTier", "radDiagTier"]);
            }
            else if ($rootScope.userScenario === 'analytic'){
                $scope.detectors = $filter('orderBy')(dets, ["bioAnalTier", "chemAnalTier", "radAnalTier"]);
            }
            else {
                //default to show ALL detectors
                $scope.detectors = dets;
            } 
        }
        //default show all detectors
        else {
            $scope.detectors = dets;
    }
        
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

});
