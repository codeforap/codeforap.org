$('document').ready(function() {
var topRange = 250, // measure from the top of the viewport to X pixels down
edgeMargin = 5, // margin above the top or margin from the end of the page
animationTime = 250, // time in milliseconds
contentTop = [];

$(document).ready(function() {

 // Stop animated scroll if the user does something
    $('html,body').bind('scroll mousedown DOMMouseScroll mousewheel keyup', function(e) {
        if (e.which > 0 || e.type == 'mousedown' || e.type == 'mousewheel') {
            $('html,body').stop();
        }
    })
    // Set up content an array of locations
    $('.mnav').find('a').each(function() {
        contentTop.push($($(this).attr('href')).offset().top);
    })
    // Animate menu scroll to content
    $('.mnav').find('a').click(function() {			
        var sel = this, newTop = Math.min(contentTop[ $('.mnav a').index($(this))], $(document).height() - $(window).height());
        // get content top or top position if at the document bottom
        $('html,body').stop().animate({								
            'scrollTop' : newTop-1
        }, animationTime, function() {
            window.location.hash = $(sel).attr('href');
            $('html,body').scrollTop(newTop-1);
        });
        return false;
    })
    // adjust  menu
    $(window).scroll(function() {
        var winTop = $(window).scrollTop(), bodyHt = $(document).height(), vpHt = $(window).height() + edgeMargin;
        // viewport height + margin
        $.each(contentTop, function(i, loc) {
            if ((loc > winTop - edgeMargin && (loc < winTop + topRange || (winTop + vpHt ) >= bodyHt ) )) {
                $('.mnav a').removeClass('selected').eq(i).addClass('selected');
            }
        })
    })
})
  });
$(document).ready(function() {
$(window).scroll(function() {
    var scrollTop = 0;
    if ($(window).scrollTop() >= scrollTop) {
        $('.mnav').addClass('fixed');
    }
    if ($(window).scrollTop() < scrollTop) {
        $('.mnav').removeClass('fixed');
			}
})
});