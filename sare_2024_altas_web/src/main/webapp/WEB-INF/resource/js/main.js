/* global fetch */

let dataUserFromLoginLocalStorage
let actualPagina = 1
let inicioPaginacion = 1
let finPaginacion = screen.width <= '480' ? 5 : 7
let inicioClavesVista = 0
let finClavesVista = 9
let actualPaginaLock = 1
let inicioPaginacionLock = 1
let finPaginacionLock = screen.width <= '480' ? 5 : 7
let inicioClavesVistaLock = 0
let finClavesVistaLock = 9
let dataCleeListNew = {}
let dataCleeListNewLock = {}
let xycoorsx, xycoorsy, punteo, realPunteo, mod_cat, cve_geo, cve_geo2016, cveft, e10_cve_vial, confirmacionPunteo
screen.width <= '480'
/*let layersSARE = ['c100', 'c101', 'wdenue']*/
let layersSARE = ['c100', 'c101'] //capas para el masivo
//let layersSARE=['c100', 'c110', 'wdenue'] //capas para el ege
let dataResultSearchClee = {}
let dataResultSearchCleeLock = {}
let cleeListType = 'normal'
let titulo_impresion = 'SARE'
let fieldExists = false //bandera para momento de puntear saber si ya se hizo cambio de inputs por selects y al reves 
let bandera_ratificar = false
let catalogoCatVial = []
let arrayClavesBloqueadas = ""
let arrayClavesBloqueadasTodas = ""
let banderaDesbloquear = false
let bandera = false
let isAlta = false
let combosc154yOrigen = false
let valorScian;
let htmlDivClases
let validaAltas = false
var id_ue;
var id_inmueble;
var ObjectRequest = {}
const idEleToSelect = ['e10a', 'e10b', 'e10c']
var tipoE10_g, tipoE10a_g, tipoE10b_g, tipoE10c_g;
var E10_g, E10a_g, E10b_g, E10c_g;



const init = () =>
        {

            id_ue = document.getElementById("id_ue").value;
            addCapas({'checked': true, 'id': 'unidades'})
            inputsinhabilitar.map(input => document.getElementById(input.id).setAttribute('disabled', true))
            //addInitialCapas()
        }

const handleChangeOptions = option => {
    const title = document.getElementById(`option-${option}`)
    const idWms = urlServices['map'].label;
    const checkBox = document.getElementById(`${option}`)
    checkBox.checked ? title.classList.add('option-active') : title.classList.remove('option-active')
    if (option == "c101") {
        addCapas(checkBox);
    } else {
        addLayerEconomicas(checkBox, option);
    }

}

//funcion para agregar capas en las opciones Matrice,unicos,denue
const addLayerEconomicas = (chk, option) => {
    var idWms = urlServices['map'].label
    if (chk.checked === true) {
        if (layersSARE.indexOf(chk.id) < 0) {
            switch (option) {
                case 'wdenue': //denue
                    addLay('wdenue')
                    break;
                case 'c101': //unicos y sucursales
                    // addLay('c101')
                    break;
                case 'C101M': //matrices
                    addLay('C101M')
                    break;
                case 'c104': //postes de kilometraje
                    addLay('c104')
                    break;
            }
        }
    } else {
        layersSARE.splice(layersSARE.indexOf(chk.id), 1)
    }
    MDM6('setParams', {layer: idWms, params: {'layers': layersSARE, 'EDO': '00'}})
}

//Funcion agregar capas en el mapa en la opcion sucursales
const addCapas = chk => {
    var idWms = urlServices['map'].label
    MDM6('updateSize');
    if (chk.checked == true) {
        if (layersSARE.indexOf('c101') < 0) {
            //addLay('c101')
        }
    } else {
        if (chk.checked === 'noFalse') {

        } else {
            // remLay('c101')
        }
        if (typeof chk.mza !== 'undefined' && chk.mza === true) {
            remLay('c103') //Ageb
            remLay('c103r') // ageb rural
            remLay('c107') //localidades urbanas
            remLay('c107r') // localidades rurales
            remLay('c108') // municipios
            addLay('c102') //manzanas
        }
        if (typeof chk.ageb !== 'undefined' && chk.ageb === true) {
            //  remLay('c102')
            addLay('c103r')
            addLay('c103')
            addLay('c107')
            addLay('c107r')
            addLay('c108')

        }

    }
    ordenaLayer()
    MDM6('setParams', {layer: idWms, params: {'layers': layersSARE, 'EDO': '00'}})
}

//Funcion para agregar capas cuando ya tenemos agregadas en el array de las capas
const remLay = item => {
    var index = layersSARE.indexOf(item)
    index >= 0 && (layersSARE.splice(index, 1))
}

//Funcion para llenar arreglo con las capas que van en el mapa
const addLay = item => {
    var index = layersSARE.indexOf(item)
    index < 0 && (layersSARE.push(item))
}

//Funcion para ordenar las capas que llegan al mapa
const ordenaLayer = () => {
    if (layersSARE.indexOf('c102') > 0) {
        remLay('c102')
        remLay('c103r')
        layersSARE.unshift('c102')
        layersSARE.unshift('c103r')
    } else if (layersSARE.indexOf('c103') > 0) {
        remLay('c103')
        layersSARE.unshift('c103')
    }
}

const zooma = () => {
}

//Funcion que hace que se actualice el mapa cada vez que se hace zoom
const eventoMoveZoom = () => {
    var level = MDM6('getZoomLevel')
    level > 9 && level < 13 ? addCapas({'checked': 'noFalse', 'id': 'unidades', 'ageb': true, 'mza': true})
            : level >= 12 ? addCapas({'checked': 'noFalse', 'id': 'unidades', 'ageb': true, 'mza': true})
            : addCapas({'checked': 'noFalse', 'id': 'unidades', 'ageb': true, 'mza': true})
}

// Función buscar clave
const buscarUE = () => {
    id_ue = document.getElementById('id_ue').value;
    const claveBusqueda = document.getElementById('clave-busqueda')
    if (claveBusqueda.value == '') {
        claveBusqueda.classList.add('animated', 'shake', 'wrap-input-empty')
        claveBusqueda.addEventListener('animationend', () => claveBusqueda.classList.remove('animated', 'shake', 'wrap-input-empty'))
        Swal.fire({
            position: 'bottom-end',
            type: 'warning',
            title: 'Ingresa primero la clave a buscar',
            showConfirmButton: false,
            timer: 2000
        })
    } else {
        // animación btns
        bandera_ratificar = false
        findUE(claveBusqueda.value)
    }
}

//Función que busca la id_ue
const findUE = id_ue => {

    id_ue = id_ue;
    xycoorsx = ''
    xycoorsy = ''
    //document.getElementById("origen").style.display = 'block';
    //document.getElementById("c154").style.display = 'block';
    //document.getElementById("catorigen").style.display = 'none';
    //document.getElementById("catc154").style.display = 'none';
    //document.getElementById("filtroXclase").style.display = 'none';
    if (!/^([0-9])*$/.test(id_ue) && dataUserFromLoginLocalStorage.proyecto != 11) {
        Swal.fire({
            position: 'bottom-end',
            type: 'warning',
            title: 'La clave debe ser númerica',
            showConfirmButton: false,
            timer: 2000
        })
    } else {
        callServiceFindUE(id_ue)
        inputsinhabilitar.map(input => document.getElementById(input.id).setAttribute('disabled', true))
        //handleShowRaticaHideSearch()
        //habilita boton cancelar


    }
}



