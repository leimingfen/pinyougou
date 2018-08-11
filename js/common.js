$(function(){
  // 声明一个变量储存接口的url 用于后面更改接口方便更新
  var url="http://api.pyg.ak48.xyz/";
  // 模板里面得到接口 拼接图片的接口
  template.defaults.imports.iconUrl =url;
  // 声明一个发送请求的个数
  var ajaxNums=0;
  // 拦截器 beforeSend会在发送请求之前被调用
  $.ajaxSettings.beforeSend=function(xhr,obj){
    // 拼接接口api
    obj.url=url+"api/public/v1/"+obj.url;
  // 发送请求之前 让body拥有wait这个类
  ajaxNums++;
  $('body').addClass('wait');
  }
  //数据回来之后body移除这个类wait
  $.ajaxSettings.complete=function(){
    ajaxNums--;
    if(ajaxNums==0){
      $('body').removeClass('wait');
    }
  }
})