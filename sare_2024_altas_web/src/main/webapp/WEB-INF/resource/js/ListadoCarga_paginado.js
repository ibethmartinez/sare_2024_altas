/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*-------VARIABLES GLOBALES--------*/
        
        /* global mark */

Totalpag = "";
Band_Id_ue = "";
Var_paginado = 0;
Num_pag = 0;
Bandpag =0;
Bandpag2=0;
Clave_Id_ue = [];
numero_select=1;
combo="";




/*---- FUNCION EVENTO CARGA DE TRABAJO LISTADO BTN-VER ---*/
function Listado_CargaTrabajo() {  
    $('#display_pag').css("display", "grid");
    $('#display_pagBloqueados').css("display", "none");
    $('#Icon_cargando').css("display", "flex");
    //$('.tooltiptext2').css("display", "none");
    var content_paginado = document.getElementById("display_pag");
    content_paginado.innerHTML = "";
    var content_list_carga_trabajo = document.getElementById("Listado");
    content_list_carga_trabajo.innerHTML = "";
    var id_tramo = $_GET('id_tramo');
    var ce = $_GET('ce');
   
    if( ce == 00){
       if (window.screen.height == 768) {
           $('#contenedor_tabla .tooltiptext2').attr('style', 'left:8.7% !important');
       
    }
    else if(window.screen.height == 1080 || window.screen.height == 1200){
       
         $('#contenedor_tabla .tooltiptext2').attr('style', 'left:7.5% !important');
    }
    
    
    }
    
    
    $('.tooltiptext2').css("display", "absolute");
    $('#select_paginado').css("display", "block");
    combo = document.getElementById("select_paginado").value = 1;
    document.getElementById("cargando").textContent="Cargando...";
    
    fetch(`getCantPag.do?ce=${ce}&id_tramo=${id_tramo}`, {method: "POST", headers: {"Content-type": "application/json; charset=UTF-8"}, })
            .then((response) => response.json())
            .then((data) => {
                
                for (let valor of data.list) {
                    Totalpag = valor.tot_pag;                            
                }
                
                for (var i = 0; i < Totalpag; i++) { //Funcion paginadoBootstrap total, Paginado_dynamico                      
                                               
                        var options = {
                            currentPage: 1,
                            totalPages: Totalpag,
                            numberOfPages: 10,
                            useBootstrapTooltip:true,
                            onPageClicked: function (e, originalEvent, type, page) {
                            combo = document.getElementById("select_paginado").value = page;
                            Bandpag=page;
                             
                        },
                                tooltipTitles: function (type, page, current) {
                                    switch (type) {
                                    case "first":
                                        return "Primera pagina";
                                    case "prev":
                                        return "Anterior";
                                    case "next":
                                        return "Siguiente";
                                    case "last":
                                        return "Ultima pagina";
                                    case "page":
                                        return "pagina - " + page;
                                    }
                               }         
                        };            
                    $('#display_pag').bootstrapPaginator(options);
                    
                    ////////////////////creacion del option y se le agrega el valor//////////////
                    var select_paginado = document.getElementById("select_paginado");//                    var opcion_div = document.createElement('option');                    
                    var option_div = document.createElement('option');
                    
                    option_div.innerHTML = `<option  value="${(i-1)}" >` + (i+1) + `</option>`;
                    select_paginado.appendChild(option_div);
           
                    }
                    if (Totalpag < 9) {
                       $('#display_pag').css("display", "grid");
                    }
                    document.getElementById("cargando").textContent = "";
                    option_div = "";
                    $('#Icon_cargando').css("display", "none");
                    });
                    TablaDynamic('', '', 0);

    /*en esta parte se modifica el tamaño y posicion del modal*/
    /*estilos modal responsive generales*/
    $('.modal-content').css("top", $(window).innerHeight() / 15);
    $('.modal-content').css("height", "auto");
    $('.modal-content').css("left", "0px");
    $('.modal').css("--mdb-modal-width", "70vw");
    $('.modal-dialog').css("margin-left", "0px");
    $('.modal-body').css("padding-left", "5px");
    $('.modal-dialog').css("padding-right", "15px");
    $('.modal-dialog').css("padding-left", "15px");

    //ajustes leves en medidas especificas
    if ((window.screen).height == 1200) {
        $('.modal-content').css("height", "57.3vh");
    }
    if ((window.screen).height == 768) {
        $('.modal-body').css("height", "auto");
        $('.modal-content').css("top", $(window).innerHeight() / 18);
        $('.modal-body').css("padding", "0px");
        $('.modal-body').css("height", "auto");
    }
    
  document.getElementById("modal-title-ver").textContent="Listado Carga Trabajo";
 
 
        ///metodo onchange
            document.getElementById('select_paginado').addEventListener('change', function () {

                numero_select = this.value;
                var currentTarget = $("#display_pag");
                var pages = currentTarget.bootstrapPaginator("getPages");
                currentTarget.bootstrapPaginator("show", numero_select);  
                Bandpag=numero_select;
             /**llamado funcion tabla para hacer match con el numero de paginado seleccionado**/
                TablaDynamic('', '', numero_select); 
                    
           });    
}
  