//Función que manda llamar el servicio que regresa la busqueda
/*observacion 1 , corregir cuando hay un error */
var id_ue_renem2022;
var clee_renem2022;
const callServiceFindUE = (id_ue) => {
    let tramoproyecto = dataUserFromLoginLocalStorage.nombre;
    if (dataUserFromLoginLocalStorage.proyecto == 11) {
        tramoproyecto = dataUserFromLoginLocalStorage.tramo_control;
        document.getElementById("id_ue").disabled = true
    } else {
        document.getElementById("id_ue").disabled = true
    }


    disabledInputs()
    inputsinhabilitar.map(input => document.getElementById(input.id).setAttribute('disabled', true))

    const cancelOption = document.getElementById('item-cancel-option')
    const NoLocalizadoOption = document.getElementById('item-no-localizado-option')
    sendAJAX(urlServices['serviceSearch'].url,
            {
                'proyecto': dataUserFromLoginLocalStorage.proyecto,
                'p': '1',
                'tramo': tramoproyecto,
                'ce': dataUserFromLoginLocalStorage.ce,
                'usuario': dataUserFromLoginLocalStorage.nombre,
                'id_ue': id_ue,
                'time_stamp': new Date()
            },
            urlServices['serviceSearch'].type,
            data => {
                if (data[0].operation) {

                    swal.close();
                    //muestra mensaje si hay error
                    showModalMsgError(data)
                    //realiza acercamiento en el mapa
                    acercarWithExtent(data)
                    cancelOption.removeAttribute('disabled')
                    NoLocalizadoOption.removeAttribute('disabled')
                    //comienza a mostrar datos en la interfaz
                    showDataInterfaz(data)
                    id_ue = id_ue;
                    id_inmueble = data[0].datos.datos.datos.id_ue;

                    E10_g = data[0].datos.datos.datos.e10;
                    E10a_g = data[0].datos.datos.datos.e10a;
                    E10b_g = data[0].datos.datos.datos.e10b;
                    E10c_g = data[0].datos.datos.datos.e10c;

                    //clee_renem2022=data[0].datos.datos[0].clee

                    if (data[0].datos.datos.datos.tipo_e10 != null && data[0].datos.datos.datos.tipo_e10 != '')
                    {
                        tipoE10_g = data[0].datos.datos.datos.tipo_e10;
                    }
                    if (data[0].datos.datos.datos.tipo_e10a != null && data[0].datos.datos.datos.tipo_e10a != '')
                    {
                        tipoE10a_g = data[0].datos.datos.datos.tipo_e10a;
                    }
                    if (data[0].datos.datos.datos.tipo_e10b != null && data[0].datos.datos.datos.tipo_e10b != '')
                    {
                        tipoE10b_g = data[0].datos.datos.datos.tipo_E10_b;
                    }
                    if (data[0].datos.datos.datos.tipo_e10c != null && data[0].datos.datos.datos.tipo_e10c != '')
                    {
                        tipoE10c_g = data[0].datos.datos.datos.tipo_e10c;
                    }
                    id_ue_renem2022 = data[0].datos.datos.datos.id_ue;
                    inputsinhabilitar.map(input => document.getElementById(input.id).setAttribute('disabled', true))
                } else {
                    Swal.fire({
                        position: 'bottom-end',
                        type: 'warning',
                        title: data[0].messages[0] + "! Porfavor intente nuevamente",
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            }, () => {
        swal({
            width: '35%',
            title: 'Buscando información de la clave:' + id_ue,
            text: 'Por favor espere un momento',
            //timer: 2000,
            onOpen: () => swal.showLoading()
        })
                .then(() => {
                },
                        dismiss => {

                        }
                )
    })
}

//Comienza a mostrar datos en la interfaz
const showDataInterfaz = data => {
    handleActionPunteoAlta('off')
    //obtiene el código postal   
    getCp(data[0].datos.datos.datos.e03)
    validateCoord(data)
}

//valida coordenadas xy en caso de venir vacias ya no hará nada
const validateCoord = data => {
    if (data[0].datos.datos.datos.coor_x == null || data[0].datos.datos.datos.coor_y == null) {
        ratificar('no')
    } else {
        //si trae coordenadas xy mostrará la chincheta sobre el mapa
        xycoorsx = data[0].datos.datos.datos.coor_x
        xycoorsy = data[0].datos.datos.datos.coor_y
        var corrdMercator = MDM6('toMercator', xycoorsx, xycoorsy);
        console.log(" marcador 1");
        console.log(corrdMercator.lon);
        console.log(corrdMercator.lat);
        fillValidaCoord(corrdMercator.lon, corrdMercator.lat);
        if (coordenadasValidas == true || coordenadasValidas == 'true') {
            MDM6('addMarker', {lon: parseFloat(corrdMercator.lon), lat: parseFloat(corrdMercator.lat), type: 'routen', params: {nom: 'Ubicación Original', desc: corrdMercator.lon + ", " + corrdMercator.lat}})
            handleActionTargetRef()
        } else {
            ratificar('no')
        }
    }

    fillForm(data)
}

//función para llenar el formulario
const fillForm = data => {

    //if(data[0].datos.datos[0].tipo_E14==null)
    //{




    //}
    $.each(data[0].datos.datos.datos, (i, e) => {
        (i === 'e10a' || i === 'e10b' || i === 'e10c' || i == '')
                ? $("#" + i).html("<option value='" + e + "'>" + e + "</option>")
                : $("#" + i).val(e);
        if (i == 'tipo_e14') {
            fillCatalogo(e)
        }
        if (i == "e23a") {
            fillCatalogoTipoUEconomicaE23a(e);
        }
        if (i == 'tipo_e12p') {
            fillCatalogoPiso(e)
        }
        if (i == 'tipo_e19') {
            fillCatalogoConjuntosComerciales(e);
        }
    })


}

var coordenadasValidas = false;
//función que valida las coordenadas caigan en el pasi mexico
function fillValidaCoord(x, y) {
    sendAJAXfalse(urlServices['serviceValidaCord'].url,
            {'x': x, 'y': y},
            urlServices['serviceValidaCord'].type,
            data => {
                if (data[0].operation) {
                    //coordenadasValidas = true;
                    coordenadasValidas = data[0].datos.success
                    console.log("coord valida");
                    console.log(data);

                } else {
                    coordenadasValidas = false;
                }
            },
            '')
}

//función que llena el catalogo al hacer la busqueda
const fillCatalogo = (e) => {
    sendAJAXfalse(urlServices['serviceCatalogoAsentamientos'].url,
            {'proyecto': dataUserFromLoginLocalStorage.proyecto},
            urlServices['serviceCatalogoAsentamientos'].type,
            data => {
                if (data[0].operation) {
                    const arrAsent = data[0].datos.list
                    const opcSelected = document.getElementById('tipo_e14')
                    while (opcSelected.options.length > 0) {
                        opcSelected.remove(0);

                    }
                    arrAsent.forEach((o, i) => {
                        let opt = document.createElement('option')
                        opt.appendChild(document.createTextNode(o.descripcion))
                        opt.value = o.id_tipoasen
                        o.id_tipoasen === opcSelected.value ? opt.setAttribute('selected', true) : false
                        opcSelected.appendChild(opt)
                    })
                    if (e < 10) {
                        e = "0" + (e * 1);
                    }
                    $("#tipo_e14").val(parseInt(e));
                    changeTipoAsentamiento(e);
                    //opcSelected.onchange=alert("change");

                } else {
                }
            },
            '')
}

const fillCatalogoTipoUEconomicaE23a = (e) => {
    sendAJAXfalse(urlServices['serviceTipoUEconomicaE23a'].url,
            {},
            urlServices['serviceTipoUEconomicaE23a'].type,
            data => {
                if (data[0].operation) {
                    const arrayTipoUE = data[0].datos.list
                    const opcSelected = document.getElementById('e23a')
                    while (opcSelected.options.length > 0) {
                        opcSelected.remove(0);

                    }
                    arrayTipoUE.forEach((o, i) => {
                        let opt = document.createElement('option')
                        opt.appendChild(document.createTextNode(o.descripcion))
                        opt.value = o.e23a
                        o.id_tipoasen === opcSelected.value ? opt.setAttribute('selected', true) : false
                        opcSelected.appendChild(opt)
                    })
                    $("#e23a").val(e);

                    //opcSelected.onchange=alert("change");

                } else {
                }
            },
            '')
}

const changeTipoAsentamiento = (tipoAsen) => {
    tipoAsen == 99 ? document.getElementById("tipo_e14_otro").style.display = "initial" : document.getElementById("tipo_e14_otro").style.display = "none"
    //tipoAsen == 99 ? document.getElementById("tipo_e14").style.display = "none" : document.getElementById("tipo_e14").style.display = "initial"
}

const changeTipoPiso = (tipoPiso) => {
    tipoPiso == 99 ? document.getElementById("te12p").style.display = "initial" : document.getElementById("te12p").style.display = "none"
    //tipoAsen == 84 ? document.getElementById("tipo_e12p").style.display = "none" : document.getElementById("tipo_e12p").style.display = "initial"
}


const changeCentroComercial = (tipoCentroComercial) => {
    tipoCentroComercial == 11 ? document.getElementById("te19").style.display = "initial" : document.getElementById("te19").style.display = "none"
    //tipoAsen == 11 ? document.getElementById("tipo_e19").style.display = "none" : document.getElementById("tipo_e19").style.display = "initial"
}



const fillCatalogoPiso = (e) => {
    sendAJAXfalse(urlServices['serviceCatalogoPiso'].url,
            {'proyecto': dataUserFromLoginLocalStorage.proyecto},
            urlServices['serviceCatalogoPiso'].type,
            data => {
                if (data[0].operation) {
                    const arrayTipoPiso = data[0].datos.list
                    const opcSelected = document.getElementById('tipo_e12p');
                    let opt = document.createElement('option');
                    while (opcSelected.options.length > 0) {
                        opcSelected.remove(0);

                    }
                    opt.appendChild(document.createTextNode("Seleccione"));
                    //opt.value = "Seleccione"
                    opt.setAttribute('selected', true)
                    opcSelected.appendChild(opt)
                    arrayTipoPiso.forEach((o, i) => {
                        let opt = document.createElement('option')
                        let valor = "descripción: " + o.descripcion + "/ posición: " + o.posicion + " /  nivel: " + o.nivel
                        opt.appendChild(document.createTextNode(valor))
                        opt.value = o.tipo_e12p
                        o.tipo_e12p === opcSelected.value ? opt.setAttribute('selected', true) : false
                        opcSelected.appendChild(opt)
                    })
                    $("#tipo_e12p").val(e);
                    changeTipoPiso(e);
                } else {
                }
            },
            '')
}

//función que llena el catalogo al hacer la busqueda
const fillCatalogoConjuntosComerciales = (e) => {
    sendAJAXfalse(urlServices['serviceCatalogoConjuntosComerciales'].url,
            {'proyecto': dataUserFromLoginLocalStorage.proyecto},
            urlServices['serviceCatalogoConjuntosComerciales'].type,
            data => {
                if (data[0].operation) {
                    const arrayConjuntosComerciales = data[0].datos.list
                    const opcSelected = document.getElementById('tipo_e19')
                    let opt = document.createElement('option')
                    while (opcSelected.options.length > 0) {
                        opcSelected.remove(0);

                    }
                    opt.appendChild(document.createTextNode("Seleccione"))
                    opt.value = "0"
                    opt.setAttribute('selected', true)
                    opcSelected.appendChild(opt)
                    arrayConjuntosComerciales.forEach((o, i) => {
                        let opt = document.createElement('option')
                        opt.appendChild(document.createTextNode(o.descripcion))
                        opt.value = o.id_tipocomercial
                        o.id_tipocomercial === opcSelected.value ? opt.setAttribute('selected', true) : false
                        opcSelected.appendChild(opt)
                    })
                    if (e < 10) {
                        e = '0' + (e * 1);
                    }
                    changeCentroComercial(e);
                    $('#tipo_e19').val(e)
                } else {
                }
            },
            '')
}

//Función que hace zoom con el extent al hacer la busqueda
const acercarWithExtent = data => {
    let res = data[0].datos.datos.datos.extent.split(",")
    MDM6("goCoords", parseInt(res[0], 10), parseInt(res[1], 10), parseInt(res[2], 10), parseInt(res[3], 10))
}

//Función que llama el servicio para obtener el código postal
const getCp = ce => {
    sendAJAX(
            urlServices['serviceCP'].url,
            {'cve_ent': ce, 'proyecto': dataUserFromLoginLocalStorage.proyecto},
            urlServices['serviceCP'].type,
            data => {
                cpObj = data[0].datos
            },
            () => {
    }
    )
}

//Función que valida si los datos vienen correctos al hacer la busqueda
const showModalMsgError = data => {
    const dataE = data[0].datos.datos.datos.e
    let mensaje

    if (typeof dataE !== 'undefined') {
        arrayErrores.map(error => dataE === error.value ? mensaje = error.mensaje : false)
        const claveBusqueda = document.getElementById('clave-busqueda')
        claveBusqueda.classList.add('animated', 'shake', 'wrap-input-empty')
        claveBusqueda.addEventListener('animationend', () => claveBusqueda.classList.remove('animated', 'shake', 'wrap-input-empty'))
        Swal.fire
                ({
                    position: 'bottom-end',
                    type: 'warning',
                    title: mensaje,
                    showConfirmButton: false,
                    timer: 2000
                })
    } else {
        handleShowRaticaHideSearch()
    }
}

// Función ver lista claves
const handleViewCleeList = () => {
    console.log(" el time stamp ");
    console.log(new Date());
    //document.getElementById("filtroXclase").style.display = 'none';
    let tramoporproyecto = dataUserFromLoginLocalStorage.nombre;
    if (dataUserFromLoginLocalStorage.proyecto == 11) {
        tramoporproyecto = dataUserFromLoginLocalStorage.tramo_control;
    }
    sendAJAX(
            urlServices['getListadoUnidadesEconomicas'].url,
            {
                'proyecto': dataUserFromLoginLocalStorage.proyecto,
                'tramo': tramoporproyecto,
                'id_ue': dataUserFromLoginLocalStorage.ce,
                'time_stam': new Date()
            },
            urlServices['getListadoUnidadesEconomicas'].type,
            data => {
                if (data[0].datos.datos != undefined && data[0].datos.datos.length > 0) {
                    swal.close();
                    dataCleeListNew = data[0].datos
                    console.log(" inicioClavesVistaLock 1-" + inicioClavesVista);
                    popupCleeList(data[0].datos.datos)
                } else {
                    Swal.fire
                            ({
                                position: 'bottom-end',
                                type: 'warning',
                                title: 'No se encontraron claves disponibles para la coordinación estatal',
                                showConfirmButton: false,
                                timer: 2000
                            })
                }

            },
            () => {
        swal({
            title: '<span style="width:100%;">Buscando información!</span>',
            text: 'Por favor espere un momento',
            //timer: 2000,
            //html: true,
            onOpen: () => swal.showLoading()
        })
                .then(
                        () => {
                },
                        dismiss => {
                        }
                )
    }
    )
}

const popupCleeList = data => {
    const notFoundClee = document.getElementById('wrap-list-not-found')
    if (data.length == 0) {
        notFoundClee.classList.remove('wrap-inactive')
        notFoundClee.classList.add('animated', 'shake')
        // Swal.fire
        //       ({
        //               position: 'bottom-end',
        //               type: 'warning',
        //               title: 'No se encontraron claves disponibles para la coordinación estatal',
        //               showConfirmButton: false,
        //               timer: 2000
        //       })
        return
    }
    console.log(" inicioClavesVistaLock -2 " + inicioClavesVista);
    Swal.fire({
        title: '<strong style="width:100%">CLAVES DISPONIBLES</strong>',
        html: cleeList(data, actualPagina, inicioPaginacion, finPaginacion, inicioClavesVista, finClavesVista),
        showCloseButton: true,
        showConfirmButton: false,
        showCancelButton: false,
        focusConfirm: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        customClass: 'clavesdisponibles',
        onClose: () => {
            cleeListType = 'normal';
            handleResetList()
        }
    })
}

const popupCleeListBloqueadas = data => {
    const notFoundClee = document.getElementById('wrap-list-not-found-lock')
    if (data.length == 0) {
        notFoundClee.classList.remove('wrap-inactive')
        return
    }
    console.log(" inicioClavesVistaLock -2 ya debe venir con nuevo dato " + inicioClavesVistaLock);
    Swal.fire({
        width: 1060,
        title: '<strong style="width:100%">CLAVES DISPONIBLES </strong>',
        html: cleeListLock(data, actualPaginaLock, inicioPaginacionLock, finPaginacionLock, inicioClavesVistaLock, finClavesVistaLock),
        showCloseButton: true,
        showConfirmButton: false,
        showCancelButton: false,
        focusConfirm: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        onClose: () => {
            cleeListType = 'normal'
        }
    })
}

const cleeList = (data, actualPagina, inicioPaginacion, finPaginacion, inicioClavesVista, finClavesVista) => {
    //console.log(data)

    console.log(" inicioClavesVistaLock 3-" + inicioClavesVista);
    let tabla = ''
    const clavesPorVista = 10
    const totalClaves = data.length
    const totalPaginaciones = Math.ceil(totalClaves / clavesPorVista)
    // console.log(totalPaginaciones)
    let posicionFinal = ''
    // console.log(finClavesVista)

    finClavesVista >= totalClaves ? posicionFinal = totalClaves - 1 : posicionFinal = finClavesVista
    if (totalPaginaciones < finPaginacion) {
        finPaginacion = totalPaginaciones
    }

    console.log(" inicioClavesVistaLock 4-" + inicioClavesVista);
    tabla = `
    <div id='container-search-cleelist' class='container-search-cleelist'>
      <span class='text-search-cleelist'>Filtrar:</span>
      <div class="wrap-input-search-cleelist">
        <input type='text' id='search-cleelist' name='search-cleelist'  onkeypress="handleSearchCleeEnter(event)" />
      </div>
    </div>

    <div class='wrap-list items not-found wrap-inactive' id="wrap-list-not-found">
      <div class='item-lists'><span>No se encontraron claves disponibles para la Coordinación Estatal</span></div>
    </div>`


    tabla += `<div id='container-cleelist' class='container-cleelist row'>
      <div class='wrap-list'>
        <div class='title-column'>Clave</div>
        <div class='title-column'>Establecimiento</div>
        <div class='title-column'>CE</div>
        <div class='title-column'>Municipio</div>
      </div>`
    for (let num = inicioClavesVista; num <= posicionFinal; num++) {
        let {id_ue, e08, e03, e04} = data[num]
        tabla += `<div class='wrap-list items'>
          <div class='item-list clave'><span onclick=callServiceFindUE('${id_ue}')>${id_ue}</span></div>
<div class='item-list'><span>${e08}</span></div>
<div class='item-list'><span>${e03}</span></div>
<div class='item-list'><span>${e04}</span></div></div>
        `
    }

    tabla += `
        <ul class="pagination" id="pagination-clee">
          <li onclick='handlePaginationActive(${actualPagina}-1)' id="pagination-back" class="waves-effect">
            <a><i class="material-icons">chevron_left</i></a>
          </li>`
    actualPagina == 1 ? setTimeout(() => document.getElementById('pagination-back').classList.add('disabled'), 300) : false
    actualPagina == totalPaginaciones ? setTimeout(() => document.getElementById('pagination-next').classList.add('disabled'), 300) : false
    for (let pag = inicioPaginacion; pag <= finPaginacion; pag++) {
        tabla += `<li onclick='handlePaginationActive(${pag}, ${totalPaginaciones})' class='waves-effect' id='pag-${pag}'><a>${pag}</a></li>`

        if (pag == actualPagina) {
            setTimeout(() => document.getElementById(`pag-${pag}`).classList.add('active'), 300)
        }
    }
    tabla += `<li onclick='handlePaginationActive(${actualPagina}+1)' id="pagination-next" class="waves-effect"><a><i class="material-icons">chevron_right</i></a></li>
        </ul>`

    tabla += `</div>`

    return tabla
}

const FormarTablaSareEstatus = (data, tabla, posicionFinal) => {
    tabla += `<div id='container-cleelist' class='container-cleelist row'>
      <div class='wrap-list'>
        <div class='title-column'>Clave</div>
        <div class='title-column'>Código</div>
        <div class='title-column'>Status</div>
      </div>`
    for (let num = inicioClavesVista; num <= posicionFinal; num++) {
        let {idue, c154, status} = data[num]
        tabla += `<div class='wrap-list items'>
          <div class='item-list clave'><span onclick='callServiceFindUE(${idue})'>${idue}</span></div>
          <div class='item-list'><span>${c154}</span></div>
          <div class='item-list'><span>${status.replace('_', ' ')}</span></div>
        </div>`
    }
    return tabla
}

const FormarTablaSareUEEPA = (data, tabla, posicionFinal) => {
    tabla += `<div id='container-cleelist' class='container-cleelist row'>
      <div class='wrap-list'>
        <div class='title-column'>Clave</div>
        <div class='title-column'>Establecimiento</div>
        <div class='title-column'>CE</div>
        <div class='title-column'>Municipio</div>
      </div>`
    for (let num = inicioClavesVista; num <= posicionFinal; num++) {
        let {idue, e08, e03, e04} = data[num]
        tabla += `<div class='wrap-list items'>
          <div class='item-list clave'><span onclick='callServiceFindUE(${idue})'>${idue}</span></div>
<div class='item-list'><span>${e08}</span></div>
<div class='item-list'><span>${e03}</span></div>
<div class='item-list'><span>${e04}</span></div></div>
        `
    }
    return tabla
}


const FormarTablaSareRenem2022 = (data, tabla, posicionFinal) => {

    tabla += `<div id='container-cleelist' class='container-cleelist row'>
      <div class='wrap-list'>
        <div class='title-column'>Clave</div>
        <div class='title-column'>Establecimiento</div>
        <div class='title-column'>CE</div>
        <div class='title-column'>Municipio</div>
      </div>`
    for (let num = inicioClavesVista; num <= posicionFinal; num++) {
        let {id_ue, e08, e03, e04} = data[num]
        tabla += `<div class='wrap-list items'>
          <div class='item-list clave'><span onclick=callServiceFindUE('${id_ue}')>${id_ue}</span></div>
<div class='item-list'><span>${e08}</span></div>
<div class='item-list'><span>${e03}</span></div>
<div class='item-list'><span>${e04}</span></div></div>
        `
    }
    return tabla;
};

const FormarTablaSare = (data, tabla, posicionFinal) => {
    tabla += `<div id='container-cleelist' class='container-cleelist row'>
      <div class='wrap-list'>
        <div class='title-column'>Clave</div>
        <div class='title-column'>Código</div>
      </div>`
    for (let num = inicioClavesVista; num <= posicionFinal; num++) {
        let {id_ue, c154, status} = data[num]
        tabla += `<div class='wrap-list items'>
          <div class='item-list clave'><span onclick='callServiceFindUE(${id_ue})'>${id_ue}</span></div>
          <div class='item-list'><span>${c154}</span></div>
        </div>`
    }
    return tabla
}

const cleeListLock = (data, actualPaginaLock, inicioPaginacionLock, finPaginacionLock, inicioClavesVistaLock, finClavesVistaLock) => {
    let tabla = ''
    const clavesPorVista = 10
    const totalClaves = data.length
    const totalPaginaciones = Math.ceil(totalClaves / clavesPorVista)
    let posicionFinal = ''

    console.log(" inicioClavesVistaLock 3-" + inicioClavesVistaLock);
    finClavesVistaLock >= totalClaves ? posicionFinal = totalClaves - 1 : posicionFinal = finClavesVistaLock
    if (totalPaginaciones < finPaginacionLock) {
        finPaginacionLock = totalPaginaciones
    }
    tabla = `
    <div id='container-search-cleelist-lock' class='container-search-cleelist'>
      <span class='text-search-cleelist'>Filtrar:</span>
      <div class="wrap-input-search-cleelist">
        <input type='text' id='search-cleelist-lock' name='search-cleelist-lock'  onkeypress="handleSearchCleeEnterLock(event)" />
      </div>
    </div>

    <div class='wrap-list-Lock items not-found wrap-inactive' id="wrap-list-not-found">
      <div class='item-lists'><span></span>NO SE ENCONTRARON REFERENCIAS</div>
    </div>
    
    <div id='container-cleelist-lock' class='container-cleelist-Lock row'>
      <div class='wrap-list-Lock'>
        <div class='title-column'>Id UE</div>
        <div class='title-column'>Tamo control</div>
        <div class='title-column'>Tiempo bloqueado</div>
      </div>`

    console.log(" inicioClavesVistaLock 4-" + inicioClavesVistaLock);
    console.log(" posicionFinal 4-" + posicionFinal);

    for (let num = inicioClavesVistaLock; num <= posicionFinal; num++) {
        let {id_ue, c154, time_LOCK} = data[num]
        tabla += `<div class='wrap-list-Lock items'>
          <div class='item-list-Lock'><span onclick=Desbloquear('${id_ue}')>${id_ue}</span></div>
          <div class='item-list-Lock'><span>${c154}</span></div>
          <div class='item-list-Lock'><span>${time_LOCK}</span></div>
        </div>`
    }

    tabla += `
        <ul class="pagination" id="pagination-clee-lock">
          <li onclick='handlePaginationActiveLock(${actualPaginaLock}-1)' id="pagination-back-lock" class="waves-effect">
            <a><i class="material-icons">chevron_left</i></a>
          </li>`
    actualPaginaLock == 1 ? setTimeout(() => document.getElementById('pagination-back-lock').classList.add('disabled'), 300) : false
    actualPaginaLock == totalPaginaciones ? setTimeout(() => document.getElementById('pagination-next-lock').classList.add('disabled'), 300) : false
    for (let pag = inicioPaginacionLock; pag <= finPaginacionLock; pag++) {
        tabla += `<li onclick='handlePaginationActiveLock(${pag}, ${totalPaginaciones})' class='waves-effect' id='pag-${pag}'><a>${pag}</a></li>`

        if (pag == actualPaginaLock) {
            setTimeout(() => document.getElementById(`pag-${pag}`).classList.add('active'), 300)
        }
    }
    tabla += `<li onclick='handlePaginationActiveLock(${actualPaginaLock}+1)' id="pagination-next-lock" class="waves-effect"><a><i class="material-icons">chevron_right</i></a></li>
        </ul>`

    tabla += `</div>`

    return tabla
}



const handlePaginationActive = (page, totalPag) => {
    if (page > actualPagina || page < actualPagina) {
        inicioClavesVista = (page - 1) * 10
        finClavesVista = inicioClavesVista + 9
    } else if (page == actualPagina) {
        inicioClavesVista = inicioClavesVista
        finClavesVista = finClavesVista
    }

    if (page == finPaginacion) {
        if (screen.width <= '480') {
            inicioPaginacion = inicioPaginacion + 3
            finPaginacion = finPaginacion + 3
        } else {
            inicioPaginacion = inicioPaginacion + 5
            finPaginacion = finPaginacion + 5
        }

    } else if (page == inicioPaginacion) {
        if (page !== 1) {
            if (screen.width <= '480') {
                inicioPaginacion = inicioPaginacion - 3
                finPaginacion = finPaginacion - 3
            } else {
                inicioPaginacion = inicioPaginacion - 5
                finPaginacion = finPaginacion - 5
            }
        }
    }

    if (inicioPaginacion < 1) {
        inicioPaginacion = 1
        screen.width <= '480'
                ? finPaginacion = inicioPaginacion + (totalPag <= 4 ? totalPag - 1 : 4)
                : finPaginacion = inicioPaginacion + (totalPag <= 6 ? totalPag - 1 : 6)
    }

    if (finPaginacion > totalPag) {
        finPaginacion = totalPag
        screen.width <= '480'
                ? inicioPaginacion = finPaginacion - (totalPag <= 3 ? totalPag - 1 : 3)
                : inicioPaginacion = finPaginacion - (totalPag <= 5 ? totalPag - 1 : 5)
    }


    actualPagina = page
    if (cleeListType == 'normal') {
        popupCleeList(dataCleeListNew.datos)
    } else if (cleeListType == 'busqueda') {
        popupCleeList(dataResultSearchClee.datos)
    }

}


const handlePaginationActiveLock = (page, totalPagLock) => {
    if (page > actualPaginaLock || page < actualPaginaLock) {
        inicioClavesVistaLock = (page - 1) * 10
        finClavesVistaLock = inicioClavesVistaLock + 9
    } else if (page == actualPaginaLock) {
        inicioClavesVistaLock = inicioClavesVistaLock
        finClavesVistaLock = finClavesVistaLock
    }

    if (page == finPaginacionLock) {
        if (screen.width <= '480') {
            inicioPaginacionLock = inicioPaginacionLock + 3
            finPaginacionLock = finPaginacionLock + 3
        } else {
            inicioPaginacionLock = inicioPaginacionLock + 5
            finPaginacionLock = finPaginacionLock + 5
        }
    } else if (page == inicioPaginacionLock) {
        if (page !== 1) {
            if (screen.width <= '480') {
                inicioPaginacionLock = inicioPaginacionLock - 3
                finPaginacionLock = finPaginacionLock - 3
            } else {
                inicioPaginacionLock = inicioPaginacionLock - 5
                finPaginacionLock = finPaginacionLock - 5
            }
        }
    }

    if (inicioPaginacionLock < 1) {
        inicioPaginacionLock = 1
        screen.width <= '480'
                ? finPaginacionLock = inicioPaginacionLock + (totalPagLock <= 4 ? totalPagLock - 1 : 4)
                : finPaginacionLock = inicioPaginacionLock + (totalPagLock <= 6 ? totalPagLock - 1 : 6)
    }

    if (finPaginacionLock > totalPagLock) {
        finPaginacionLock = totalPagLock
        screen.width <= '480'
                ? inicioPaginacionLock = finPaginacionLock - (totalPagLock <= 3 ? totalPagLock - 1 : 3)
                : inicioPaginacionLock = finPaginacionLock - (totalPagLock <= 5 ? totalPagLock - 1 : 5)
    }

    actualPaginaLock = page
    console.log(" la cle list");
    console.log(dataCleeListNewLock);
    console.log("inicioClavesVistaLock chales" + inicioClavesVistaLock);
    if (cleeListType == 'normal') {
        console.log("mensaje uno");
        console.log(dataCleeListNewLock);
        popupCleeListBloqueadas(dataCleeListNewLock.datos)
    } else if (cleeListType == 'busqueda') {
        console.log("mensaje dos");
        console.log(dataCleeListNewLock);
        popupCleeListBloqueadas(dataResultSearchCleeLock.datos)
    }
}

const handleSearchCleeEnter = e => {
    const key = window.event ? e.which : e.keyCode
    key < 48 || key > 57 ? e.preventDefault() : false

    tecla = (document.all) ? e.keyCode : e.which;
    tecla == 13 ? handleSearchCleeList(e) : false
}

const handleSearchCleeEnterLock = e => {
    const key = window.event ? e.which : e.keyCode
    key < 48 || key > 57 ? e.preventDefault() : false

    tecla = (document.all) ? e.keyCode : e.which;
    tecla == 13 ? handleSearchCleeListLock(e) : false
}

const handleSearchCleeList = () => {
    const inputValue = document.getElementById('search-cleelist')
    const arrayCleeFind = []
    const data = dataCleeListNew.datos

    if (inputValue.value == '') {
        actualPagina = 1
        inicioPaginacion = 1
        finPaginacion = screen.width <= '480' ? 5 : 7
        inicioClavesVista = 0
        finClavesVista = 9
        cleeListType = 'normal'
        handleViewCleeList()
    } else {

        // encontar similitudes referente al valor de la busqueda y agregarlos a un nuevo objeto
        data.map(item => {
            // console.log(item)
            if (item.id_ue.indexOf(inputValue.value) != -1) {
                arrayCleeFind.push(item)
            }
        })

        // console.log(arrayCleeFind)

        // filtramos solo los que no son repetidos
        let result = arrayCleeFind.filter((valorActual, indiceActual, arreglo) => {
            return arreglo.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual
        })

        // console.log(result)

        const totalPaginaciones = Math.ceil(result.length / 10)
        const numPaginaciones = screen.width <= '480' ? 5 : 7
        const paginacionesAvanzar = totalPaginaciones >= numPaginaciones ? numPaginaciones : totalPaginaciones

        actualPagina = 1
        inicioPaginacion = 1
        finPaginacion = paginacionesAvanzar
        inicioClavesVista = 0
        result.length > 10 ? finClavesVista = 9 : finClavesVista = result.length - 1

        cleeListType = 'busqueda'
        dataResultSearchClee.datos = result
        // console.log(dataResultSearchClee.datos)
        popupCleeList(dataResultSearchClee.datos)

    }

}

const handleResetList = () => {
    const inputValue = document.getElementById('search-cleelist')
    const arrayCleeFind = []
    const data = dataCleeListNew.datos

    if (inputValue.value == '') {
        actualPagina = 1
        inicioPaginacion = 1
        finPaginacion = screen.width <= '480' ? 5 : 7
        inicioClavesVista = 0
        finClavesVista = 9
        cleeListType = 'normal'
    }
}

const handleSearchCleeListLock = () => {
    const inputValue = document.getElementById('search-cleelist-lock')
    const arrayCleeFind = []
    const data = dataCleeListNewLock.datos

    if (inputValue.value == '') {
        actualPaginaLock = 1
        inicioPaginacionLock = 1
        finPaginacionLock = screen.width <= '480' ? 5 : 7
        inicioClavesVistaLock = 0
        finClavesVistaLock = 9
        cleeListType = 'normal'
        CargaTablaBloqueadas()
    } else {

        // encontar similitudes referente al valor de la busqueda y agregarlos a un nuevo objeto
        data.map(item => {
            if (item.id_ue.indexOf(inputValue.value) != -1) {
                arrayCleeFind.push(item)
            }
        })

        // filtramos solo los que no son repetidos
        let result = arrayCleeFind.filter((valorActual, indiceActual, arreglo) => {
            return arreglo.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual
        })

        const totalPaginaciones = Math.ceil(result.length / 10)
        const numPaginaciones = screen.width <= '480' ? 5 : 7
        const paginacionesAvanzar = totalPaginaciones >= numPaginaciones ? numPaginaciones : totalPaginaciones

        actualPaginaLock = 1
        inicioPaginacionLock = 1
        finPaginacionLock = paginacionesAvanzar
        inicioClavesVista = 0
        result.length > 10 ? finClavesVista = 9 : finClavesVista = result.length - 1

        cleeListType = 'busqueda'
        dataResultSearchCleeLock.datos = result
        popupCleeListBloqueadas(dataResultSearchCleeLock.datos)

    }

}

// Función ratificar
const ratificar = request => {
    isAlta = false;
    handleVisibleRatifica()
    if (request == 'si') {
        enabledInputs()
        handleActionTargetRef()
        handleActionButtons('enabled')
        var coordenadasMercator = MDM6('toMercator', xycoorsx, xycoorsy);
        xycoorsx = coordenadasMercator.lon;
        xycoorsy = coordenadasMercator.lat;
        console.log(" marcador 2");
        MDM6('addMarker', {lon: parseFloat(xycoorsx), lat: parseFloat(xycoorsy), type: 'identify', params: {nom: '', desc: xycoorsx + ", " + xycoorsy}})
        handlePunteo(xycoorsx, xycoorsy, 'mercator', 'r')
        bandera_ratificar = true
    } else if (request == 'no') {
        funcionesNoRatificado()
    }
}

const funcionesNoRatificado = () => {
    handleShowAlertPickMap()
    enabledInputs()
    handleActionTargetRef()
    xycoorsx = ''
    xycoorsy = ''
    MDM6('hideMarkers', 'identify')
    const cancelOption = document.getElementById('item-cancel-option')
    cancelOption.removeAttribute('disabled')
}

//función que activa nuevamente funciones para abrir contenedor de busqueda
const handleActiveVisibleSearch = () => {
    const viewSearchContainer = document.getElementById('arrow-search')
    const tituloBusqueda = document.getElementById('titulo-busqueda')
    viewSearchContainer.setAttribute('onclick', 'handleVisibleSearch()')
    tituloBusqueda.setAttribute('onclick', 'handleVisibleSearch()')
}

//Funcion que lleva a cabo el punteo del establecimient
const handlePunteo = (x, y, tc, r) => {
    MDM6('updateSize');
    xycoorsx = ''
    xycoorsy = ''
    id_ue = document.getElementById('id_ue').value
    let ce = dataUserFromLoginLocalStorage.ce
    let tr = dataUserFromLoginLocalStorage.tramo_control
    let u = dataUserFromLoginLocalStorage.nombre
    inputsinhabilitar.map(input => document.getElementById(input.id).setAttribute('disabled', true))
    callServicePunteo(x, y, tc, r, id_ue, ce, tr, u)
    removeElementsSelects()

}

const removeElementsSelects = () => {
    let selan = document.getElementById("tipo_e10a");
    let selbn = document.getElementById("tipo_e10b");
    let selcn = document.getElementById("tipo_e10c");

    selan.innerHTML = "";
    selbn.innerHTML = "";
    selcn.innerHTML = "";

//    if(selan!=null && selan.type=='select-one')
//    {
//        for(let i=0;i<=selan.length;i++)
//        {
//           selan.remove(i); 
//        }
//    } 
//    if(selbn!=null && selbn.type=='select-one')
//    {
//        for(let i=0;i<=selbn.length;i++)
//        {
//            selbn.remove(i);
//        }
//    } 
//    if(selcn!=null && selcn.type=='select-one')
//    {
//        for(let i=0;i<=selcn.length;i++)
//        {
//            selcn.remove(i);
//        }
//    } 

}

//Función que llama al servicio para el punteo de unidades economicas
let imantado = false;
const callServicePunteo = (x, y, tc, r, id_ue, ce, tr, u) => {
    bandera = true;
    //showalertpunteoloading();

    sendAJAX(urlServices['serviceIdentify'].url,
            {
                'proyecto': dataUserFromLoginLocalStorage.proyecto,
                'x': x,
                'y': y,
                'tc': tc,
                'r': isAlta,
                'ce': ce,
                'id_ue': id_ue,
                'tramo': dataUserFromLoginLocalStorage.tramo_control
            }, urlServices['serviceIdentify'].type, data => {


        if (data[0].operation) {
            swal.close();
            bandera = false;
            if (data[0].datos.datos != null)
            {
                const {catVial} = data[0].datos.datos
                catalogoCatVial = catVial
            }
            // showalertpunteoloading();
            if (typeof data[0].datos.mensaje === 'undefined' || data[0].datos.mensaje === null) {
                confirmacionPunteo = false
                imantado = data[0].datos.datos.imantado;
                E10a_g = "";
                E10b_g = "";
                E10c_g = ""
                E10_g = "";
                actualizaForm(data[0].datos.datos)
                agregaFuncionEliminarDuplicadosSelects()
                handleTipoPunteo()
            } else {
                if (typeof data[0].datos.mensaje.type !== 'undefined') {
                    if (data[0].datos.mensaje.type === 'confirmar') {
                        switch (dataUserFromLoginLocalStorage.proyecto) {
                            case 1:
                            case 5:
                                showAlertPunteoConfirmaEge(data[0].datos.datos, 'Condiciones insuficientes de punteo', data[0].datos.mensaje.messages)
                                break;
                            default:
                                showAlertPunteoConfirma(data[0].datos.datos, 'Condiciones insuficientes de punteo', data[0].datos.mensaje.messages)
                                break;
                        }
                        //showAlertPunteoConfirma(data[0].datos.datos,'Condiciones insuficientes de punteo', data[0].datos.mensaje.messages)
                    } else {
                        if (data[0].datos.mensaje.type === 'error') {
                            showAlertPunteo('Condiciones insuficientes de punteo', data[0].datos.mensaje.messages)
                            MDM6('hideMarkers', 'identify')
                            xycoorsx = ''
                            xycoorsy = ''
                        } else {
                            handleActionButtons('disabled')
                            confirmacionPunteo = false
                            bandera_ratificar = false;
                            const cancelOption = document.getElementById('item-cancel-option')
                            cancelOption.removeAttribute('disabled')
                            showAlertPunteo('Condiciones insuficientes de punteo', data[0].datos.mensaje.messages)
                            MDM6('hideMarkers', 'identify')
                            xycoorsx = ''
                            xycoorsy = ''
                        }
                    }
                }
            }
        } else {
            MDM6('hideMarkers', 'identify')
            showAlertPunteo(`Punteo no realizado ${data[0].messages}`)
        }

    }, () => {
        swal({
            title: '<span style="width:100%;">Buscando información de punteo!</span>',
            text: 'Por favor espere un momento',
            //timer: 4000,
            onOpen: () => swal.showLoading()
        })
                .then(
                        () => {
                },
                        dismiss => {

                        }
                )

    })
}

const showalertpunteoloading = (bandera) =>
        {
            if (bandera == true) {
                alert("espere un momento porfavor");
            } else {
                alert("punteo realizado");
            }

//    swal 
//    ({
//      title: '<span style="width:100%;">Buscando información de punteo!</span>',
//      text: 'Por favor espere un momento',
//    })
        }

const agregaFuncionEliminarDuplicadosSelects = () => {
    idEleToSelect.map(id => {
        const idElement = document.getElementById(id)
        idElement.setAttribute('onchange', 'eliminaDuplicados(this)')
        idElement.removeAttribute('disabled')
    })
}

const eliminaFuncionEliminiarDuplicadosSelects = () => {
    idEleToSelect.map(id => {
        const idElement = document.getElementById(id)
        idElement.removeAttribute('onchange')
        idElement.removeAttribute('disabled')
    })
}

const removerOtrosInputs = () => {
    const tipoE10n_otro = document.getElementById('tipo_e10n_otro') //input
    const tipoE10an_otro = document.getElementById('tipo_e10an_otro') //input
    const tipoE10bn_otro = document.getElementById('tipo_e10bn_otro') //input
    const tipoE10cn_otro = document.getElementById('tipo_e10cn_otro') //input
    tipoE10n_otro != null ? tipoE10n_otro.style.display = 'none' : ""
    tipoE10n_otro != null ? tipoE10n_otro.removeAttribute('id') : ""
    tipoE10n_otro != null ? tipoE10n_otro.parentNode.removeChild(tipoE10n_otro) : ""
    tipoE10an_otro != null ? tipoE10an_otro.style.display = 'none' : ""
    tipoE10an_otro != null ? tipoE10an_otro.removeAttribute('id') : ""
    tipoE10an_otro != null ? tipoE10an_otro.parentNode.removeChild(tipoE10an_otro) : ""
    tipoE10bn_otro != null ? tipoE10bn_otro.style.display = 'none' : ""
    tipoE10bn_otro != null ? tipoE10bn_otro.removeAttribute('id') : ""
    tipoE10bn_otro != null ? tipoE10bn_otro.parentNode.removeChild(tipoE10bn_otro) : ""
    tipoE10cn_otro != null ? tipoE10cn_otro.style.display = 'none' : ""
    tipoE10cn_otro != null ? tipoE10cn_otro.removeAttribute('id') : ""
    tipoE10cn_otro != null ? tipoE10cn_otro.parentNode.removeChild(tipoE10cn_otro) : ""
}

const handleTipoPunteo = () => {
    if (punteo == 'Amanzanado' && mod_cat == '2') {
        confirmacionPunteo = true
    }
    const wrapTipoVialidad = document.getElementById('wrap-tipo-vialidad')
    const wrapTipoVialidadUno = document.getElementById('wrap-tipo-vialidad-uno')
    const wrapNombreVialidadUno = document.getElementById('wrap-nombre-vialidad-uno')
    const wrapTipoVialidadDos = document.getElementById('wrap-tipo-vialidad-dos')
    const wrapNombreVialidadDos = document.getElementById('wrap-nombre-vialidad-dos')
    const wrapTipoVialidadPosterior = document.getElementById('wrap-tipo-vialidad-posterior')
    const wrapNombreVialidadPosterior = document.getElementById('wrap-nombre-vialidad-posterior')
    const tipoE10n = document.getElementById('tipo_e10n') //input
    const tipoE10an = document.getElementById('tipo_e10an') //input
    const e10A = document.getElementById('e10a') // select
    const tipoE10bn = document.getElementById('tipo_e10bn') //input
    const e10B = document.getElementById('e10b') // select
    const tipoE10cn = document.getElementById('tipo_e10cn') //input
    const e10C = document.getElementById('e10c') // select
    const e07 = document.getElementById('e07')
    const tipoE10 = document.getElementById('tipo_e10');
    if (tipoE10.value != '') {
        $("#tipo_e10n").prop("disabled", true);
        $("#e10").prop("disabled", true);
    }

    realPunteo = punteo;


    handleReturnTipoNombreVialidad(wrapTipoVialidad.children, wrapTipoVialidad, 'tipo_e10n', 'tipo')
    //tipo vialidad 1
    handleReturnTipoNombreVialidad(wrapTipoVialidadUno.children, wrapTipoVialidadUno, 'tipo_e10an', 'tipo')
    //nombre vialidad 1
    handleReturnTipoNombreVialidad(wrapNombreVialidadUno.children, wrapNombreVialidadUno, 'e10a', 'nombre')
    //tipo vialidad 2
    handleReturnTipoNombreVialidad(wrapTipoVialidadDos.children, wrapTipoVialidadDos, 'tipo_e10bn', 'tipo')
    //nombre vialidad 2
    handleReturnTipoNombreVialidad(wrapNombreVialidadDos.children, wrapNombreVialidadDos, 'e10b', 'nombre')
    //tipo vialidad posterior
    handleReturnTipoNombreVialidad(wrapTipoVialidadPosterior.children, wrapTipoVialidadPosterior, 'tipo_e10cn', 'tipo')
    //nombre vialidad 2
    handleReturnTipoNombreVialidad(wrapNombreVialidadPosterior.children, wrapNombreVialidadPosterior, 'e10c', 'nombre')

    removerOtrosInputs()



}

//Función crear Input o Select según si es rural
const handleAttributesInputOrSelect = (type, constName, idField, ph = '') => {
    if (type === 'select') {
        constName.setAttribute('id', idField)
        constName.setAttribute('onchange', `asignaValorId(${idField})`)
        constName.classList.add('browser-default')
    } else if (type === 'input') {
        constName.setAttribute('id', idField)
        constName.setAttribute('placeholder', ph)
        constName.setAttribute('name', idField)
        constName.setAttribute('type', 'text')
}
}

//función llenado de catálogo con opciones de tipo de vialidad cuando es rural
const handleFillTipoDeVialidades = selectId =>
        {
            //selectId.setAttribute('onchange', 'asignaValorId()')
            let opt = document.createElement('option')
            opt.appendChild(document.createTextNode("Seleccione"))
            opt.value = "Seleccione"
            selectId.appendChild(opt)
            catalogoCatVial.map(item => {
                let opt = document.createElement('option')
                opt.appendChild(document.createTextNode(item.tipo_e10n))
                opt.value = item.tipo_e10
                selectId.appendChild(opt)
            })
        }

const ejecutar = () =>
        {
            id_ue = document.getElementById('id_ue').value
            callServiceLiberaClave(id_ue)
        }

//Función regresa tipo campos  de tipo y nombre vialidad
const handleReturnTipoNombreVialidad = (childrens, wrap, idChildren, field) => {
    for (let chld = 0; chld < childrens.length; chld++) {
        let child = childrens[chld]
        let childrenType = childrens[chld].nodeName

        if (field == 'tipo') {
            if (childrenType == 'SELECT') {
                wrap.removeChild(child)
            }
            if (childrenType == 'INPUT') {
                child.style.display = 'initial'
                child.setAttribute('id', idChildren)
                //child.setAttribute('disabled','true')
            }
        } else if (field == 'nombre') {
            if (childrenType == 'INPUT') {
                wrap.removeChild(child)
            }
            if (childrenType == 'SELECT') {
                child.style.display = 'initial'
                child.setAttribute('id', idChildren)
            }
        }
    }
}

const asignaValorId = item => {
    if (document.getElementById("tipo_e10n_otro") != null)
    {
        document.getElementById('tipo_e10n').value == 99 ? document.getElementById("tipo_e10n_otro").style.display = "initial" : document.getElementById("tipo_e10n_otro").style.display = "none"
        document.getElementById('tipo_e10an').value == 99 ? document.getElementById("tipo_e10an_otro").style.display = "initial" : document.getElementById("tipo_e10an_otro").style.display = "none"
        document.getElementById('tipo_e10bn').value == 99 ? document.getElementById("tipo_e10bn_otro").style.display = "initial" : document.getElementById("tipo_e10bn_otro").style.display = "none"
        document.getElementById('tipo_e10cn').value == 99 ? document.getElementById("tipo_e10cn_otro").style.display = "initial" : document.getElementById("tipo_e10cn_otro").style.display = "none"
    }
    const campoTipoE10n = document.getElementById('tipo_e10n')
    const campoTipoE10an = document.getElementById('tipo_e10an')
    const campoTipoE10bn = document.getElementById('tipo_e10bn')
    const campoTipoE10cn = document.getElementById('tipo_e10cn')
    // hiddens
    const campoTipoE10 = document.getElementById('tipo_e10')
    const campoTipoE10a = document.getElementById('tipo_e10a')
    const campoTipoE10b = document.getElementById('tipo_e10b')
    const campoTipoE10c = document.getElementById('tipo_e10c')

    if (item[1].id === 'tipo_e10n') {
        campoTipoE10.value = campoTipoE10n.value
    } else if (item[1].id === 'tipo_e10an') {
        campoTipoE10a.value = campoTipoE10an.value
    } else if (item[1].id === 'tipo_e10bn') {
        campoTipoE10b.value = campoTipoE10bn.value
    } else if (item[1].id === 'tipo_e10cn') {
        campoTipoE10c.value = campoTipoE10cn.value
    }
}

// función sweetaler errores punteo
const showAlertPunteo = (title, text) => {
    swal.fire({
        title,
        text,
        type: 'error',
        showCloseButton: true,
        showConfirmButton: false,
        customClass: 'swal-wide',
    })
}

// función sweetaler confirma punteo
const showAlertPunteoConfirma = (data, title, text) => {
    swal.fire({
        title,
        text,
        //type: 'error',
        showCloseButton: false,
        showConfirmButton: false,
        // confirmButtonColor: '#5562eb',
        // confirmButtonText: 'Confirmar',
        showCancelButton: true,
        cancelButtonColor: '#424242',
        cancelButtonText: 'Aceptar',
        allowEscapeKey: false,
        allowOutsideClick: false,
        customClass: 'swal-wide',
    }).then(result => {
        if (result.value) {
            actualizaForm(data)
            confirmacionPunteo = true
            handleTipoPunteo()
        } else if (result.dismiss == 'cancel') {
            bandera_ratificar = false;
            confirmacionPunteo = false
            handleTipoPunteo()
            funcionesNoRatificado()
            handleActionButtons('disabled')
            const cancelOption = document.getElementById('item-cancel-option')
            cancelOption.removeAttribute('disabled')
        }
    })
}

const showAlertPunteoConfirmaEge = (data, title, text) => {
    swal.fire({
        title,
        text,
        //type: 'error',
        showCloseButton: false,
        showConfirmButton: true,
        confirmButtonColor: '#5562eb',
        confirmButtonText: 'Confirmar',
        showCancelButton: true,
        cancelButtonColor: '#424242',
        cancelButtonText: 'Cancelar',
        allowEscapeKey: false,
        allowOutsideClick: false,
        customClass: 'swal-wide',
    }).then(result => {
        if (result.value) {
            actualizaForm(data)
            confirmacionPunteo = true
            handleTipoPunteo()
        } else if (result.dismiss == 'cancel') {
            confirmacionPunteo = false
            handleTipoPunteo()
            funcionesNoRatificado()
        }
    })
}

//Funcion que actualiza el formulario al hacer el punteo
let infodenue
const actualizaForm = data => {
    punteo = data.punteo
    mod_cat = data.mod_cat
    cve_geo = data.cvegeo
    cve_geo2016 = data.cvegeo2016
    cveft = data.cveft
    e10_cve_vial = data.e10_cvevial


    //inicializa entrevialidades
    if (typeof data.e10_X !== 'undefined') {
        infodenue = true
        let node, newnode, oldnew;
        //si traigo entrevialidades
        let idEleToInput = ['tipo_e10n', 'e10', 'tipo_e10an', 'tipo_e10bn', 'tipo_e10cn']
        idEleToInput.forEach(function (o, i) {
            //$('#' + o).replaceWith('<input id="' + o + '" name="' + o + '" type="text" disabled>');
        });
        // var idEleToSelect = ['e10_A', 'e10_B', 'e10_C']
        // idEleToSelect.forEach( function (o, i) {
        //   var html = '<option value="Seleccione">Seleccione</option>'
        //   $('#' + o).replaceWith('<select id="' + o + '" name="' + o + '" class="browser-default" onchange="eliminaDuplicados(this)"></select>')
        //   $('#' + o).html(html)
        // });
    } else {
        infodenue = false
        var idTipo_e10_xn = ['tipo_e10n', 'tipo_e10an', 'tipo_e10bn', 'tipo_e10cn']
        var e10x = ['e10', 'e10a', 'e10b', 'e10c']
        idTipo_e10_xn.forEach(function (o, i) {
            $('#' + o).replaceWith('<select id="' + o + '" name="' + o + '" class="browser-default" onchange="asignaTipoVial(this)"><option value="Seleccione">Seleccione</option></select>');
        })
        e10x.forEach(function (o, i) {
            $('#' + o).replaceWith('<input id="' + o + '" name="' + o + '" type="text" >')
        });
    }

    var arrValid = ['e03', 'e04', 'e05', 'e06']
    arrValid.push('e07')
    var success = true
    arrValid.forEach(function (o, i) {
        if (data[o] !== '' || typeof data[o] !== '') {
            success = success & true
        } else {
            success = success & false
        }
    });

    if (!success) {
        swal.fire({
            title: 'La información geoestadística esta incompleta.',
            text: ' Favor de realizar una vez mas el punteo.',
            showConfirmButton: true,
            confirmButtonColor: "#5562eb",
            allowEscapeKey: true,
            allowOutsideClick: true,
            html: true,
            animation: true
        });
    }
    xycoorsx = data.coord_x
    xycoorsy = data.coord_y
    MDM6('hideMarkers', 'identify')
    console.log(" marcador 3");
    MDM6('addMarker', {lon: data.coord_x, lat: data.coord_y, type: 'identify', params: {nom: 'Nueva Ubicación', desc: ''}})
    isChange = true

    for (var entry in data) {
        if (entry == 'e07' && data[entry] == '800' && realPunteo == 'NoAmanzanado') {
            data['tipoe10'] = '99';
            data['e10'] = 'NINGUNO';
            data['tipo_e10an'] = '99';
            data['e10a'] = 'NINGUNO';
            data['tipo_e10bn'] = '99';
            data['e10b'] = 'NINGUNO';
            data['tipo_e10cn'] = '99';
            data['e10c'] = 'NINGUNO';
        }
        if (entry == 'e10_X') {
            var arrData = data[entry]
            var html = '<option data-tipo="" data-tipon="" data-cvevial="" data-cveseg="" value="Seleccione">Seleccione</option>'
            var htmlB = '<option data-tipo="" data-tipon="" data-cvevial="" data-cveseg="" value="Seleccione">Seleccione</option>'
            var htmlC = '<option data-tipo="" data-tipon="" data-cvevial="" data-cveseg="" value="Seleccione">Seleccione</option>'
            calles = []
            objCalles = []
            if (arrData) {
                arrData.forEach(function (o, i) {
                    objCalles.push(o)
                    calles.push(o.e10_X_cvevial)
                    if (E10a_g != null && tipoE10a_g != null && (o.e10_X.toUpperCase() == E10a_g.toUpperCase())) {
                        //$('#tipo_e10_a').text(o.tipo_e10_X);
                        $('#tipo_e10a').val(o.tipo_e10_X);
                        html += '<option selected data-tipo="' + o.tipo_e10_X + '" data-tipon="' + o.tipo_e10_Xn + '" data-cvevial="' + o.e10_X_cvevial + '"  value="' + o.e10_X + '">' + o.e10_X + '</option>';
                    } else {
                        html += '<option  data-tipo="' + o.tipo_e10_X + '" data-tipon="' + o.tipo_e10_Xn + '" data-cvevial="' + o.e10_X_cvevial + '"  value="' + o.e10_X + '">' + o.e10_X + '</option>';
                    }

                    if (E10b_g != null && tipoE10b_g != null && (o.e10_X.toUpperCase() == E10b_g.toUpperCase())) {
                        $('#tipo_e10b').val(o.tipo_e10_X);
                        htmlB += '<option selected data-tipo="' + o.tipo_e10_X + '" data-tipon="' + o.tipo_e10_Xn + '" data-cvevial="' + o.e10_X_cvevial + '"  value="' + o.e10_X + '">' + o.e10_X + '</option>';
                    } else {
                        htmlB += '<option  data-tipo="' + o.tipo_e10_X + '" data-tipon="' + o.tipo_e10_Xn + '" data-cvevial="' + o.e10_X_cvevial + '"  value="' + o.e10_X + '">' + o.e10_X + '</option>';
                    }


                    if (E10c_g != null && tipoE10c_g != null && (o.e10_X.toUpperCase() == E10c_g.toUpperCase())) {
                        $('#tipo_e10_c').val(o.tipo_e10_X);
                        htmlC += '<option selected data-tipo="' + o.tipo_e10_X + '" data-tipon="' + o.tipo_e10_Xn + '" data-cvevial="' + o.e10_X_cvevial + '"  value="' + o.e10_X + '">' + o.e10_X + '</option>';
                    } else {
                        htmlC += '<option  data-tipo="' + o.tipo_e10_X + '" data-tipon="' + o.tipo_e10_Xn + '" data-cvevial="' + o.e10_X_cvevial + '"  value="' + o.e10_X + '">' + o.e10_X + '</option>';
                    }
                });
                $('#e10a').html(html)
                $('#e10b').html(htmlB)
                if (arrData.length > 2) {
                    $('#e10c').html(htmlC)
                    $('#e10c').attr('disabled', false)
                } else {
                    $('#e10c').attr('disabled', true)
                    $('#e10').attr('disabled', true)
                    $('#e10a').attr('disabled', true);
                    $('#e10b').attr('disabled', true);
                }
            }
        } else {
            if (entry == 'catVial') {
                var arrData = data[entry]
                var html = ''
                if (arrData != null) {
                    arrData.forEach(function (o, i) {
                        html += '<option data-tipo="' + o.tipo_e10 + '" value="' + o.tipo_e10 + '">' + o.tipo_e10n + '</option>'
                    });
                    var idElemAppend = ['tipo_e10n', 'tipo_e10an', 'tipo_e10bn', 'tipo_e10cn']
                    idElemAppend.forEach(function (o, i) {
                        $('#' + o).append(html)
                    });
                }
            } else {
                if (entry === 'e05') {
                    if (data[entry] === '') {
                        $("#e05n").attr('disabled', false).removeAttr('readonly')
                        $(".msj-punteo").html("Capture la localidad").show()
                    }
                    $('#' + entry).val(data[entry])
                } else {
                    if (entry === 'tipo_e10n' && (mod_cat == 2 || mod_cat == '2')) {
                        if (data[entry] === '') {
                            $('#tipo_e10n').attr('disabled', true)
                            $('#' + entry.toLowerCase()).val("NINGUNO")
                        }
                    } else {
                        $('#' + entry.toLowerCase()).val(data[entry])
                    }
                }
            }
        }
    }

}

//Asigna Tipo_Vial
var asignaTipoVial = function (e) {
    var optionSelected = $("option:selected", e)
    var tipo_e10 = $(optionSelected).attr('data-tipo')
    if (e.id === 'tipo_e10n') {
        //limpia campos de pestaña Datos Vialidad
        $("#tipo_administracion").prop('disabled', true).val(null)
        $("#derecho_transito").prop('disabled', true).val(null)
        $("#codigo_carretera").prop('disabled', true).val(null)
        $("#tramo_camino").prop('disabled', true).val(null)
        $("#cadenamiento").prop('disabled', true).val(null)
        $("#margen").prop('disabled', true).val(null)
        $('#tipo_e10').val(tipo_e10)

        if (tipo_e10 === '22')
            $("#e10").val('Ninguno')

    } else if (e.id === 'tipo_e10an') {
        $('#tipo_e10a').val(tipo_e10)
        if (tipo_e10 === '22')
            $("#e10a").val('Ninguno')
    } else if (e.id === 'tipo_e10bn') {
        $('#tipo_e10b').val(tipo_e10)
        if (tipo_e10 === '22')
            $("#e10b").val('Ninguno')
    } else if (e.id === 'tipo_e10cn') {
        $('#tipo_e10c').val(tipo_e10)
        if (tipo_e10 === '22')
            $("#e10c").val('Ninguno')
    }
}

//Funcion elimina duplicados

const eliminaDuplicados = (cmb) => {
    var optionSelected = $("option:selected", cmb);
    var cveseg = $(optionSelected).attr('data-cveseg');
    var cvevial = $(optionSelected).attr('data-cvevial');
    var tipo_e10 = $(optionSelected).attr('data-tipo');
    var tipo_e10n = $(optionSelected).attr('data-tipon');
    var e10 = $(optionSelected).val();
    var cmbs = ["e10a", "e10b", "e10c"];
    $.each(cmbs, function (i, cm) {

        if (cm === cmb.id || e10.toLowerCase() === 'sin referencia' || e10.toLowerCase() === 'ninguno') {
            //$("#" + cm + " option[value='Seleccione']").remove();
            $("#" + cm + "n").val('Ninguno');
        } else if (cvevial !== '') {
            $("#" + cm + " option[data-cvevial='" + cvevial + "']").remove();
            //$("#" + cm + " option[data-cvevial='" + cvevial + "'][data-cveseg='" + cveseg + "']").remove();
        }
    });
    if (cmb.id === 'e10a') {
        $('#tipo_e10a').val(tipo_e10);
        $('#e10a_cvevial').val(cvevial);
        $('#tipo_e10an').val(tipo_e10n);
        $('#e10a_cveseg').val(cveseg);
    } else if (cmb.id === 'e10b') {
        $('#tipo_e10b').val(tipo_e10);
        $('#e10b_cvevial').val(cvevial);
        $('#tipo_e10bn').val(tipo_e10n);
        $('#e10b_cveseg').val(cveseg);
    } else if (cmb.id === 'e10c') {
        $('#tipo_e10c').val(tipo_e10);
        $('#e10c_cvevial').val(cvevial);
        $('#tipo_e10cn').val(tipo_e10n);
        $('#e10c_cveseg').val(cveseg);
    }

    addLiberados();
}

const addLiberados = () => {
    var cmbs = ["e10a", "e10b", "e10c"];
    var ocupados = [];
    $.each(cmbs, function (i, cm) {
        if ($("#" + cm).val() !== "Seleccione") {
            //var opcSel = $('#' + cm + ' option:selected').attr('data-cvevial') + '|' + $('#' + cm + ' option:selected').attr('data-cveseg');
            var opcSel = $('#' + cm + ' option:selected').attr('data-cvevial');
            ocupados.push(opcSel);
        }
    });
    var libres = $(calles).not(ocupados).get();
    $.each(libres, function (i, libre) {
        var l = libre.split("|");
        $.each(cmbs, function (i, cm) {
            // reviso si la opcion libre ya esta en el combo
            //if ($("#" + cm + " option[data-cvevial='" + l[0] + "'][data-cveseg='" + l[1] + "']").length === 0) {
            if ($("#" + cm + " option[data-cvevial='" + libre + "']").length === 0) {
                //no existe el elemento y hay que agregarlo
                objCalles.forEach(function (o, i) {
                    if (libre === o.e10_X_cvevial) {
                        var html = '<option data-tipo="' + o.tipo_e10_X + '" data-tipon="' + o.tipo_e10_Xn + '" data-cvevial="' + o.e10_X_cvevial + '" value="' + o.e10_X + '">' + o.e10_X + '</option>';
                        $("#" + cm).append(html);
                    }
                });
            }
        });
    });
}

const validations = (totalInputs, object, campo) => {
    let inputsInfo = 0
    let msgInputEmpty;
    for (let input = 0; input < totalInputs; input++) {
        const {id, name, title, key} = object[input]
        const element = document.getElementById(id)
        const wrapTitle = document.getElementById(title)
        let visible = wrapTitle.dataset.visible

        !inputsByWrap[key] ? inputsByWrap[key] = true : false

        if (element.value == '' || element.value == 'Seleccione')
        {
            if (isAlta) {
                validaAltas = true
            }
            element.style.borderColor = 'red'
            element.classList.add('animated', 'shake')
            visible == 'hide' ? handleVisibleForm(key) : false
            inputsEmpty = true
            containerInputsVisible = false
            if (campo != undefined)
            {
                msgInputEmpty = `si no existe ${name} no debe existir ${campo}`
            } else
            {
                msgInputEmpty = `Favor de completar la información del campo ${name}`
            }

            alertToastForm(msgInputEmpty, 'error')
            inputsByWrap[key] = false
            setTimeout(() => element.classList.remove('animated', 'shake'), 1000)

            wrapTitle.id == title &&
                    wrapTitle.classList.add('error')
            element.focus()
            break
        } else
        {
            if (isAlta) {
                validaAltas = false;
            }
            element.style.borderColor = '#eeeeee'
            containerInputsVisible = true
            inputsInfo++
            wrapTitle.id == title &&
                    wrapTitle.classList.remove('error')
        }

    }
    let objNameWraps = Object.keys(inputsByWrap)

    for (let wrap = 0; wrap < objNameWraps.length; wrap++) {
        let wrapKey = objNameWraps[wrap]
        if (inputsByWrap[wrapKey]) {
            const wrapTitle = document.getElementById(`title-${wrapKey}`)
            let visible = wrapTitle.dataset.visible
            visible == 'show' ? handleVisibleForm(wrapKey) : false
        }
    }
    if (totalInputs > 2)
    {
        inputsInfo == totalInputs && validaCp(event)
    }
}

const validaNumExt = (numero_int, numero_ext, letra_ext) => {
    var regresa = false
    sendAJAX(urlServices['servicevalida_num_ext'].url,
            {
                'numint': numero_int,
                'numext': numero_ext,
                'letraext': letra_ext
            },
            urlServices['servicevalida_num_ext'].type,
            data => {
                if (data[0].operation) {
                    if (data[0].datos.mensaje.type === "false") {
                        showelementwithmistakeform(data[0].datos.mensaje.messages, "e11", "", "title-domicilio", "domicilio")
                        regresa = true
                        return regresa
                    } else {
                        if (data[0].datos.mensaje.type === "false") {
                            showelementwithmistakeform(data[0].datos.mensaje.messages, "e11", "", "title-domicilio", "domicilio")
                            regresa = true
                            return regresa
                        } else {
                            if (data[0].datos.mensaje.type === "false") {
                                showelementwithmistakeform(data[0].datos.mensaje.messages, "e11", "", "title-domicilio", "domicilio")
                                showelementwithmistakeform(data[0].datos.mensaje.messages, "e11a", "", "title-domicilio", "domicilio")
                                regresa = true
                                return regresa
                            } else
                            {
                                hideelementwithmistakeform("e11", "", "title-domicilio", "domicilio")
                                hideelementwithmistakeform("e13", "", "title-domicilio", "domicilio")
                                hideelementwithmistakeform("e11a", "", "title-domicilio", "domicilio")
                                const wrapTitle = document.getElementById('title-domicilio')
                                const numero_ext = document.getElementById('e11')
                                const letra_ext = document.getElementById('e11a')
                                let visible = wrapTitle.dataset.visible
                                numero_ext.style.borderColor = '#eeeeee'
                                letra_ext.style.borderColor = '#eeeeee'
                                wrapTitle.classList.remove('error')
                                visible != 'hide' ? handleVisibleForm("domicilio") : false
                                regresa = false
                                return regresa
                            }
                        }
                    }

                }
            }, () => {
    })

    return regresa

}
const hideelementwithmistakeform = (id, name, title, key) => {
    const wrapTitle = document.getElementById(title)
    const element = document.getElementById(id)
    if (wrapTitle != null) {
        let visible = wrapTitle.dataset.visible
        element.style.borderColor = '#eeeeee'
        wrapTitle.classList.remove('error')
        visible != 'hide' ? handleVisibleForm(key) : false
    }
}

const showelementwithmistakeform = (message, id, name, title, key) => {

    const element = document.getElementById(id)
    const wrapTitle = document.getElementById(title)
    let visible = wrapTitle.dataset.visible
    element.style.borderColor = 'red'
    element.classList.add('animated', 'shake')
    visible == 'hide' ? handleVisibleForm(key) : false
    setTimeout(() => element.classList.remove('animated', 'shake'), 1000)
    wrapTitle.id == title &&
            wrapTitle.classList.add('error')
    //element.focus()
    alertToastForm(message, 'error')
}

const validationsBack = (ObjectRequest) => {
    var regresa = false

    document.getElementById("id_ue").disabled = true;
    let totalInputs
    let vialidad = document.getElementById('tipo_e10').value;
    let vialidad1 = document.getElementById('tipo_e10a').value;
    let vialidad2 = document.getElementById('tipo_e10b').value;
    let vialidad3 = document.getElementById('tipo_e10c').value;
    const wrapTitle = document.getElementById('title-domicilio')
    let visible = wrapTitle.dataset.visible
    console.log("punteo " + punteo);
    console.log("el mod cat" + mod_cat);
    if (isAlta) {
        servicevalidaobjform(JSON.stringify(ObjectRequest), JSON.stringify(objFormAltaBack), punteo, mod_cat)
        if (vialidad == 99 || vialidad == 'Seleccione') {
            if (servicevalidaobjform(JSON.stringify(ObjectRequest), JSON.stringify(validaOtroEspecifiqueBack), punteo, mod_cat)) {
                regresa = true
                return regresa
            } else {
                regresa = false
                return regresa

            }
            if (vialidad1 == 99 || vialidad1 == 'Seleccione') {
                if (servicevalidaobjform(JSON.stringify(ObjectRequest), JSON.stringify(validaOtroEspecifiquevialidad1Back), punteo, mod_cat)) {
                    regresa = true
                    return regresa
                } else {
                    regresa = false
                    return regresa
                }
            }
            if (vialidad2 == 99 || vialidad2 == 'Seleccione') {
                if (servicevalidaobjform(JSON.stringify(ObjectRequest), JSON.stringify(validaOtroEspecifiquevialidad2Back), punteo, mod_cat)) {
                    regresa = true
                    return regresa
                } else {
                    regresa = false
                    return regresa
                }
            }
            if (vialidad3 == 99 || vialidad3 == 'Seleccione') {
                if (servicevalidaobjform(JSON.stringify(ObjectRequest), JSON.stringify(validaOtroEspecifiquevialidad3Back), punteo, mod_cat)) {
                    regresa = true
                    return regresa
                } else {
                    regresa = false
                    return regresa
                }
            }
        }
    }
    if (!validaAltas) {
        //console.log(punteo)
        //console.log(mod_cat)
        if (punteo == 'Amanzanado' && mod_cat == '1') {
            if (servicevalidaobjform(JSON.stringify(ObjectRequest), JSON.stringify(objFormBack), punteo, mod_cat)) {
                regresa = true
                return regresa
            } else {
                if (validaEdif()) {
                    if (servicevalidaobjform(JSON.stringify(ObjectRequest), JSON.stringify(objFormCentrocomercialBack), punteo, mod_cat)) {
                        regresa = true
                        return regresa
                    } else {
                        regresa = false
                        return regresa
                    }
                } else {
                    regresa = false
                    return regresa
                }

            }
        } else {
            if (punteo == 'Amanzanado' && mod_cat == '2') {
//            if(servicevalidaobjform(JSON.stringify(ObjectRequest),JSON.stringify(objFormCentrocomercialBack))){
//                return true
//            }else{
                if (servicevalidaobjform(JSON.stringify(ObjectRequest), JSON.stringify(objForm2Back), punteo, mod_cat)) {
                    regresa = true
                    return regresa
                } else {
                    regresa = false
                    return regresa
                }
                //}
                if (servicevalidaobjform(JSON.stringify(ObjectRequest), JSON.stringify(objFormPunteoEnFrenteBack), punteo, mod_cat)) {
                    regresa = true
                    return regresa
                } else {
                    regresa = false
                    return regresa
                }
            } else {
                if (punteo == 'NoAmanzanado' && mod_cat == '1') {
                    if (servicevalidaobjform(JSON.stringify(ObjectRequest), JSON.stringify(objFormRuralBack), punteo, mod_cat)) {
                        regresa = true
                        return regresa
                    } else {
                        regresa = false
                        return regresa
                    }
                    // validaCp()
                } else {
                    if (punteo == 'NoAmanzanado' && mod_cat == '2') {
//                if(servicevalidaobjform(JSON.stringify(ObjectRequest),JSON.stringify(objFormCentrocomercialBack))){
//                return true
//            }else{
                        if (servicevalidaobjform(JSON.stringify(ObjectRequest), JSON.stringify(objFormRuralBack), punteo, mod_cat)) {
                            regresa = true
                            return regresa
                        } else {
                            regresa = false
                            return regresa
                            // }
                        }
                        if (numero_ext.value <= 0) {
                            document.getElementById('e11').value = "";
                        }
                        if (servicevalidaobjform(JSON.stringify(ObjectRequest), JSON.stringify(objFormRuralBack), punteo, mod_cat)) {
                            regresa = true
                            return regresa
                        } else {
                            regresa = false
                            return regresa
                        }
                    }
                }
            }
        }
    }
    return regresa
}

const validaEdif = () => {
    let bandera = false
    for (var i = 0; i < objFormCentrocomercialBackValidaEdif.length; i++) {
        const idWrap = document.getElementById(objFormCentrocomercialBackValidaEdif[i].id).value;
        if (idWrap != null && idWrap != "" && idWrap != "Seleccione")
        {
            bandera = true
            break
        } else
        {
            bandera = false
        }
    }
    return bandera
}



// Función validación de formulario campos vacios
const handleFormValidations = () => {
    let totalInputs
    const numero_ext = document.getElementById('e11')
    const letra_ext = document.getElementById('e11a')
    let vialidad = document.getElementById('tipo_e10').value;
    let vialidad1 = document.getElementById('tipo_e10a').value;
    let vialidad2 = document.getElementById('tipo_e10b').value;
    let vialidad3 = document.getElementById('tipo_e10c').value;
    const wrapTitle = document.getElementById('title-domicilio')
    let visible = wrapTitle.dataset.visible

    if (numero_ext.value == '' && letra_ext.value == '') {
        numero_ext.style.borderColor = 'red'
        letra_ext.style.borderColor = 'red'
        numero_ext.classList.add('animated', 'shake')
        letra_ext.classList.add('animated', 'shake')
        visible == 'hide' ? handleVisibleForm('domicilio') : false
        msgInputEmpty = `Favor de agregar información en el campo E11 Número Exterior y/o campo E11 A Letra`
        alertToastForm(msgInputEmpty, 'error')
        wrapTitle.classList.add('error')
        setTimeout(() => {
            numero_ext.classList.remove('animated', 'shake')
            letra_ext.classList.remove('animated', 'shake')
        }, 1000)
    } else {
        numero_ext.style.borderColor = '#eeeeee'
        letra_ext.style.borderColor = '#eeeeee'
        if (isAlta) {
            totalInputs = objFormAlta.length
            validations(totalInputs, objFormAlta)
            if (vialidad == 99) {
                let total = validaOtroEspecifique.length
                validations(total, validaOtroEspecifique)
            }
            if (vialidad1 == 99) {
                let total = validaOtroEspecifiquevialidad1.length
                validations(total, validaOtroEspecifiquevialidad1)
            }
            if (vialidad2 == 99) {
                let total = validaOtroEspecifiquevialidad2.length
                validations(total, validaOtroEspecifiquevialidad2)
            }
            if (vialidad3 == 99) {
                let total = validaOtroEspecifiquevialidad3.length
                validations(total, validaOtroEspecifiquevialidad3)
            }
        }
        if (!validaAltas) {
            if (punteo == 'U' && mod_cat == '1') {
                totalInputs = objForm.length
                validations(totalInputs, objForm)
            } else {
                if (punteo == 'U' && mod_cat == '2') {
                    if (validaEdificio()) {
                        totalInputs = objFormCentrocomercial.length
                        validations(totalInputs, objFormCentrocomercial, campo)
                        validations(totalInputs, objForm2)
                    } else {
                        totalInputs = objFormPunteoEnFrente.length
                        validations(totalInputs, objFormPunteoEnFrente)
                    }
                } else {
                    if (punteo == 'R' && mod_cat == '1') {
                        validaCp(event)
                    } else {
                        if (punteo == 'R' && mod_cat == '2') {
                            if (validaEdificio()) {

                                totalInputs = objFormCentrocomercial.length
                                validations(totalInputs, objFormCentrocomercial, campo)
                                validations(totalInputs, objFormRural)
                            } else {
                                if (numero_ext.value <= 0) {
                                    document.getElementById('e11').value = "";
                                }
                                totalInputs = objFormRural.length
                                validations(totalInputs, objFormRural)
                            }
                        }
                    }
                }
            }
        }
    }
}

var campo
const validaEdificio = () => {
    let bandera = 0
    for (let input = 0; input < objFormCentrocomercial.length; input++) {
        const {id, name, title, key} = objFormCentrocomercial[input]
        const element = document.getElementById(id)
        const wrapTitle = document.getElementById(title)
        let visible = wrapTitle.dataset.visible

        !inputsByWrap[key] ? inputsByWrap[key] = true : false
        if (bandera > 0) {
            break
        } else {
            if (element.value == '' || element.value == '0' || element.value == 'Seleccione') {
                bandera = 0
                element.style.borderColor = '#eeeeee'
            } else {
                campo = name
                bandera = 1
            }
        }
    }

    if (bandera == 1) {
        return true
    } else {
        return false
    }
}

const handleFormValidationsRural = () => {
}

const validaCp = (event) => {
    event.preventDefault();
    const numero_int = document.getElementById('e13')
    const numero_ext = document.getElementById('e11')
    const letra_ext = document.getElementById('e11a')
    const cp = document.getElementById('e14_a')
    const wrapTitle = document.getElementById('title-asentamiento')
    let visible = wrapTitle.dataset.visible
    if (cp.value == "") {
        cp.style.borderColor = 'red'
        cp.classList.add('animated', 'shake')
        visible == 'hide' ? handleVisibleForm('asentamiento') : false
        msgInputEmpty = "Error en los datos, porfavor verifique el código postal "
        alertToastForm(msgInputEmpty, 'error')
        wrapTitle.classList.add('error')
        setTimeout(() => {
            cp.classList.remove('animated', 'shake')
        }, 1000)
    } else {
        sendAJAX(urlServices['serviceValCP'].url,
                {
                    'codigo': $("#e14_a").val(),
                    'cve_ent': $("#e03").val(),
                    'proyecto': dataUserFromLoginLocalStorage.proyecto
                },
                urlServices['serviceValCP'].type,
                data => {
                    if (data[0].operation) {
                        if (data[0].datos.mensaje.type === "false") {
                            cp.style.borderColor = 'red'
                            cp.classList.add('animated', 'shake')
                            visible == 'hide' ? handleVisibleForm('asentamiento') : false
                            msgInputEmpty = data[0].datos.mensaje.messages
                            alertToastForm(msgInputEmpty, 'error')
                            wrapTitle.classList.add('error')
                            setTimeout(() => {
                                cp.classList.remove('animated', 'shake')
                            }, 1000)
                        } else {
                            cp.style.borderColor = '#eeeeee'
                            visible == 'show' ? handleVisibleForm('asentamiento') : false
                            wrapTitle.classList.remove('error')
                            if (nameContainerFloating) {
                                let containerFloat = nameContainerFloating.slice(3)
                                const btnFloat = document.getElementById(`icon-${containerFloat}-float`)
                                const btnStatic = document.getElementById(`icon-${containerFloat}-static`)
                                //alert(containerFloat)
                                if (btnFloat != null) {
                                    btnFloat.classList.remove('btn-inactive')
                                    btnStatic.classList.add('btn-inactive')
                                }

                                arrayWrapBtns.map(wrap => {
                                    const idWrap = document.getElementById(wrap)
                                    idWrap.style.display = 'contents'
                                })

                                handleReturnContainerForm(nameContainerFloating)
                            }
                            if (validaNumExt(numero_int.value, numero_ext.value, letra_ext.value)) {

                            } else
                            {
                                const myform = $('#frmSARE')
                                let disabled = myform.find(':input:disabled').removeAttr('disabled')
                                let d = myform.serialize()
                                d = d.replace(/Seleccione/g, '')
                                var dpv = d.split("&")
                                $.each(dpv, function (i, e) {
                                    var idobj = e.split("=")
                                    var a = decodeURIComponent(idobj[1])
                                    a = document.getElementById(idobj[0]).value
                                    ObjectRequest[idobj[0]] = a
                                })
                                if (validationsBack(ObjectRequest)) {

                                } else {
                                    modalViewPreliminar()
                                }
//           if(servicevalidaobjform(JSON.stringify(ObjectRequest),JSON.stringify(objFormBack))){
//               
//           }else{
//               modalViewPreliminar() 
//           }
                            }

                        }
                    }
                }, () => {
        })
    }
}

const modalViewPreliminar = () => {
    /*const myform = $('#frmSARE')
     let disabled = myform.find(':input:disabled').removeAttr('disabled')
     let d = myform.serialize()
     d += "&id_tramo=" + dataUserFromLoginLocalStorage.tramo_control
     d += "&coord_x=" + xycoorsx + "&coord_y=" + xycoorsy;*/
    if (typeof (xycoorsx) !== 'undefined' && typeof (xycoorsy) !== 'undefined' && xycoorsx != null && xycoorsy != null && xycoorsx != 'null' && xycoorsy != 'null' && xycoorsx != '' && xycoorsy != '') {
        var formularioPrueba = funcionRegresaValoresFormularios('#frmSARE');
        const htmlDiv = "<div id='vista'> </div>"
        const sizeScreen = screen.width <= '768' ? '90%' : '80%'
        Swal.fire({
            title: '<h2 class="txt-preliminar">VISTA PRELIMINAR</h2>',
            width: sizeScreen,
            html: htmlDiv,
            confirmButtonText: 'Aceptar',
            customClass: 'swal-view',
            confirmButtonColor: '#0f0f0f',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: true,
            showCancelButton: true,
            showCloseButton: true,
            cancelButtonText: 'Cancelar',
            onOpen: showViewPreliminar(formularioPrueba)
        }).then(result =>
            validaTipos(result, 'localizado')

        )
    } else {
        swal.fire({
            text: 'No se pudo recupear las coordenadas del UE, por favor intente puntear de nuevo',
            showCancelButton: false,
            showConfirmButton: true,
            customClass: 'swal-view',
            allowEscapeKey: false,
            allowOutsideClick: false,
            //html: true,
            animation: true,
            confirmButtonText: 'Aceptar'
        })
    }
}

const validaTipos = (result, opcion) => {
    if (opcion == 'localizado') {
        ObjectRequest['ratificado'] = bandera_ratificar;
        ObjectRequest['ce'] = dataUserFromLoginLocalStorage.ce
        ObjectRequest['no_localizado'] = false;
    }
    if (opcion == 'nolocalizado') {
        ObjectRequest['ratificado'] = bandera_ratificar;
        ObjectRequest['ce'] = dataUserFromLoginLocalStorage.ce
        ObjectRequest['no_localizado'] = true;
    }
    if (result.value) {
        var returnVialidadesValidas = false;
        let tipo_e10, tipo_e10A, tipo_e10B, tipo_e10C, tipo_e14;
        tipo_e10 = document.getElementById("tipo_e10").value;
        tipo_e10A = document.getElementById("tipo_e10a").value;
        tipo_e10B = document.getElementById("tipo_e10b").value;
        tipo_e10C = document.getElementById("tipo_e10c").value;
        tipo_e14 = document.getElementById("tipo_e14").value
        var tipo_e10n = document.getElementById("tipo_e10n").value;
        var tipo_e10an = document.getElementById("tipo_e10an").value;
        var tipo_e10bn = document.getElementById("tipo_e10bn").value;
        var tipo_e10cn = document.getElementById("tipo_e10cn").value;
        var banderaPunteoNoAmanzanado = true;

        var e10 = document.getElementById("e10").value;
        var e10_A = document.getElementById("e10a").value;
        var e10_B = document.getElementById("e10b").value;
        var e10_C = document.getElementById("e10c").value;


        var banderaNombreVialidades = false;
        if (e10 != "" &&
                e10_A != "Seleccione" &&
                e10_B != "Seleccione" &&
                e10_C != "Seleccione") {
            banderaNombreVialidades = true;

        }
        if (realPunteo == "NoAmanzanado") {
            if (tipo_e10n != "" &&
                    tipo_e10an != "" &&
                    tipo_e10bn != "" &&
                    tipo_e10cn != ""

                    ) {
                banderaPunteoNoAmanzanado = true;
                if (tipo_e10 == "")
                {
                    tipo_e10 = "99";
                    ObjectRequest["tipo_e10"] = "99";
                    document.getElementById("tipo_e10").value = "99";
                    ObjectRequest["te10"] = ObjectRequest["e10"];
                }
                if (tipo_e10A == "") {
                    ObjectRequest["tipo_e10a"] = "99";
                    document.getElementById("tipo_e10a").value = "99";
                    tipo_e10A = "99";
                    ObjectRequest["te10a"] = ObjectRequest["e10a"];
                }
                if (tipo_e10B == "") {
                    ObjectRequest["tipo_e10b"] = "99";
                    document.getElementById("tipo_e10b").value = "99";
                    ObjectRequest["te10b"] = ObjectRequest["e10b"];
                    tipo_e10B = "99";
                }
                if (tipo_e10C == "") {
                    ObjectRequest["tipo_e10c"] = "99";
                    document.getElementById("tipo_e10c").value = "99";
                    ObjectRequest["te10c"] = ObjectRequest["e10c"];
                    tipo_e10C = "99";
                }

                if (tipo_e10 == "99")
                {
                    ObjectRequest["te10"] = ObjectRequest["e10"];
                }
                if (tipo_e10A == "99") {
                    ObjectRequest["te10a"] = ObjectRequest["e10a"];
                }
                if (tipo_e10B == "99") {
                    ObjectRequest["te10b"] = ObjectRequest["e10b"];
                }
                if (tipo_e10C == "99") {
                    ObjectRequest["te10c"] = ObjectRequest["e10c"];
                }














            } else {
                banderaPunteoNoAmanzanado = false;
            }
            /*tipo_e10="99";
             tipo_e10A="99";
             tipo_e10B="99";
             tipo_e10C="99";
             document.getElementById("tipo_e10").value="99";
             document.getElementById("tipo_e10_a").value="99";
             document.getElementById("tipo_e10_b").value="99";
             document.getElementById("tipo_e10_c").value="99";*/
            //document.getElementById("Cveft").value=0;
            cveft = 0;
        } else {
            if (tipo_e10 == "")
            {
                tipo_e10 = "99";
                ObjectRequest["tipo_e10"] = "99";
                document.getElementById("tipo_e10").value = "99";
                ObjectRequest["te10"] = ObjectRequest["e10"];
            }
            if (tipo_e10A == "") {
                ObjectRequest["tipo_e10a"] = "99";
                document.getElementById("tipo_e10a").value = "99";
                tipo_e10A = "99";
                ObjectRequest["te10a"] = ObjectRequest["e10a"];
            }
            if (tipo_e10B == "") {
                ObjectRequest["tipo_e10b"] = "99";
                document.getElementById("tipo_e10b").value = "99";
                ObjectRequest["te10b"] = ObjectRequest["e10b"];
                tipo_e10B = "99";
            }
            if (tipo_e10C == "") {
                ObjectRequest["tipo_e10c"] = "99";
                document.getElementById("tipo_e10c").value = "99";
                ObjectRequest["te10c"] = ObjectRequest["e10c"];
                tipo_e10C = "99";
            }
        }

//    if(realPunteo=="NoAmanzanado"){
//        if(
//                tipo_e10==""&&tipo_e10_type!="" &&                
//                tipo_e10A==""&&tipo_e10a_type!="" &&
//                tipo_e10B==""&&tipo_e10b_type!=""&&
//                tipo_e10C==""&&tipo_e10c_type!=""
//                ){
//            banderaPunteoNoAmanzanado=true;
//        }else{
//            banderaPunteoNoAmanzanado=false;
//        }
//    }
//    
//     ObjectRequest["tipo_e10n"]=document.getElementById("tipo_e10n").value;
//      ObjectRequest["tipo_e10_an"]=document.getElementById("tipo_e10_an").value;
//      ObjectRequest["tipo_e10_bn"]=document.getElementById("tipo_e10_bn").value;
//      ObjectRequest["tipo_e10_cn"]=document.getElementById("tipo_e10_cn").value;
        if (banderaPunteoNoAmanzanado) {
            if (((tipo_e10 != "" && tipo_e10A != "" && tipo_e10B != "" && tipo_e10C != "") || (tipo_e10n != "" && tipo_e10an != "" && tipo_e10bn != "" && tipo_e10cn != "")) && tipo_e14 != "" && tipo_e14 != 0 && banderaNombreVialidades) {
                if (tipo_e10 != '' && !/^([0-9])*$/.test(tipo_e10))
                {
                    handleShowSaveAlert('error', 'Error', 'Error en los datos, porfavor verifique la vialidad', false)
                } else {
                    if (tipo_e10A != "" && !/^([0-9])*$/.test(tipo_e10A))
                    {
                        handleShowSaveAlert('error', 'Error', 'Error en los datos, porfavor verifique la vialidad 1', false)
                    } else
                    {
                        if (tipo_e10B != "" && !/^([0-9])*$/.test(tipo_e10B))
                        {
                            handleShowSaveAlert('error', 'Error', 'Error en los datos, porfavor verifique la vialidad 2', false)
                        } else
                        {
                            if (tipo_e10C != "" && !/^([0-9])*$/.test(tipo_e10C))
                            {
                                handleShowSaveAlert('error', 'Error', 'Error en los datos, porfavor verifique la vialidad posterior', false)
                            } else
                            {
                                returnVialidadesValidas = true;
                                handleShowResult(result);
                            }
                        }

                    }

                }
            } else {
                handleShowSaveAlert('error', 'Error', 'Error en los datos, porfavor verifique las entrevialidades y la vialidad ', false)
            }
        } else {
            handleShowSaveAlert('error', 'Error', 'Error en los datos, porfavor verifique las entrevialidades y la vialidad ', false)
        }
        return returnVialidadesValidas;
    } else {
        return false;
    }
};



const showViewPreliminar = d => {

    loadTemplate('vista', "resources/templates/preview.html?frm=" + Math.random(),
            () => {
        llenaValoresObject(true, d);
    }
    )
}


function llenaValoresObject(validaCE, d) {
    d = d.replace(/Seleccione/g, '')
    var dpv = d.split("&")
    var Type;
    let valororigen;
    let valorc154;
    ObjectRequest['ce'] = dataUserFromLoginLocalStorage.ce
    $.each(dpv, function (i, e) {
        var idobj = e.split("=")
        if (idobj[0] != 'id_tramo' && idobj[0] != 'coord_x' && idobj[0] != 'coord_y' && idobj[0] != 'tipo_e10n_otro') {
            Type = document.getElementById(idobj[0]).type;
        } else {
            Type = 'text';
        }

        var a = decodeURIComponent(idobj[1])
        a = a.replace(/\+/g, ' ')
        if (idobj[0] == 'id_ue' && isAlta) {
            a = "00"; //se inicializa en 00 para las altas y evitar que el truene el objeto en el servicio
        }
        if (idobj[0] == 'catorigen' && idobj[1] != "") {
            valororigen = idobj[1]
        }
        if (idobj[0] == 'catc154' && idobj[1] != "") {
            valorc154 = idobj[1]
        }
        if (idobj[0] == 'origen' && idobj[1] == "") {
            a = valororigen
        }
        if (idobj[0] == 'c154' && idobj[1] == "") {
            a = valorc154
        }
        if (Type == 'select-one')
        {
            a = document.getElementById(idobj[0]).value

            const sel = document.getElementById(idobj[0])
            let valor = sel.options[sel.selectedIndex].innerText != 'Seleccione' ? sel.options[sel.selectedIndex].innerText : "";
            a != 'Seleccione' ? ObjectRequest[idobj[0]] = a : ObjectRequest[idobj[0]] = ""
            $("#" + idobj[0] + "_pv").text(valor.toUpperCase())
        } else {
            //ObjectRequest[idobj[0]] = a
            const sel = document.getElementById(idobj[0])

            var itemEditable = $('#' + idobj[0]).attr('data-editable');
            if (itemEditable == 'true' || itemEditable) {
                ObjectRequest[idobj[0]] = a.toUpperCase();
            } else {
                ObjectRequest[idobj[0]] = a;
            }
            if (a !== undefined) {
                $("#" + idobj[0] + "_pv").text(a.toUpperCase())
            } else {
                $("#" + idobj[0] + "_pv").text(a)
            }

        }



    })
    if (isAlta) {
        $("#contenedo_clee_pv").hide();
    } else {
        $("#contenedo_folio_sar_pv").hide();
    }
    $("#mensajeValidacionCE").hide();
    //ObjectRequest['Cvegeo2016'] = cve_geo2016
    //ObjectRequest['Cvegeo'] = cve_geo   
    //ObjectRequest['id_deftramo'] = dataUserFromLoginLocalStorage.tramo_control
    //ObjectRequest['tramo_control'] = dataUserFromLoginLocalStorage.tramo_control
    //ObjectRequest['mod_cat'] = mod_cat
    //ObjectRequest['punteo'] = realPunteo
    //ObjectRequest['coordx'] = xycoorsx
    //ObjectRequest['coordy'] = xycoorsy
    //ObjectRequest['coordx'] = xycoorsx
    //ObjectRequest['coordy'] = xycoorsy
    //ObjectRequest['Cveft'] = cveft == null ? 0 : cveft
    //ObjectRequest['e10_cvevial'] = e10_cve_vial
    //ObjectRequest['id_inmueble'] = id_inmueble
    //ObjectRequest['navegador'] = versionnavegador
    //ObjectRequest['id_ue'] = id_ue_renem2022;
    //ObjectRequest['clee'] = clee_renem2022;
    var coordXgeo, coordYgeo;
    $.ajax({
        type: urlServices['serviceIdentifyStreetView'].type,
        url: urlServices['serviceIdentifyStreetView'].url,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8', //multipart/form-data, or text/plain
        dataType: 'json', //(xml, json, script, or html
        cache: false,
        async: false,
        //xhrFields: {withCredentials: credential},
        crossDomain: true, //false si es mismo dominio, true  para forzar el uso de cross domain usar sonp
        data: {'proyecto': dataUserFromLoginLocalStorage.proyecto, 'x': xycoorsx, 'y': xycoorsy},
        success: function (dataJSON) {
            var dataBack = [{}];
            dataBack[0].operation = true;
            dataBack[0].datos = dataJSON;
            //myfunction(dataBack);

        },
        error: function (xhr, ajaxOptions, thrownError, jqXHR) {
            var dataBack = [{}];
            dataBack[0].operation = false;
            dataBack[0].messages = [thrownError];//['Error de conexión'];
            // myfunction(dataBack);
        }

    });
    $("#coord_x_pv").text(coordXgeo);
    $("#coord_y_pv").text(coordYgeo);
    document.getElementById("id_ue").disabled = true;
    if (validaCE) {
        handleShowCECorrecto();
    }
}


const handleShowCECorrecto = result => {


    sendAJAX(urlServices['serviceValidaCE'].url,
            {
                'x': ObjectRequest['coord_x'],
                'y': ObjectRequest['coord_y'],
                'ce': ObjectRequest['ce']
            },
            urlServices['serviceValidaCE'].type,
            data => {
                if (data[0].operation) {
                    //swal.close();                  
                    if (data[0].datos.datos[0] == false) {
                        $("#mensajeValidacionCE").show();
                    } else {

                    }

                } else {
                    handleShowSaveAlert('error', 'Error', 'Error de conexión', true)
                }
            }, () =>
        null
    );


}

const handleShowResult = result => {
    const user = dataUserFromLoginLocalStorage.nombre
    //const checkboxPuntearAlta = document.getElementById('puntear-alta')
    handleActionTargetRef()
    objForm.map(obj => {
        const wrapTitle = document.getElementById(obj.title)
        if (wrapTitle.classList.contains('error'))
            wrapTitle.classList.remove('error')
    })
    //ObjectRequest['imantado'] = imantado;

    if (result.value) {
        sendAJAX(urlServices['serviceSaveUEAlter'].url,
                {
                    'proyecto': dataUserFromLoginLocalStorage.proyecto,
                    'obj': JSON.stringify(ObjectRequest),
                    'usuario': user,
                    'isAlta': isAlta
                },
                urlServices['serviceSaveUEAlter'].type,
                data => {
                    if (data[0].operation) {
                        swal.close();
                        if (data[0].datos.mensaje.type === 'false') {
                            handleShowSaveAlert('error', 'Error', data[0].datos.mensaje.messages, false)
                            return;
                        }
                        if (data[0].datos.mensaje.type === 'error')
                        {
                            Swal.fire({
                                title: 'Ocurrio un error al intentar Guardar!',
                                text: "Deseas intentar nuevamente el guardado?",
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#10455B',
                                cancelButtonColor: '#424242',
                                confirmButtonText: 'Guardar',
                                cancelButtonText: 'Cancelar'
                            }).then((result) => {
                                if (result.value) {
                                    if (!ObjectRequest['no_localizado']) {
                                        modalViewPreliminar()
                                    } else {
                                        funcionesGuardadoNoLocalizado();
                                    }
                                } else {
                                    document.getElementById("id_ue").value = "";
                                    handleCancelClick()
                                    callServiceLiberaClave(ObjectRequest['id_ue']);
                                }
                            })
                        } else {
                            document.getElementById("id_ue").value = "";
                            layersSARE = ['c100', 'c101a']
                            if (dataUserFromLoginLocalStorage.proyecto == 11) {
                                layersSARE = ['c100', 'c101']
                            }

                            handleCancelClick()
                            MDM6('hideMarkers', 'identify')
                            handleShowSaveAlert('success', 'Guardado', 'El punto ha sido almacenado correctamente', true)
                            removerOtrosInputs()
                            //handleActiveVisibleSearch()
                            handleActionTargetRef()
                            //!checkboxPuntearAlta.checked ? handleActiveVisibleSearch() : false
                            handleActionPunteoAlta('on')
                            arrayWrapBtns.map(wrap => {
                                const idWrap = document.getElementById(wrap)
                                idWrap.style.display = 'contents'
                            })
                        }
                    } else {
                        handleShowSaveAlert('error', 'Error', 'Error de conexión', true)
                    }
                }, () =>
            swal({
                title: 'Almacenando el punto!',
                text: 'Por favor espere un momento',
                onOpen: () => swal.showLoading()
            })
                    .then(() => {
                    },
                            dismiss => {

                            }
                    )
        )

    } //close if result.value
}

const handleShowSaveAlert = (type, title, text, animation) => {
    swal.fire({
        type,
        title,
        text,
        showConfirmButton: false,
        showCloseButton: true,
        allowEscapeKey: true,
        allowOutsideClick: true,
        // html: true,
        animation
    })
}

const identify = (coor) => HandleWhatDoYouWantToDo(coor)

var variableIdentificar = false;
// Función al seleccionar opciones identificar, puntear  y vista calle
const HandleWhatDoYouWantToDo = (coor) => {
    let request = $('input:radio[name=accion]:checked').val();
    let level = MDM6('getZoomLevel');
    MDM6('updateSize');
    switch (request) {
        case 'identificar':
            if (level >= 13)
            {
                identificaUE(coor.lon, coor.lat);
            } else {
                MDM6('hideMarkers', 'identify')
                Swal.fire({
                    position: 'bottom-end',
                    type: 'warning',
                    title: 'Debe acercarse más sobre el mapa para identificar una unidad económica',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
            break
        case 'puntear':

            //  document.getElementById("origen").style.display = 'block';
            //  document.getElementById("c154").style.display = 'block';
            //document.getElementById("catc154").style.display = 'none';
            //document.getElementById("catorigen").style.display = 'none';
            //document.getElementById("filtroXclase").style.display = 'none';
            isAlta = false;
            validaAltas = false;
            combosc154yOrigen = false;
            id_ue = document.getElementById('id_ue').value;


            if (id_ue != '' || id_ue == null)
            {
                identificar(coor);
                handleActionButtons('enabled')
            } else {
                MDM6('hideMarkers', 'identify')
                Swal.fire({
                    position: 'bottom-end',
                    type: 'warning',
                    title: 'Debe seleccionar una unidad económica a puntear',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
            break
        case 'v_calle':
            if (level >= 13) {
                StreetView(coor.lon, coor.lat)
            } else {
                MDM6('hideMarkers', 'identify')
                Swal.fire({
                    position: 'bottom-end',
                    type: 'warning',
                    title: 'Debe acercarse mas sobre el mapa para usar la vista de calle',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
            break
        case 'puntear_alta':
            //document.getElementById("filtroXclase").style.display = 'block';

            //document.getElementById("origen").style.display = 'none';
            //document.getElementById("c154").style.display = 'none';
            // document.getElementById("catc154").style.display = 'block';
            // document.getElementById("catorigen").style.display = 'block';
            isAlta = true
            if (level <= 13) {
                showAlertIdentify('warning', `${14 - level} acercamientos sobre mapa`, 'Realizalos para ubicar correctamente la unidad económica')
                MDM6('hideMarkers', 'identify')
            } else {
                //Lo deja puntear y agrega el punto
                enabledInputs()
                handleActionTargetRef()
                handleActionButtons('enabled')
                MDM6('hideMarkers', 'identify')
                console.log(" marcador 5");
                MDM6('addMarker', {lon: parseFloat(coor.lon), lat: parseFloat(coor.lat), type: 'identify', params: {nom: 'Nueva ubicación', desc: coor.lon + ", " + coor.lat}});
                handlePunteo(coor.lon, coor.lat, 'mercator', 'n')
                handleHideAlertPickMap()
                fillCatalogo()
                fillCatalogoConjuntosComerciales()
                fillCatalogoPiso()

            }
            break
    }
}


const radioSelect = option => {
    switch (option) {
        case 'identificar':
            alertToastForm('Identificar Activado', 'info')
            HandleActionsSaveNewPoint('no alta')
            break
        case 'puntear':
            alertToastForm('Puntear Activado', 'info')
            HandleActionsSaveNewPoint('no alta')
            break
        case 'calle':
            setTimeout(() => alertToastForm('Vista Calle Activado', 'info'), 3000)
            HandleActionsSaveNewPoint('no alta')
            swal.fire({
                type: 'info',
                title: 'Recuerda tener activo Popups para poder usar esta opción.',
                // text: 'Recuerda tenerlos activo  para poder usar esta opción',
                showConfirmButton: false,
                allowEscapeKey: true,
                allowOutsideClick: true,
                animation: true,
                // timer: 2000
            })

            break
        case 'alta':
            alertToastForm('Puntear Alta Activado', 'info')
            HandleActionsSaveNewPoint('alta')
            break
        default:
            break
    }
}

const HandleActionsSaveNewPoint = option => {
    const containerSearch = document.getElementById('container-search')
    const tituloBusqueda = document.getElementById('titulo-busqueda')
    const arrowSearch = document.getElementById('arrow-search')
    let statusContainer = containerSearch.dataset.visible

    if (option === 'alta') {

        tituloBusqueda.removeAttribute('onclick')
        arrowSearch.removeAttribute('onclick')
        if (statusContainer === 'show') {
            handleVisibleSearch()
        }
    } else if (option === 'no alta') {

        if (!tituloBusqueda.getAttribute('onclick') && !arrowSearch.getAttribute('onclick')) {
            tituloBusqueda.setAttribute('onclick', 'handleVisibleSearch()')
            arrowSearch.setAttribute('onclick', 'handleVisibleSearch()')
        }
    }

}

const identificar = coor => {
    MDM6('hideMarkers', 'identify')
    let level = MDM6('getZoomLevel')
    id_ue = document.getElementById('id_ue').value


    let visible = document.getElementById('container-ratifica').dataset.visible

    if (id_ue != '')
    {
        if (visible == 'show')
        {
            showAlertIdentify('error', 'Debe definir si la posición es correcta o incorrecta en el formulario')
        } else {
            if (bandera_ratificar) {
                showAlertIdentify('error', 'El punto ha sido ratificado y no se puede mover', 'si desea repuntear porfavor presione el botón con el simbolo X')
            } else {
                if (level <= 13) {
                    showAlertIdentify('warning', `${14 - level} acercamientos sobre mapa`, 'Realizalos para ubicar correctamente la unidad económica')
                    MDM6('addMarker', {lon: parseFloat(xycoorsx), lat: parseFloat(xycoorsy), type: 'identify', params: {nom: '', desc: xycoorsx + ", " + xycoorsy}});
                } else {
                    //Lo deja puntear y agrega el punto
                    MDM6('hideMarkers', 'identify')
                    MDM6('addMarker', {lon: parseFloat(coor.lon), lat: parseFloat(coor.lat), type: 'identify', params: {nom: 'Nueva ubicación', desc: coor.lon + ", " + coor.lat}});
                    handlePunteo(coor.lon, coor.lat, 'mercator', 'n')
                    handleHideAlertPickMap()
                }
            }
        }
    }
}

const showAlertIdentify = (type, title, text = '') => {
    Swal.fire({
        type,
        title,
        text,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2000
    })
}

//Funcion para inicializar la vista de calle
const StreetView = (x, y) => modalGoogleMap(x, y, 'mercator')

//modal que manda llamar la vista de calle
const modalGoogleMap = (x, y, tc) => {
    if (tc === 'mercator') {
        sendAJAX(urlServices['serviceIdentifyStreetView'].url,
                {'proyecto': dataUserFromLoginLocalStorage.proyecto, 'x': x, 'y': y},
                urlServices['serviceIdentifyStreetView'].type,
                data => {
                    if (data[0].operation) {
                        MDM6('hideMarkers', 'identify')
                        ubicacion = `${data[0].datos.list[0].y} , ${data[0].datos.list[0].x}`
                        let url = `http://maps.google.com/maps?q=&layer=c&cbll=${ubicacion}&cbp=`
                        setTimeout(() => win = window.open(url, "_blank", "width=800,height=600,top=150,left=200"), 200)
                    }
                }, ''
                )
    }
}

//Funcion para identificar la unidad economica y llamar el servicio
const identificaUE = (x, y) => {
    let capas = ($('#wdenue').is(":checked")) ? 'DENUE,' : ''
    capas += ($('#C101M').is(":checked")) ? 'Matrices,' : ''
    //capas += ($('#c101').is(":checked")) ? 'Sucursales,' : ''
    capas += ($('#c104').is(":checked")) ? 'Postes,' : ''
    capas = capas.slice(0, -1)

    //capas.length === 0 ? mostrarMensaje() : callServicioIdentificar(capas, x, y)
    callServicioIdentificar(capas, x, y)
}

//Funcion que muestra el sweetAlert
const mostrarMensaje = () => {
    swal.fire({
        title: 'Identificación de Unidades Económicas',
        text: 'Seleccione una capa de información',
        showCancelButton: true,
        showConfirmButton: false,
        customClass: 'swal-view',
        allowEscapeKey: true,
        allowOutsideClick: true,
        //html: true,
        animation: true,
        cancelButtonText: 'Cancelar'
    })
    MDM6('hideMarkers', 'identify')
    xycoorsx = ''
    xycoorsy = ''
}

//Funcion que manda llamar el servicio para identificar las unidades económicas
const callServicioIdentificar = (capas, x, y) => {
    var resolucionAPI = MDM6('getResolution');
    var metrosPorPixel = resolucionAPI * (OpenLayers.INCHES_PER_UNIT["Meter"] / OpenLayers.DOTS_PER_INCH);
    var TOLERANCIA = 10;
    metrosPorPixel = metrosPorPixel * TOLERANCIA
    sendAJAX(urlServices['serviceIdentifyUE'].url,
            {
                'proyecto': dataUserFromLoginLocalStorage.proyecto,
                'x': x,
                'y': y,
                'opciones': capas,
                'buffer': metrosPorPixel
            },
            urlServices['serviceIdentifyUE'].type, function (data) {
        if (data[0].operation) {
            swal.close();
            console.log(" la respuesta de identificar es --------------------------------");
            console.log(data[0].datos.datos);
            if (data[0].datos.mensaje == null) {
                MDM6('hideMarkers', 'identify')
                var dataToFrm = data[0].datos.datos
                modalShowInfoUE(dataToFrm, capas)
            } else {
                swal.close()
                $('#btnRatificaSi').attr('disabled', false)
                $('#btnRatificaNo').attr('disabled', false)
                swal.fire({
                    type: 'error',
                    title: 'Identificación de Unidades Económicas',
                    text: data[0].datos.mensaje.messages,
                    showCloseButton: true,
                    showConfirmButton: false,
                    customClass: 'swal-view',
                    confirmButtonColor: "#5562eb",
                    allowEscapeKey: true,
                    allowOutsideClick: true,
                    animation: true
                })

                MDM6('hideMarkers', 'identify')
                xycoorsx = ''
                xycoorsy = ''
            }

        } else {

        }
    }, () => {
        swal({
            title: 'Identificación de Unidades Económicas!',
            text: 'Por favor espere un momento',
            onOpen: () => swal.showLoading()
        })
                .then(() => {
                },
                        dismiss => {

                        }
                )
    }
    )
}

//muestra mensaje con la tabla que contiene la información de las unidades economicas para el establecimiento seleccionado
const modalShowInfoUE = (rows, capas) => {
    capas = capas.split(",")
    const sizeScreen = screen.width <= '768' ? '90%' : '80%'

    swal.fire({
        title: '<h3 class="title-modal-ue">Identificación de Unidades Económicas</h3>',
        //type:'info', 
        width: sizeScreen,
        html: '<div id="tabL"></div>',
        confirmButtonText: 'Aceptarr',
        customClass: 'swal-view',
        confirmButtonColor: '#0f0f0f',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        showCloseButton: true,
        onOpen: cargaTemplateIdentificaUE(rows)
    })
}

//Funcion que arma el html con la información de la unidad económica seleccionada
const cargaTemplateIdentificaUE = rows => {
    loadTemplate('tabL', "resources/templates/table_UE.html?frm=" + Math.random(), () => {

        //interpreta la respuesta 
        console.log("los rows son ");
        console.log(rows);
        rows.forEach(function (o, i) {
            let html = ''

            o.datos.forEach(function (ob, ix) {
                console.log("el obj ");
                console.log(ob.e08);
                const objDetalle = JSON.stringify(ob)
                o.capa === 'eje'
                        ? html += `<tr> <td>${ob.tipovial}</td> <td>${ob.nomvial}</td> </tr>`
                        : html += `<tr class='row-cont-ue'>  
            <td>${ob.id_ue}</td>  
            <td>${ob.e08}</td> 
            <td>${ob.e09}</td> 
            <td> <a title='Detalle' onclick='buildDetalle(${objDetalle})'> <i class='material-icons icFicha'> assignment </a> </td> 
          </tr>`
            })

            $('#tabUE_' + o.capa + ' tbody').html(html)
            //añade el option al select 
            $('#slcapa').append($('<option>', {value: o.capa, text: o.capa, selected: true}))
            $('#slcapa').show()
            showUEficha(o.capa)
        })
    })
}

//función que oculta las tables que no solicito el usuario para mostrar en la opción identificar
const showUEficha = ficha => {
    //escondo las 2 fichas
    $("#tabUE_DENUE").hide()
    $("#tabUE_Matrices").hide()
    $("#tabUE_Sucursales").hide()
    $("#tabUE_detalle").hide()
    $("#tabUE_eje").hide()
    $("#tabUE_Establecimientos").hide();
    //enciendo la ficha que me dan
    $('#btnIdentificaRegresar').css('display', 'none')
    $("#tabUE_" + ficha).show()
}

// función que muestra el detalle de los elementos devueltos por el servicio que identifica contenidas en la ficha
const buildDetalle = ficha => {
    showUEficha('detalle');
    $('#btnIdentificaRegresar').css('display', 'flex');
    ficha.actividad = (typeof ficha.actividad !== 'undefined') ? ficha.actividad : '-';
    ficha.cor_indust = (typeof ficha.cor_indust !== 'undefined') ? ficha.cor_indust : '-';
    ficha.cve_ageb = (typeof ficha.cve_ageb !== 'undefined') ? ficha.cve_ageb : '-';
    ficha.cve_ent = (typeof ficha.cve_ent !== 'undefined') ? ficha.cve_ent : '-';
    ficha.cve_loc = (typeof ficha.cve_loc !== 'undefined') ? ficha.cve_loc : '-';
    ficha.cve_mun = (typeof ficha.cve_mun !== 'undefined') ? ficha.cve_mun : '-';
    ficha.cve_mza = (typeof ficha.cve_mza !== 'undefined') ? ficha.cve_mza : '-';
    ficha.cve_unica = (typeof ficha.cve_unica !== 'undefined') ? ficha.cve_unica : '-';
    ficha.nom_est = (typeof ficha.nom_est !== 'undefined') ? ficha.nom_est : '-';
    ficha.nomasen = (typeof ficha.nomasen !== 'undefined') ? ficha.nomasen : '-';
    ficha.nomvial = (typeof ficha.nomvial !== 'undefined') ? ficha.nomvial : '-';
    ficha.numextalf = (typeof ficha.numextalf !== 'undefined') ? ficha.numextalf : '-';
    ficha.numextnum = (typeof ficha.numextnum !== 'undefined') ? ficha.numextnum : '-';
    ficha.numintalf = (typeof ficha.numintalf !== 'undefined') ? ficha.numintalf : '-';
    ficha.numintnum = (typeof ficha.numintnum !== 'undefined') ? ficha.numintnum : '-';
    ficha.e09 = (typeof ficha.e09 !== 'undefined') ? ficha.e09 : '-';
    ficha.tipo_vial = (typeof ficha.tipo_vial !== 'undefined') ? ficha.tipo_vial : '-';
    ficha.tipoasen = (typeof ficha.tipoasen !== 'undefined') ? ficha.tipoasen : '-';

    $(".modal-footer").append('<button type="button" class="pure-button" id="btn_regresar" onclick="showUEficha($(\'#slcapa\').val())">Regresar</button>')
    $("#tabUE_detalle").html('<table class="pure-table tabUE" id="tabUE_detalleTab"><tbody></tbody></table>')

    var html = `<tr class='tr-none'><td class='td-title'>Razón Social</td><td> ${ficha.e09} </td></tr>`
    ficha.actividad !== '-' ? html += `<tr class='tr-par'> <td class='td-title'>Actividad</td> <td> ${ficha.actividad} </td></tr>` : false
    ficha.cve_ent !== '-' ? html += `<tr class='tr-none'><td class='td-title'>Entidad</td><td> ${ficha.cve_ent} </td></tr>` : false
    ficha.cve_mun !== '-' ? html += `<tr class='tr-par'><td class='td-title'>Municipio</td><td> ${ficha.cve_mun} </td></tr>` : false
    ficha.cve_loc !== '-' ? html += `<tr class='tr-none'><td class='td-title'>Localidad</td><td> ${ficha.cve_loc} </td></tr>` : false
    ficha.cve_ageb !== '-' ? html += `<tr class='tr-par'><td class='td-title'>AGEB</td><td> ${ficha.cve_ageb} </td></tr>` : false
    ficha.cve_mza !== '-' ? html += `<tr class='tr-none'><td class='td-title'>Manzana</td><td> ${ficha.cve_mza} </td></tr>` : false
    ficha.tipo_vial !== '-' ? html += `<tr class='tr-par'><td class='td-title'>Tipo Vialidad</td><td> ${ficha.tipo_vial} </td></tr>` : false
    ficha.nomvial !== '-' ? html += `<tr class='tr-none'><td class='td-title'>Nombre Vialidad</td><td> ${ficha.nomvial} </td></tr>` : false
    ficha.numextnum !== '-' ? html += `<tr class='tr-par'><td class='td-title'>Número Ext</td><td> ${ficha.numextnum} </td></tr>` : false
    ficha.numextalf !== '-' ? html += `<tr class='tr-none'><td class='td-title'>Número Ext (letra)</td><td> ${ficha.numextalf} </td></tr>` : false
    ficha.numintnum !== '-' ? html += `<tr class='tr-par'><td class='td-title'>Número Int</td><td> ${ficha.numintnum} </td></tr>` : false
    ficha.numintalf !== '-' ? html += `<tr class='tr-none'><td class='td-title'>Número Int (letra)</td><td> ${ficha.numintalf} </td></tr>` : false
    ficha.tipoasen !== '-' ? html += `<tr class='tr-par'><td class='td-title'>Tipo de Asentamiento</td><td> ${ficha.tipoasen} </td></tr>` : false
    ficha.nomasen !== '-' ? html += `<tr class='tr-none'><td class='td-title'>Nombre Asentamiento</td><td> ${ficha.nomasen} </td></tr>` : false
    ficha.cor_indust !== '-' ? html += `<tr class='tr-par'><td class='td-title'>Corredor Industrial</td><td> ${ficha.cor_indust} </td></tr>` : false

    $('#tabUE_detalleTab tbody').html(html)
}


// función boton opción cancelar
const handleCancelClick = () => {
    removerOtrosInputs()
    //document.getElementById("id_est").style.display = 'block';
    //document.getElementById("label_id_est").style.display = 'block';
    // document.getElementById("origen").style.display = 'block';
    // document.getElementById("c154").style.display = 'block';
    // document.getElementById("catorigen").style.display = 'none';
    // document.getElementById("catc154").style.display = 'none';
    id_ue = document.getElementById('id_ue').value
    // layersSARE = ['c100', 'wdenue']
    // const checkboxPuntearAlta = document.getElementById('puntear-alta')
    disabledInputs()
    //punteo = 'U'
    confirmacionPunteo = false
    handleTipoPunteo()
    handleActionButtons('disabled')
    handleActionPunteoAlta('on')
    handleActionTargetRef()
    // !checkboxPuntearAlta.checked ? handleActiveVisibleSearch() : false
    handleActiveVisibleSearch()

    eliminaFuncionEliminiarDuplicadosSelects()
    bandera_ratificar = false
    alertToastForm('Ahora puedes realizar una nueva busqueda', 'info')
    //llamar servicio que libera la clave y limpia el form si no limpia formulario    
    id_ue != '' ? callServiceLiberaClave(id_ue) : cleanForm()

    objForm.map(obj => {
        const wrapTitle = document.getElementById(obj.title)
        if (wrapTitle.classList.contains('error'))
            wrapTitle.classList.remove('error')
    })

    if (nameContainerFloating) {
        let containerFloat = nameContainerFloating.slice(3)
        const btnFloat = document.getElementById(`icon-${containerFloat}-float`)
        const btnStatic = document.getElementById(`icon-${containerFloat}-static`)
        //alert(containerFloat)
        btnFloat.classList.remove('btn-inactive')
        btnStatic.classList.add('btn-inactive')
        arrayWrapBtns.map(wrap => {
            const idWrap = document.getElementById(wrap)
            idWrap.style.display = 'contents'
        })

        handleReturnContainerForm(nameContainerFloating)
    }
    id_ue = document.getElementById('id_ue').value;
    actualPagina = 1
    inicioPaginacion = 1
    finPaginacion = screen.width <= '480' ? 5 : 7
    inicioClavesVista = 0
    finClavesVista = 9
    cleeListType = 'normal'
}

const callServiceLiberaClave = (id_ue) => {
    sendAJAXfalse(urlServices['serviceLiberaClave'].url,
            {
                'proyecto': dataUserFromLoginLocalStorage.proyecto,
                'id_ue': id_ue
            }, urlServices['serviceLiberaClave'].type,
            data => {
                if (data[0].operation && data[0].datos.success) {
                    //limpia la forma sin avisarle al usuario
                    cleanForm()
                } else {
                    swal({
                        title: ' Aviso',
                        text: 'Ha ocurrido un error durante el proceso de cancelación, el registro ' + id_ue + '  continua bloqueado',
                        showConfirmButton: true,
                        confirmButtonColor: "#DD6B55",
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        //html: true,
                        animation: true
                    }).then((result) => {
                        console.log(" el result");
                        console.log(result.value);
                        if (result.value) {
                            cleanForm()
                        }

                    });
                }
            }, () => {
    }
    )
}

const cleanForm = () => {
    //const checkboxPuntearAlta = document.getElementById('puntear-alta')
    //limpia formularios
    handleCleanForms()
    //posicion el mapa en su posicion inicial
    MDM6("goCoords", -6674510.727748, -16067092.761748, 4294907.646543801, 1046639.6931187995)
    //oculta el marcador azul
    MDM6('hideMarkers', 'identify')
    //oculta el marcador naranja
    MDM6('hideMarkers', 'routen')
    //contrae la tarjeta de referencia
    handleVisibleForm('referencia')
    //deshabilita botones limpiar y guardar
    handleActionButtons('disabled')
    //oculta div ratificar y busqueda
    handleVisibleRatificaandbusqueda()
    //oculta busqueda
    //!checkboxPuntearAlta.checked ? handleVisibleSearch() : false
    //handleVisibleSearch() 
    //oculta mensaje 
    handleHideAlertPickMap()

    id_ue = document.getElementById('id_ue').value;


}

// Función habilitar inputs formulario
const enabledInputs = () => inputsEditables.map(input => document.getElementById(input.id).removeAttribute('disabled'))

// Función deshabilitar inputs formulario
const disabledInputs = () => inputsEditables.map(input => document.getElementById(input.id).setAttribute('disabled', true))

// función activa btns guardar y cancelar cuando se ratifica y desactiva cuando se cancela
const handleActionButtons = res => {
    const saveOption = document.getElementById('item-save-option')
    const cancelOption = document.getElementById('item-cancel-option')
    const saveMovilOption = document.getElementById('save-movil-option')
    const cancelMovilOption = document.getElementById('cancel-movil-option')

    const noLocalizadoOption = document.getElementById('item-no-localizado-option')
    const noLocalizadoMovilOption = document.getElementById('no-localizado-movil-option')

    if (res == 'enabled') {
        saveOption.removeAttribute('disabled')
        cancelOption.removeAttribute('disabled')
        //saveMovilOption.setAttribute('onclick', 'handleFormValidations()')
        saveMovilOption.setAttribute('onclick', '')
        saveMovilOption.classList.remove('option-disabled')
        cancelMovilOption.setAttribute('onclick', 'handleCancelClick()')
        cancelMovilOption.classList.remove('option-disabled')
        noLocalizadoOption.removeAttribute('disabled');
    } else if (res == 'disabled') {
        saveOption.setAttribute('disabled', 'true')
        cancelOption.setAttribute('disabled', 'true')
        //saveMovilOption.removeAttribute('onclick', 'handleFormValidations()')
        saveMovilOption.removeAttribute('onclick', '')
        saveMovilOption.classList.add('option-disabled')
        cancelMovilOption.removeAttribute('onclick', 'handleCancelClick()')
        cancelMovilOption.classList.add('option-disabled')
        noLocalizadoOption.setAttribute('disabled', 'true');
    }
}

const handleSearchCleeValidation = e => {
    const key = window.event ? e.which : e.keyCode
    key < 48 || key > 57 ? e.preventDefault() : false

    tecla = (document.all) ? e.keyCode : e.which;
    tecla == 13 ? buscarUE(e) : false
}


// alertas formulario
const alertToastForm = (title, type) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-start',
        showConfirmButton: false,
        timer: 3000
    });

    Toast.fire({
        type,
        title
    })
}

const handleLogOut = () => {
    localStorage.clear()
    window.location.href = './'
}

const handleSessionActive = () => {
    /*sendAJAX(urlServices['serviceValidasesion'].url, null, urlServices['serviceValidasesion'].type, data => {
     if (data[0].datos.success == false) {
     alertToastForm('No se ha iniciado sesión', 'error')
     setTimeout(() => window.location.href = './', 1500)
     let id_ue = document.getElementById('id_ue').value
     } else {
     dataUserFromLoginLocalStorage = data[0].datos.datos
     if (dataUserFromLoginLocalStorage.proyecto == 11) {
     
     } else {
     dataUserFromLoginLocalStorage=lista;
     
     }
     }
     },
     () => {
     }
     )*/
    dataUserFromLoginLocalStorage = lista;
}

// ALERTA NORMAL 
const alertPosition = () => {
    Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
    })
}

/* METODOS PARA LAS OPCIONES DEL MENU INFERIOR IMPRESION Y REPORTES*/
const opcionMenu = opcion => {
    switch (opcion) {
        case 1:
            openReportesAjax(1)
            break;
        case 5:
            openReportesAjax(2)
            break;
        case 2:
            OpenReportes('desktop', 'vista')
            break
        case 3:
            OpenReportes('movil', 'vista')
            break
        case 4:
            imprimir()
    }
}

const openReportesAjax = (opcion, opcionSeleccion) => {
    var xhr = new XMLHttpRequest();
    var tipo;
    if (opcionSeleccion === 'Csv') {
        tipo = 'CSV'
    } else {
        if (opcionSeleccion == 'Pdf') {
            tipo = 'PDF'
        } else {
            tipo = 'EXCEL'
        }
    }
    xhr.open('POST', urlServices['serviceReporte'].url + '?proyecto=' + dataUserFromLoginLocalStorage.proyecto + '&tipo=' + tipo + '&reporte=' + opcion + '&ce=' + dataUserFromLoginLocalStorage.ce + '&nombre=' + dataUserFromLoginLocalStorage.nombre, true);
    xhr.responseType = 'blob';
    if (xhr.readyState == 1) {
        swal({
            title: '<span style="width:100%;">Generando reporte!</span>',
            text: 'Por favor espere un momento',
            //timer: 15000,
            onOpen: () => swal.showLoading()
        })
                .then(() => {
                },
                        dismiss => {
                        }
                )
    }
    xhr.onload = function (e) {
        if (this.status == 200) {

            swal.close();
            var blob = new Blob([this.response], {type: 'application/pdf'});
            var link = document.createElement('a');
            var file = window.URL.createObjectURL(this.response);
            if (this.response.type == 'application/pdf')
            {

                Swal.fire({
                    title: '<strong>Reporte</strong>',
                    width: '100%',
                    html: `<iframe class='iframe-reporte' src=""></iframe>`,
                    showCloseButton: true,
                    showCancelButton: false,
                    showConfirmButton: false,
                    focusConfirm: false,
                })
                var file = window.URL.createObjectURL(this.response);
                document.querySelector("iframe").src = file;
                //            link.download = "reporte.pdf";
                //            link.click(); 
                //swal.close();
            } else {
                if (opcionSeleccion === 'Csv' || opcionSeleccion === 'Excel') {
                    link.setAttribute("href", file);
                    if (opcionSeleccion === 'Excel') {
                        link.download = "reporte.xls";
                    } else {
                        link.download = "reporte.csv";
                    }
                    document.body.appendChild(link);
                    link.click();
                    setTimeout(function () {
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                    }, 100);

                    swal.close();
                } else {
                    Swal.fire({
                        position: 'bottom-end',
                        type: 'warning',
                        title: "La operación fue cancelada!",
                        showConfirmButton: false,
                        timer: 2000
                    })
                }


            }
        }
    };
    xhr.onreadystatechange = function (oEvent) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                //console.log(oEvent)  
            } else
            {
                swal.close();
                Swal.fire
                        ({
                            position: 'bottom-end',
                            type: 'warning',
                            title: "Error interno, por favor intente nuevamente!",
                            showConfirmButton: false,
                            timer: 2000
                        })
            }
        }
    };
    xhr.send(null);
}


const openReportesAjax2023 = (opcion) => {
    var xhr = new XMLHttpRequest();
    var tipo;
    xhr.open('POST', urlServices['serviceReporteExcel2023'].url + '?tipoRepor=' + opcion, true);
    xhr.responseType = 'blob';
    if (xhr.readyState == 1) {
        swal({
            title: '<span style="width:100%;">Generando reporte!</span>',
            text: 'Por favor espere un momento',
            //timer: 15000,
            onOpen: () => swal.showLoading()
        })
                .then(() => {
                },
                        dismiss => {
                        }
                )
    }
    xhr.onload = function (e) {
        if (this.status == 200) {

            swal.close();
            var blob = new Blob([this.response], {type: 'application/pdf'});
            var link = document.createElement('a');
            var file = window.URL.createObjectURL(this.response);
            /*if (this.response.type == 'application/pdf')
             {
             
             Swal.fire({
             title: '<strong>Reporte</strong>',
             width: '100%',
             html: `<iframe class='iframe-reporte' src=""></iframe>`,
             showCloseButton: true,
             showCancelButton: false,
             showConfirmButton: false,
             focusConfirm: false,
             })
             var file = window.URL.createObjectURL(this.response);
             document.querySelector("iframe").src = file;
             //            link.download = "reporte.pdf";
             //            link.click(); 
             //swal.close();
             } else {*/
            // if (opcionSeleccion === 'Csv' || opcionSeleccion === 'Excel') {
            link.setAttribute("href", file);
            let varNombreReporteADescargar = "";
            if (opcion == 1) {
                varNombreReporteADescargar = "01_Reporte_de_avance_de_registros_punteados.xlsx"
            } else {
                if (opcion == 2) {
                    varNombreReporteADescargar = "02_Reporte_de_establecimientos_pendientes_de_revision.xlsx"
                } else {
                    varNombreReporteADescargar = "03_Reporte_de_establecimientos_no_localizados.xlsx"
                }
            }
            link.download = varNombreReporteADescargar;
            document.body.appendChild(link);
            link.click();
            setTimeout(function () {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }, 100);

            swal.close();
            /*} else {
             Swal.fire({
             position: 'bottom-end',
             type: 'warning',
             title: "La operación fue cancelada!",
             showConfirmButton: false,
             timer: 2000
             })
             }*/



        }
    };
    xhr.onreadystatechange = function (oEvent) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                //console.log(oEvent)  
            } else
            {
                swal.close();
                Swal.fire
                        ({
                            position: 'bottom-end',
                            type: 'warning',
                            title: "Error interno, por favor intente nuevamente!",
                            showConfirmButton: false,
                            timer: 2000
                        })
            }
        }
    };
    xhr.send(null);
}
async function optionButtonsReport(report) {
    /* inputOptions can be an object or Promise */
    const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                'Csv': 'Csv',
                'Pdf': 'Pdf',
                'Excel': 'Excel'
            })
        }, 500)
    })

    const {value: option} = await Swal.fire({
        title: '<span style="width:100%;">Selecciona Opción</span>',
        input: 'radio',
        confirmButtonText: 'Aceptar',
        showCloseButton: true,
        inputOptions: inputOptions,
        inputValidator: (value) => {
            if (!value) {
                return 'Necesitas seleccionar una opción'
            }
        }
    })
    if (option) {
        openReportesAjax(report, option)
    }
}

