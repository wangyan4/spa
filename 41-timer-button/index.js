var $timerButton = (function(){
  var $btn=$('<input class="timer-button" type="button" value="1">'),
      cfg={
        num:10,
        container:"body",
        title:"同意"
      },
      timer;
  function show(conf){
    // 1.DOM draw
    $.extend(cfg,conf);
    $btn.appendTo($(cfg.container));
    
    // 2.event bind
    if(cfg.disable){
      console.log('启用');
      $btn.val(cfg.title);
      $btn.click(function(){
        cfg.onClick();
      })
      return;
    }
    $btn.attr('disabled','disabled');
    $btn.val(cfg.title+'('+cfg.num+'s)');
    if(timer){
      clearInterval(timer);
    }
    timer=setInterval(function(){
      cfg.num--;
      if(cfg.num === 0){
       $btn.val(cfg.title);
        $btn.removeAttr('disabled');
        clearInterval(timer);
      }else{
       $btn.val(cfg.title+'('+ cfg.num +'s)');
      }
    },1000);
    $btn.click(function(){
      cfg.onClick();
    })
  }
  
  return ({
    show:show
  })
})();