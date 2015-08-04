angular.module('DetectorSelector.controllers', ['DetectorSelector.services'])

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
        else if($rootScope.userType === '.'){
            //set the detectors depending on the userType selected
            if($rootScope.userScenario === 'field'){

            }
            else if ($rootScope.userScenario === 'mobile'){

            }
            else if ($rootScope.userScenario === 'diagnostic'){

            }
            else if ($rootScope.userScenario === 'analytic'){

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

.controller('DetectorDetailsCtrl', function($scope, $stateParams) {
   

});