/*----- FUNCION PINTAR TABLA LISTADO SERVICIO ------*/
function TablaDynamic(ce, id_tramo, Var_paginado) {
    var id_tramo = $_GET('id_tramo');
    var ce = $_GET('ce');
    
    if (Var_paginado > 0) {      
          Var_paginado = Var_paginado = (Var_paginado*1) - 1;;
    }
       
    fetch(`getCargaTrabajo.do?ce=${ce}&id_tramo=${id_tramo}&pag=${Var_paginado}`, {method: "POST", headers: {"Content-type": "application/json; charset=UTF-8"}, })
            .then((response) => response.json())
            .then((data) => {       
                
                var content_tabla = document.getElementById("Listado");
                content_tabla.innerHTML = generaListado_Tabla(data);
            });
}



/*--- GENERACION DE TABLA DINAMICA LISTADO CARGA DE TRABAJO ---*/
function generaListado_Tabla(data) {
    //console.log({'xpain':Object.keys(data.list[0])});
    var campos = Object.keys(data.list[0]);

    var innerHTML = " <thead> <tr class='Titulos_TablaHeader'>";
    for (id_ue in campos) {
        innerHTML += "<th>" + campos[id_ue] + "</th>";
        //alert('Resultado de los campos= '+ campos[id_ue]);
    }
    innerHTML += " </tr> </thead> ";


    innerHTML += `<tbody>`;
    for (let valor of data.list) {
        //console.log({"valor":valor});
        innerHTML += "<tr >";
        for (val in valor) {
            Clave_Id_ue = valor.id_ue;
            innerHTML += "<td style='cursor: pointer' onclick='CargaId_ue(" + Clave_Id_ue + ")'> " + valor[val] + "</td>";
        }

        innerHTML += "</tr>";

    }

        innerHTML += "</tbody>";

        return innerHTML;
        CargaId_ue('');
}



/*--- FUNCION PARA OBTENER EL 'ID_ue' EVENTO CLICK TABLA DINAMICA ---*/
function CargaId_ue(Clave_Id_ue) {
    SeleccionId_ue(Clave_Id_ue);
    clearMarker(mark);   
    //var campos = Object.keys(data.list[0]);
    //console.log('*______ESTO TRAE EL METODO= ' + Clave_Id_ue);
    //alert('-----ENTRO AL METODO CARGA CLAVE ID_ue------');
    //alert('LA CLAVE "ID_ue" OBTENIDA ES= '+ Clave_Id_ue);  
}


/*---Funcion evento click manadar paramemtro clave Id_ue, cerrar modal evento servicio fetch carga preeliminar formulario---*/
function SeleccionId_ue(id_ue) {
    $(".Input_Buscador").val(id_ue);
    $(".Btn_busqueda").click();
    $(".btn-danger").click();
    //Band_Id_ue = (id_ue); 
}


