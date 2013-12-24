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

var bgColors = ['#FF0000', '#FFFFFF', '#33CCFF'];
var currentColor = 0;

function CountdownCtrl($scope,$timeout) {
    $scope.onTimeout = function(){
        var target = new Date(2014, 0, 0, 24, 0, 0, 0);
        var now = new Date();
        var seconds_left = (target - now) / 1000;
        days = parseInt(seconds_left / 86400);
        seconds_left = seconds_left % 86400;
         
        hours = parseInt(seconds_left / 3600);
        seconds_left = seconds_left % 3600;
          
        minutes = parseInt(seconds_left / 60);
        seconds = parseInt(seconds_left % 60);
        $scope.counter = formatTime(days, hours, minutes, seconds);
        if (seconds == 0) {
            $('body').css( "background-color", bgColors[currentColor]);
            currentColor = (currentColor + 1) % bgColors.length;
        }
        mytimeout = $timeout($scope.onTimeout,1000);
    }
    var mytimeout = $timeout($scope.onTimeout,0);        
}