async function OpenReportes(size, action) {
    const {value: reporte} = await Swal.fire({
        title: action == 'vista' ? '<span style="width:100%;">Reportes</span>' : 'Descarga de Reportes',
        input: 'select',
        inputOptions: {
            //'1': 'Reporte de Avance de Registros Punteados',
            '1': 'Reporte de Establecimientos Punteados',
            '2': 'Reporte de Pendientes de Revisión',
            '3': 'Reporte de Establecimientos no Localizados',
        },
        inputPlaceholder: 'Selecciona un Reporte',
        showCancelButton: true,
        confirmButtonText: 'Generar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            return new Promise((resolve) => {
                if (value === '1' || value === '2' || value === '3') {
                    //resolve()
                    //optionButtonsReport(value)
                    openReportesAjax2023(value);
                } else {
                    resolve('Selecciona el reporte a visualizar')
                }
            })
        }
    })
    openReportesAjax(reporte)
//  if (reporte) {
//    let src = urlServices['serviceReporte'].url + '?proyecto='+dataUserFromLoginLocalStorage.proyecto+'&tipo=PDF&reporte=' + reporte +'&ce='+dataUserFromLoginLocalStorage.ce+'&ran=' + Math.random() 
//    let leyenda = ''
//    let srcExcel = urlServices['serviceReporte'].url + '?proyecto='+dataUserFromLoginLocalStorage.proyecto+'&tipo=EXCEL&reporte=' + reporte +'&ce='+dataUserFromLoginLocalStorage.ce+'&ran=' + Math.random() 
//    
//    if(reporte === '1'){
//        leyenda = 'Descargaste reporte de manzanas'
//    } else if (reporte === '2'){
//        leyenda = 'Descargaste reporte de localidades'
//    }
//
//    if (action == 'vista'){
//      if (size == 'desktop'){
//        Swal.fire({
//          title: '<strong>Reporte</strong>',
//          width: '100%', 
//          html: `<iframe class='iframe-reporte' src=${src}></iframe>`,
//          showCloseButton: true,
//          showCancelButton: false,
//          showConfirmButton: false,
//          focusConfirm: false,
//        })
//      } else  if (size == 'movil'){
//        window.open(src, 'fullscreen=yes')
//      } 
//    } else if (action == 'descarga'){
//      window.location.href = srcExcel    
//    }
//  }  
}
var imprimir = function () {
    $('#window_bottom').hide();
    var data = $('#map').html();
    $('#window_bottom').show();
    var isMobile = false;

    var ventana = window.open('', '', 'height=1000,width=1024');
    ventana.document.open();
    ventana.document.write('<html><head ><title>' + titulo_impresion + '</title>');
    ventana.document.write('<script src="resources/js/jquery-2.1.1.min.js"></script>');
    ventana.document.write('<script src="resources/js/main.js"></script>');
    if (navigator.userAgent.indexOf("Chrome") !== -1)
    {
        ventana.document.write('<style type="text/css"  media="print"> ');
        ventana.document.write('@page{size:landscape;}html { width:29.4cm;height:20.62cm;}');
        ventana.document.write('body{margin-bottom: -2.30cm;margin-top: 2cm;margin-right: -1.0cm;margin-left:-1.0cm;}');
        ventana.document.write('.divMapa{page-break-after : always;} ');
        ventana.document.write('.olControlMousePosition{display:none;} ');
        ventana.document.write('#OpenLayers_Control_ScaleLine_4{display:none;}');
        ventana.document.write('#OpenLayers_Map_5_OpenLayers_ViewPort{ width:82%; position:relative; height:100%; left:-200px} ');
        ventana.document.write('</style>');
    } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
        ventana.document.write('<style type="text/css"  media="print"> @page{size:landscape;}html { width:29.4cm;height:20.62cm;}');
        ventana.document.write('body{margin-bottom: -2.30cm;margin-top: 2cm;margin-right: -1.0cm;margin-left:-1.0cm;} ');
        ventana.document.write('.divMapa{page-break-after : always;}');
        ventana.document.write('.olControlMousePosition{display:none;} ');
        ventana.document.write('#OpenLayers_Control_ScaleLine_4{display:none;}');
        ventana.document.write('#OpenLayers_Map_5_OpenLayers_ViewPort{width:82%;overflow:hidden;position:relative;height:100%;}" </style>');
    } else if (navigator.userAgent.indexOf('Trident') !== -1) {
        ventana.document.write('<link rel="stylesheet" type="text/css" href="css/print_ie.css"/>');
    }
    ventana.document.write('<link rel="stylesheet" type="text/css" href="resources/css/app.css"/>');
    ventana.document.write('<link rel="stylesheet" href="resources/css/materialize_1.0.0.css">');
    ventana.document.write('<script src="resources/js/materialize.min.js"></script>');
    ventana.document.write('</head>');
    ventana.document.write('<body>');
    ventana.document.write('<div class="" id="mapa" >');
    ventana.document.write(data);
    ventana.document.write('</div>');
    ventana.document.write('<div id="modal" class="modal" style="top: 40%!important;">');
    ventana.document.write('<div class="modal-content">');
    ventana.document.write('<div> Cargando</div>');
    ventana.document.write('<div class="preloader-wrapper big active">');
    ventana.document.write('<div class="spinner-layer spinner-blue-only">');
    ventana.document.write('<div class="circle-clipper left">');
    ventana.document.write('<div class="circle"></div>');
    ventana.document.write('</div>');
    ventana.document.write('<div class="gap-patch">');
    ventana.document.write('<div class="circle"></div>');
    ventana.document.write('</div>');
    ventana.document.write('<div class="circle-clipper right">');
    ventana.document.write('<div class="circle"></div>');
    ventana.document.write('</div>');
    ventana.document.write('</div>');
    ventana.document.write('</div>');
    ventana.document.write('</div>');
    ventana.document.write('</div>');
    ventana.document.write('<script>modal2();setClassPrint();setTimeout(function(){closeModal2();},4000); window.onafterprint = function(e){');
    ventana.document.write('$(window).off("mousemove", window.onafterprint);  setTimeout(function () {    window.close(); },2000);     ');
    ventana.document.write('};</script>');
    ventana.document.write('</body>');
    ventana.document.write('</html>');
    ventana.document.close();
    setTimeout(function () {
        ventana.print();
    }, 5000);
}



