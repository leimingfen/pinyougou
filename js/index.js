$(function () {
  init();
  // 初始化代码
  function init(){
    //轮播图
    slides();
    //导航
    index_nav();
    //商品列表
    index_goodslist();
  }



  //轮播图
  function slides() {
    $.get('home/swiperdata',function(res){
      var html=template('index_slider',{item:res.data})
      $('.mui-slider').html(html);
      // 初始化自动轮播
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
      });
    })
   
  }
  //导航
  function index_nav(){
    $.get("home/catitems",function(res){
      var html=template('index_nav',{item:res.data})
      $('.index_nav').html(html);
    })
  }
  //商品列表
  function index_goodslist(){
    $.get("home/goodslist",function(res){
      // console.log(res);
      
      var html=template('index_goodslist',{item:res.data})
      $('.index_goodslist').html(html);
    })
  }




})