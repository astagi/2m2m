$(function() {
    var old_array = [];
    var $c = $('#carousel'),
        $w = $(window);

    $c.carouFredSel({
            direction: 'up',
            items: 1,
            auto: true,
        scroll: {

            delay: 3000,
            onAfter: function( data ) {
                $.get( "photos/list", "application/json", function( data ) {
                    var images = "";
                    var diff = [];
                    if (old_array.length != 0)                    
                        diff = $(data.photos).not(old_array).get();
                    console.log(diff);
                    for (var i = 0 ; i < diff.length ; i++) {
                        images = "<div><img id='img" + i + "' src='photos/thumbs/" + diff[i] + "' alt='img'/></div>";
                        $('#carousel').trigger( 'insertItem', [$(images), 1, false] );
                    }
                    old_array = data.photos;
                    console.log(images);
                }, "json" );
                console.log("Timeout");
            }
        }
    });

    
    $w.bind('resize.example', function() {
        var nw = $w.width();
        if (nw < 990) {
            nw = 990;
        }

        $c.width(nw * 3);
        $c.parent().width(nw);

    }).trigger('resize.example');

});