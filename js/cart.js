$(function () {
  init()
  function init() {
    if (!$.isLogin()) {
      // 重新跳转到登录页面
      sessionStorage.setItem("pageName", location.href);
      location.href = "/pages/login.html"
      return;
    }else{
      $('body').fadeIn();
    }
    eventList()
    getGoodsData()
  getGoodsPrice()
  }

  function eventList() {
    // 点击编辑按钮
    $("#upd_btn").on('tap', function () {
      // 让body拥有这个类 切换组件的显示隐藏
      $("#pyg_body").toggleClass("hide_tools");
      //判断body是否拥有这个类 切换编辑按钮文字
      if ($("#pyg_body").hasClass('hide_tools')) {
        $(this).text('完成');
      } else {
        $(this).text('编辑');
      }
    })
    // 点击 + - 按钮  //注册点击事件 动态渲染的数据 必须从外面拿$(".indent")
    $(".indent").on("tap", "button", function () {
      getGoodsPrice()
    })

  }
  //获取数据渲染页面
  function getGoodsData() {
    var token = $.token();
    $.ajax({
      url: "my/cart/all",
      headers: {
        Authorization: token
      },
      success: function (res) {
        console.log(res);
        if(res.meta.status == 200){
          var cart_info = JSON.parse(res.data.cart_info);
          console.log(cart_info);
          //渲染页面
          var html = template('cart_info', {
            cart_info: cart_info
          })
          $('.indent ul').html(html)
          getGoodsPrice()
          //初始化数字按钮
          mui(".mui-numbox").numbox()
        }else{

        }
      }
    })
  }

  function getGoodsPrice() {
    // 声明一个总价
    var Total = 0;
    // 获取到所以li
    var lis = $('.indent li');
    //遍历li
    for (var i = 0; i < lis.length; i++) {
      var li = lis[i];
      // 获取li的自定义属性
      var obj = $(li).data('obj');
      // 获取单价
      var goods_price = obj.goods_price;
      // 获取购买的数量
      var amount = $(li).find(".mui-numbox-input").val();
      Total += goods_price * amount;
    }
    console.log(Total);
    $(".g_prices").text(Total)
  }
})