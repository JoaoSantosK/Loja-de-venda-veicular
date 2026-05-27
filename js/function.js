$(function(){

    var currentValue = 0; //Valor inicial
    var isDrag = false; //Variável para verificar se o usuário está arrastando
    var preco_maximo = 70000;
    var preco_atual = 0;
    
    $('.pointer-barra').mousedown(function(){
        isDrag = true;
    });

    $(document).mouseup(function(){
        isDrag = false;
        enableTextSelection();
    });

    $('.barra-preco').mousemove(function(e){
        if(isDrag){
            disableTextSelection();
            var elBase = $(this);
            var mouseX = e.pageX - elBase.offset().left;
            if(mouseX < 0) mouseX = 0;
            if(mouseX > elBase.width()) mouseX = elBase.width();

            $('.pointer-barra').css('left', (mouseX - 14) + 'px');
            currentValue = (mouseX / elBase.width()) * 100;
            $('.barra-preco-fill').css('width', currentValue + '%');

            preco_atual = (currentValue / 100) * preco_maximo;
            preco_atual = formatar_preco(preco_atual);
            $('.preco_pesquisa').html('R$' + preco_atual);
        }
    });


    // >>> NOVA FUNÇÃO: clique direto na barra atualiza o valor
    $('.barra-preco').click(function(e){
        var elBase = $(this);
        var mouseX = e.pageX - elBase.offset().left;

        if(mouseX < 0) mouseX = 0;
        if(mouseX > elBase.width()) mouseX = elBase.width();

        $('.pointer-barra').css('left', (mouseX - 14) + 'px');
        currentValue = (mouseX / elBase.width()) * 100;
        $('.barra-preco-fill').css('width', currentValue + '%');

        preco_atual = (currentValue / 100) * preco_maximo;
        preco_atual = formatar_preco(preco_atual);
        $('.preco_pesquisa').html('R$' + preco_atual);
    });

    function formatar_preco(preco_atual){
        preco_atual = preco_atual.toFixed(2);
        preco_arr = preco_atual.split('.');

        var novo_preco = formatar_total(preco_arr);
        return novo_preco;
    }

    function formatar_total(preco_arr){
        if(preco_arr[0] < 1000){
            return preco_arr[0]+','+preco_arr[1];
        }else if(preco_arr[0] < 10000){
            return preco_arr[0][0]+'.'+preco_arr[0].substr(1)+','+preco_arr[1];
        }else{
            return preco_arr[0][0]+preco_arr[0][1]+'.'+preco_arr[0].substr(2)+','+preco_arr[1];
        }
    }

    function disableTextSelection(){
        $('body').css('-webkit-user-select', 'none');
        $('body').css('-moz-user-select', 'none');
        $('body').css('-ms-user-select', 'none');
        $('body').css('-o-user-select', 'none');
        $('body').css('user-select', 'none');
    }

    function enableTextSelection(){
        $('body').css('-webkit-user-select', 'auto');
        $('body').css('-moz-user-select', 'auto');
        $('body').css('-ms-user-select', 'auto');
        $('body').css('-o-user-select', 'auto');
        $('body').css('user-select', 'auto');
    }


    //Sistema de slide

    var imgShow = 3; //QUantas imgs que eu quero que mostre
    //Ceil diz para arredondar o número para um inteiro (o próximo), 1.33 arredondado para o proximo = 2 - 1 = 1
    var maxIndex = Math.ceil($('.mini-img-wrapper').length/3) - 1;
    var curIndex = 0;

    initSlider();
    navigateSlider();
    clickSlider();
    function initSlider(){
        var amt = $('.mini-img-wrapper').length * 33.3;
        var elScroll = $('.nav-galeria-wraper');
        var elSingle = $('.mini-img-wrapper');
        
        elScroll.css('width', amt+'%');
        elSingle.css('width', 33.3 * (100/amt) + '%');
    }

    function navigateSlider(){
        $('.arrow-right-nav').click(function(){
            if(curIndex < maxIndex){
                curIndex+=1;
                var elOff = $('.mini-img-wrapper').eq(curIndex*3).offset(). left - $('.nav-galeria-wraper').offset().left;
                $('.nav-galeria').animate({'scrollLeft':elOff+'px'});
            }else{
                //console.log("Chegamos até o final!");
            }
        });

        $('.arrow-left-nav').click(function(){
            if(curIndex > 0){
                curIndex-=1;
                var elOff = $('.mini-img-wrapper').eq(curIndex*3).offset(). left - $('.nav-galeria-wraper').offset().left;
                $('.nav-galeria').animate({'scrollLeft':elOff+'px'});
            }else{
                //console.log("Chegamos até o final!");
            }
        });

    }

    function clickSlider(){
        $('.mini-img-wrapper').click(function(){
            $('.mini-img-wrapper').css('background-color', 'transparent');
            $(this).css('background-color', 'rgb(200, 200, 200)');
            
            var img = $(this).children().css('background-image');
            $('.foto-destaque').css('background-image', img);
        });
        //Quero que sofra um click na primeira imagem
        $('.mini-img-wrapper').eq(0).click();

    }

    //Área de contato com scrollTop

    $('[goto=contato]').click(function(){
        $('nav a').css('color', 'black');
        $(this).css('color', 'red');
        $('html,body').animate({'scrollTop':$('#contato').offset().top});
        return false;
    });

    $(document).ready(function(){
        $('.contato-link').click(function(e){
            e.preventDefault();
            window.location.href = 'index.html?contato';
        });
    });

    $(document).ready(function(){
    function checkUrlContato(){
        var params = new URLSearchParams(window.location.search);
        if (params.get("contato") !== null) {
            // Scroll suave até a section com ID 'contato'
            $('html, body').animate({
                scrollTop: $('#contato').offset().top
            }, 1000);

            // Destaque visual opcional
            $('[goto=contato]').css('color', '#EB2D2D');
        }
    }

    checkUrlContato();
    });

    

    //Mudando URL do site

    var directory = '/Projetos/loja-veiculo';

    $('[goto=contato]').click(function(e){   //? diz parâmetro, para colocar mais parâmetros é só utilizar & após o ?
        location.href = directory + '/index.html?contato';
        return false;
    });

    checkUrl();

    function checkUrl(){
        var url = location.href.split('/');
        var curPage = url[url.length-1].split('?');

        if(curPage[1] != undefined && curPage[1] == 'contato'){
            $('header nav a').css('color', 'black');
            $('footer nav a').css('color', 'white');
            $('[goto=contato]').css('color', '#EB2D2D');
            $('html,body').animate({'scrollTop':$('#contato').offset().top}); 
        }
    }

    //Menu responsivo mobile

    $('.mobile').click(function(){
        $(this).find('ul').slideToggle();
    });

    //Sistema de navegação nos depoimentos do index.html

    var amtDepoimento = $('.depoimento-single p').length;
    var curIndex = 0;

    iniciarDepoimentos();
    navegarDepoimentos();

    function iniciarDepoimentos(){
        $('.depoimento-single p').hide();
        $('.depoimento-single p').eq(0).show();
    }

    function navegarDepoimentos(){
        $('[next]').click(function(){
                curIndex++;
                if(curIndex >= amtDepoimento)
                    curIndex = 0;
                $('.depoimento-single p').hide();
                $('.depoimento-single p').eq(curIndex).show();
        });

        $('[prev]').click(function(){
            curIndex--;
                if(curIndex < 0)
                    curIndex = amtDepoimento-1;
                $('.depoimento-single p').hide();
                $('.depoimento-single p').eq(curIndex).show();
        });
    }

})
