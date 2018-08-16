$(function () {
  init()

  function init() {
    if (!$.isLogin()) {
      // 重新跳转到登录页面
      $.setSession();
      location.href = "/pages/login.html"
      return;
    } else {
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
        // 获取li标签 
        var lis = $(".indent li");
        console.log(lis);
        //判断有没有li标签
        if (lis.length == 0) {
          mui.toast('您还未购买过商品哦')
          return;
        }
        // 里面的data值
        var infos = {};
        for (var i = 0; i < lis.length; i++) {
          var li = lis[i];
          //获取没被选择的li的自定义属性 
          var obj = $(li).data('obj');
          //让数量的值 赋值给li标签里面的自定义属性的页码
          obj.amount = $(li).find('.g_nums').val();
          // 获取到的自定义属性存到infos里面
          infos[obj.goods_id] = obj;
        }
        //渲染页面 
        $.ajax({
          url: "my/cart/sync",
          type: "post",
          data: {
            // infos里面存的是对象   要求传递的是字符串 所以必须要转成字符串的形式 JSON.stringify
            infos: JSON.stringify(infos)
          },
          headers: {
            "Authorization": $.token()
          },
          success: function (res) {
            console.log(res);
            if (res.meta.status == 200) {
              // 提示信息
              mui.alert('编辑成功');
              //获取数据 渲染页面
              getGoodsData();
            } else {
              mui.toast(res.meta.msg)
            }
          }
        })
      }
    })
    // 点击 + - 按钮  //注册点击事件 动态渲染的数据 必须从外面拿$(".indent")
    $(".indent").on("tap", "button", function () {
      getGoodsPrice()
    })
    //点击删除按钮
    $('#delete_btn').on('tap', function () {
      // 判断li里面是否有checded 
      var check_box = $("[name='checkbox']:checked");
      //判断要删除的个数
      if (check_box.length != 0) {
        mui.confirm("确定要删除吗？", '警告', ["确定", '取消'], function (etype) {
          if (etype.index == 0) {
            console.log("确定");
            //拿到没被选择的父元素的自定义属性data
            var lis = $(" [name='checkbox']").not(":checked").parents('li');
            // 定义一个空对象用于传送到后台
            var infos = {};
            for (var i = 0; i < lis.length; i++) {
              var li = lis[i];
              //获取没被选择的li的自定义属性 
              var obj = $(li).data('obj');
              // 获取到的自定义属性存到infos里面
              infos[obj.goods_id] = obj;
            }

            //发送请求 渲染页面
            $.ajax({
              url: "my/cart/sync",
              type: "post",
              data: {
                // infos里面存的是对象   要求传递的是字符串 所以必须要转成字符串的形式 JSON.stringify
                infos: JSON.stringify(infos)
              },
              headers: {
                "Authorization": $.token()
              },
              success: function (res) {
                console.log(res);
                if (res.meta.status == 200) {
                  // 提示信息
                  mui.alert('删除成功', '可惜了，又要重新挑选了');
                  //获取数据 渲染页面
                  getGoodsData();
                } else {
                  mui.toast(res.meta.msg)
                }
              }
            })


          } else if (etype.index == 1) {
            console.log("取消");
          }
        })
      } else {
        mui.alert("请选中商品再删除", '未选中商品', "确定")
      }
    })
    // 点击生成订单
    $('.site_prices').on('tap',function(){
      //
      // 构造参数
    var order_price=$(".deliverySite").find('.g_prices').text();
    var orderObj={
      order_price:order_price,
      consignee_addr:"广州天河区吉山村",
      goods:[]
    }
    //获取li标签里面的自定义参数的值 push到goods的值里面
    var lis=$(".indent li");
      for (var i = 0; i < lis.length; i++) {
      var li = lis[i];
      //获取每一个li的自定义属性
      var dataObj=$(li).data('obj')
      // id号
      var goods_id=dataObj.goods_id;
      // 每个li的产品个数
      var goods_number=$(li).find('.g_nums').val();
      //单价
      var goods_price=dataObj.goods_price;
      console.log(goods_price);
      
      var goodsobj={
        goods_id:goods_id,
        goods_number:goods_number,
        goods_price:goods_price
      }
      orderObj.goods.push(goodsobj);
    }
      //获取参数 发送请求 跳转页面
      $.ajax({
        url:"my/orders/create",
        type:'post',
        headers:{
          "Authorization" : $.token()
        },
        data:orderObj,
        success:function(res){
          if(res.meta.status==200){
            mui.alert('创建订单成功');
            setTimeout(function(){
              location.href=" /pages/orders.html";
            },1000)
          }else{
            mui.toast(res.meta.msg)
          }
          
        }
       
      })
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
        if (res.meta.status == 200) {
          // 判断有没有
          if (res.data.cart_info) {
            var cart_info = JSON.parse(res.data.cart_info);
          }
          //渲染页面
          var html = template('cart_info', {
            cart_info: cart_info
          })
          $('.indent ul').html(html)
          getGoodsPrice()
          //初始化数字按钮
          mui(".mui-numbox").numbox()
        } else {

        }
      }
    })
  }
  //获取商品价格
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
    $(".g_prices").text(Total)
  }


//获取参数 用于点击生成订单
  function getdata(orderObj) {
   
    return orderObj;
  }
})