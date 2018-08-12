$(function () {
  // 声明一个全局变量 公共多少页
  var Total = 1;
  //要穿的参数 是数组
  var searchObj = {
    query: '',
    cid: getValue('cid'),
    pagenum: 1,
    pagesize: 5
  }
  init()
  // 初始化
  function init() {
    gitHTML();
    mui.init({
      pullRefresh: {
        container: ".pyg_view",
        down: {
          auto: true,
          //  触发下拉刷新时自动触发
          callback: function () {
            //下拉刷新 重置里面的数据 只显示几条
            $('.pyg_view ul').html('')
            //页数也变成最开始的默认值1
            searchObj.pagenum=1;
            // 获取数据
            getSerch(function () {
              // 结束下拉刷新
              mui('.pyg_view').pullRefresh().endPulldownToRefresh();
                // 重置 组件
            mui('.pyg_view').pullRefresh().refresh(true);
            })
          }
        },
        up: {
          //  触发上拉刷新时自动触发
          callback: function () {
            //判断页数是否加载完 否则searchObj.pagenum++ 
            if (searchObj.pagenum >= Total) {
              // 结束上拉加载更多 如果没有数据 传入 true 否则 传入 false
              mui('.pyg_view').pullRefresh().endPullupToRefresh(true);
              return;
            }else{
              // 页数++
              searchObj.pagenum++;
              // 页数++之后追加数据
              getSerch(function () {
                // 结束上拉加载更多 如果没有数据 传入 true 否则 传入 false
                mui('.pyg_view').pullRefresh().endPullupToRefresh();
              })
            }
          }
        }
      }
    });
  }
  // 获取数据
  function getSerch(callback) {
    $.get('goods/search', searchObj, function (res) {
      console.log(res);
      //获取总页数
      Total = Math.ceil(res.data.total / searchObj.pagesize);
      console.log("总页数" + Total);
      //渲染模板
      var html = template('search', {
        item: res.data.goods
      });
      $('.pyg_view ul').append(html)
      callback && callback();
    })
  }
  //获取url的值
  function getValue(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  }














  // 自适应
  function gitHTML() {
    //基础值
    var htmlfz = 100;
    // 文档宽
    var docwidth = 375;
    var htmlwidth = document.querySelector('html').offsetWidth;
    console.log(htmlwidth);
    var fz = htmlwidth * htmlfz / docwidth;
    document.querySelector('html').style.fontSize = fz + 'px';
    // console.log(document.querySelector('html').style.fontSize);
  }
window.onresize=function(){
  gitHTML();
}




















})