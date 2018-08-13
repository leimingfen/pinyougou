$(function () {
  init();
  // 初始化
  function init() {
    getGoods()
  }
  //获取数据
  function getGoods() {
    $.get('goods/detail', {
      goods_id: $.getURLValue("goods_id")
    }, function (res) {
      console.log(res);
      
     var html=template('goods_detail',{item:res.data})
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


})