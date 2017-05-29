angular.module('starter.controllers', [])

.controller('AppCtrl', function() {

})


.controller('NfcController', function ($scope, $cordovaNfc, $cordovaNfcUtil) {
    $scope.textToWrite;
    var nfc,
        nfcUtil;
  $scope.writeTag = function (text) {
    console.log(text);
    var message = [
      ndef.textRecord(text)
    ];
    nfc.write(message).then(function (success) {console.log("DONE!: ", success); }, function(error){console.log("ERROR: ", error);});
    
  }

  $cordovaNfc.then(function(nfcInstance){
      nfc = nfcInstance;
        //Use the plugins interface as you go, in a more "angular" way
      nfcInstance.addNdefListener(function(event){
            //Callback when ndef got triggered
           
            var tag =  event.tag,
                ndefMessage = tag.ndefMessage

            $cordovaNfcUtil.then(function(nfcUtil){
              console.log("Your Message: ");
              // console.log( nfcUtil.bytesToString(ndefMessage[0].payload).substring(3) );
              var text = nfcUtil.bytesToString(ndefMessage[0].payload).substring(3);
              $scope.textRead = text;
            }); 

      })
      .then(
        //Success callback
        function(event){
            console.log("bound success");
        },
        //Fail callback
        function(err){
            console.log("error");
        });

        $cordovaNfcUtil.then(function(nfcUtil){

          console.log( nfcUtil.bytesToString("some bytes") )
        });   
   });
});