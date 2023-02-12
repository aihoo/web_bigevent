$(function(){
    $('#link_reg').click(function(){
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link_login').click(function(){
        $('.reg-box').hide();
        $('.login-box').show();
    });

    let form=layui.form;
    let layer = layui.layer;

    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        
        //密码校验规则
        pwd: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位,且不能出现空格'
        ],

        //检验密码是否一致的规则
        repwd:function(value){
            //value值是确认密码框的内容
            //还需要拿到第一次密码框的值
            let pwd=$('.reg-box [name=password]').val();
            if(pwd!==value){
                return '两次密码不一致';
            }
        }
      });   

    //监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/api/reguser',
            data:{
                username:$('#form_reg [name=username]').val(),
                password:$('#form_reg [name=password]').val()
            },
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message);
                }
                layer.msg('注册成功!');
            }
        })
    })

    //监听登录表单的提交事件
    $('#form_login').submit(function(e){
        e.preventDefault();
        $.ajax({
            type:'POST',   //注意是POST请求
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message);
                }
                layer.msg('登录成功!');
                console.log(res.token);
                //跳转到后台
                // location.href='/index.html';
            }
        })
    })
})