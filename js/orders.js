$(function(){
  init()
  function init(){
    //判断本地储存是否有token 没有跳回登录页面获取token
    if(!$.getLocal()){
      $.setSession();
      location.href="/pages/login.html"
    }
    getOrders();
  }


  function getOrders(){
    $.ajax({
      url:"my/orders/all",
      type:'get',
      data:{
        type:1
      },
      headers:{
        "Authorization" : $.token()
      },
      success:function(res){
        console.log(res);
        if(res.meta.status==200){
          var html=template('orders',{data:res.data});
          $('#item1 ul').html(html);
        }else{
          mui.toast(res.meta.msg)
        }
      }
    })
  }
}) 