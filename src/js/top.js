//回到顶部
define(['jquery'], function($) {
    var goTopFn = function() {
        $('.goTop').on('click', function() {
            console.log(8779)
            $('#list-cont').scrollTop(0);
        });
    }

    return goTopFn;
})