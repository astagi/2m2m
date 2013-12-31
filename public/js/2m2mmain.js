function formatTime($days, $hours, $minutes, $seconds) {
    $result = "";
    if ($days < 10)
        $result += "0";
    $result += $days;
    $result += "d ";
    if ($hours < 10)
        $result += "0";
    $result += $hours;
    $result += "h ";
    if ($minutes < 10)
        $result += "0";
    $result += $minutes;
    $result += "m ";
    if ($seconds < 10)
        $result += "0";
    $result += $seconds;
    $result += "s";
    return $result;
}

function CountdownCtrl($scope,$timeout) {
    $scope.onTimeout = function(){
        var target = new Date(2014, 0, 0, 24, 0, 0, 0);
        //TEST TARGET var target = new Date(2013, 11, 31, 3, 33, 0, 0);
        var now = new Date();
        var seconds_left = (target - now) / 1000;
        if(seconds_left <= 0) {
            $("#counterSpace").hide();
            $scope.counter = "Happy New Year";
            $("#counterSpace").fadeIn(400);
            return;
        }
        days = parseInt(seconds_left / 86400);
        seconds_left = seconds_left % 86400;
         
        hours = parseInt(seconds_left / 3600);
        seconds_left = seconds_left % 3600;
          
        minutes = parseInt(seconds_left / 60);
        seconds = parseInt(seconds_left % 60);
        $scope.counter = formatTime(days, hours, minutes, seconds);
        mytimeout = $timeout($scope.onTimeout,1000);
    }
    var mytimeout = $timeout($scope.onTimeout,0);        
}

var messages = [];
var currentMessage = 0;

setInterval(function(){
    $.get( "messages/list", "application/json", function( data ) {
        messages = data.messages;
        console.log(messages);
        //display current message
        currentMessage = (currentMessage + 1) % messages.length;
        $("#currentMessage p").hide().html(messages[currentMessage]).fadeIn('slow');
    }, "json" );
}, 3000);