const  modal2 = () => {
    $('.modal').modal()
    $('.modal').modal('open')
}


const closeModal2 = () => {
    $('.modal').modal('close')
}
function setClassPrint() {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
    {
        $('#OpenLayers_Map_5_OpenLayers_ViewPort')
                .css({
                    'left': '3%',
                    'width': '53%',
                    'height': '32%',
                    'zoom': '150%'
                })
    } else {
        $('#OpenLayers_Map_5_OpenLayers_ViewPort')
                .css({
                    'top': '-60%',
                    'left': '-58%',
                    'width': '160%',
                    'height': '140%',
                    'zoom': '150%'
                })
    }
}
/* FIN OPCIONES DEL MENU INFERIOR DERECHO IMPRESION Y REPORTES*/

/*CLAVES BLOQUEADAS*/
const Desbloquear = id_ue => Actiondesbloquear(id_ue)

const GetClavesBloqueadas = () => {
    loadTemplate('ClavesBloqueadas', "resources/templates/ClavesBloqueadas.html?frm=" + Math.random(), function (html) {
        $('#tabUE tbody').html(html);
        CargaTablaBloqueadas('#tableClavesBloqueadas');
        // CargaTablaBloqueadas();
    });
}

const CargaTablaBloqueadas = () => {
    arrayClavesBloqueadasTodas = ""
    let oTable, tr

    sendAJAX(urlServices['serviceListaClavesBloqueadas'].url,
            {
                'proyecto': dataUserFromLoginLocalStorage.proyecto,
                'tramo': dataUserFromLoginLocalStorage.tramo_control,
                'id_ue': dataUserFromLoginLocalStorage.ce
            }, urlServices['serviceListaClavesBloqueadas'].type,
            data => {
                if (data[0].datos.list.length > 0) {
                    dataCleeListNewLock = data[0].datos
                    console.log(" inicioClavesVistaLock 1-" + inicioClavesVistaLock);
                    popupCleeListBloqueadas(data[0].datos.datos)
                } else {
                    Swal.fire({
                        position: 'bottom-end',
                        type: 'warning',
                        title: 'No existen claves bloqueadas',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            }, () => {
        swal({
            title: '<span style="width:100%;">Buscando información!</span>',
            text: 'Por favor espere un momento',
            timer: 2000,
            onOpen: () => swal.showLoading()
        })
                .then(() => {
                },
                        dismiss => {
                        }
                )
    }
    )
}

const addClavesDesbloquear = (id_ue, check) => {
    if (id_ue !== null) {
        if (check) {
            arrayClavesBloqueadas = arrayClavesBloqueadas + id_ue + ","
        }
    } else {
    }
}

var ActionSeleccionarTodos = function () {
    var accion = $('input:checkbox[name=inputTodos]:checked').val()
    var oTable = $('#tableClavesBloqueadas').dataTable()
    if (accion) {
        oTable.$("input[type='checkbox']").prop('checked', true)
        banderaDesbloquear = true
    } else {
        oTable.$("input[type='checkbox']").prop('checked', false)
        banderaDesbloquear = false
    }
}

var Actiondesbloquear = function (id_ue) {
    swal.fire({
        title: 'se desbloqueara la claves? ' + id_ue,
        text: "",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#10455B',
        cancelButtonColor: '#424242',
        confirmButtonText: 'Desbloquear',
        cancelButtonText: 'Cancelar'
    })
            .then(result => handleShowResultDesbloqueo(result, id_ue))
}

const handleShowResultDesbloqueo = (result, id_ue) => {
    const user = dataUserFromLoginLocalStorage.nombre
    if (result.value) {
        sendAJAX(urlServices['serviceDesbloqueoClavesBloqueadas'].url,
                {
                    'proyecto': dataUserFromLoginLocalStorage.proyecto,
                    'id_ue': id_ue,
                    'usuario': user
                },
                urlServices['serviceDesbloqueoClavesBloqueadas'].type,
                data => {
                    if (data[0].operation) {
                        if (data[0].datos.mensaje.type === 'false') {
                            handleShowSaveAlert('error', 'Error', data[0].datos.mensaje.messages, false)
                            return;
                        } else {
                            swal.close()
                            MDM6('hideMarkers', 'identify')
                            handleShowSaveAlert('success', 'Desbloqueo', 'Se ha Desbloqueado la clave', true)
                        }
                    } else {
                        handleShowSaveAlert('error', 'Error', 'Error de conexión', true)
                    }
                }, () => {
            swal({
                title: '<span style="width:100%;">Desbloqueando Clave!</span>',
                text: 'Por favor espere un momento',
                timer: 2000,
                onOpen: () => swal.showLoading()
            })
                    .then(() => {
                    },
                            dismiss => {
                            }
                    )
        }
        )
    } //close if result.value
}
/*FIN CLAVES BLOQUEADAS*/

const tiempoInactividad = () => {
    let tiempo
    const resetTimer = () => {
        clearTimeout(tiempo)
        tiempo = setTimeout(logout, 60000)
    }
    window.onload = resetTimer
    // DOM Events 
    document.onmousemove = resetTimer
    document.onkeypress = resetTimer
    document.onload = resetTimer
    document.onmousedown = resetTimer // touchscreen presses 
    document.ontouchstart = resetTimer
    document.onclick = resetTimer  // touchpad clicks 
    document.onscroll = resetTimer // scrolling with arrow keys 
    const logout = () => {
        localStorage.clear()
        alertToastForm('Sesión se cerrará por permanecer 30 minutos sin actividad', 'error')
    }
}


const FiltroXClase = id => {
    setTimeout(function () {
        llamarServicioclases('00');
    }, 200);
    htmlDivClases = '<label id=label_sector class="label-clases" style="display:block"><h6><b>Sectores</b><h6>';
    htmlDivClases += '<select id=\"filtro_sector\" class="filtros-clases" style="display:block" onchange=llamarServicioclases(this.value,$(this).html())>';
    htmlDivClases += '<option>Seleccione</option>'
    htmlDivClases += '</select>';
    htmlDivClases += '<label id=label_subsector class="label-clases" style="display:none" ><h6><b>Subsectores</b></h6></label>';
    htmlDivClases += '<select id=\"filtro_subsector\" class="filtros-clases" style="display:none" onchange=llamarServicioclases(this.value,$(this).html())>';
    htmlDivClases += '<option>Seleccione</option>'
    htmlDivClases += '</select>';
    htmlDivClases += '<label id=label_rama class="label-clases" style="display:none" ><h6><b>Ramas</b></h6></label>';
    htmlDivClases += '<select id=\"filtro_rama\" class="filtros-clases" style="display:none" onchange=llamarServicioclases(this.value,$(this).html())>';
    htmlDivClases += '<option>Seleccione</option>'
    htmlDivClases += '</select>';
    htmlDivClases += '<label id=label_subrama class="label-clases" style="display:none"><h6><b>Subramas</b></h6></label>';
    htmlDivClases += '<select id=\"filtro_subrama\"  class="filtros-clases" style="display:none" onchange=llamarServicioclases(this.value,$(this).html())>';
    htmlDivClases += '<option>Seleccione</option>'
    htmlDivClases += '</select>';
    htmlDivClases += '<label id=label_clase class="label-clases" style="display:none" ><h6><b>Clases</b></h6></label>';
    htmlDivClases += '<select id=\"filtro_clase\" class="filtros-clases" style="display:none" onchange=llamarServicioclases(this.value,$(this).html())>';
    htmlDivClases += '<option>Seleccione</option>'
    htmlDivClases += '</select>';
    inicializaSwal(id);

}

const inicializaSwal = (id) => {
    swal({
        title: '<div id="filtroxclases" >' + "Filtro Por Clases" + '</div>',
        html: htmlDivClases,
        customClass: 'swal-wide',
        heightAuto: true,
        confirmButtonText: 'Aceptar',
        showCloseButton: true,
        confirmButtonColor: '#787878'

    }).then((value) => {
        claseScian = añadirParametroScian();
        if (id == "filtroXclase") {
            document.getElementById('e17_DESC').value = valorScian;
        } else {

        }

    });
}

const añadirParametroScian = () => {
    let claseScian = 0, valor, valorReal, clase;
    filtrosScian.map(id => {
        const sel = document.getElementById(id.id)
        const idElement = document.getElementById(id.id).value
        idElement != "Seleccione" ? claseScian = idElement : ""
        valor = sel.options[sel.selectedIndex].innerText;
        if (claseScian != 0 && valor != "Seleccione") {
            valorReal = valor;
            clase = claseScian
            claseScian = 0
            valorScian = clase + "-" + valorReal;
            return
        }
    })
}

const actionFiltrosScian = (id, clasesFiltro_2, array, etiqueta) =>
        {
            const elemento = document.getElementById(id.id)
            $.each(elemento, function (index, value)
            {
                elemento.remove(0);
            });
            const opt = document.createElement('option');
            opt.value = "Seleccione";
            opt.innerHTML = "Seleccione";
            elemento.appendChild(opt);
            clasesFiltro_2.map(id =>
            {
                const opt = document.createElement('option');
                opt.value = id.codigo;
                opt.innerHTML = id.descripción;
                elemento.appendChild(opt);
            })
            array.map(id =>
            {
                let elemen = document.getElementById(id.id)
                id.id == "label_" + etiqueta || id.id == "filtro_" + etiqueta ? elemen.style.display = "block" : elemen.style.display = "none";
            })
        }

const llamarServicioclases = (codigoScian, valor) => {
    var sel;
    sendAJAX(urlServices['getDatosClasesPorFiltro'].url,
            {
                cveoper: dataUserFromLoginLocalStorage.ce,
                proyecto: dataUserFromLoginLocalStorage.proyecto,
                codigoScian: codigoScian
            },
            urlServices['getDatosClasesPorFiltro'].type,
            data => {
                if (data[0].datos.datos.length) {
                    clasesFiltro = JSON.stringify(data[0].datos.datos);
                    localStorage.setItem("JSONFiltrarClases", JSON.stringify(data[0].datos.datos));
                    if (clasesFiltro != null)
                    {
                        let clasesFiltro_2 = JSON.parse(clasesFiltro);
                        if (codigoScian == '00') {
                            const sector = document.getElementById("filtro_sector")
                            actionFiltrosScian(sector, clasesFiltro_2, ElementosSector, "sector")
                        } else
                        {
                            let codigo = codigoScian.length;
                            if (codigoScian.includes('-')) {
                                codigo = 2;
                            }
                            switch (codigo)
                            {
                                case 2:
                                    const subsector = document.getElementById("filtro_subsector")
                                    actionFiltrosScian(subsector, clasesFiltro_2, ElementosSubSector, "subsector")
                                    break;
                                case 3:
                                    const rama = document.getElementById("filtro_rama")
                                    actionFiltrosScian(rama, clasesFiltro_2, ElementosRama, "rama")
                                    break;
                                case 4:
                                    const subrama = document.getElementById("filtro_subrama")
                                    actionFiltrosScian(subrama, clasesFiltro_2, ElementosSubRama, "subrama")
                                    break;
                                case 6:
                                    break;
                                default:
                                    const clase = document.getElementById("filtro_clase")
                                    actionFiltrosScian(clase, clasesFiltro_2, ElementosClase, "clase")
                                    break;
                            }
                        }
                    }
                } else
                {
                    var dataStorage = localStorage.getItem("JSONFiltrarClases");
                    losDatosLocales = JSON.parse(dataStorage);
                }
            }, () => {
    }
    )

}


function abrirAyuda() {
    //$('a[href$=".pdf"]').prop('target', '_blank');Manual_del_Usuario_Sare_EGE

    switch (dataUserFromLoginLocalStorage.proyecto) {
        case 1:
            window.open("resources/ayuda/Manual_del_Usuario_Sare_EGE.pdf", '_blank');
            break;
        case 5:
            window.open("resources/ayuda/Manual_del_Usuario_Sare.pdf", '_blank');
            break;
        default:
            //window.open("resources/ayuda/Manual_del_Usuario_Sare_EGE.pdf", '_blank');
            descargaAyuda();

    }


}

function descargaAyuda() {
    var xhr = new XMLHttpRequest();
    var tipo;
    xhr.open('GET', urlServices['serviceAyuda'].url, true);
    xhr.responseType = 'blob';
    if (xhr.readyState == 1) {
        swal({
            title: '<span style="width:100%;">Descargando!</span>',
            text: 'Por favor espere un momento',
            //timer: 15000,
            onOpen: () => swal.showLoading()
        })
                .then(() => {
                },
                        dismiss => {
                        }
                )
    }
    xhr.onload = function (e) {
        if (this.status == 200) {

            swal.close();
            var blob = new Blob([this.response], {type: 'application/zip'});
            var link = document.createElement('a');
            var file = window.URL.createObjectURL(this.response);
            /*if (this.response.type == 'application/pdf')
             {
             
             Swal.fire({
             title: '<strong>Reporte</strong>',
             width: '100%',
             html: `<iframe class='iframe-reporte' src=""></iframe>`,
             showCloseButton: true,
             showCancelButton: false,
             showConfirmButton: false,
             focusConfirm: false,
             })
             var file = window.URL.createObjectURL(this.response);
             document.querySelector("iframe").src = file;
             //            link.download = "reporte.pdf";
             //            link.click(); 
             //swal.close();
             } else {*/
            // if (opcionSeleccion === 'Csv' || opcionSeleccion === 'Excel') {
            link.setAttribute("href", file);
            let varNombreReporteADescargar = "Ayuda_SARE-Sucursales.zip";
            link.download = varNombreReporteADescargar;
            document.body.appendChild(link);
            link.click();
            setTimeout(function () {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }, 100);

            swal.close();
            /*} else {
             Swal.fire({
             position: 'bottom-end',
             type: 'warning',
             title: "La operación fue cancelada!",
             showConfirmButton: false,
             timer: 2000
             })
             }*/



        }
    };
    xhr.onreadystatechange = function (oEvent) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                //console.log(oEvent)  
            } else
            {
                swal.close();
                Swal.fire
                        ({
                            position: 'bottom-end',
                            type: 'warning',
                            title: "Error interno, por favor intente nuevamente!",
                            showConfirmButton: false,
                            timer: 2000
                        })
            }
        }
    };
    xhr.send(null);
}

