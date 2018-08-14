$(function () {

  var Obj;
  init();
  // 初始化
  function init() {
    getGoods()
    eventList();
  }
  //获取数据
  function getGoods() {
    $.get('goods/detail', {
      goods_id: $.getURLValue("goods_id")
    }, function (res) {
      console.log(res);
      Obj = res.data;
      var html = template('goods_detail', {
        item: res.data
      })
      $('.pyg_view').html(html);
      //获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
      });
      // $('header').on('tap','a',function(){
      //   location.href=this.href+res.data.cat_id;
      // })
    })
  }

  function eventList() {
    $('.add_btn').on('tap', function () {
   
      if(!$.isLogin()){
        mui.toast('未登录');
        // 把获取到的数据存到本地储存中
        sessionStorage.setItem('pageName',location.href)
        setTimeout(function () {
          location.href = "/pages/login.html";
        }, 1000);
        return; 
      }
      obj = {
        goods_number: Obj.goods_number,
        goods_id: Obj.goods_id,
        cat_id: Obj.cat_id,
        goods_name: Obj.goods_name,
        goods_price: Obj.goods_price,
        goods_small_logo: Obj.goods_small_logo,
        goods_weight: Obj.goods_weight
      }
      var token = $.token();

      console.log(token);

      $.ajax({
        url: "my/cart/add",
        type: "post",
        data: {
          info: JSON.stringify(obj)
        },
        headers: {
          Authorization: token
        },
        success: function (res) {
          console.log(res);
          if (res.meta.status == 401) {
            mui.toast('登录未成功')
            sessionStorage.setItem("pageName",location.href);
            setTimeout(function(){
              location.href = "/pages/login.html"
            },1000)
          } else if (res.meta.status == 200) {
            // mui.toast(res.meta.msg);
            mui.confirm("是否跳转到购物车页面", "添加成功", ["跳转", "取消"], function (etype) {
              if (etype.index == 0) {
                location.href = "/pages/cart.html"
              } else if (etype.index == 1) {
                // 不跳转
              }
            })
          }
        }
      })
    })
  }
})