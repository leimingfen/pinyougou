$(function(){
  var Arr;
  init();
  function init(){
    gitHTML();
    leftDate()
    leftTap()
  }
  function leftDate(){
    $.get('categories',function(res){
      // console.log(res);
      var html = template('left',{item:res.data})
      $('.left ul').html(html);
      Arr=res.data;
      rightDate(0)
    }) 
  }

  function leftTap(){
    $('.left ul').on('tap','li',function(){
      var index = $(this).data('index');
      // console.log(index);
      $(this).addClass('active').siblings().removeClass('active');
      // sroll弹性滚动
      var leftScroll= new IScroll('.left');
      rightDate(index);
    })
  }
  // rightDate()
function rightDate(index){
  var arr=Arr[index].children;
  // console.log(arr);
  var html1=template('right',{
    item2:arr
  })
  // console.log(html1);
  
  $('.right_wai').html(html1);
}
































    // 自适应
    function gitHTML() {
      //基础值
      var htmlfz = 100;
      // 文档宽
      var docwidth = 375;
      var htmlwidth = document.querySelector('html').offsetWidth;
      // console.log(htmlwidth);
      var fz = htmlwidth * htmlfz / docwidth;
      document.querySelector('html').style.fontSize = fz + 'px';
      // console.log(document.querySelector('html').style.fontSize);
    }
  window.onresize=function(){
    gitHTML();
  }
  
})