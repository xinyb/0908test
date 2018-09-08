require(['jquery', 'handlebars', 'bscroll', 'goTop'], function($, handlebars, bscroll, goTop) {
    $.ajax({
        url: "/api/list",
        dataType: 'json',
        success: function(res) {
            //console.log(res);
            if (res.code === 0) {
                //获取模板
                var source = $('#list-tpl').html();
                //编译模板
                var template = handlebars.compile(source);
                //传入数据
                var html = template(res.data);
                //追加到盒子
                $('#list-cont').html(html);
            }
        },
        error: function(error) {
            console.warn(error);
        }
    });
    //返回顶部
    goTop();

    //滚动
    var scroll = new bscroll('.scrollBox', {
        probeType: 2,
        click: true
    });

    scroll.on('scroll', function() {
        console.log(this.y, this.maxScrollY);
    })
})