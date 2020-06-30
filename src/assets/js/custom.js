$(document).ready(function () {
  // Read the cookie and if it's defined scroll to id
  var scroll = $.cookie('scroll');
  if(scroll){
      scrollToID(scroll, 1000);
      $.removeCookie('scroll');
  }

  // Handle event onclick, setting the cookie when the href != #
  $('.navbar .navbar-nav a.nav-link').click(function (e) {
      e.preventDefault();
      var id = $(this).data('id');
      var href = $(this).attr('href');
      if(href === '#'){
          scrollToID(id, 1000);
      }else{
          $.cookie('scroll', id);
          window.location.href = href;
      }
  });

  // scrollToID function
  function scrollToID(id, speed) {
      var offSet = 70;
      var obj = $('#' + id);
      if(obj.length){
        var offs = obj.offset();
        var targetOffset = offs.top - offSet;
        $('html,body').animate({ scrollTop: targetOffset }, speed);
      }
  }
});


$(function () {
  $(".numbers-row .valueButton").on("click", function () {
    var $button = $(this);
    var oldValue = $button.parent().find("input").val();
    if ($button.attr('data-type') == "plus") {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      // Don't allow decrementing below zero
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    $button.parent().find("input").val(newVal);
  });
});

$(".sidebarDropdown__toggle").click(function () {
  $(this).toggleClass('open');
  // $('.responsivedropdown').hide();
  $(this).next(".sidebarDropdown__content").slideToggle("100");
});




$(document).ready(function () {
  // This will fire each time the window is resized:
  if ($(window).width() <= 767) {

    $(".mainSidebar__title").click(function () {
      $(this).toggleClass('open');
      // $('.responsivedropdown').hide();
      $(this).next(".responsivedropdown").slideToggle("100");

    });

    $('.clickToggle').click(function () {
      $(this).next(".nav.nav-tabs").slideToggle(200);
      $(this).parent('.tabToggle--mobile').siblings().find(".nav.nav-tabs").slideUp(200);
    });

  }

  $(".clickToggle").click(function () {
    $(".clickToggle img").toggleClass("rotate");
  });

});


$(document).ready(function () {
  var nav = $('.navbar');




  $(document).on('click', ".navbar-toggler.forMenu", function () {
    $('.navbar').toggleClass('fixed-mop');
    $('.navbar-collapse').toggleClass("show");
    $('.menuToggle').toggleClass("showMenu"); 
  });
  $(document).on('click', ".navbar-toggler.showMenuBag", function () {
    $('.navbar').removeClass('fixed-mop');
    $(".shoppopup").removeClass("open");
    $(".navbar-toggler").removeClass("showMenuBag");
    $(".navbar-toggler").addClass("forMenu");
    $(".mybagopnbtn").removeClass("hideme");
    $(".menuToggle").removeClass("showMenu");
  });

  $(".mybagopnbtn").click(function () { 
    $('.navbar-collapse').removeClass("show");
    $(".mybagopnbtn").addClass("hideme");
    $(".shoppopup").toggleClass("open");
    $(".navbar-toggler").removeClass("forMenu");
    $(".navbar-toggler").addClass("showMenuBag");
    $('.navbar').toggleClass('fixed-mop');
  });

  
  $(".closeShoppopup").click(function () {
    $(".shoppopup").removeClass("open");
  });
  
  //1 Bag
  $("#checkoutBagShow").hide();
  $("#checkoutBag").click(function(){
    $("#checkoutBagShow").show();
    $("#myBag").hide();
  });
  //2 Bag
  $("#loginBagShow").hide();
  $("#loginBag").click(function(){
    $("#loginBagShow").show();
    $("#checkoutBagShow").hide();
  });
  //3 Bag
  $("#checkoutLoggedInShow").hide();
  $("#checkoutLoggedIn").click(function(){
    $("#checkoutLoggedInShow").show();
    $("#loginBagShow").hide();
  });
  //4 Bag
  $("#orderConfirmationPaymentShow").hide();
  $("#orderConfirmationPaymentClick").click(function(){
    $("#orderConfirmationPaymentShow").show();
    $("#checkoutLoggedInShow").hide();
    $("#checkoutBagShow").hide();    
  });
  //5 Bag
  $("#orderConfirmationPaymentShow").hide();
  $("#orderConfirmationPayment").click(function(){
    $("#orderConfirmationPaymentShow").show();
    $("#checkoutLoggedInShow").hide();
  });
  //6 Bag
  $("#shippingAddressShow").hide();
  $("#shippingAddress").click(function(){
    $("#shippingAddressShow").show();
    $("#orderConfirmationPaymentShow").hide();
  });
  //7 Bag
  $("#orderConfirmationPaymentShow").hide();
  $("#orderConfirmationPayment2").click(function(){
    $("#orderConfirmationPaymentShow").show();
    $("#shippingAddressShow").hide();
  });
  //8 Bag
  $("#bagFinishShow").hide();
  $("#bagFinish").click(function(){
    $("#bagFinishShow").show();
    $("#shippingAddressShow").hide();
    $("#orderConfirmationPaymentShow").hide();
  });

});

// animation on scroll ends here

// navbar colr change on scroll

$(window).scroll(function () {
  var nav = $('.navbar');
  var bag = $('#addtobag');
  var top = 20;
  if ($(window).scrollTop() >= top) {
    nav.addClass('fixed');
    bag.addClass('attatch');
  } else {
    nav.removeClass('fixed');
    bag.removeClass('attatch');
  }
});


 
// togglebtn
function playVideo(e) {
  var nowPlaying;
  $(e).parents('.form-row').find(".videosection__videohldr").removeClass('active');
  $(e).parents('.form-row').find(".videosection__videohldr").find('iframe').attr('src', nowPlaying);
  $(e).toggleClass('active')
  nowPlaying = $(e).find('iframe').attr('src');
  $(e).find('iframe').attr('src', nowPlaying + '&autoplay=1');
}

$('.grid').masonry({
  // options...
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true
});



$(document).ready(function () {
  $('#bcktp').click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
 
});
 
$('#arrow').bind('click', function (event) {
  var $anchor = $(this);
  $('html, body').stop().animate({
    scrollTop: $($anchor.attr('href')).offset().top - $(".navbar").outerHeight()
  }, 1000, 'swing');
  event.preventDefault();
});


$(document).ready(function () {
  $('.productSliderCntnt__btn, .upcomingEvent__ul li a, .scrolltopbtn').on('click', function (event) {

    event.preventDefault();
    var target = this.hash,
      menu = target;
    $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top - 80
    }, 1200, 'swing', function () {
      $(document).on("scroll", onScroll);
    });
  });
}); 

 

// productSlider
$('.productSlider').slick({
  dots: true,
  arrows: false,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  adaptiveHeight: true,
});
$('.slick_prev').click(function () {
  $(".productSlider").slick('slickPrev');
});




 