function soloNumeros(e) {
    var key = window.Event ? e.which : e.keyCode
    return (key >= 48 && key <= 57)
}


function metodoDenue() {
    if (document.getElementById('idCapaDenue').checked) {
        MDM6('setParams', {layer: 'denue', params: {'layers': 'cdenue14'}});
    } else {
        MDM6('setParams', {layer: 'denue', params: {'layers': ''}});
    }

}

var ObservaNoLocalizado;
async function actionNoLocalizado() {
    const {value: reporte} = await swal.fire({
        title: '<span style="width:100%;">Escriba observacion de por que no se localizo la ue ' + id_ue_renem2022 + '</span>',
        input: 'textarea',
        inputLabel: 'Escriba observacion de por que no se localizo',
        //inputValue: '',
        inputPlaceholder: 'Observaciones',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            return new Promise((resolve) => {
                if (value != '' && value.length < 250) {
                    //resolve()
                    // ObjectRequest['rafiticado']=null;
                    console.log(" value insertado ");
                    console.log(value);
                    ObservaNoLocalizado = value;
                    funcionConfirmacionDeNoLocalizado();
                } else {
                    resolve('Debes escribir alguna observación con un texto no mayor a 250 caracteres')
                }
            })
        }
    })
}

function funcionConfirmacionDeNoLocalizado() {

    Swal.fire({
        title: '¿Estas seguro que deseas dejar la unidad ' + id_ue_renem2022 + ' como no localizado?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si',
        cancelButtonText: 'no'
    }).then((result) => {
        if (result.value) {
            funcionesGuardadoNoLocalizado();
        }
    });
}


function funcionesGuardadoNoLocalizado() {
    var formularioPrueba = funcionRegresaValoresFormularios('#frmSARE');
    llenaValoresObject(false, formularioPrueba);
    ObjectRequest['observa'] = ObservaNoLocalizado;
    ObjectRequest['no_localizado'] = true;
    validaTipos({value: true}, 'nolocalizado');
}

function funcionRegresaValoresFormularios(idForm) {
    const myform = $(idForm);
    let disabled = myform.find(':input:disabled').removeAttr('disabled');
    let d = myform.serialize();
    d += "&id_tramo=" + dataUserFromLoginLocalStorage.tramo_control;
    d += "&coord_x=" + xycoorsx + "&coord_y=" + xycoorsy;
    return d;
}


document.getElementById("formReferencia").addEventListener('submit', e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  console.log(JSON.stringify(data));
});

function validaFormulario() {

    var url = "http://10.106.12.188:8080/sare_2024_web/confProyecto.do?id_proyecto=1";
    var data = {username: "example"};

    fetch(url, {
        method: "POST", // or 'PUT'
        //body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        console.log(res.json());
    }).catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));
}



 