$(function(){
  var GoodsObj;
  init();
  function init(){
    eventList()
  }
  function eventList(){
    $('.login_button').on('tap',function(){
      var username=$("[name='username']").val().trim();
      var password=$("[name='password']").val().trim();
      if(!$.checkPhone(username)){
        mui.toast('用户名不合法')
      }
      if(password.lenght<6){
        mui.toast('密码不合法')
        return;
      }
      //发送请求
      $.post('login',{username:username,password:password},function(res){
        console.log(res);
        GoodsObj=res.data;
        if(res.meta.status==200){
          mui.toast(res.meta.msg)
         
                // 把获取到的数据存到本地储存中
        $.setLocal(GoodsObj);
        setTimeout(function(){
          var pageName=$.getSession();
          if(pageName){
            location.href=pageName;
          }else{
            location.hrer="/index.html"
          }
        },1000)
       
        }else{
          mui.toast(res.meta.msg);
        }
      })
    })
  }
})