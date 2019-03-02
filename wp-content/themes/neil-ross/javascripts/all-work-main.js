// A $( document ).ready() block.
$( document ).ready(function() {
     // $('.marquee').addClass('in').delay( 320000 );
});

$(document).ready(function() {

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
      var  b = w.innerWidth || e.clientWidth || g.clientWidth;
    if (Modernizr.mq('only screen and (min-width: 550px)')) {

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
       var tw = tw/2;
    // $('#spotlight').css({
    //     'border-width': t + 'px '+ tw + 'px ' + '0px ' + tw + 'px',
    //     'bottom' : m + 'px'
    // });
// set light beam height

    $('#shape-container').css({
        
        'height': t + 'px',
       
    });
    //  $('#bg').css({
    //     'width': u +'px',
    //     'height': t + 'px',
       
    // });



// Calculate the triangle points relative to viewbox dimensions
  quarterW = u / 4;
  halfW = u / 2;
  halfH = t /2;
var bmbPt =  125;

 pt1 = quarterW + ",0";
 pt2 = halfW+quarterW +",0";
 pt3 = halfW + "," + t;
var allPts = pt1 +" "+ pt2 + " "+pt3;
 
    // work with the svg triangle 
// canvas = document.getElementsByTagName("svg")[0];
// canvas.setAttribute("viewBox", "0 0 "+ u +" "+ t);

// function drawPoly(points) {

//     var poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
//     poly.setAttribute("points", points);
     
   
//     return poly;
// }

// function create() {
//     var clip = document.getElementById("shape-top");
//     var poly = drawPoly(allPts, "#000000");
//     clip.appendChild(poly);
// }

// create();

// function modTriangle {
//     var tri = document.getElementById("triangle");

// }


// function dropBomb() {
//   var tmax_tl = new TimelineMax({
//         delay: 0.1675,
//         repeat: -1 
//       });
  
  var bmb =  $('#bmb');
  var bmb_speed = 1.75;
  var bmb_from = {
    y: -150
  };

  // use t
  var bmb_to = {
    y: 600,
    ease: Linear.easeOut
  };
    
//   tmax_tl.fromTo(bmb, bmb_speed, bmb_from, bmb_to, 0);
  
//   return tmax_tl;
// }

// dropBomb();
// var light = $('#lightcanvas');
// var bmb =  $('#bmb');

var bmb =  $('#bmb'),
    line =  $('#line'),
    bg =  $('#bg'),
    triangle =  $('#triangle'),
    tl;
tl = new TimelineMax();
var Npoints= "480,560 720,0 480,0 240,0";

// tl.set(bmb, {autoAlpha: 0});
tl.to(triangle, 2,{opacity: 1})
    .fromTo(bmb, bmb_speed, bmb_from, bmb_to, 0)
    .to("#hero", 0, {css:{className:'+=bg'}})
    .to("#container", 2, {css:{className:'+=dark'}})  
    // .to("body", 0, {css:{className:'+=brdr-black'}})
    // .to("#container", 0, {css:{className:'+=out'}});
    


  //tl.fromTo(bmb, bmb_speed, bmb_from, bmb_to, 0)






    }; // MQ  550

     //Fancy label scripts
        $("input.floatlabel, textarea.floatlabel").focus(function() {
        $(this).next('label').addClass("active")
    });
    $("input.floatlabel, textarea.floatlabel").focusout(function() {
        var inputContent = $(this).val();
        if (inputContent !== '') {
            $(this).next('label').addClass('has-content');
        } else {
            $(this).next('label').removeClass('has-content');
        }
        $(this).next('label').removeClass("active")

    });

    });