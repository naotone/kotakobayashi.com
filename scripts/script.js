(function() {
  var $, Chrome, Firefox, Mac, Opera, Safari, Windows, android, borderWidth, device, iOS, iPad, iPhone, ie10, ie11, ie8, ie9, styling;

  device = navigator.userAgent.toLowerCase();

  Mac = device.match(/(mac)/);

  Windows = device.match(/(windows)/);

  iPhone = device.match(/(iphone|ipod)/);

  iPad = device.match(/(ipad)/);

  iOS = device.match(/(iphone|ipad|ipod)/);

  android = device.match(/(android)/);

  Chrome = device.match(/(chrome)/);

  Safari = device.match(/(safari)/) && !device.match(/(chrome)/) && !device.match(/(iphone|ipad|ipod)/) && !device.match(/(android)/);

  Firefox = device.match(/(firefox)/);

  Opera = device.match(/(opera)/);

  ie11 = device.match(/(msie\ 11\.0)/);

  ie10 = device.match(/(msie\ 10\.0)/);

  ie9 = device.match(/(msie\ 9\.0)/);

  ie8 = device.match(/(msie\ 8\.0)/);

  $ = jQuery;

  if (iPhone || android) {
    borderWidth = 10;
  } else {
    borderWidth = 20;
  }

  $(function() {
    $('h1, p').not('.notAnimate').css({
      y: '20px'
    });
    $('footer').show();
    styling();
    $('h1').delay(3100).transition({
      opacity: 1,
      y: '0px'
    }, 2500, 'easeOutQuint', function() {});
    $('p.mail, p.tel').delay(3400).transition({
      opacity: 1,
      y: '0px'
    }, 2500, 'easeOutQuint', function() {});
    return $('.content p').delay(3700).transition({
      opacity: 1,
      y: '0px'
    }, 2500, 'easeOutQuint');
  });

  $(window).resize(function() {
    return styling();
  });

  styling = function() {
    if ($(html).innerHeight() < $(window).innerHeight()) {
      $('footer').css({
        position: 'absolute',
        bottom: 0,
        left: 0,
        top: 'auto',
        width: '100%'
      });
    } else {
      $('footer').css({
        position: 'relative',
        top: 0,
        left: 0,
        width: '100%'
      });
    }
    $('.bg').css({
      width: htmlWidth,
      height: htmlHeight
    });
    return $('#border').css({
      width: htmlWidth - borderWidth * 2,
      height: htmlHeight - borderWidth
    });
  };

}).call(this);
