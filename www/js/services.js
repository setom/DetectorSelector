angular.module('DetectorSelector.services', [])

.factory('DetectorFactory', function($q, $http){
        
    //returns a promise for a list of detectors 
    //taken from a local json file in /lib/detectors.json
    function getDetectors() {
        var deferred = $q.defer();
        $http.get('lib/detectorData/detectors.json')
                .then(function(data){
                    deferred.resolve(data.data.detectors);
                },
                function(response){
                    console.log("Error getting detectors: " + response);
                }
        );
        return deferred.promise;
    }
    
    
    //the public API
    return {
        getDetectors: function(){
            return getDetectors();
        }
    };
});

