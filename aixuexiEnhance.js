// ==UserScript==
// @name         爱学习功能增强
// @namespace    http://52fisher.cn
// @version      0.1
// @description  修复爱学习翻页功能错误以及隐藏批注
// @author       fisher
// @include      https://bk.aixuexi.com/*
// @include      https://diy-courseware.aixuexi.com/*
// @updateURL    https://raw.githubusercontent.com/52fisher/aixuexiEnhance/master/aixuexiEnhance.user.js
// @downloadURL  https://raw.githubusercontent.com/52fisher/aixuexiEnhance/master/aixuexiEnhance.user.js
// @grant        none
// ==/UserScript==

(function() {
    //检测DOM改变事件，修正无良程序员的jvascript尴尬事件。
    $('body').on('DOMNodeInserted,DOMNodeRemoved',function(){
        document.querySelectorAll('.page-bar a[href]').forEach(function(e){
            e.setAttribute('href',"javascript:void(0);")
        })})
    console.log("修复运行")
    //修正播放按钮
    try{
        setTimeout(function(){
        $('.play_button.comment_btn').unbind().on('click', function () {
        console.log('隐藏批注生效')
        $(this).toggleClass('off')
        if ($(".play_button.comment_btn").hasClass('off')) {
            $('#comment').hide();
            $('#slide-box').css({
                'left': '25%'
            });
            $('#scene').css({
                'width': '100%'
            });
            return;
        }
        $('#comment').show();
        $('#scene').css({
            'width': 'auto'
        });
          $('#slide-box').css({
                'left': 855-parseInt($('#comment').css('left'))+'px'
            });
    })},5000)
       }catch(e){
           console.log('隐藏批注未加载'+e);
       }
    //讲义页面增强
    $('div.controller-pannel,ul.controller-items').remove()
    var list_mods = {
        'hideanswer': {
            data: 'hideanswer',
            hide: true,
            name: '答案',
            node: '.question-answer'
        },
        'hidelogo': {
            data: 'hidelogo',
            hide: true,
            name: '水印',
            node: 'img.print-logo'
        }
    },
        lists_items = '';
    if(location.hash.match('kejian')){
        list_mods['hidecomment'] = {'data':'hidecomment',hide:ture,name:'批注',node:''}
    }
    for (var i in list_mods) {
        lists_items += '<li data-node="' + list_mods[i].data + '">' + (list_mods[i].hide==true ? '隐藏':'显示') + list_mods[i].name + '</li>';
    }
    $('body').append('<div class="controller-pannel">+</div>')
    $('.controller-pannel').css({
        'background': '#e03636',
        'font-size': '20px',
        'color': '#eee',
        'width': '50px',
        'height': '50px',
        'border-radius': '50px',
        'text-align': 'center',
        'vertical-align': 'middle',
        'line-height': '50px',
        'position': 'fixed',
        'right': '35px',
        'z-index': '999',
        'bottom': '200px',
        'cursor': 'default'
    }).hover(function () {
        $(this).css('background', '#E55')
    }).after('<ul class="controller-items">' + lists_items + '</ul>');
    $('ul.controller-items').css({
        'display': 'none',
        'position': 'fixed',
        'right': '30px',
        'z-index': '999',
        'bottom': '260px',
    })
    $('ul.controller-items>li').css({
        'color': '#eee',
        'font-size': '12px',
        'width': '50px',
        'padding': '4px',
        'background': '#0b6e48',
        'margin': '4px',
        'cursor': 'default'
    }).hover(function () {
        $(this).css('background', '#199475')
    }, function () {
        $(this).css('background', '#0b6e48')
    }).on('click', function () {
        try {
            var nodename = $(this).data('node');
            var hidenode = list_mods[nodename].node;
            list_mods[nodename].hide = !list_mods[nodename].hide;
            $(hidenode).toggle();
            $(this).text((list_mods[nodename].hide==true?'隐藏':'显示') + list_mods[nodename].name);
        }
        catch (e) {
            console.log(e)
        }
    })
    $('body').on('click', '.controller-pannel', function () {
        $('ul.controller-items').stop().slideToggle()
    })


})();