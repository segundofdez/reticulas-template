$(function() {

    $('.js-sticky').Stickyfill();

    // State for responsive navigation
    $('.svg-menu').click(function(event){
        $('.page').toggleClass("has-mobile-menu");
        event.preventDefault();
    });

});
