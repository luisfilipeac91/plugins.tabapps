"use strict";
(function( $ ) {
 
    $.tabopen = function(opcoes)
    {
        var settings = $.extend({
            event:null,
            btn:null
        }, opcoes );

        settings.event.preventDefault();

        $.tabcontrol('abrir',{
            button:$(settings.btn)
        });
    };


    $.tabcontrol = function(acao,opcoes)
    {
        if(acao=='abrir')
        {
            var settings = $.extend({
                button:null
            }, opcoes );
            var he = $(settings.button.attr('target')).children('.nav-header');
            if(he.children('li[data-id="'+$(settings.button).data('id')+'"]').length==0)
            {
                var aba = $('<li class="nav-item" data-id="'+$(settings.button).data('id')+'" data-url="'+$(settings.button).attr('href')+'" data-tipo="'+$(settings.button).data('tipo')+'"><a class="nav-link" aria-current="page" href="javascript:void(0);">'+$(settings.button).text()+'</a></li>');
                he.append(aba);
                aba.children('a').click(function(){
                    $.tabcontrol('alternar',this);
                }).click();
            }
            else he.children('li[data-id="'+$(settings.button).data('id')+'"]').children('a').click();
        }
        else if(acao=='alternar')
        {
            $(opcoes).parent().parent().children('.nav-item').children('a').removeClass('active'); 
            $(opcoes).addClass('active');
            $.tabcontrol('refresh',$(opcoes).parent().parent().parent());
        }
        else if(acao=='refresh')
        {
            var current = $(opcoes).children('.nav-header').find('li>a.active');
            current = current.parent();
            var cnt = $(opcoes).children('.nav-content');
            cnt.html('<div class="inner">Por favor aguarde...</div>');
            if($(current).data('tipo')=='load')
            {
                $.get(current.data('url'),function(data){
                    cnt.children('.inner').html(data);
                }).fail(function(data){
                    cnt.children('.inner').html(JSON.stringify(data));
                });
            }
            if($(current).data('tipo')=='iframe')
                cnt.children('.inner').html('<iframe src="'+current.data('url')+'"></iframe>');
        }
    };
 
}( jQuery ));