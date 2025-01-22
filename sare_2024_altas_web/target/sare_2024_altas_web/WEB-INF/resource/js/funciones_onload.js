/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$("#Btn_iconBusqueda_Id_ue").on("click", function () {

    if (window.screen.height == 1200) {
          $('.tooltip_buscador').css("top", "76px");
          $('.tooltip_buscador2').css("left", "421px");
    }

});


$(document).on('click', '#Btn_Accion1', function (event) {

    if (window.screen.height == 1200) {
        //titulo
        $('.Titu_identificar h1').css("padding", "18px");
        $('.Titu_identificar h1').css("font-size", "1.84rem");
        $('.Titu_identificar h1').css("font-weight", "lighter");
        //subtitulo
        $('.SubTitulo_identificar h3').css("font-size", "1.46rem");
        $('.SubTitulo_identificar h3').css("font-weight", "lighter");
        $('.SubTitulo_identificar').css("margin-top", "-13px");

    } else if (window.screen.height == 1080) {
        //titulo
        $('.Titu_identificar h1').css("padding", "11px");
        $('.Titu_identificar h1').css("font-size", "1.89rem");
        //subtitulo
        $('.SubTitulo_identificar h3').css("font-size", "1.44rem");
        $('.SubTitulo_identificar h3').css("font-weight", "lighter");
        $('.SubTitulo_identificar').css("margin-top", "-6px");
    } else if (window.screen.height == 768) {
        //titulo
        $('.Titu_identificar h1').css("padding", "8px");
        $('.Titu_identificar h1').css("font-size", "1.26rem");
        //subtitulo
        $('.SubTitulo_identificar h3').css("font-size", "1rem");
        $('.SubTitulo_identificar h3').css("font-weight", "lighter");
        $('.SubTitulo_identificar').css("margin-top", "9px");
        //campos
        $('.Text_camposIdenti ').css("line-height", "31px");
        $('.Text_camposIdenti ').css("font-size", "10.55px");
        //$('.Text_camposIdenti').css("font-weight", "lighter");
        $('#TextFicha1').css("font-size", "11px");
        $('#TextFicha1').css("margin-top", "11px");
        $('#TextFicha2').css("font-size", "12.55px");
    }

});






$(document).on('click', '#imprimir', function (event) {

    if (window.screen.height == 1080) {
    var css = '@page { size: 567mm 305mm}',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    style.type = 'text/css';
    style.media = 'print';

        if (style.styleSheet){
               style.styleSheet.cssText = css;
        } 
        else {
               style.appendChild(document.createTextNode(css));
        }


    head.appendChild(style);
    window.print();
    
    }
    else if (window.screen.height == 1200) {
    var css = '@page { size: 630mm 340mm}',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    style.type = 'text/css';
    style.media = 'print';

        if (style.styleSheet){
               style.styleSheet.cssText = css;
        } 
        else {
               style.appendChild(document.createTextNode(css));
        }


    head.appendChild(style);
    window.print();
    
    }else if (window.screen.height == 768) {
    var css = '@page { size: 450mm 210mm}',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    style.type = 'text/css';
    style.media = 'print';

        if (style.styleSheet){
               style.styleSheet.cssText = css;
        } 
        else {
               style.appendChild(document.createTextNode(css));
        }


    head.appendChild(style);
    window.print();
    
    }
    
    
    
    
});



$(window).on('load', function (event) {

    if (window.screen.height == 1080) {

        $('.Usuario').css("height", "62px");
        $('.Usuario').css("margin-top", "21.5%");
        $('.onoffswitch').css("margin", "27px auto");
              $(' .SubTitulo_identificar').attr('style', ' margin-top:15px  !important');
        $(' .SubTitulo_identificar h3').attr('style', 'padding-bottom:0px   !important');
        $('.tooltiptext').attr('style', 'bottom:-18%   !important');
     
                 
                 
                 
    }else if (window.screen.height == 768) {
        
        $('.Usuario').css("line-height", "1.4"); 
          
        
    }




});





