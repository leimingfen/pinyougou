$(function () {
  //声明一个对象 穿过去的参数
  var dataObj = {
    query: "",
    cid: $.getURLValue("cid"),
    pagenum: 1,
    pagesize: 5
  }
  var Total = 1;
  // console.log(getValue("cid"));
  init();
  // 初始化代码
  function init() {
    //屏幕自适应
    getHTML();

    mui.init({
      pullRefresh: {
        container: ".pyg_view",
        down: {
          auto: true,
          //  触发下拉刷新时自动触发
          callback: function () {
            // 再次下拉刷新 重新回到初始状态 只显示几条数据
            $('.pyg_view ul').html('');
            dataObj.pagenum = 1;
            //获取数据
            search(function () {
              // 结束下拉刷新
              mui('.pyg_view').pullRefresh().endPulldownToRefresh();
              // 重置 组件 结束上拉刷新的显示
              mui('.pyg_view').pullRefresh().refresh(true);
            });
          }
        },
        up: {
          //  触发上拉刷新时自动触发
          callback: function () {
            // 判断还有没有下一页 有的话dataObj.pagenum++ 
            // 计算总页数 Total/dataObj.pagesize 向上取整
            if (dataObj.pagenum >= Total) {
              // 结束上拉加载更多 如果没有数据 传入 true 否则 传入 false
              mui('.pyg_view').pullRefresh().endPullupToRefresh(true);
              return;
            } else {
              dataObj.pagenum++;
              // 加载之后追加渲染数据
              search(function () {
                // 结束上拉加载更多 如果没有数据 传入 true 否则 传入 false
                mui('.pyg_view').pullRefresh().endPullupToRefresh();
              })
            }
          }
        }
      }
    });

  }


  function search(callback) {
    $.get("goods/search", dataObj, function (res) {
      console.log(res);
      // 计算总页数
      Total=Math.ceil(res.data.total/dataObj.pagesize)
      console.log("总页数"+Total);
      
      // 拿到数据
      var html = template('search', {
        item: res.data.goods
      })
      //渲染
      $('.pyg_view ul').append(html);

      callback && callback();
    })
    // 根据url上的key来获取值

  }




//给a注册点击跳转

$('.pyg_view ul').on('tap','a',function(){
  console.log(123123123123132);
  location.href=this.href;
  
})













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
})