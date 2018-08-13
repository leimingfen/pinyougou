$(function(){
  init();
  function init(){
    eventList()
  }

  function eventList(){
    // 点击获取验证码
    $('.code_btn').on('tap',function(){
      // console.log(123);
      //判断手机号码是否合法
     var mobile= $("[name='mobile']").val().trim();
    //  console.log(mobile);
     if(!$.checkPhone(mobile)){
       mui.toast('手机号码不合法');
       return;
     }
     //发送请求获取验证码
     $.post('users/get_reg_code',{mobile:mobile},function(res){
      console.log(res);
      if(res.meta.status==200){
        var time=5;
       var timeId= setInterval(function(){
          time--;
          $('.code_btn').text(time+'秒后再获取验证码').attr("disabled","disabled");
          if(time==0){
            clearInterval(timeId);
            $('.code_btn').text('获取验证码').removeAttr("disabled");
          }
        },1000)
      }else{
        mui.toast(res.meta.msg);
      }
     })
    })
    //点击注册按钮 
    $('.login_button').on('tap',function(){
      //获取form表单里面的值
      var mobile=$("[name='mobile']").val().trim();
      var code=$("[name='code']").val().trim();
      var email=$("[name='email']").val().trim();
      var pwd=$("[name='pwd']").val().trim();
      var pwd1=$("[name='pwd1']").val().trim();
      var gender=$("[name='gender']:checked").val();
      console.log(gender);
      
      //判断手机号码
      // console.log(mobile);
      if(!$.checkPhone(mobile)){
        mui.toast('手机号码不合法');
        return;
      }
      //判断验证码
      // console.log(code);
      if(code.length!=4){
        mui.toast('验证码不合法');
        return;
      }
      //判断email
      console.log(email);
      if(!$.checkEmail(email)){
        mui.toast('email不合法');
        return;
      }
      //判断密码
      console.log(pwd);
      if(pwd.length<6){
        mui.toast('密码不合法');
        return;
      }
      //判断确认密码
      console.log(pwd1);
      if(pwd1!=pwd){
        mui.toast('密码不一致');
        return;
      }
      //成功之后发送请求给后台 判断
      $.post('users/reg',{mobile:mobile,code:code,email:email,pwd:pwd,gender:gender},function(res){
        if(res.meta.status==200){
          mui.toast(res.meta.msg);
          setTimeout(function(){
            location.href="/pages/login.html"
          },1000)
        }else{
          mui.toast(res.meta.msg);
        }
      })
    })
  }
})