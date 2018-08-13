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

  //zepto拓展 $.函数名(参数)
  $.extend($, {
    getURLValue: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    },

    checkPhone:function (phone) {
      if (!(/^1[34578]\d{9}$/.test(phone))) {
          return false;
      } else {
          return true;
      }
    },
    
    checkEmail:function (myemail) {　　
      var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
      if (myReg.test(myemail)) {　　　　
          return true;　　
      } else {　　　　
          return false;
      }
    }
    

  });

  eventList();
  function eventList(){
    //点击购物车
    $('header').on('tap','.shopping_cart',function(){
      console.log("购物车");
      console.log(this.href);
      
      // location.href=this.href;
      // location.href="/pages/cart.html";
      //获取token 如果有 跳转到购物车页面 
      // 没有跳转登录页面
    })
    $('.header').on('tap','.my_pyg',function(){
      console.log("我的");
      console.log(this.href);
      // location.href=this.href;
      // location.href="/pages/register.html";
      //获取token 如果有 跳转到购物车页面 
      // 没有跳转登录页面
    })
  }
})