/*--- Limpiar contenedor paginado y tabla Dynamica---*/
function LimpiaContent() {
    $("#Content_paginado").empty();
    $("#Flech_ultimo").empty(); 
    document.getElementById("input_filtrar").value = "";
    //cancelar();
}



/*--- Funcion para desabilitar botones busqueda-input,btn-ver,btns-flotantes clave Id_ue ----*/
document.addEventListener('keydown', (event) => { //event keycode espacios en el campo busqueda 
    if (event.keyCode == 32) {
          //alert("el campo de texto no puede contener espacios");
    }
}, false);


//regex
$(document).on('click', '#Btn_iconBusqueda_Id_ue', function (event) {
    var reg_letras = new RegExp(/([a-zA-Z])/);
    var reg_espacios = new RegExp(/([\s])/);
    var reg_espacios_numeros = new RegExp (/([0-9]+[\s])/)
    var reg_numeros = new RegExp(/([0-9])/);
    var reg_caracteres = new RegExp(/^[!°|"#$%&/=?-°:¨´+¿_*()'<>]{1,15}$/);
    var reg_numeros_letras = new RegExp(/([0-9]+[a-zA-Z])/);
    var reg_letras_numeros = new RegExp(/([a-zA-Z]+[0-9])/);
    var reg_numeros_caracteres= new RegExp(/([0-9]+)([!°|"#$%&/=?-_*()'])/);
    var reg_caracteres_numeros= new RegExp (/([!°|"#$%&/=?-_()'])([0-9])/);
    
    

    if (window.screen.height == 1200) {
        $('.tooltip_buscador').css("top", "76px");
        $('.tooltip_buscador2').css("top", "76px");
    }

    var letras_espacios = document.getElementById("Txt_Buscar_Id_ue").value;

        
     if ($(".Input_Buscador").val() == "") {

        $('.tooltip_buscador').css("display", "block");
        $('.tooltip_buscador').css("position", "absolute");
        // $('.tooltip_buscador').css("top", "65px");
        // $('.tooltip_buscador').css("left", "302px");
        $('.tooltip_buscador').css("color", "black");
        $('.tooltip_buscador').css("background", "white");
        $('.tooltip_buscador').css("padding", "5px");
        $('.tooltip_buscador').css("font-size", "13px");
        $('.tooltip_buscador').css("line-height", "2");
        $('.tooltip_buscador').css("line-height", "2");
        $('.tooltip_buscador').css("z-index", "2");
        $('.tooltip_buscador').css("border-radius", "3px");

        setTimeout(() => {
            $('.tooltip_buscador').css("display", "none");
            $('.tooltip_buscador2').css("display", "none");
        }, "3500");
    }
    
    
    
    else if (reg_letras.test(letras_espacios)) {
      
        $('.tooltip_buscador2').css("display", "block");
        $('.tooltip_buscador2').css("position", "absolute");
        //$('.tooltip_buscador2').css("top", "65px");
        //$('.tooltip_buscador2').css("left", "302px");
        $('.tooltip_buscador2').css("color", "black");
        $('.tooltip_buscador2').css("background", "white");
        $('.tooltip_buscador2').css("padding", "5px");
        $('.tooltip_buscador2').css("font-size", "13px");
        $('.tooltip_buscador2').css("line-height", "2");
        $('.tooltip_buscador2').css("line-height", "2");
        $('.tooltip_buscador2').css("z-index", "2");
        $('.tooltip_buscador2').css("border-radius", "3px");

        setTimeout(() => {
            $('.tooltip_buscador2').css("display", "none");
             $('.tooltip_buscador').css("display", "none");
        }, "3500");
    }else if (reg_espacios.test(letras_espacios) ) {
     
        $('.tooltip_buscador2').css("display", "block");
        $('.tooltip_buscador2').css("position", "absolute");
        //$('.tooltip_buscador2').css("top", "65px");
        //$('.tooltip_buscador2').css("left", "302px");
        $('.tooltip_buscador2').css("color", "black");
        $('.tooltip_buscador2').css("background", "white");
        $('.tooltip_buscador2').css("padding", "5px");
        $('.tooltip_buscador2').css("font-size", "13px");
        $('.tooltip_buscador2').css("line-height", "2");
        $('.tooltip_buscador2').css("line-height", "2");
        $('.tooltip_buscador2').css("z-index", "2");
        $('.tooltip_buscador2').css("border-radius", "3px");

        setTimeout(() => {
            $('.tooltip_buscador2').css("display", "none");
             $('.tooltip_buscador').css("display", "none");
        }, "3500");
    }
    else if (reg_caracteres.test(letras_espacios) ) {
       
        $('.tooltip_buscador2').css("display", "block");
        $('.tooltip_buscador2').css("position", "absolute");
        //$('.tooltip_buscador2').css("top", "65px");
        //$('.tooltip_buscador2').css("left", "302px");
        $('.tooltip_buscador2').css("color", "black");
        $('.tooltip_buscador2').css("background", "white");
        $('.tooltip_buscador2').css("padding", "5px");
        $('.tooltip_buscador2').css("font-size", "13px");
        $('.tooltip_buscador2').css("line-height", "2");
        $('.tooltip_buscador2').css("line-height", "2");
        $('.tooltip_buscador2').css("z-index", "2");
        $('.tooltip_buscador2').css("border-radius", "3px");

        setTimeout(() => {
            $('.tooltip_buscador2').css("display", "none");
             $('.tooltip_buscador').css("display", "none");
        }, "3500");
    }    
     else if (reg_letras_numeros.test(letras_espacios) ) {
      
        $('.tooltip_buscador2').css("display", "block");
        $('.tooltip_buscador2').css("position", "absolute");
        //$('.tooltip_buscador2').css("top", "65px");
        //$('.tooltip_buscador2').css("left", "302px");
        $('.tooltip_buscador2').css("color", "black");
        $('.tooltip_buscador2').css("background", "white");
        $('.tooltip_buscador2').css("padding", "5px");
        $('.tooltip_buscador2').css("font-size", "13px");
        $('.tooltip_buscador2').css("line-height", "2");
        $('.tooltip_buscador2').css("line-height", "2");
        $('.tooltip_buscador2').css("z-index", "2");
        $('.tooltip_buscador2').css("border-radius", "3px");

        setTimeout(() => {
            $('.tooltip_buscador2').css("display", "none");
             $('.tooltip_buscador').css("display", "none");
        }, "3500");
    }    
      else if (reg_numeros_letras.test(letras_espacios)  ) {
       
        $('.tooltip_buscador2').css("display", "block");
        $('.tooltip_buscador2').css("position", "absolute");
        //$('.tooltip_buscador2').css("top", "65px");
        //$('.tooltip_buscador2').css("left", "302px");
        $('.tooltip_buscador2').css("color", "black");
        $('.tooltip_buscador2').css("background", "white");
        $('.tooltip_buscador2').css("padding", "5px");
        $('.tooltip_buscador2').css("font-size", "13px");
        $('.tooltip_buscador2').css("line-height", "2");
        $('.tooltip_buscador2').css("line-height", "2");
        $('.tooltip_buscador2').css("z-index", "2");
        $('.tooltip_buscador2').css("border-radius", "3px");

        setTimeout(() => {
            $('.tooltip_buscador2').css("display", "none");
             $('.tooltip_buscador').css("display", "none");
        }, "3500");
    }    
      else if (reg_numeros_caracteres.test(letras_espacios) ) {
       
        $('.tooltip_buscador2').css("display", "block");
        $('.tooltip_buscador2').css("position", "absolute");
        //$('.tooltip_buscador2').css("top", "65px");
        //$('.tooltip_buscador2').css("left", "302px");
        $('.tooltip_buscador2').css("color", "black");
        $('.tooltip_buscador2').css("background", "white");
        $('.tooltip_buscador2').css("padding", "5px");
        $('.tooltip_buscador2').css("font-size", "13px");
        $('.tooltip_buscador2').css("line-height", "2");
        $('.tooltip_buscador2').css("line-height", "2");
        $('.tooltip_buscador2').css("z-index", "2");
        $('.tooltip_buscador2').css("border-radius", "3px");

        setTimeout(() => {
            $('.tooltip_buscador2').css("display", "none");
             $('.tooltip_buscador').css("display", "none");
        }, "3500");
    }    else if (reg_espacios_numeros.test(letras_espacios) ) {
      
        $('.tooltip_buscador2').css("display", "block");
        $('.tooltip_buscador2').css("position", "absolute");
        //$('.tooltip_buscador2').css("top", "65px");
        //$('.tooltip_buscador2').css("left", "302px");
        $('.tooltip_buscador2').css("color", "black");
        $('.tooltip_buscador2').css("background", "white");
        $('.tooltip_buscador2').css("padding", "5px");
        $('.tooltip_buscador2').css("font-size", "13px");
        $('.tooltip_buscador2').css("line-height", "2");
        $('.tooltip_buscador2').css("line-height", "2");
        $('.tooltip_buscador2').css("z-index", "2");
        $('.tooltip_buscador2').css("border-radius", "3px");

        setTimeout(() => {
            $('.tooltip_buscador2').css("display", "none");
             $('.tooltip_buscador').css("display", "none");
        }, "3500");
    }  
     else if (reg_caracteres_numeros.test(letras_espacios) ) {
      
        $('.tooltip_buscador2').css("display", "block");
        $('.tooltip_buscador2').css("position", "absolute");
        //$('.tooltip_buscador2').css("top", "65px");
        //$('.tooltip_buscador2').css("left", "302px");
        $('.tooltip_buscador2').css("color", "black");
        $('.tooltip_buscador2').css("background", "white");
        $('.tooltip_buscador2').css("padding", "5px");
        $('.tooltip_buscador2').css("font-size", "13px");
        $('.tooltip_buscador2').css("line-height", "2");
        $('.tooltip_buscador2').css("line-height", "2");
        $('.tooltip_buscador2').css("z-index", "2");
        $('.tooltip_buscador2').css("border-radius", "3px");

        setTimeout(() => {
            $('.tooltip_buscador2').css("display", "none");
             $('.tooltip_buscador').css("display", "none");
        }, "3500");
    }  

    
    ///////////////////////////////////////
    
    else if(reg_numeros.test(letras_espacios)) {

        $('.tooltip_buscador').css("display", "none");
        $('.tooltip_buscador2').css("display", "none");

        $('#Btn_iconBusqueda_Id_ue').attr('style', 'cursor:not-allowed');
        $(function () {
            $('body').find('#Btn_iconBusqueda_Id_ue').each(function () {
                $(this).attr('disabled', 'disabled');
            });
        });

        $('#Txt_Buscar_Id_ue').attr('style', 'cursor:not-allowed');
        $(function () {
            $('body').find('#Txt_Buscar_Id_ue').each(function () {
                $(this).attr('disabled', 'disabled');
            });
        });

        $('#Boton_ver').attr('style', 'cursor:not-allowed');
        $(function () {
            $('body').find('#Boton_ver').each(function () {
                $(this).attr('disabled', 'disabled');
            });
        });
        
    }
    document.querySelector("#guardar").style.background = "#184658";
    document.querySelector("#guardar").style.cursor = "pointer";
    document.querySelector("#cancelar").style.background = "#184658";
    document.querySelector("#cancelar").style.cursor = "pointer";
});

///////metodos onmouse tooltip select paginado////////
function tooltip_paginado() {
    $('.tooltiptext2').css("visibility", "visible");
    $('.tooltiptext2').css("opacity", "1");
}

function tooltip_paginado_desaparecer() {
        $('.tooltiptext2').css("visibility", "hidden");
        $('.tooltiptext2').css("opacity", "0");
}


