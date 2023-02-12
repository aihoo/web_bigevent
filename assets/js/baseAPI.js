//每次调用ajax请求时，统一API
$.ajaxPrefilter(function(options){
    // console.log(options.url);

    //统一拼接请求的路径
    options.url='http://www.liulongbin.top:3007'+options.url;
    console.log(options.url);
})