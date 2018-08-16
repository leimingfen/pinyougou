$(function () {
  init()

  function init() {
    //判断本地储存是否有token 没有跳回登录页面获取token
    if (!$.isLogin()) {
      // 重新跳转到登录页面
      $.setSession();
      location.href = "/pages/login.html"
      return;
    } else {
      $('body').fadeIn();
    }
    getOrders();
    eventList();
  }

  // 获取数据
  function getOrders() {
    $.ajax({
      url: "my/users/userinfo",
      type: 'get',

      headers: {
        "Authorization": $.token()
      },
      success: function (res) {
        console.log(res);
        if (res.meta.status == 200) {
          var html = template('me', {
            data: res.data
          });
          $(".userinfo").html(html);
        } else {
          mui.toast(res.meta.msg)
        }
      }
    })
  }
  // 事件
  function eventList() {
    //点击退出按钮
    $(".loginOut_btn").on("tap", "button", function () {
      console.log(12312);
      //记录当前位置 防止用户在登陆 
      $.setSession();
      //清除本地储存
      $.removelocal();
      //跳转到登录页面
      location.href = "/pages/login.html"
    })
  }
})