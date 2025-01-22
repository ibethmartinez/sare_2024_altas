
async function  doAbreReporte() {

    var url_prueba;
    var xTools = new x_tools();
    
    /*const form = document.forms.opcionesSupervisionInmuebles;*/
    /*  const radios = form.elements.grupoSupervisionInmuebles;
     const valueTipoServicio = Array
     .from(radios)
     .find(radio => radio.checked).value;*/
    var inpOptions;
    inpOptions = "<select id='reporteSwal' style='display:block' class='styleSelects' onchange=ocultaCombos(this.value)>" +
            '<option value="0" disabled selected hidden>Seleccione</option>' +
            '<option value="1">Reporte de Avance de Registros</option>' +
            '<option value="2">Reporte de Establecimientos Punteados</option>' +
            '<option value="3">Reporte de avance de registros punteados por Código </option>' +
            '<option value="4">Reporte de Establecimientos Pendientes de Punteo</option>' +
            '</select> ';
    var inpOptions_ce;
    inpOptions_ce = '<div  style="display: none!important" id="combo_ce">' +
            '<select id="cesReportes" style="display: block;" class="styleSelects" >' +
            '</select> ' +
            '</div>';
    var paramLocalCE = $_GET('ce');
    if (paramLocalCE == '') {
        inpOptions_ce = '';

    }
    const {value: formValues} = await Swal.fire({
        title: 'SELECCION REPORTE',
        showCloseButton: false,
        showCancelButton: true,
        background: '#2a3443',
        color: 'whitesmoke',
        fontFamily: 'system-ui',
        confirmButtonColor: '#3d7f7f',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar', 
        showConfirmButton: true,
//        closeModal: false,
        allowOutsideClick: false,
        html:
                inpOptions + inpOptions_ce,
        focusConfirm: false,
        preConfirm: () => {
            
            if (document.getElementById('reporteSwal').value > 0) {


                if (document.getElementById('cesReportes').value.replace(/['"]+/g, '') == 0 && document.getElementById('reporte').value == 7) {
                    swal.showValidationError('Seleccione la CE a buscar ')
                } else {
                                               
                    return [
                        document.getElementById('reporteSwal').value,
                        document.getElementById('cesReportes').value == "" ? 0 : document.getElementById('cesReportes').value
                    ]
                }
            } else {
                if (document.getElementById('cesReportes').value.replace(/['"]+/g, '') == 0 && document.getElementById('reporte').value == 7) {
                    //swal.showValidationError('Seleccione la CE a buscar ')
                } else {
                    //swal.showValidationError('Debes seleccionar un reporte ')
                }
                //swal.showValidationMessage('error')                  
                return false
            }
        }
    });
 
    
    if (formValues) {
       
        var obj = JSON.stringify(formValues);
        obj = obj.replace("[", "")
        obj = obj.replace("]", "")
        obj = obj.replace(/"/, "");
        obj = obj.replace(/"/, "");
        var array = obj.split(",");
        if ((array[1] == 'false' && array[2] == 'false' && array[3] == 'false') || array[0] == '0') {
            if (array[0] == '0') {
                mensajeErrorReporte("Seleccione el reporte a descargar");
            } else {
                mensajeErrorReporte("Seleccione el formato del reporte a descargar");
            }
        } else {
            var size = 'desktop';
            reporte = array[0];
            var formato = "";
            claveCEfiltroInmueble = array[1];

            // mensajeErrorReporte("Seleccione la CE a buscar");

            var paramLocalCE = $_GET('ce');
            var paraServicio = "00";
            if (reporte == '2'||reporte == '4') {
                if (paramLocalCE == '00') {
                    paraServicio = claveCEfiltroInmueble;
                    
                } else {
                    paraServicio = paramLocalCE;
                }
            } else {
                paraServicio = paramLocalCE;
            }
            
            let src_excel = "Reportes.do" + '?tipo=EXCEL&reporte=' + reporte + '&ce=' + paraServicio+'&time='+ parseInt(new Date().getTime() / 1000);
            let src_pdf = "Reportes.do" + '?tipo=PDF&reporte=' + reporte + '&ce=' + paraServicio+'&time='+ parseInt(new Date().getTime() / 1000);
             
            console.log(src_excel);
          
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton:"btn btn-primary",
                  cancelColor:'#3d7f7f',
                  cancelButton: "btn btn-success"                 
                },
                buttonsStyling: false
              });
              
              swalWithBootstrapButtons.fire({              
                text: "Escoge un formato para el reporte!",
                icon: "warning",
                background: '#2a3443',
                color: 'whitesmoke',
                showCancelButton: true,
                confirmButtonText: "Formato-Pdf",
                cancelButtonText: "Formato-Excel",
                allowOutsideClick: false,
                reverseButtons: true
              }).then((result) => {
                    
                if (result.isConfirmed) {
                    
                     if(reporte == '4' && paraServicio .includes("00") ) { 
                      
                        swalWithBootstrapButtons.fire({
                            title: '<strong>Reporte</strong>',
                            width: '90%',
                            html: `  <div class="progress" style="position:absolute;width:95%;height:4%;margin-top:2%;left:3%;border-radius:6px">
                                       <div class="progress-bar progress-bar-striped progress-bar-animated" style="width:100%;--mdb-progress-height:45px !important">
                                          <button class="CargaReporteNac" disabled>
                                             Cargnado Reporte
                                               <span class="spinner-grow spinner-grow-sm"></span>
                                               <span class="spinner-grow spinner-grow-sm"></span>
                                               <span class="spinner-grow spinner-grow-sm"></span>
                                               <span class="spinner-grow spinner-grow-sm"></span>
                                               <span class="spinner-grow spinner-grow-sm"></span>
                                          </button>
                                         </div>                                      
                                       </div>
                                     <iframe class='iframe-reporte' title="Preview"  name="titulo"  id="myIframeReporte" src=${src_pdf}></iframe>`,
                            showCloseButton: true,
                            showCancelButton: true,
                            cancelButtonText: 'Cancelar',                   
                            confirmButtonText: 'Aceptar',                              
                            showConfirmButton: true,                  
                            allowOutsideClick: false,
                            focusConfirm: false,

                            customClass: {
                              confirmButton:"Aceptar_Repo",
                              cancelButton: "Cancelar_Repo"
                           }                   
                       });
                    }else{
                    
                     swalWithBootstrapButtons.fire({
                          title: '<strong>Reporte</strong>',
                          width: '90%',
                          html: `<iframe class='iframe-reporte' title="Preview"  name="titulo"  id="myIframeReporte" src=${src_pdf}></iframe>`,
                          showCloseButton: true,
                          showCancelButton: true,
                          cancelButtonText: 'Cancelar',                   
                          confirmButtonText: 'Aceptar',                              
                          showConfirmButton: true,                  
                          allowOutsideClick: false,
                          focusConfirm: false,

                            customClass: {
                              confirmButton:"Aceptar_Repo",
                              cancelButton: "Cancelar_Repo",
                              popup:"contenedor_pdf"
                           }                   
                       });
                   }
                   
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                            xTools.descaraga(src_excel);//Genera Igrame para descragas
                             
                            if(paraServicio .includes("00") ) {
                                   
                                $(function () {
                                        $('body').find('.swal2-html-container').each(function () {
                                            $(this).attr('style', 'display: none');
                                        });
                                });                                   
                                    Swal.fire({
                                       // html: `<iframe class='iframe-reporte' title="Preview"  name="titulo"  id="myIframeReporte" src=${src_excel}></iframe>`, 
                                        position: "center",
                                        icon: "success",
                                        title: "Descargando...espere un momento!",                                       
                                        showConfirmButton: true,                                       
                                        allowOutsideClick: false
                                    });
                                   
                            }else {
                                    
                                    $(function () {
                                        $('body').find('.swal2-html-container').each(function () {
                                            $(this).attr('style', 'display: none');
                                        });
                                    });  
                                                                
                                    Swal.fire({
                                      //html: `<iframe class='iframe-reporte' title="Preview"  name="titulo"  id="myIframeReporte" src=${src_excel}></iframe>`, 
                                        position: "center",
                                        icon: "success",                                    
                                        title: "Descargando...espere un momento!",                                       
                                        showConfirmButton: true,                                       
                                        allowOutsideClick: false
                                    });                                                    
                           }                                                      
                }               
           });                          
        }
    }
    
}


var listaCesReportes = [];


function ocultaCombos(valor) {
    //$("#combo_ce").show();
    listaCesReportes = [];          
    if ((valor == 2)|| (valor==4)) {
        var paramLocalCE = $_GET('ce');
        if (paramLocalCE == '00') {
            $("#combo_ce").show();     
            var htmlOpciones = "";
            sendAJAX('getTcCoestatales.do', {}, 'GET', function (data) {
                console.log(" los valores para los combos son ");
                console.log(data[0].datos);
                //if ((data[0].datos.success!=null &&data[0].datos.success == true)) {

                htmlOpciones += '<option value="0" disabled selected hidden>Filtro por CE</option>';
                htmlOpciones += '<option value="00">Nacional</option>';
                for (var i = 0; i < data[0].datos.list.length; i++) {
                    listaCesReportes.push(data[0].datos.list[i].abreviatura);
                    htmlOpciones += "<option value= " + data[0].datos.list[i].cestatal + ">" + data[0].datos.list[i].descripcion + "</option>";
                }

                $("#cesReportes").append(htmlOpciones);
                /* } else {
                 
                 }*/
            }, function () { });
        }
        //$("#combo_ce").removeClass("ocularComboReportes");
        //$("#combo_ce").addClass("mostrarComboReportes");
    } else {
        $("#combo_ce").hide();
        //$("#combo_ce").addClass("ocularComboReportes");
        //$("#combo_ce").removeClass("mostrarComboReportes");
    }
}



var sendAJAX = function (URL, data, type, myfunction, bs, withCredentials) {
    if (type !== null && type !== '') {
        type = type.toUpperCase();
    }
    if (URL === null && URL === '') {
        return '';
    }
    var credential = false;
    if (typeof withCredentials !== 'undefined') {
        credential = false || withCredentials;

    }
    $.ajax({
        type: type.toString(),
        url: URL,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8', //multipart/form-data, or text/plain
        dataType: 'json', //(xml, json, script, or html
        cache: false,
        async: true,
        xhrFields: {withCredentials: credential},
        crossDomain: true, //false si es mismo dominio, true  para forzar el uso de cross domain usar sonp
        data: data,
        beforeSend: function () {
            if (bs !== null && bs !== '') {
                bs(); //beforeSend function 
            }
        },
        success: function (dataJSON) {
            var dataBack = [{}];
            dataBack[0].operation = true;
            dataBack[0].datos = dataJSON;
            myfunction(dataBack);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            var dataBack = [{}];
            dataBack[0].operation = false;
            dataBack[0].messages = [thrownError];//['Error de conexión'];
            myfunction(dataBack);
        }

    });
};


