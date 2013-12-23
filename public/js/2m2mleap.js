var controller = new Leap.Controller();
var play = true;

controller.on('connect', function() {
    console.log("Leap connected")
});

controller.on('ready', function() {
    console.log("Leap ready")
})

controller.loop(function(frame) {
    if (!play && frame.hands.length == 0) {
        $('#carousel').trigger('play',true);
        play = true;
    } else if (play && frame.hands.length == 1) {
        $('#carousel').trigger('stop');
        play = false;
    }
});