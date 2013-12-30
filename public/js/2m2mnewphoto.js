$("#sendPhotoForm").submit(function( event ) {
    event.preventDefault();
    var $form = $( this ),
        mess = $form.find( "input[name='message']" ).val(),
        url = $form.attr( "action" );
    $form.attr("disabled", true);
    var posting = $.post( url, { message: mess } );
    posting.done(function( data ) {
        $("#sendPhotoResult").show().html("Photo sent!").delay(2000).fadeOut(400);
    });
    posting.fail(function( data ) {
        $("#sendPhotoResult").show().html("An error occurred! Please try again!").delay(2000).fadeOut(400);
    });
    posting.always(function( data ) {
        $form.attr("disabled", false);
    });
});