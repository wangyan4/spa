$(function(){
  var $icon = $('#icon'),
      $pwd = $('#pwd');
  $icon.mouseover(function(){
    $icon.attr("class","iconfont icon-Eyeblind1");
    $pwd.attr("type","text");
  })
  $icon.mouseout(function(){
    $icon.attr("class","iconfont icon-Eyevision");
    $pwd.attr("type","password");

  })
})