window.addEventListener("beforeprint", (event) => {
  
  
  
   if (window.screen.height == 768) {
       
        

        $(".Btn_busqueda").css("height", "100%");
        $(".Input_Buscador").css("height", "100%");
        $(".tab").css("margin", "9px 5px");
        $('.tab').attr('style', 'margin:9px 5px !important');


        $(".icono_material").css("fontSize", "15px");
        $(".icono_buscar").css("fontSize", "24px");
        $(".boton_tab").css("height", "auto");
        $('.boton_tab').attr('style', 'height:auto !important');
        $(".boton_tab").css("fontSize", "10px");
        $(".listado_Ver").css("margin", "14px -15px");
        $(".listado_Ver").css("width", "76%");
        $(".listado_Ver").css("height", "45%");




        $("#Boton_ver .material-icons").css("fontSize", "17px");
        $(".form-check").css("margin", "-13px 41px");
        $(".con-tooltip").css("width", "31px");
        $(".con-tooltip").css("height", "31px");

        $(".Icon_MenuFlot").css("fontSize", "19px");
        $(".redes").css("margin", "0px 0px -49px 252px");
        $(".btn-mas label").css("width", "31px");
        $(".btn-mas label").css("height", "31px");
        $("#boton_flotante").css("fontSize", "31px");
        $("#boton_flotante").css("paddingTop", "0px");
        $("#boton_flotante").css("paddingLeft", "0px");

        $(".sidebar").css("width", "29%");
        $(".form-control").css("fontSize", "0.8rem");
        $(".form-control").css("padding", "12px 4px");


        $(".CampoLabel").css("fontSize", "13px");
        $("#e23a").css("padding", "14px 4px");
        $("#e23a").css("fontSize", "0.8rem");
        $(".Btn_Guardar").css("lineHeight", "0");
        $(".Img_Logo_Sare").css("paddingTop", "6px");
        $(".Img_Logo_Sare").css("paddingBottom", "6px");
        $(".tooltip_buscador, .tooltip_buscador2").css("top", "47px");
        $(".tooltip_buscador, .tooltip_buscador2").css("left", "325px");
        $(".tooltip_buscador, .tooltip_buscador2").css("fontSize", "10px");
        $(".tooltip_buscador, .tooltip_buscador2").css("padding", "3px");

        $(".tooltip_buscador img, .tooltip_buscador2 img").css("width", "16px");
        $(".tooltip_buscador img, .tooltip_buscador2 img").css("height", "16px");
        $(".tooltip_buscador:before").css("left", "1px");
        $(".tooltip_buscador:before").css("top", "70%");
        $(".tooltip_buscador:before").css("borderWidth", "7px 10px 10px 10px");

        $(".tooltip_buscador2:before").css("left", "5px");
        $(".tooltip_buscador2:before").css("top", "68%");
        $(".tooltip_buscador2:before").css("borderWidth", "7px 10px 10px 10px");

        $(".sidebar-content").css("height", "4.5vh");
        $(".sidebar-content").css("width", "85%");
        $("#eliminar-button .material-icons").css("lineHeight", "0");
        $("#eliminar-button .material-icons").css("fontSize", "13px");
        $("#search-button .material-icons").css("lineHeight", "0");
        $("#search-button .material-icons").css("fontSize", "14px");

        $("#center-button .material-icons").css("lineHeight", "0");
        $("#center-button .material-icons").css("fontSize", "14px");



        $("#eliminar-button, #search-button, #center-button").css("height", "auto");
        $(".sidebar-toggle").css("position", "absolute");
        $(".sidebar-toggle").css("height", "-webkit-fill-available");
        $(".sidebar-toggle").css("width", "40px");
        $(".sidebar-toggle.left").css("right", "-1.2em");
        $(".sidebar-toggle .icon").css("width", "58%");
        $(".sidebar-toggle .icon").css("height", "65%");


        $(".btn").css("--mdb-btn-padding-x", "0.51rem");
//        $(".left.collapsed").css("transform","translatex(-83.5%)");
//        $(".left.collapsed").css("animationDuration","2s");
//        $(".left.collapsed").css("animationName","slidein3");




        $("#Txt_Buscar_Id_ue").css("fontSize", "11px");
        $("#Txt_Buscar_Id_ue").css("textAlign", "justify");
        $(".form-check-input").css("width", "2rem");
        $(".form-check-input").css("height", "0.85rem");
        $(".form-check-input").css("margin-top", "0.4em");

        $(".form-check-input:checked[type=checkbox]:after").css("width", "1rem");
        $(".form-check-input:checked[type=checkbox]:after").css("height", "1rem");
        $(".form-check-input:checked[type=checkbox]:after").css("top", "0.7px");


        $('.form-check-label ').attr('style', 'line-height:0 !important');
        $('.form-check-label').attr('style', 'fontSize:10px !important');
        $('.form-check-label').attr('style', 'display:block !important');



        $("#ratificar, #noratificar").css("fontSize", "12px");
        $("#ratificar, #noratificar").css("letterSpacing", "1px");
        $(".swal2-popup").css("fontSize", "0.6rem");

        $("#Listado").css("fontSize", "11px");
        $("#input_filtrar").css("fontSize", "12px");
        $(".page-link").css("fontSize", "11px");
        $(".page-link .material-icons").css("fontSize", "22px");
        $(".page-link .material-icons").css("marginTop", "5px");
        $(".page-link .material-icons").css("justifyContent", "space-between ");
        $(".Texto_span").css("margin", "2px");
        $(".Texto_span").css("fontSize", "11.5px");
        $(".Texto_span").css("fontFamily", "Roboto");
        $(".Texto_span").css("fontWeight", "500");


        $('#boton_swith').attr('style', 'margin-top:5% !important');
        $('.form-check ').attr('style', 'margin:-15px 41px !important'); 
    
        $('.onoffswitch').attr('style', 'margin-left:-5px !important');


        $(".boton_bloqueos").css("padding", "3px");
        $(".boton_bloqueos").css("margin", "0px");
        $(".boton_bloqueos").css("height", "auto");
        $(".boton_bloqueos").css("fontSize", "9px");
        $(".boton_bloqueos").css("justifyContent", "center");


        $(".table-sm>:not(caption)>*>*").css("padding", ".3rem");
        $("#modal-footer-ver #btn-ver").css("fontSize", "10px");
        $("#modal-footer-ver #btn-ver").css("paddingLeft", "10px");
        $("#modal-footer-ver #btn-ver").css("paddingRight", "10px");
        $("#modal-footer-ver #btn-ver").css("paddingBottom", "0px");
        $("#modal-footer-ver #btn-ver").css("padding-top", "0px");
        $("#modal-footer-ver #btn-ver").css("height", "28px");
        $("#modal-footer-ver #btn-ver").css("margin", "6px 0px");
        //aqui se brinca una partes de #modal-footer-ver #btn-ver .boton_




        $(".boton_").css("borderRadius", "5px 0p");
        $(".boton_").css("marginRight", "-1px");
        $(".boton_").css("height", "5vh");
        $(".boton_").css("marginTop", "1.2px");



        $("#Ficha_Btn").css("width", "28px");
        $("#Ficha_Btn").css("height", "25.8px");

        $("#Ficha_Icon").css("fontSize", "19px");
        $("#Ficha_Icon").css("lineHeight", "0px");
        $("#Ficha_Icon").css("marginLeft", "-5px");
        $("#Ficha_Icon").css("margin-top", "1.9px");
        $("#Ficha_Btn_regresa i").css("fontSize", "15.2px ");
        $("#Ficha_Btn_regresa i").css("lineHeight", "0px ");
        $("#Ficha_Btn_regresa i").css("margin-top", "8px ");

        $('#Etiqueta strong').attr('style', 'fontSize:10px !important');

        $('#valor').attr('style', 'fontSize:10px !important');

        $('#Usuar_coord').attr('style', 'height:25px !important');
        $('.Usuario').attr('style', 'margin-left:-25px !important');
        $('.Usuario').attr('style', 'margin-top:14px !important');
        $('.Texto_usuario').attr('style', 'font-size:2px !important');
        $('.Texto_usuario').attr('style', 'margin-left:5px !important');
        $('.Texto_usuario').attr('style', 'padding:5px !important');
        $('.Texto_usuario').attr('style', 'padding-left:0px !important');
        $('.Div_Busqueda_cve').attr('style', 'margin-left:5px !important');
        $('.form-switch .form-check-input:checked[type=checkbox]:after').attr('style', 'margin-top:-11px !important');
              
        $('.icon_usuario').attr('style', 'fontSize:10px !important');
        $('.icon_usuario').attr('style', 'margin:0px -15px !important');
        $('#formBusqueda').attr('style', 'grid-template-rows:25% 30% 30% 30% !important');

        $('.Text_camposIdenti').attr('style', ' line-height:0px !important');
        $('.Text_camposIdenti').attr('style', ' margin-top:0px !important');
        $('.Text_camposIdenti').attr('style', ' margin-bottom:0rem !important');

        $('.campos_Indenti').attr('style', 'height:30px !important');
        $('.campos_Indenti').attr('style', 'margin-bottom:10px !important');

        $('#contenedor_establecimiento').attr('style', 'margin-bottom:98px !important');

        $('#TextFicha2').attr('style', ' padding-top:16px !important');

        $(' .SubTitulo_identificar h3').attr('style', ' margin-top:0 !important');
        $(' .SubTitulo_identificar h3').attr('style', ' margin-bottom:2rem  !important');
        $(' .SubTitulo_identificar h3').attr('style', '   font-weight: 500  !important');


    
       
   }else if (window.screen.height == 1080) {
       
       
         $('.Usuario').css("margin-left", "30px"); 
         $('.Usuario').css("margin-top", "26px"); 
        $(' .SubTitulo_identificar').attr('style', ' margin-top:13px  !important');
        $(' .SubTitulo_identificar h3').attr('style', 'padding-bottom:0px   !important');
       
       
   
       
   }
  
  
  
     
});


window.addEventListener("afterprint", (event) => {
  //alert("After print");
  
  
  
  
  
});