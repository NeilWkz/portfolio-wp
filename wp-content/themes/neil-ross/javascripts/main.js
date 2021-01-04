// A $( document ).ready() block.

$(document).ready(function() {
    function doOnce() {
        if (!$("body").hasClass("brdr-black")) {
            intro();

        }
        if ($("body").hasClass("contact-go")) {
            goContact();

        }

    }
    doOnce();


    $("#who").click(function() {

        $('html, body').animate({
            scrollTop: $("#about").offset().top
        }, 500);
        $('#about').addClass('play');
        return false;
    });
    // scrolls to the contact form
    function goContact() {
        $('html, body').animate({
            scrollTop: $("#contact").offset().top
        }, 900);
        $('#contact').addClass('play');
    }

    $("#contact-link").click(function() {
        goContact();
        return false;
    });


    $("#yes-cookie").click(function() {
        document.cookie = "noNeilsIntro=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        $("#cookies").removeClass('show');
        return false;
    });
    $("#no-cookie").click(function() {
        $("#cookies").removeClass('show');
        return false;
    });

    function intro() {

        $(window).on('beforeunload', function() {
            $(window).scrollTop(0);
        });
        // Using Pure JS to determine viewport height for full screen first section
        // because of it's blinding Speed
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            y = w.innerHeight || e.clientHeight || g.clientHeight;
        u = w.innerWidth || e.clientWidth || g.clientWidth;
        x = (y - 78) / 2;
        z = y - 78;
        var b = w.innerWidth || e.clientWidth || g.clientWidth;


        //keeps height of home div same as visitor's monitor height
        $('.vp-height').css({
            'height': y + 'px'
        });
        $('.site-height').css({
            'height': z + 'px'
        });

        $(window).resize(function() {
            $('.vp-height').css({
                'height': y + 'px'
            });
            $('.site-height').css({
                'height': z + 'px'
            });

        });
        // Check marquee height
        var m = $('#hero').height();
        var tw = $('#hero').width();
        // subtract marquee height from viewport to find height of triangle
        var t = y - m;
        // triangle border width should be half height
        var tw = tw / 2;

        // set light beam height

        $('#shape-container').css({

            'height': t + 'px',

        });

        // Calculate the triangle points relative to viewbox dimensions
        quarterW = u / 4;
        halfW = u / 2;
        halfH = t / 2;

        pt1 = quarterW + ",0";
        pt2 = halfW + quarterW + ",0";
        pt3 = halfW + "," + t;
        var allPts = pt1 + " " + pt2 + " " + pt3;


        var bmb = $('#bmb');
        var bmb_speed = 1.75;
        var bmb_from = {
            y: -150
        };

        // use t
        var bmb_to = {
            y: 600,
            ease: Linear.easeOut
        };

        var bmb = $('#bmb'),
            line = $('#line'),
            bg = $('#bg'),
            triangle = $('#triangle'),
            tl;
        tl = new TimelineMax();

        // tl.set(bmb, {autoAlpha: 0});
        tl.set(triangle, {
            css: {
                opacity: 0
            }
        });

        tl.to(triangle, 2, {
                opacity: 1
            })
            .fromTo(bmb, bmb_speed, bmb_from, bmb_to, 0)
            .to("#hero", 0, {
                css: {
                    className: '+=bg'
                }
            })
            .to("#container", 2, {
                css: {
                    className: '+=dark'
                }
            })
            .to("body", 0, {
                css: {
                    className: '+=brdr-black'
                }
            })
            .to("#container", 0, {
                css: {
                    className: '+=out'
                }
            })
            .to("#cookies", 0, {
                delay: 3,
                css: {
                    className: '+=show'
                }
            });

    } // intro

    //Fancy label scripts
    $("input.floatlabel, textarea.floatlabel").focus(function() {
        $(this).siblings('.contact_label').addClass("active")
        console.log("focused");
    });
    $("input.floatlabel, textarea.floatlabel").focusout(function() {
      console.log("focusout");
        var inputContent = $(this).val();
        if (inputContent !== '') {
            $(this).next('.contact_label').addClass('has-content');
        } else {
            $(this).next('.contact_label').removeClass('has-content');
        }
        $(this).next('.contact_label').removeClass("active")

    });

    // delagate fancy label script
//     $('body').on('focusin focusout', 'input.floatlabel', function(event){
//     if(event.type === 'focusin'){
//        $(this).next('label.contact_label').addClass("active")
//     }else if(event.type === 'focusout'){
//          var inputContent = $(this).val();
//         if (inputContent !== '') {
//             $(this).next('label.contact_label').addClass('has-content');
//         } else {
//             $(this).next('label.contact_label').removeClass('has-content');
//         }
//         $(this).next('label.contact_label').removeClass("active")
//     }
// });

     if ($('#contact-form').length){
        $('#contact-form').validate({
           submitHandler: function(){

               $.ajax({
                   url: $('#contact-form').attr('action'),
                   method: 'POST',
                   data: $('#contact-form').serialize(),
                   dataType: 'json',
                   success: function(data) {
                    window.location = '/thankyou.html';
                   },
                   error: function(err) {
                       alert('Sorry, there was an error while submitting your details. Please try again later');
                   }
               });

           }
        });

        $('#contact-form').submit(function(){
           return false;
        });
    }

});
