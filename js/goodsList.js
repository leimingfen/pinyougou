$(function () {
  var Arr;
  var Scroll;
  init();
  // 初始化代码
  function init() {
    //屏幕自适应
    getHTML();
    //获取数据渲染 渲染左边
    getCategories();
    //点击渲染右邊對應id的數據
    gitliftTap();
  }

  // 屏幕自适应
  function getHTML() {
    var htmlfz = 100;
    var docwidth = 375;
    var Width = document.querySelector('html').offsetWidth;
    var fz = Width * htmlfz / docwidth;
    document.querySelector('html').style.fontSize = fz + 'px';
  }
  // 进入页面加载屏幕自适应
  onresize = function () {
    getHTML();
  }

  //获取数据
  function getCategories() {
    $.get("categories", function (res) {
      // console.log(res);
      var html = template('left', {
        item: res.data
      })
      $('.left ul').html(html)
      // scroll插件
      Scroll = new IScroll('.left');
      Arr = res.data;
      // console.log(Arr);


      getrightdata(0)
    })
  }



  function gitliftTap() {
    //给左边的li 注册委托点击事件
    $('.left ul ').on('tap', 'li', function () {
      // console.log(123);
      //獲取當前索引
      var index = $(this).data("index");
      //  var index=this.dataset.index;
      Scroll.scrollToElement(this);
      // 让自己添加一个类名 其他兄弟元素隐藏这个类名
      $(this).addClass('active').siblings().removeClass('active');
      //渲染右边
      getrightdata(index);
    })
  }


function getrightdata(index) {
  var arr = Arr[index].children;
  // 右邊
  var html = template('right', {
    item2: arr
  })
  //  console.log(Arr[0].children);
  $('.right_wai').html(html)
  // scroll插件
  var num = $('.right_wai img').length;
  console.log(num);
  $('.right_wai').on("load", function () {
    num--;
    if (num == 0) {
      // console.log(num);
      // console.log(123123123);
      
    new IScroll('.right');
    }
  })
}
})