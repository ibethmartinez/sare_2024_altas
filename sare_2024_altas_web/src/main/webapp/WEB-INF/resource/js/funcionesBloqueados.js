
/*---- Variables globales ---*/
TotalpagBloque = "";
Band_Id_ue = "";
Var_paginadoBloq = 0;
Num_pagBloque = 0;
Bandpag_bloq =0;
Clave_Id_ue_bloque = [];



/*---- FUNCION Claves Bloqueadas---*/
function Listado_ClavesBloqueadas() {
    TotalpagBloque = "";
    Band_Id_ue = "";
    Var_paginadoBloq = 0;
    Num_pagBloque = 0;
    Clave_Id_ue_bloque = [];
    
    
    $('#Icon_cargando').css("display", "none");
    $('#display_pag').css("display", "none");
    $('#display_pagBloqueados').css("display", "flex");
    //desparece select paginado
    $('.tooltiptext2').css("display", "none");
    $('#select_paginado').css("display", "none");
    document.getElementById("input_filtrar").value = "";
    var content_paginado_bloq = document.getElementById("display_pag");
    content_paginado_bloq.innerHTML = "";
    
    var content_list_carga_trabajo_bloq = document.getElementById("Listado");
    content_list_carga_trabajo_bloq.innerHTML = "";
     
    var ce = $_GET('ce');
    Bandpag_bloq=0;
    fetch(`getListBloqueadoCantPag.do?ce=${ce}`, {method: "POST", headers: {"Content-type": "application/json; charset=UTF-8"}, })
            .then((response) => response.json())
            .then((data) => {
                
                for (let valor of data.list) {
                    TotalpagBloque = valor.tot_pag;
                }
                
                if (TotalpagBloque > 1) { 
                                          
                    TotalpagBloque =  TotalpagBloque - 1;
                             
                    for (var i = 1; i <= TotalpagBloque; i++) {                     
                        
                      ///Funcion click paginadoBootstrap tabla-pag
                        var options = {
                            currentPage: 1,
                            totalPages: TotalpagBloque,
                            numberOfPages:5,
                            useBootstrapTooltip:true,
                            
                            onPageClicked: function(e,originalEvent,type,page){
                                   Bandpag_bloq = page;                              
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
                       
                        $('#display_pagBloqueados').bootstrapPaginator(options);                      
                        //console.log('esto trae la bandera: '+ Bandpag);                     
                    }        
                        if (TotalpagBloque < 9) {   
                               //alert('entro al ALERT'+ TotalpagBloque);
                               //$('#display_pagBloqueados').css("display", "none");
                        }
               }
                 
    });

    TablaDinamicaCargaTrabajoBloqueados('', '', 0);

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

    if ((window.screen).height == 1200) {
        $('.modal-content').css("height", "80vh");
    }
    if ((window.screen).height == 768) {
        $('.modal-body').css("height", "auto");
        $('.modal-content').css("top", $(window).innerHeight() / 22);
        $('.modal-body').css("padding", "0px");
    }
    
    
   LimpiaContentBloqueado();
   document.getElementById("modal-title-ver").textContent="Claves Bloqueadas";
}

function LimpiaContentBloqueado() {
    $("#display_pagBloqueados").empty();  
    document.getElementById("input_filtrar").value = "";
    //cancelar();
}




/*----- FUNCION PINTAR TABLA LISTADO SERVICIO CARGA DE TRABAJO ------*/
function TablaDinamicaCargaTrabajoBloqueados(ce, id_tramo, Var_paginado) {
    var ce = $_GET('ce');
    fetch(`getListBloqueadosPag.do?ce=${ce}&pag=${Var_paginado}`, {method: "POST", headers: {"Content-type": "application/json; charset=UTF-8"}, })
            .then((response) => response.json())
            .then((data) => {
                var content_tabla = document.getElementById("Listado");
                content_tabla.innerHTML = generaListado_TablaBloqueadas(data);
            });
}


/*--- GENERACION DE TABLA DINAMICA LISTADO CARGA DE TRABAJO ---*/
function generaListado_TablaBloqueadas(data) {
    if ((window.screen).height == 768) {
           $('.modal-content').css("top", $(window).innerHeight() / 18);
    }

    var campos = Object.keys(data.list[0]);
    var innerHTML = " <thead> <tr class='Titulos_TablaHeader'>";
    
    for (id_ue in campos) {
          innerHTML += "<th>" + campos[id_ue] + "</th>";     
    }
    
    innerHTML += "<th> </th> </tr> </thead> ";
    innerHTML += `<tbody style='text-transform:uppercase;'>`;
    
    for (let valor of data.list) {
            innerHTML += "<tr >";
        
            for (val in valor) {
                  Clave_Id_ue_bloque = valor.id_ue;
                  innerHTML += "<td style='padding:0px;margin:0px;' > " + valor[val] + "</td>";
            }
            
      innerHTML += "<td style='text-align:center'><button class='btn btn-sm boton_bloqueos' style='background:#1c4c5f; color:white;font-weight: lighter' type='button' onclick='desbloqueaClaveSeleccionada(" + Clave_Id_ue_bloque + ")'>Desbloquear</button></td>";
      innerHTML += "</tr>";
    }
    
    innerHTML += "</tbody>";
    return innerHTML;
}

/*--- FUNCION PARA OBTENER EL 'ID_ue' EVENTO CLICK TABLA DINAMICA en los datos bloqueados---*/
function desbloqueaClaveSeleccionada(claveADesbloquear) {
    //alert("claveADesbloquear " + claveADesbloquear);
    ///cancelar.do?id_ue=400020&id_tramo=11007

    Swal.fire({
        title: "",
        text: "Estas seguro que deseas desbloquear la clave " + claveADesbloquear,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`cancelar.do?id_tramo=10034&id_ue=${claveADesbloquear}`, {method: "POST", headers: {"Content-type": "application/json; charset=UTF-8"}, })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data.valor);
                        console.log(" la clave fue desbloqueada exitosamente");
                        var valorDesbloqueado = data.valor.split(",");
                        var banderaDesbloqueado = valorDesbloqueado[0];
                        console.log();
                        if (banderaDesbloqueado || banderaDesbloqueado == 'true') {
                            Swal.fire({
                                icon: "success",
                                title: "Se desbloqueo correctamente",
                            });
                            Listado_ClavesBloqueadas();
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error en el formulario",
                                text: "Favor de revisar cada uno de los campos del formulario, los campos incorrectos se mostraran en color rojo."
                            });
                        }
                   });
        } else {
            swal.close();
        }
     });
 
}

    