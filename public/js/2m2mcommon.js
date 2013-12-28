var bgColors = ['#9f2719', '#ffab24', '#417938','#76c73c', 
'#1d9a70', '#26477d','#3cbbe6', '#51395b', '#a61e2c',
'#ec1c18', '#fc596c','#fe7515', '#f0b706'];
var currentColor = 0;

function startAmbience(timeout) {
    setInterval(function(){
        $('body').css( "background-color", bgColors[currentColor]);
                currentColor = (currentColor + 1) % bgColors.length;
    }, timeout);
}