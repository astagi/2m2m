$("#sendPhotoForm").submit(function( event ) {
    event.preventDefault();
    var formData = new FormData($('#sendPhotoForm')[0]);
    console.log(formData);
    var $form = $( this ),
        url = $form.attr( "action" );
    $form.attr("disabled", true);
    $.ajax({
        type: "POST",
        url: url,
        data: formData,
        contentType: false,
        processData: false,
        success: function(){  
            $("#sendPhotoResult").show().html("Photo sent!").delay(2000).fadeOut(400);  
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            $("#sendPhotoResult").show().html("An error occurred! Please try again!").delay(2000).fadeOut(400);
        }  
    });
});