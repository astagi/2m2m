function remainingCharsCtrl($scope) {
    $scope.getRemainingChars = function(){
        if (!$scope.message)
            return 40;
        return 40 - $scope.message.length;
    };
}

$("#sendMessageForm").submit(function( event ) {
    event.preventDefault();
    var $form = $( this ),
        mess = $form.find( "input[name='message']" ).val(),
        url = $form.attr( "action" );
    $form.attr("disabled", true);
    var posting = $.post( url, { message: mess } );
    posting.done(function( data ) {
        $("#sendMessageResult").show().html("Message sent!").delay(2000).fadeOut(400);
    });
    posting.fail(function( data ) {
        $("#sendMessageResult").show().html("An error occurred! Please try again!").delay(2000).fadeOut(400);
    });
    posting.always(function( data ) {
        $form.attr("disabled", false);
    });
});