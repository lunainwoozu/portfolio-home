'use strict';

  let idx = 100;

  function openWindow(num){
    let window = $('.w'+num);
    window.removeClass('closed');
  }

  $(function(){
    if( window.innerWidth > 768 ){
      $('.window').draggable({disabled: false, handle: ".title", containment:"parent"}).mousedown(function(){
        $(this).css('z-index', idx);
        idx++;
      });

      // $('.window.playlist').draggable({handle: ".title", containment: "#wrap"}).mousedown(function(){
      //   $(this).css('z-index', idx);
      //   idx++;
      // });

      $('.closebtn').click(function () {
        $(this).closest('.window').addClass('closed');
      });
    } else {
      $('.window').draggable({disabled: true});
      $('.closebtn').off("click");
    }
  });

  $(window).resize(function(){
    if( window.innerWidth > 768 ){
      $('.window').draggable({disabled: false, handle: ".title", containment:"parent"}).mousedown(function(){
        $(this).css('z-index', idx);
        idx++;
      });

      // $('.playlist').addClass('window');
      // if($('.playlist').hasClass('window')){
      //   return;
      // }

      $('.closebtn').click(function () {
        $(this).closest('.window').addClass('closed');
      });

      $('.window').removeClass('closed').removeClass('mobile');
    } else {
      $('.window').draggable({disabled: true});

      $('.window').removeClass('closed');
      $('.closebtn').off("click");
    }
  });