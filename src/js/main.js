require.config({
    baseUrl: '/js/',
    paths: {
        'jquery': './libs/jquery-2.1.1.min',
        'handlebars': './libs/handlebars-v4.0.11',
        'bscroll': './libs/bscroll',
        'index': './index',
        'goTop': './top'
    }
})

require(['index'])