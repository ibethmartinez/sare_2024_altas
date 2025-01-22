/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

/* global define, globalThis, self, BasemapsControl, maplibregl, google, maptilersdk, fetch, Swal, M */

var latitud;
var longitud;
var panorama;
var idUe;
var x_val;
var y_val;
let refer;
let domici;
let asent;
let ubiGeo;
let enVial;
let callePost;
let edCenCom;
let observ;
let seleccionado;
let mark;
var validacion;
let markero;
let markerPunt;
let markerIdenti;
let datos;
var mapalibre;
var ratifico = true;
var mostrarModal = true;
var punteoObj;
var idTramo;
let denueChecked = true;
let identificarChecked = false;
let errore;
let boolide = false;
let ratifique = false;
let punteaNR = false;
let errorPunteo = false;
let id_tramos;
let chinchetaStreet = false;
let chinchetaPunteo = false;
var banderaPunteoDado = false;
var layerStreet = false;

(function (g, f) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = f() : typeof define === 'function' && define.amd ? define(f) : (g = typeof globalThis !== 'undefined' ? globalThis : g || self, g.MaplibreGLBasemapsControl = f());
})(this, (function () {
    'use strict';
    class BasemapsControl {
        constructor(options) {
            this._options = options;
            this._container = document.createElement("div");
            this._container.classList.add("maplibregl-ctrl");
            this._container.classList.add("maplibregl-ctrl-basemaps");
            this._container.classList.add("closed");
            switch (this._options.expandDirection || "right") {
                case "top":
                    this._container.classList.add("reverse");
                case "down":
                    this._container.classList.add("column");
                    break;
                case "left":
                    this._container.classList.add("reverse");
                case "right":
                    this._container.classList.add("row");
            }
            this._container.addEventListener("mouseenter", () => {
                this._container.classList.remove("closed");
            });
            this._container.addEventListener("mouseleave", () => {
                this._container.classList.add("closed");
            });
        }
        onAdd(map) {
            map.on("load", () => {
                var imagen;
                this._options.basemaps.forEach(({ id, tiles, sourceExtraParams = {}, layerExtraParams = {} }) => {
                    map.addSource(id, Object.assign(Object.assign({}, sourceExtraParams), {type: "raster", tiles, tileSize: 256})); // Resolver de mejor manera
                    map.addLayer(Object.assign(Object.assign({}, layerExtraParams), {id, source: id, type: "raster"}));
                    const basemapContainer = document.createElement("img");
                    if (id === "basemap_World_Topo_Map") {
                        imagen = "Osm";
                    }

                    if (id === "map_Inegi") {
                        imagen = "mapa_gris";
                    }

                    if (id === "sateliteInegi") {
                        imagen = "baseOrtos";
                    }

                    if (id === "Google_Maps") {
                        imagen = "Google";
                    }

                    if (id === "streetsMap") {
                        imagen = "Yahoo";
                    }

                    basemapContainer.src = "resources/imagenes_2/resource/" + imagen + ".jpg";
                    basemapContainer.classList.add("basemap");
                    basemapContainer.dataset.id = id;
                    basemapContainer.addEventListener("click", () => {
                        const activeElement = this._container.querySelector(".active");
                        activeElement.classList.remove("active");
                        basemapContainer.classList.add("active");
                        map.setLayoutProperty(activeElement.dataset.id, "visibility", "none");
                        map.setLayoutProperty(id, "visibility", "visible");
                    });
                    basemapContainer.classList.add("hidden");
                    this._container.appendChild(basemapContainer);
                    if (this._options.initialBasemap === id) {
                        map.setLayoutProperty(id, "visibility", "visible");
                        basemapContainer.classList.add("active");
                    } else {
                        map.setLayoutProperty(id, "visibility", "none");
                }
                });
            });
            return this._container;
        }
        onRemove() {
            var _a;
            (_a = this._container.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(this._container);
        }
    }
    return BasemapsControl;
})); //# sourceMappingURL=index.js.map

//mapa con MapaLibre
function initMap2() {
    /*----CARGA DINAMICA USUARIO/CORDINACION (oscar)-----*/
    var Nom_usuario = $_GET('usuario');
    var No_tramo = $_GET('id_tramo');
    var etiq_ce = $_GET('ce');

    var cadena_usuar_coord = " ";

    cadena_usuar_coord = `<i class="large material-icons icon_usuario">person_pin</i> <a class="nav-link Texto_usuario">Usuario: ` + Nom_usuario + ` / ` + etiq_ce + `</a>`;
    $("#Usuar_coord").append(cadena_usuar_coord);

    try {

        var glPrx = 'omnivore.do?';
        var capas = [
            "c103", "c102", "c100", "c101", "c103r", "c107", "c107r", "c108"
        ];
        var sourceName = 'wms-test-source';
        var wmsLayerName = 'wms-test-layer';        
        var mapsSARE={'dev':'SARE_2024_desa.map','prod':'SARE_2024.map'};
        var baseUrl = glPrx + 'https://gaia.inegi.org.mx/NLB_SGW/balancer.do?map=/opt/map/'+mapsSARE[G_AMBIENTE];
        var bounds = [
            [-120.89368637913228, 10.235864489648208], // Southwest coordinates
            [-81.603966885802, 36.41232164374999] // Northeast coordinates
        ];

        mapalibre = new maplibregl.Map({
            container: "map",
            scaleControl: true,
            fullscreenControl: "top-left",
            geolocateControl: true,
            navigationControl: true, //disable the navigation control
            style: {
                version: 8,
                sources: {},
                layers: []
            },
            zoom: 4,
            maxZoom: 20,
            minZoom: 4,
            center: [-102.28259, 21.88234], // starting position [lng, lat]
            maxBounds: bounds, // Sets bounds as max
            maxPitch: 65,
            antialias: true,
            terrain: true,
            terrainControl: true
        });

        mapalibre.setPixelRatio(1);

        setMap(mapalibre);
        let markers = getMarkers();
        let marker = getMarker();
        initSearch("insertaID");
        createButtonDelete();
        createButtonSearch(mapalibre, marker, markers);
        createButtonMapCenter(mapalibre, markers, marker);
        GeneraForm("Referencia");
        GeneraForm("Domicilio");
        GeneraForm("Asentamiento");
        GeneraForm("Ubicación Geográfica");
        GeneraForm("Entre vialidades");
        GeneraForm("Calle posterior");
        GeneraForm("Edificio, centro comercial");
        GeneraForm("Observación");

        const formFiltro = document.getElementById("formBusqueda");
        formFiltro.addEventListener("submit", onFormSubmitFiltro);

        function onFormSubmitFiltro(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            const id = 1;
            idUe = data.get("filtro");
            var usuario = $_GET('usuario');
            var id_tramo = $_GET('id_tramo');
            var ce = $_GET('ce');
            var isRatificado = "false";

            var url = `getfiltroCargaTrabajo.do?id_ue=${idUe}&id_tramo=${id_tramo}&ce=${ce}&isRatificado=${isRatificado}&usuario=${usuario}`;
            var urlValida = `confProyecto.do?id_proyecto=${id}`;

            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((res) => res.json())
                    .catch((error) => console.error("Error:", error))
                    .then((response) => {
                        if (response.mensaje === null) {
                            boolide = true;
                            if (boolide) {
                                $("#Btn_Accion1").prop('disabled', true);
                                $('#Btn_Accion1').attr('style', 'cursor:not-allowed');
                            }
                            let tramo = $_GET('ce');

                            if (tramo === "01" || tramo === "02" || tramo === "03" || tramo === "04" || tramo === "05" || tramo === "06" || tramo === "07" || tramo === "08" || tramo === "09") {
                                id_tramos = tramo.replace(/^0+/, '');
                            } else if (tramo === "00") {
                                id_tramos = "0";
                            } else {
                                id_tramos = tramo;
                            }

                            datos = response.list[0];
                            datos["id_tramo"] = id_tramos;

                            idTramo = datos["id_tramo"];
                            street_viewcord(parseFloat(datos["coor_y"]), parseFloat(datos["coor_x"]));
                            if (datos.hasOwnProperty("no_localizado")) {
                                console.log("Si contiene");
                            } else {
                                datos["no_localizado"] = "false";
                            }

                            fetch(urlValida, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then((res) => res.json())
                                    .catch((error) => console.error("Error:", error))
                                    .then((response2) => {
                                        if (datos.hasOwnProperty("es_ratificable")) {
                                            if (datos["es_ratificable"] === "t") {
                                                var latln = [datos["coor_x"], datos["coor_y"]];
                                                var el = document.createElement('div');
                                                el.className = 'markerPunteo';

                                                x_val = datos["coor_x"];
                                                y_val = datos["coor_y"];
                                                // create the marker
                                                mark = new maplibregl.Marker(el)
                                                        .setLngLat(latln)
                                                        .addTo(mapalibre);
                                                mark._element.innerHTML = "";
                                                /*if (markero) {
                                                 markero.removeClassName('markerStreetV');
                                                 }*/


                                                mapalibre.flyTo({
                                                    center: [
                                                        datos["coor_x"], datos["coor_y"]
                                                    ],
                                                    zoom: 18,
                                                    essential: true // this animation is considered essential with respect to prefers-reduced-motion
                                                });

                                                mapalibre.setLayoutProperty(
                                                        'wms-test-layer',
                                                        'visibility',
                                                        false ? 'visible' : 'none'
                                                        );

                                                mapalibre.setLayoutProperty(
                                                        'id_denue',
                                                        'visibility',
                                                        false ? 'visible' : 'none'
                                                        );

                                                //alert(datos["es_ratificable"]);
                                                response2.list.forEach((input) => {
                                                    bannerRatificar();
                                                    //console.log(input);
                                                    //console.log(datos[input.campo]);


                                                    if (input.solo_lectura === "t") {

                                                    } else {
                                                        if (input.tipo_control === "select") {
                                                            if (document.getElementById(input.campo)) {
                                                                document.getElementById(input.campo).removeAttribute('disabled');//Asignar el atributo type  
                                                            }
                                                        } else {
                                                            if (document.getElementById(input.campo)) {
                                                                document.getElementById(input.campo).removeAttribute('readonly');//Asignar el atributo type  
                                                            }
                                                        }
                                                    }


                                                    if (datos[input.campo] !== null) {
                                                        if (document.getElementById(input.campo)) {
                                                            //console.log("si");
                                                            document.getElementById(input.campo).value = datos[input.campo];
                                                        } else {
                                                            //console.log("no");
                                                        }
                                                    } else {
                                                        if (input.campo === "tipo_e14" || input.campo === "tipo_e12p" || input.campo === "tipo_e19") {
                                                            if (document.getElementById(input.campo)) {
                                                                //console.log("si");
                                                                document.getElementById(input.campo).value = null;
                                                            } else {
                                                                console.log("nooo");
                                                            }
                                                        }
                                                    }
                                                });
                                            } else {
                                                let bound = response.list[0].bounds;
                                                let splite = bound.split(",");
                                                let x1 = parseFloat(splite[0]);
                                                let y1 = parseFloat(splite[1]);
                                                let x2 = parseFloat(splite[2]);
                                                let y2 = parseFloat(splite[3]);
                                                ratifique = true;
                                                ratifico = false;
                                                chinchetaPunteo = true;

                                                mapalibre.fitBounds([
                                                    [x1, y1],
                                                    [x2, y2]
                                                ]);

                                                mapalibre.setLayoutProperty(
                                                        'wms-test-layer',
                                                        'visibility',
                                                        false ? 'visible' : 'none'
                                                        );

                                                mapalibre.setLayoutProperty(
                                                        'id_denue',
                                                        'visibility',
                                                        false ? 'visible' : 'none'
                                                        );

                                                document.querySelector("#Chincheta_punteo").style.visibility = "visible";
                                                document.getElementById("textAlert").innerHTML = "Selecciona la ubicación con el marcador";

                                                response2.list.forEach((input) => {

                                                    if (input.solo_lectura === "t") {

                                                    } else {
                                                        if (input.tipo_control === "select") {
                                                            if (document.getElementById(input.campo)) {
                                                                document.getElementById(input.campo).removeAttribute('disabled');//Asignar el atributo type  
                                                            }
                                                        } else {
                                                            if (document.getElementById(input.campo)) {
                                                                document.getElementById(input.campo).removeAttribute('readonly');//Asignar el atributo type  
                                                            }
                                                        }
                                                    }


                                                    if (datos[input.campo] !== null) {
                                                        if (document.getElementById(input.campo)) {
                                                            document.getElementById(input.campo).value = datos[input.campo];
                                                        } else {
                                                        }
                                                    } else {
                                                        if (input.campo === "tipo_e14" || input.campo === "tipo_e12p" || input.campo === "tipo_e19") {
                                                            if (document.getElementById(input.campo)) {
                                                                document.getElementById(input.campo).value = null;
                                                            } else {
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: response.mensaje.type
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    ratifico = true;
                                    if (markero) {
                                        //clearMarker(markero);
                                    }

                                    if (mark) {
                                        clearMarker(mark);
                                    }

                                    $('#panRatificar').hide();
                                    $('#ratificar').hide();
                                    $('#noratificar').hide();

                                    mapalibre.flyTo({
                                        zoom: 4,
                                        essential: true // this animation is considered essential with respect to prefers-reduced-motion
                                    });

                                    mapalibre.setLayoutProperty(
                                            'wms-test-layer',
                                            'visibility',
                                            false ? 'visible' : 'none'
                                            );

                                    mapalibre.setLayoutProperty(
                                            'id_denue',
                                            'visibility',
                                            false ? 'visible' : 'none'
                                            );

                                    $(".Input_Buscador").val("");
                                    $("#e10a").empty();
                                    $("#e10b").empty();
                                    $("#e10c").empty();
                                    document.getElementById("lble10a").setAttribute("class", "estilo_normal");
                                    document.getElementById("lble10b").setAttribute("class", "estilo_normal");
                                    document.getElementById("lble10c").setAttribute("class", "estilo_normal");
                                    document.querySelector("#Chincheta_punteo").style.visibility = "hidden";
                                    document.querySelector("#Btn_iconBusqueda_Id_ue").removeAttribute("disabled");
                                    document.querySelector("#Btn_iconBusqueda_Id_ue").style.cursor = "pointer";
                                    document.querySelector("#Txt_Buscar_Id_ue").removeAttribute("disabled");
                                    document.querySelector("#Txt_Buscar_Id_ue").style.cursor = "auto";
                                    document.querySelector("#Boton_ver").removeAttribute("disabled");
                                    document.querySelector("#Boton_ver").style.cursor = "pointer";
                                    document.querySelector("#guardar").style.background = "#595959";
                                    document.querySelector("#guardar").style.cursor = "not-allowed";
                                    document.querySelector("#cancelar").style.background = "#595959";
                                    document.querySelector("#cancelar").style.cursor = "not-allowed";
                                }
                            });
                        }
                    });
        }

        function check(e) {
            tecla = (document.all) ? e.keyCode : e.which;

            //Tecla de retroceso para borrar, siempre la permite
            if (tecla === 8) {
                return true;
            }

            // Patrón de entrada, en este caso solo acepta numeros y letras
            patron = /[A-Za-z0-9 /ñ.ü\u00E0-\u00FC]/;
            tecla_final = String.fromCharCode(tecla);
            return patron.test(tecla_final);
        }

        function checkCodigoPostal(e) {
            tecla = (document.all) ? e.keyCode : e.which;

            //Tecla de retroceso para borrar, siempre la permite
            if (tecla === 8) {
                return true;
            }

            // Patrón de entrada, en este caso solo acepta numeros y letras
            patron = /[0-9 /]/;
            tecla_final = String.fromCharCode(tecla);
            return patron.test(tecla_final);
        }

        function checkTextArea(e) {
            tecla = (document.all) ? e.keyCode : e.which;

            //Tecla de retroceso para borrar, siempre la permite
            if (tecla === 8) {
                return true;
            }

            // Patrón de entrada, en este caso solo acepta numeros y letras
            patron = /[A-Za-z0-9 /ñ.ü\u00E0-\u00FC]/;
            tecla_final = String.fromCharCode(tecla);
            return patron.test(tecla_final);
        }

        //----Metodo Generación Formulario----
        function GeneraForm(tipoForm) {
            var urlValida = `confProyecto.do?id_proyecto=1`;
            const band = true;

            fetch(urlValida, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((res) => res.json())
                    .catch((error) => console.error("Error:", error))
                    .then((resp) => {
                        validacion = resp.list;
                        refer = validacion.filter((val) => val.tema_ide === "Referencia");
                        domici = validacion.filter((val) => val.tema_ide === "Domicilio");
                        asent = validacion.filter((val) => val.tema_ide === "Asentamiento");
                        ubiGeo = validacion.filter((val) => val.tema_ide === "Ubicación Geográfica");
                        enVial = validacion.filter((val) => val.tema_ide === "Entre vialidades");
                        callePost = validacion.filter((val) => val.tema_ide === "Calle posterior");
                        edCenCom = validacion.filter((val) => val.tema_ide === "Edificio, centro comercial");
                        observ = validacion.filter((val) => val.tema_ide === "Observación");

                        if (tipoForm === "Referencia") {
                            seleccionado = refer;
                            ////Crear el objeto formulario
                            let formulario = document.createElement("form");
                            ////Asignar atributos al objeto formulario
                            formulario.setAttribute('id', "formReferencia");//Asignar el atributo method
                            formulario.setAttribute('method', "GET");//Asignar el atributo method
                            refer.forEach((input) => {
                                if (input.tipo_control === "text") {
                                    let cajaText = document.createElement("input");
                                    cajaText.setAttribute('type', input.tipo_control);//Asignar el atributo type
                                    cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                    cajaText.setAttribute('class', "form-control");//Asignar el atributo class
                                    cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                    cajaText.setAttribute('id', input.campo);
                                    cajaText.setAttribute('readonly', true);//Asignar el atributo type  
                                    if (input.solo_lectura === "t") {
                                        cajaText.required = true;
                                    }
                                    cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                    cajaText.onkeypress = function (event) {
                                        return check(event);
                                    };

                                    ////Crear el objeto label
                                    let lbl = document.createElement("label");

                                    ////Crear el objeto div para el form group
                                    let formGroup = document.createElement("div");
                                    ////Asignar clase form-group a cada div
                                    formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                    ////Asignar atributos al objeto label
                                    lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                    lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                    lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                    lbl.innerHTML = input.etiqueta_ide;

                                    formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario

                                    formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario

                                    document.getElementById('containerRefer').appendChild(formulario);//Agregar el formulario a la etiquete con el ID	

                                } else if (input.tipo_control === "select") {
                                    ////Crear el objeto caja de texto 
                                    let cajaText = document.createElement("select");
                                    //console.log("selectrefer");
                                    cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                    cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                    cajaText.setAttribute('id', input.campo);
                                    //if (input.solo_lectura === "t") {
                                    cajaText.setAttribute('disabled', true);//Asignar el atributo type                    
                                    //}
                                    cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                    cajaText.setAttribute('style', "width:96%;padding: 12px 48px;margin: 8px 8px;display: inline-block;border-radius: 4px;box-sizing: border-box;height: 52px;");
                                    const url = "getE23a.do";

                                    fetch(url, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        }
                                    }).then((res) => res.json())
                                            .catch((error) => console.error("Error:", error))
                                            .then((resp) => {
                                                resp.list.forEach((option) => {
                                                    let opcion = document.createElement("option");
                                                    opcion.setAttribute("value", option.e23a);
                                                    opcion.innerHTML = option.descripcion;
                                                    cajaText.appendChild(opcion);//Agregar el objeto caja de texto Nombres al objeto formulario

                                                });

                                            });
                                    let lbl = document.createElement("label");

                                    ////Crear el objeto div para el form group
                                    let formGroup = document.createElement("div");


                                    ////Asignar clase form-group a cada div
                                    formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                    ////Asignar atributos al objeto label
                                    lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                    lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                    lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                    lbl.innerHTML = input.etiqueta_ide;

                                    formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario

                                    formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario

                                    document.getElementById('containerRefer').appendChild(formulario);//Agregar el formulario a la etiquete con el ID	
                                } else {
                                    ////Crear el objeto caja de texto 
                                    let cajaText = document.createElement(input.tipo_control);
                                    cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                    cajaText.setAttribute('class', "form-control");//Asignar el atributo class
                                    cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                    cajaText.setAttribute('id', input.campo);
                                    //if (input.solo_lectura === "t") {
                                    cajaText.setAttribute('readonly', "true");//Asignar el atributo type                    
                                    //}
                                    cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                    cajaText.setAttribute('style', "width: 96%;padding: 12px 48px;margin: 8px 8px;display: inline-block;border-radius: 4px;box-sizing: border-box;");
                                    cajaText.onkeypress = function (event) {
                                        return checkTextArea(event);
                                    };

                                    let lbl = document.createElement("label");

                                    ////Crear el objeto div para el form group
                                    let formGroup = document.createElement("div");
                                    ////Asignar clase form-group a cada div
                                    formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                    ////Asignar atributos al objeto label
                                    lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                    lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                    lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                    lbl.innerHTML = input.etiqueta_ide;

                                    formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario

                                    document.getElementById('containerRefer').appendChild(formulario);//Agregar el formulario a la etiquete con el ID
                                }
                            });
                        }


                        if (tipoForm === "Domicilio") {
                            ////Crear el objeto formulario
                            let formulario = document.createElement("form");
                            ////Asignar atributos al objeto formulario
                            formulario.setAttribute('id', "formDomicilio");//Asignar el atributo method
                            formulario.setAttribute('method', "GET");//Asignar el atributo method
                            domici.forEach((input) => {
                                if (input.tipo_control === "text") {
                                    ////Crear el objeto caja de texto 
                                    let cajaText = document.createElement("input");
                                    ////Asignar atributos al objeto caja de texto
                                    cajaText.setAttribute('type', input.tipo_control);//Asignar el atributo type
                                    cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                    cajaText.setAttribute('class', "form-control");//Asignar el atributo class
                                    cajaText.setAttribute('name', input.campo);//Asignar el atributo name  

                                    cajaText.setAttribute('id', input.campo);
                                    //if (input.solo_lectura === "t") {
                                    cajaText.setAttribute('readonly', "true");//Asignar el atributo type                    
                                    //}
                                    cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                    cajaText.onkeypress = function (event) {
                                        return check(event);
                                    };
                                    ////Crear el objeto label
                                    let lbl = document.createElement("label");

                                    ////Crear el objeto div para el form group
                                    let formGroup = document.createElement("div");
                                    ////Asignar clase form-group a cada div
                                    formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                    ////Asignar atributos al objeto label
                                    lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                    lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                    lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                    lbl.innerHTML = input.etiqueta_ide;

                                    formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario

                                    document.getElementById('containerDomic').appendChild(formulario);//Agregar el formulario a la etiquete con el ID	

                                } else if (input.tipo_control === "select") {
                                    ////Crear el objeto caja de texto 
                                    let cajaText = document.createElement("select");

                                    cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                    cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                    cajaText.setAttribute('id', input.campo);
                                    //if (input.solo_lectura === "t") {
                                    cajaText.setAttribute('disabled', true);//Asignar el atributo type                    
                                    //}
                                    cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                    cajaText.setAttribute('style', "width:96%;padding: 12px 48px;margin: 8px 8px;display: inline-block;border-radius: 4px;box-sizing: border-box;height: 52px;");
                                    const url = "getCatVialidad.do";

                                    fetch(url, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        }
                                    }).then((res) => res.json())
                                            .catch((error) => console.error("Error:", error))
                                            .then((resp) => {
                                                resp.list.forEach((option) => {
                                                    //console.log(option);
                                                    let opcion = document.createElement("option");
                                                    opcion.setAttribute("value", option.cve_vialidad);
                                                    opcion.innerHTML = option.descripcion;
                                                    cajaText.appendChild(opcion);//Agregar el objeto caja de texto Nombres al objeto formulario

                                                });

                                            });
                                    let lbl = document.createElement("label");

                                    ////Crear el objeto div para el form group
                                    let formGroup = document.createElement("div");


                                    ////Asignar clase form-group a cada div
                                    formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                    ////Asignar atributos al objeto label
                                    lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                    lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                    lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                    lbl.innerHTML = input.etiqueta_ide;

                                    formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario


                                    formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario

                                    document.getElementById('containerDomic').appendChild(formulario);//Agregar el formulario a la etiquete con el ID		 
                                } else {
                                    ////Crear el objeto caja de texto 
                                    let cajaText = document.createElement(input.tipo_control);
                                    cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                    cajaText.setAttribute('class', "form-control");//Asignar el atributo class
                                    cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                    cajaText.setAttribute('id', input.campo);
                                    //if (input.solo_lectura === "t") {
                                    cajaText.setAttribute('readonly', "true");//Asignar el atributo type                    
                                    //}
                                    cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                    cajaText.setAttribute('style', "width: 96%;padding: 12px 48px;margin: 8px 8px;display: inline-block;border-radius: 4px;box-sizing: border-box;");
                                    cajaText.onkeypress = function (event) {
                                        return checkTextArea(event);
                                    };
                                    let lbl = document.createElement("label");

                                    ////Crear el objeto div para el form group
                                    let formGroup = document.createElement("div");
                                    ////Asignar clase form-group a cada div
                                    formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                    ////Asignar atributos al objeto label
                                    lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                    lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                    lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                    lbl.innerHTML = input.etiqueta_ide;

                                    formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario

                                    formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario

                                    document.getElementById('containerDomic').appendChild(formulario);//Agregar el formulario a la etiquete con el ID	                                 
                                }
                            });
                        }

                        if (tipoForm === "Asentamiento") {
                            seleccionado = asent;
                            ////Crear el objeto formulario
                            let formulario = document.createElement("form");
                            ////Asignar atributos al objeto formulario
                            formulario.setAttribute('id', "formAsentamiento");//Asignar el atributo method
                            formulario.setAttribute('method', "GET");//Asignar el atributo method
                            asent.forEach((input) => {
                                if (input.tipo_control === "text") {
                                    ////Crear el objeto caja de texto 
                                    let cajaText = document.createElement("input");
                                    ////Asignar atributos al objeto caja de texto
                                    cajaText.setAttribute('type', input.tipo_control);//Asignar el atributo type
                                    cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                    cajaText.setAttribute('class', "form-control");//Asignar el atributo class
                                    cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                    cajaText.setAttribute('id', input.campo);
                                    //if (input.solo_lectura === "t") {
                                    cajaText.setAttribute('readonly', "true");//Asignar el atributo type                    
                                    //}
                                    cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                    if (input.campo === "e14_a") {
                                        cajaText.onkeypress = function (event) {
                                            return checkCodigoPostal(event);
                                        };
                                    } else {
                                        cajaText.onkeypress = function (event) {
                                            return check(event);
                                        };
                                    }

                                    ////Crear el objeto label
                                    let lbl = document.createElement("label");

                                    ////Crear el objeto div para el form group
                                    let formGroup = document.createElement("div");
                                    ////Asignar clase form-group a cada div
                                    formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                    ////Asignar atributos al objeto label
                                    lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                    lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                    lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                    lbl.innerHTML = input.etiqueta_ide;

                                    formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario

                                    document.getElementById('containerAsent').appendChild(formulario);//Agregar el formulario a la etiquete con el ID	

                                } else if (input.tipo_control === "select") {
                                    if (input.campo === "tipo_e14") {
                                        ////Crear el objeto caja de texto 
                                        let cajaText = document.createElement("select");

                                        cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                        cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                        cajaText.setAttribute('id', input.campo);
                                        //if (input.solo_lectura === "t") {
                                        cajaText.setAttribute('disabled', true);//Asignar el atributo type                    
                                        //}
                                        cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                        cajaText.setAttribute('style', "width:96%;padding: 12px 48px;margin: 8px 8px;display: inline-block;border-radius: 4px;box-sizing: border-box;height: 52px;");
                                        const urlTipo_el14 = "getCatAsentamiento.do";

                                        fetch(urlTipo_el14, {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            }
                                        }).then((res) => res.json())
                                                .catch((error) => console.error("Error:", error))
                                                .then((resp) => {
                                                    resp.list.forEach((option) => {
                                                        let opcion = document.createElement("option");
                                                        opcion.setAttribute("value", option.cve_tipo_asen);
                                                        opcion.innerHTML = option.descripcion;
                                                        cajaText.appendChild(opcion);//Agregar el objeto caja de texto Nombres al objeto formulario

                                                    });

                                                });
                                        let lbl = document.createElement("label");

                                        ////Crear el objeto div para el form group
                                        let formGroup = document.createElement("div");


                                        ////Asignar clase form-group a cada div
                                        formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                        ////Asignar atributos al objeto label
                                        lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                        lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                        lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                        lbl.innerHTML = input.etiqueta_ide;

                                        formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                        formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario
                                        formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario

                                        document.getElementById('containerAsent').appendChild(formulario);//Agregar el formulario a la etiquete con el ID	
                                    }
                                } else {
                                    ////Crear el objeto caja de texto 
                                    let cajaText = document.createElement(input.tipo_control);
                                    cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                    cajaText.setAttribute('class', "form-control");//Asignar el atributo class
                                    cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                    cajaText.setAttribute('id', input.campo);
                                    //if (input.solo_lectura === "t") {
                                    cajaText.setAttribute('readonly', "true");//Asignar el atributo type                    
                                    //}
                                    cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                    cajaText.setAttribute('style', "width: 96%;padding: 12px 48px;margin: 8px 8px;display: inline-block;border-radius: 4px;box-sizing: border-box;");
                                    cajaText.onkeypress = function (event) {
                                        return checkTextArea(event);
                                    };
                                    let lbl = document.createElement("label");

                                    ////Crear el objeto div para el form group
                                    let formGroup = document.createElement("div");
                                    ////Asignar clase form-group a cada div
                                    formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                    ////Asignar atributos al objeto label
                                    lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                    lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                    lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                    lbl.innerHTML = input.etiqueta_ide;

                                    formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario

                                    document.getElementById('containerAsent').appendChild(formulario);//Agregar el formulario a la etiquete con el ID	                                     
                                }
                            });
                        }

                        if (tipoForm === "Ubicación Geográfica") {
                            seleccionado = ubiGeo;
                            ////Crear el objeto formulario
                            let formulario = document.createElement("form");
                            ////Asignar atributos al objeto formulario
                            formulario.setAttribute('id', "formUbGeo");//Asignar el atributo method
                            formulario.setAttribute('method', "GET");//Asignar el atributo method
                            ubiGeo.forEach((input) => {
                                if (input.tipo_control === "text") {
                                    ////Crear el objeto caja de texto 
                                    let cajaText = document.createElement("input");
                                    ////Asignar atributos al objeto caja de texto
                                    cajaText.setAttribute('type', input.tipo_control);//Asignar el atributo type
                                    cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                    cajaText.setAttribute('class', "form-control");//Asignar el atributo class
                                    cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                    cajaText.setAttribute('id', input.campo);
                                    cajaText.setAttribute('readonly', "true");//Asignar el atributo type    
                                    if (input.solo_lectura === "t") {
                                        cajaText.required = true;
                                    }
                                    cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                    cajaText.onkeypress = function (event) {
                                        return check(event);
                                    };
                                    ////Crear el objeto label
                                    let lbl = document.createElement("label");

                                    ////Crear el objeto div para el form group
                                    let formGroup = document.createElement("div");
                                    ////Asignar clase form-group a cada div
                                    formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                    ////Asignar atributos al objeto label
                                    lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                    lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                    lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                    lbl.innerHTML = input.etiqueta_ide;

                                    formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario

                                    formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario

                                    document.getElementById('containerUbiGeo').appendChild(formulario);//Agregar el formulario a la etiquete con el ID	

                                } else if (input.tipo_control === "select") {
                                    ////Crear el objeto caja de texto 
                                    let cajaText = document.createElement("select");
                                    cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                    cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                    cajaText.setAttribute('id', input.campo);
                                    //if (input.solo_lectura === "t") {
                                    cajaText.setAttribute('disabled', true);//Asignar el atributo type                    
                                    //}
                                    cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                    cajaText.setAttribute('style', "width:96%;padding: 12px 48px;margin: 8px 8px;display: inline-block;border-radius: 4px;box-sizing: border-box;height: 52px;");
                                    let lbl = document.createElement("label");

                                    ////Crear el objeto div para el form group
                                    let formGroup = document.createElement("div");
                                    ////Asignar clase form-group a cada div
                                    formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                    ////Asignar atributos al objeto label
                                    lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                    lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                    lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                    lbl.innerHTML = input.etiqueta_ide;

                                    formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario

                                    document.getElementById('containerUbiGeo').appendChild(formulario);//Agregar el formulario a la etiquete con el ID	 
                                } else {
                                    ////Crear el objeto caja de texto 
                                    let cajaText = document.createElement(input.tipo_control);
                                    cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                    cajaText.setAttribute('class', "form-control");//Asignar el atributo class
                                    cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                    cajaText.setAttribute('id', input.campo);
                                    //if (input.solo_lectura === "t") {
                                    cajaText.setAttribute('readonly', "true");//Asignar el atributo type                    
                                    //}
                                    cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                    cajaText.setAttribute('style', "width: 96%;padding: 12px 48px;margin: 8px 8px;display: inline-block;border-radius: 4px;box-sizing: border-box;");
                                    cajaText.onkeypress = function (event) {
                                        return checkTextArea(event);
                                    };

                                    let lbl = document.createElement("label");

                                    ////Crear el objeto div para el form group
                                    let formGroup = document.createElement("div");
                                    ////Asignar clase form-group a cada div
                                    formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                    ////Asignar atributos al objeto label
                                    lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                    lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                    lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                    lbl.innerHTML = input.etiqueta_ide;

                                    formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario

                                    document.getElementById('containerUbiGeo').appendChild(formulario);//Agregar el formulario a la etiquete con el ID
                                }
                            });
                        }

                        if (tipoForm === "Entre vialidades") {
                            seleccionado = enVial;
                            ////Crear el objeto formulario
                            let formulario = document.createElement("form");
                            ////Asignar atributos al objeto formulario
                            formulario.setAttribute('id', "formVialidades");//Asignar el atributo method
                            formulario.setAttribute('method', "GET");//Asignar el atributo method
                            enVial.forEach((input) => {
                                if (input.tipo_control === "text") {
                                    ////Crear el objeto caja de texto 
                                    let cajaText = document.createElement("input");
                                    ////Asignar atributos al objeto caja de texto
                                    cajaText.setAttribute('type', input.tipo_control);//Asignar el atributo type
                                    cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                    cajaText.setAttribute('class', "form-control");//Asignar el atributo class
                                    cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                    cajaText.setAttribute('id', input.campo);
                                    //if (input.solo_lectura === "t") {
                                    cajaText.setAttribute('readonly', "true");//Asignar el atributo type                    
                                    //}
                                    cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                    cajaText.onkeypress = function (event) {
                                        return check(event);
                                    };

                                    ////Crear el objeto label
                                    let lbl = document.createElement("label");

                                    ////Crear el objeto div para el form group
                                    let formGroup = document.createElement("div");
                                    ////Asignar clase form-group a cada div
                                    formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                    ////Asignar atributos al objeto label
                                    lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                    lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                    lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                    lbl.innerHTML = input.etiqueta_ide;

                                    formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    document.getElementById('containerVial').appendChild(formulario);//Agregar el formulario a la etiquete con el ID	

                                } else if (input.tipo_control === "select") {
                                    if (input.campo === "tipo_e10a" || input.campo === "tipo_e10b") {
                                        ////Crear el objeto caja de texto 
                                        let cajaText = document.createElement("select");

                                        cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                        cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                        cajaText.setAttribute('id', input.campo);
                                        cajaText.required = true;
                                        //if (input.solo_lectura === "t") {
                                        cajaText.setAttribute('disabled', true);//Asignar el atributo type                    
                                        //}
                                        cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                        cajaText.setAttribute('style', "width:96%;padding: 12px 48px;margin: 8px 8px;display: inline-block;border-radius: 4px;box-sizing: border-box;height: 52px;");
                                        const url = "getCatVialidad.do";

                                        fetch(url, {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            }
                                        }).then((res) => res.json())
                                                .catch((error) => console.error("Error:", error))
                                                .then((resp) => {
                                                    resp.list.forEach((option) => {
                                                        let opcion = document.createElement("option");
                                                        opcion.setAttribute("value", option.cve_vialidad);
                                                        opcion.innerHTML = option.descripcion;
                                                        cajaText.appendChild(opcion);//Agregar el objeto caja de texto Nombres al objeto formulario

                                                    });

                                                });
                                        let lbl = document.createElement("label");

                                        ////Crear el objeto div para el form group
                                        let formGroup = document.createElement("div");


                                        ////Asignar clase form-group a cada div
                                        formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                        ////Asignar atributos al objeto label
                                        lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                        lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                        lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                        lbl.innerHTML = input.etiqueta_ide;

                                        formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                        formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario
                                        formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario
                                        document.getElementById('containerVial').appendChild(formulario);//Agregar el formulario a la etiquete con el ID	
                                    } else {
                                        ////Crear el objeto caja de texto 
                                        let cajaText = document.createElement("select");

                                        cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                        cajaText.setAttribute('class', "selectCalle");//Asignar el atributo class
                                        cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                        cajaText.setAttribute('id', input.campo);
                                        cajaText.required = true;

                                        //if (input.solo_lectura === "t") {
                                        cajaText.setAttribute('disabled', true);//Asignar el atributo type                    
                                        //}
                                        cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                        cajaText.setAttribute('style', "width:96%;padding: 12px 48px;margin: 8px 8px;display: inline-block;border-radius: 4px;box-sizing: border-box;height: 52px;");
//                                        let opcion = document.createElement("option");
//                                        opcion.setAttribute("value", "null");
//                                        opcion.innerHTML = "Seleccione";
//                                        cajaText.appendChild(opcion);
                                        let lbl = document.createElement("label");

                                        ////Crear el objeto div para el form group
                                        let formGroup = document.createElement("div");


                                        ////Asignar clase form-group a cada div
                                        formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                        ////Asignar atributos al objeto label
                                        lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                        lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                        lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                        lbl.innerHTML = input.etiqueta_ide;

                                        formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                        formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario
                                        formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario
                                        document.getElementById('containerVial').appendChild(formulario);//Agregar el formulario a la etiquete con el ID
                                    }
                                } else {
                                    ////Crear el objeto caja de texto 
                                    let cajaText = document.createElement(input.tipo_control);
                                    cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                    cajaText.setAttribute('class', "form-control");//Asignar el atributo class
                                    cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                    cajaText.setAttribute('id', input.campo);
                                    //if (input.solo_lectura === "t") {
                                    cajaText.setAttribute('readonly', "true");//Asignar el atributo type                    
                                    //}
                                    cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                    cajaText.setAttribute('style', "width: 96%;padding: 12px 48px;margin: 8px 8px;display: inline-block;border-radius: 4px;box-sizing: border-box;");
                                    cajaText.onkeypress = function (event) {
                                        return checkTextArea(event);
                                    };
                                    let lbl = document.createElement("label");

                                    ////Crear el objeto div para el form group
                                    let formGroup = document.createElement("div");
                                    ////Asignar clase form-group a cada div
                                    formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                    ////Asignar atributos al objeto label
                                    lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                    lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                    lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                    lbl.innerHTML = input.etiqueta_ide;

                                    formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    document.getElementById('containerVial').appendChild(formulario);//Agregar el formulario a la etiquete con el ID	 
                                }
                            });
                        }


                        if (tipoForm === "Calle posterior") {
                            ////Crear el objeto formulario
                            let formulario = document.createElement("form");
                            ////Asignar atributos al objeto formulario
                            formulario.setAttribute('id', "formCallePost");//Asignar el atributo method
                            formulario.setAttribute('method', "GET");//Asignar el atributo method
                            callePost.forEach((input) => {
                                if (input.tipo_control === "text") {
                                    ////Crear el objeto caja de texto 
                                    let cajaText = document.createElement("input");
                                    ////Asignar atributos al objeto caja de texto
                                    cajaText.setAttribute('type', input.tipo_control);//Asignar el atributo type
                                    cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                    cajaText.setAttribute('class', "form-control");//Asignar el atributo class
                                    cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                    cajaText.setAttribute('id', input.campo);
                                    //if (input.solo_lectura === "t") {
                                    cajaText.setAttribute('readonly', "true");//Asignar el atributo type                    
                                    //}
                                    cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                    cajaText.onkeypress = function (event) {
                                        return check(event);
                                    };
                                    ////Crear el objeto label
                                    let lbl = document.createElement("label");

                                    ////Crear el objeto div para el form group
                                    let formGroup = document.createElement("div");
                                    ////Asignar clase form-group a cada div
                                    formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                    ////Asignar atributos al objeto label
                                    lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                    lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                    lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                    lbl.innerHTML = input.etiqueta_ide;

                                    formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    document.getElementById('containerCaPost').appendChild(formulario);//Agregar el formulario a la etiquete con el ID	

                                } else if (input.tipo_control === "select") {
                                    if (input.campo === "tipo_e10c") {
                                        ////Crear el objeto caja de texto 
                                        let cajaText = document.createElement("select");

                                        cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                        cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                        cajaText.setAttribute('id', input.campo);
                                        cajaText.required = true;
                                        //if (input.solo_lectura === "t") {
                                        cajaText.setAttribute('disabled', true);//Asignar el atributo type                    
                                        //}
                                        cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                        cajaText.setAttribute('style', "width:96%;padding: 12px 48px;margin: 8px 8px;display: inline-block;border-radius: 4px;box-sizing: border-box;height: 52px;");
                                        const url = "getCatVialidad.do";

                                        fetch(url, {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            }
                                        }).then((res) => res.json())
                                                .catch((error) => console.error("Error:", error))
                                                .then((resp) => {
                                                    resp.list.forEach((option) => {
                                                        let opcion = document.createElement("option");
                                                        opcion.setAttribute("value", option.cve_vialidad);
                                                        opcion.innerHTML = option.descripcion;
                                                        cajaText.appendChild(opcion);//Agregar el objeto caja de texto Nombres al objeto formulario

                                                    });

                                                });
                                        let lbl = document.createElement("label");

                                        ////Crear el objeto div para el form group
                                        let formGroup = document.createElement("div");


                                        ////Asignar clase form-group a cada div
                                        formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                        ////Asignar atributos al objeto label
                                        lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                        lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                        lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                        lbl.innerHTML = input.etiqueta_ide;

                                        formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                        formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario
                                        formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario
                                        document.getElementById('containerCaPost').appendChild(formulario);//Agregar el formulario a la etiquete con el ID	
                                    } else {
                                        ////Crear el objeto caja de texto 
                                        let cajaText = document.createElement("select");


                                        cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                        cajaText.setAttribute('class', "selectCalle");//Asignar el atributo class
                                        cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                        cajaText.setAttribute('id', input.campo);
                                        //if (input.solo_lectura === "t") {
                                        cajaText.setAttribute('disabled', true);//Asignar el atributo type                    
                                        //}
                                        cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                        cajaText.setAttribute('style', "width:96%;padding: 12px 48px;margin: 8px 8px;display: inline-block;border-radius: 4px;box-sizing: border-box;height: 52px;");
//                                        let opcion = document.createElement("option");
//                                        opcion.setAttribute("value", "null");
//                                        opcion.innerHTML = "Seleccione";
//                                        cajaText.appendChild(opcion);
                                        let lbl = document.createElement("label");

                                        ////Crear el objeto div para el form group
                                        let formGroup = document.createElement("div");

                                        ////Asignar clase form-group a cada div
                                        formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                        ////Asignar atributos al objeto label
                                        lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                        lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                        lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                        lbl.innerHTML = input.etiqueta_ide;

                                        formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                        formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario
                                        formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario
                                        document.getElementById('containerCaPost').appendChild(formulario);//Agregar el formulario a la etiquete con el ID
                                    }
                                } else {
                                    ////Crear el objeto caja de texto 
                                    let cajaText = document.createElement(input.tipo_control);
                                    cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                    cajaText.setAttribute('class', "form-control");//Asignar el atributo class
                                    cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                    cajaText.setAttribute('id', input.campo);
                                    //if (input.solo_lectura === "t") {
                                    cajaText.setAttribute('readonly', "true");//Asignar el atributo type                    
                                    //}
                                    cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                    cajaText.setAttribute('style', "width: 96%;padding: 12px 48px;margin: 8px 8px;display: inline-block;border-radius: 4px;box-sizing: border-box;");
                                    cajaText.onkeypress = function (event) {
                                        return checkTextArea(event);
                                    };
                                    let lbl = document.createElement("label");

                                    ////Crear el objeto div para el form group
                                    let formGroup = document.createElement("div");
                                    ////Asignar clase form-group a cada div
                                    formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                    ////Asignar atributos al objeto label
                                    lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                    lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                    lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                    lbl.innerHTML = input.etiqueta_ide;

                                    formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    document.getElementById('containerCaPost').appendChild(formulario);//Agregar el formulario a la etiquete con el ID	 
                                }
                            });
                        }

                        if (tipoForm === "Edificio, centro comercial") {
                            ////Crear el objeto formulario
                            let formulario = document.createElement("form");
                            ////Asignar atributos al objeto formulario
                            formulario.setAttribute('id', "formEdifCent");//Asignar el atributo method
                            formulario.setAttribute('method', "GET");//Asignar el atributo method
                            edCenCom.forEach((input) => {
                                if (input.tipo_control === "text") {
                                    ////Crear el objeto caja de texto 
                                    let cajaText = document.createElement("input");
                                    ////Asignar atributos al objeto caja de texto
                                    cajaText.setAttribute('type', input.tipo_control);//Asignar el atributo type
                                    cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                    cajaText.setAttribute('class', "form-control");//Asignar el atributo class
                                    cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                    cajaText.setAttribute('id', input.campo);
                                    //if (input.solo_lectura === "t") {
                                    cajaText.setAttribute('readonly', "true");//Asignar el atributo type                    
                                    //}
                                    cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                    cajaText.onkeypress = function (event) {
                                        return check(event);
                                    };
                                    ////Crear el objeto label
                                    let lbl = document.createElement("label");

                                    ////Crear el objeto div para el form group
                                    let formGroup = document.createElement("div");
                                    ////Asignar clase form-group a cada div
                                    formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                    ////Asignar atributos al objeto label
                                    lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                    lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                    lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                    lbl.innerHTML = input.etiqueta_ide;

                                    formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    document.getElementById('containerEdif').appendChild(formulario);//Agregar el formulario a la etiquete con el ID	

                                } else if (input.tipo_control === "select") {
                                    if (input.campo === "tipo_e19") {
                                        ////Crear el objeto caja de texto 
                                        let cajaText = document.createElement("select");

                                        cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                        cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                        cajaText.setAttribute('id', input.campo);
                                        //if (input.solo_lectura === "t") {
                                        cajaText.setAttribute('disabled', true);//Asignar el atributo type                    
                                        //}
                                        cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                        cajaText.setAttribute('style', "width:96%;padding: 12px 48px;margin: 8px 8px;display: inline-block;border-radius: 4px;box-sizing: border-box;height: 52px;");
                                        const urlTipo_el9 = "getCatTipComercio.do";

                                        fetch(urlTipo_el9, {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            }
                                        }).then((res) => res.json())
                                                .catch((error) => console.error("Error:", error))
                                                .then((resp) => {
                                                    resp.list.forEach((option) => {
                                                        let opcion = document.createElement("option");
                                                        opcion.setAttribute("value", option.tipo_e19);
                                                        opcion.innerHTML = option.descripcion;
                                                        cajaText.appendChild(opcion);//Agregar el objeto caja de texto Nombres al objeto formulario

                                                    });

                                                });
                                        let lbl = document.createElement("label");

                                        ////Crear el objeto div para el form group
                                        let formGroup = document.createElement("div");


                                        ////Asignar clase form-group a cada div
                                        formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                        ////Asignar atributos al objeto label
                                        lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                        lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                        lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                        lbl.innerHTML = input.etiqueta_ide;

                                        formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                        formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario
                                        formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario
                                        document.getElementById('containerEdif').appendChild(formulario);//Agregar el formulario a la etiquete con el ID	
                                    }


                                    if (input.campo === "tipo_e12p") {
                                        ////Crear el objeto caja de texto 
                                        let cajaText = document.createElement("select");

                                        cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                        cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                        cajaText.setAttribute('id', input.campo);
                                        //if (input.solo_lectura === "t") {
                                        cajaText.setAttribute('disabled', true);//Asignar el atributo type                    
                                        //}
                                        cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                        cajaText.setAttribute('style', "width:96%;padding: 12px 48px;margin: 8px 8px;display: inline-block;border-radius: 4px;box-sizing: border-box;height: 52px;");
                                        const urlTipo_e12p = "getCatPiso.do";

                                        fetch(urlTipo_e12p, {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            }
                                        }).then((res) => res.json())
                                                .catch((error) => console.error("Error:", error))
                                                .then((resp) => {
                                                    resp.list.forEach((option) => {
                                                        let opcion = document.createElement("option");
                                                        opcion.setAttribute("value", option.tipo_e12p);
                                                        opcion.innerHTML = option.descripcion;
                                                        cajaText.appendChild(opcion);//Agregar el objeto caja de texto Nombres al objeto formulario

                                                    });

                                                });
                                        let lbl = document.createElement("label");

                                        ////Crear el objeto div para el form group
                                        let formGroup = document.createElement("div");


                                        ////Asignar clase form-group a cada div
                                        formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                        ////Asignar atributos al objeto label
                                        lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                        lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                        lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                        lbl.innerHTML = input.etiqueta_ide;

                                        formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                        formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario
                                        formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario
                                        document.getElementById('containerEdif').appendChild(formulario);//Agregar el formulario a la etiquete con el ID	
                                    }
                                } else {
                                    ////Crear el objeto caja de texto 
                                    let cajaText = document.createElement(input.tipo_control);
                                    cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                    cajaText.setAttribute('class', "form-control");//Asignar el atributo class
                                    cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                    cajaText.setAttribute('id', input.campo);
                                    //if (input.solo_lectura === "t") {
                                    cajaText.setAttribute('readonly', "true");//Asignar el atributo type                    
                                    //}
                                    cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                    cajaText.setAttribute('style', "width: 96%;padding: 12px 48px;margin: 8px 8px;display: inline-block;border-radius: 4px;box-sizing: border-box;");
                                    cajaText.onkeypress = function (event) {
                                        return checkTextArea(event);
                                    };
                                    let lbl = document.createElement("label");

                                    ////Crear el objeto div para el form group
                                    let formGroup = document.createElement("div");
                                    ////Asignar clase form-group a cada div
                                    formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                    ////Asignar atributos al objeto label
                                    lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                    lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                    lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                    lbl.innerHTML = input.etiqueta_ide;

                                    formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario
                                    document.getElementById('containerEdif').appendChild(formulario);//Agregar el formulario a la etiquete con el ID	 
                                }
                            });
                        }

                        if (tipoForm === "Observación") {
                            ////Crear el objeto formulario
                            let formulario = document.createElement("form");
                            ////Asignar atributos al objeto formulario
                            formulario.setAttribute('id', "formObservacion");//Asignar el atributo method
                            formulario.setAttribute('method', "GET");//Asignar el atributo method
                            observ.forEach((input) => {
                                ////Crear el objeto caja de texto 
                                let cajaText = document.createElement(input.tipo_control);
                                cajaText.setAttribute('placeholder', input.etiqueta_ide);//Asignar el atributo placeholder
                                cajaText.setAttribute('class', "form-control");//Asignar el atributo class
                                cajaText.setAttribute('name', input.campo);//Asignar el atributo name  
                                cajaText.setAttribute('id', input.campo);
                                //if (input.solo_lectura === "t") {
                                cajaText.setAttribute('readonly', "true");//Asignar el atributo type                    
                                //}
                                cajaText.setAttribute('maxlength', input.max_longitud_campo);
                                cajaText.setAttribute('style', "width: 96%;padding: 12px 48px;margin: 8px 8px;display: inline-block;border-radius: 4px;box-sizing: border-box;");
                                cajaText.onkeypress = function (event) {
                                    return checkTextArea(event);
                                };
                                let lbl = document.createElement("label");

                                ////Crear el objeto div para el form group
                                let formGroup = document.createElement("div");
                                ////Asignar clase form-group a cada div
                                formGroup.setAttribute('class', "form-group");//Asignar el atributo type
                                ////Asignar atributos al objeto label
                                lbl.setAttribute('class', "CampoLabel");//Asignar el atributo type
                                lbl.setAttribute('for', input.campo);//Asignar el atributo type
                                lbl.setAttribute('id', "lbl" + input.campo);//Asignar el atributo type
                                lbl.innerHTML = input.etiqueta_ide;

                                formGroup.appendChild(lbl);//Agregar el objeto caja de texto Nombres al objeto formulario
                                formGroup.appendChild(cajaText);//Agregar el objeto caja de texto Nombres al objeto formulario
                                formulario.appendChild(formGroup);//Agregar el objeto caja de texto Nombres al objeto formulario
                                document.getElementById('containerObse').appendChild(formulario);//Agregar el formulario a la etiquete con el ID	 
                            });
                        }
                    });
        }

        function addSingleWms(mapalibre, baseUrl) {
            return function () {
                var myCanvas = mapalibre.getCanvas();
                var myBounds = mapalibre.getBounds();
                var imageCoordinates = getExtentCoordinatesFromBounds(myBounds);
                var imageExtent3857 = wmsExtent130FromBounds(myBounds);
                var centroide = myBounds.getCenter();
                var extent = getExtent(myBounds);
                if (mapalibre.getSource(sourceName) && mapalibre.getLayer(wmsLayerName)) {
                    mapalibre.removeLayer(wmsLayerName);
                    mapalibre.removeSource(sourceName);
                }
                var urlWms = `${baseUrl}&LAYERS=${capas}&FORMAT=image%2Fpng&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&EDO=00&FIRM=368&SRS=EPSG%3A900913&WIDTH=${myCanvas.width / window.devicePixelRatio}&HEIGHT=${myCanvas.height / window.devicePixelRatio}&BBOX=${imageExtent3857.join(',')}&time=${new Date().getTime()}`;
                //console.log(urlWms);
                mapalibre.addSource(sourceName, {
                    'type': 'image',
                    'url': urlWms,
                    'coordinates': imageCoordinates
                });

                mapalibre.addLayer({
                    'id': wmsLayerName,
                    'type': 'raster',
                    'source': sourceName,
                    'paint': {}
                });

                if (mapalibre.getSource('denue') && mapalibre.getLayer('id_denue')) {
                    mapalibre.removeLayer('id_denue');
                    mapalibre.removeSource('denue');
                }

                var urlWmsDenue = `omnivore.do?https://gaia.inegi.org.mx/cgi-bin/ms74/mapserv?map=/opt/map/mdm60/mdm61vector-produccion.map&LAYERS=cdenue&FORMAT=image%2Fpng&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&EDO=00&FIRM=368&SRS=EPSG%3A900913&WIDTH=${myCanvas.width / window.devicePixelRatio}&HEIGHT=${myCanvas.height / window.devicePixelRatio}&BBOX=${imageExtent3857.join(',')}`;

                mapalibre.addSource('denue', {
                    'type': 'image',
                    'url': urlWmsDenue,
                    'coordinates': imageCoordinates
                });


                mapalibre.addLayer({
                    'id': 'id_denue',
                    'type': 'raster',
                    'source': 'denue',
                    'layout': {
                        // Make the layer visible by default.
                        'visibility': denueChecked ? 'visible' : 'none'
                    },
                    'paint': {}
                });


                /*if (mapalibre.getSource('street') && mapalibre.getLayer('id_street')) {
                 mapalibre.removeLayer('id_street');
                 mapalibre.removeSource('street');
                 }
                 var urlWms3 = "https://mt0.google.com/vt/lyrs=svv&w=256&h=256&hl=es&style=40,18&x={x}&y={y}&z={z}";
                 //console.log(urlWms);
                 mapalibre.addSource('street', {
                 'type': 'raster',
                 'tiles': [urlWms3]
                 });
                 
                 mapalibre.addLayer({
                 'id': 'id_street',
                 'type': 'raster',
                 'source': 'street',
                 'layout': {
                 // Make the layer visible by default.
                 'visibility': 'none'
                 }
                 });*/

            };
        }

        var toggle = document.querySelector(".form-check-input");

        toggle.addEventListener('change', function (e) {
            denueChecked = e.target.checked;
            mapalibre.setLayoutProperty(
                    "id_denue",
                    'visibility',
                    e.target.checked ? 'visible' : 'none'
                    );
            //body.style.background = this.checked ? "#2E2E2E" : "initial";
        });

        mapalibre.addControl(new maplibregl.FullscreenControl(), "top-right");
        const nav = new maptilersdk.MaptilerNavigationControl();
        mapalibre.addControl(nav, 'bottom-right');

        mapalibre.addControl(
                new MaplibreGLBasemapsControl({
                    basemaps: [
                        {
                            id: "map_Inegi",
                            "type": "raster",
                            tiles: [
                                glPrx + "https://gaiamapas1.inegi.org.mx/mdmCache/service/wmts?layer=MapaBaseTopograficov61_sinsombreado_gris&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix=EPSG%3A900913:{z}&TILEROW={y}&TILECOL={x}&FORMAT=image/jpeg",
                                glPrx + "https://gaiamapas2.inegi.org.mx/mdmCache/service/wmts?layer=MapaBaseTopograficov61_sinsombreado_gris&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix=EPSG%3A900913:{z}&TILEROW={y}&TILECOL={x}&FORMAT=image/jpeg",
                                glPrx + "https://gaiamapas3.inegi.org.mx/mdmCache/service/wmts?layer=MapaBaseTopograficov61_sinsombreado_gris&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix=EPSG%3A900913:{z}&TILEROW={y}&TILECOL={x}&FORMAT=image/jpeg"
                            ],
                            "minzoom": 0,
                            "maxzoom": 19,
                            tileSize: 256
                        },
                        {
                            id: "sateliteInegi",
                            "type": "raster",
                            tiles: [
                                glPrx + "https://gaiamapas1.inegi.org.mx/mdmCache/service/wmts?layer=MapaBaseOrtofoto&style=&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix=EPSG%3A900913:{z}&TILEROW={y}&TILECOL={x}&FORMAT=image/jpeg",
                                glPrx + "https://gaiamapas2.inegi.org.mx/mdmCache/service/wmts?layer=MapaBaseOrtofoto&style=&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix=EPSG%3A900913:{z}&TILEROW={y}&TILECOL={x}&FORMAT=image/jpeg",
                                glPrx + "https://gaiamapas3.inegi.org.mx/mdmCache/service/wmts?layer=MapaBaseOrtofoto&style=&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix=EPSG%3A900913:{z}&TILEROW={y}&TILECOL={x}&FORMAT=image/jpeg"
                            ],
                            tileSize: 256
                        },
                        {
                            id: "Google_Maps",
                            type: 'raster',
                            tiles: [
                                "https://mt0.google.com/vt/lyrs=s&w=256&h=256&hl=es&style=40,18&x={x}&y={y}&z={z}",
                                "https://mt1.google.com/vt/lyrs=s&w=256&h=256&hl=es&style=40,18&x={x}&y={y}&z={z}",
                                "https://mt2.google.com/vt/lyrs=s&w=256&h=256&hl=es&style=40,18&x={x}&y={y}&z={z}"
                            ],
                            tileSize: 256
                        }
                    ],
                    initialBasemap: "map_Inegi"
                }),
                "bottom-left"
                );

        mapalibre.on('click', async (e) => {
            const {lng, lat} = e.lngLat;
            latitud = e.lngLat.lat; ///Y
            longitud = e.lngLat.lng; ///X

            if (ratifico) {
                if (chinchetaStreet) {
                    reverseGeocoding(lng, lat);
                    street_view();
                } else {
                    /*if (markero) {
                     markero.removeClassName('markerStreetV');
                     }*/
                }
                document.getElementById('dropdown').style.display = 'none';
                if (markers) {
                    clearMarkers(markers);
                }
                if (marker) {
                    clearMarker(marker);
                }
            } else {
                if (idUe === "" || idUe === " " || idUe === null || idUe.length < 0 || idUe === undefined) {
                    //reverseGeocoding(lng, lat);
                    //street_view();
                    document.getElementById('dropdown').style.display = 'none';
                    if (markers) {
                        clearMarkers(markers);
                    }
                    if (marker) {
                        clearMarker(marker);
                    }
                } else {
                    punteaNR = true;
                    reverseGeocodingPunt(lng, lat);
                    document.getElementById('dropdown').style.display = 'none';
                    if (markers) {
                        clearMarkers(markers);
                    }
                    if (marker) {
                        clearMarker(marker);
                    }
                    $("#e10a").empty();
                    document.getElementById("lble10a").setAttribute("class", "estilo_normal");
                    document.getElementById("lble10b").setAttribute("class", "estilo_normal");
                    document.getElementById("lble10c").setAttribute("class", "estilo_normal");
                    $("#e10b").empty();
                    $("#e10c").empty();
                    var coord = geo2psMerc(e.lngLat.lat, e.lngLat.lng);
                    let ratificando = false;
                    let x = coord[0];
                    let y = coord[1];
                    var url = "punteo.do?id_ue=" + idUe + "&ratificado=" + ratificando + "&point=POINT(" + x + " " + y + ")";
                    fetchData(url);
                }
            }

            if (identificarChecked) {
                $('#TablaDetalle').empty();
                $('#idUe').empty();
                $('#nomEst').empty();
                $('#razonS').empty();
                reverseGeocodingIdentificar(lng, lat);
                street_viewcord(lat, lng);
                var coord = geo2psMerc(e.lngLat.lat, e.lngLat.lng);
                let x = coord[0];
                let y = coord[1];
                fetchIdentificar(x, y);
            }

            document.querySelector("#Chincheta_punteo").style.visibility = "hidden";
        });

        async function reverseGeocoding(lng, lat) {
            if (markero) {
                console.log("entro1");
                markero.setLngLat([lng, lat]);
                markero.addClassName('markerStreetV');
            } else {
                console.log("entro2");

                var el = document.createElement('div');
                el.className = 'markerStreetV';

                markero = new maplibregl.Marker(el)
                        .setLngLat([lng, lat])
                        .addTo(mapalibre);

                markero._element.innerHTML = "";
            }

        }

        async function reverseGeocodingIdentificar(lng, lat) {
            console.log("entroi");
            if (markerIdenti) {
                console.log("entro1i");
                markerIdenti.setLngLat([lng, lat]);
                markerIdenti.addClassName('marker2');
                /*if (markero) {
                 markero.removeClassName('markerStreetV');
                 }*/
            } else {
                console.log("entro2i");
                var el = document.createElement('div');
                el.className = 'marker2';

                markerIdenti = new maplibregl.Marker(el)
                        .setLngLat([lng, lat])
                        .addTo(mapalibre);

                markerIdenti._element.innerHTML = "";
            }
        }

        async function reverseGeocodingPunt(lng, lat) {
            /*if (markero) {
             markero.removeClassName('markerStreetV');
             }*/
            console.log("entro");
            if (markerPunt) {
                markerPunt.addClassName('markerPunteo');

                markerPunt.setLngLat([lng, lat]);
            } else {
                var el = document.createElement('div');
                el.className = 'markerPunteo';

                markerPunt = new maplibregl.Marker(el)
                        .setLngLat([lng, lat])
                        .addTo(mapalibre);

                markerPunt._element.innerHTML = "";
            }
        }


        mapalibre.on('load', function () {


            var myCanvas = mapalibre.getCanvas();
            var myBounds = mapalibre.getBounds();
            var imageCoordinates = getExtentCoordinatesFromBounds(myBounds);
            var imageExtent3857 = wmsExtent130FromBounds(myBounds);
            var centroide = myBounds.getCenter();
            var extent = getExtent(myBounds);
            if (mapalibre.getSource(sourceName) && mapalibre.getLayer(wmsLayerName)) {
                mapalibre.removeLayer(wmsLayerName);
                mapalibre.removeSource(sourceName);
            }
            var urlWms = `${baseUrl}&LAYERS=${capas}&FORMAT=image%2Fpng&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&EDO=00&FIRM=368&SRS=EPSG%3A900913&WIDTH=${myCanvas.width / window.devicePixelRatio}&HEIGHT=${myCanvas.height / window.devicePixelRatio}&BBOX=${imageExtent3857.join(',')}`;
            //console.log(urlWms);
            mapalibre.addSource(sourceName, {
                'type': 'image',
                'url': urlWms,
                'coordinates': imageCoordinates
            });

            mapalibre.addLayer({
                'id': wmsLayerName,
                'type': 'raster',
                'source': sourceName,
                'paint': {}
            });


            if (mapalibre.getSource('denue') && mapalibre.getLayer('id_denue')) {
                mapalibre.removeLayer('id_denue');
                mapalibre.removeSource('denue');
            }

            var urlWmsDenue = `omnivore.do?https://gaia.inegi.org.mx/cgi-bin/ms74/mapserv?map=/opt/map/mdm60/mdm61vector-produccion.map&LAYERS=cdenue&FORMAT=image%2Fpng&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&EDO=00&FIRM=368&SRS=EPSG%3A900913&WIDTH=${myCanvas.width / window.devicePixelRatio}&HEIGHT=${myCanvas.height / window.devicePixelRatio}&BBOX=${imageExtent3857.join(',')}`;
            console.log(urlWmsDenue);

            mapalibre.addSource('denue', {
                'type': 'image',
                'url': urlWmsDenue,
                'coordinates': imageCoordinates
            });


            mapalibre.addLayer({
                'id': 'id_denue',
                'type': 'raster',
                'source': 'denue',
                'layout': {
                    // Make the layer visible by default.
                    'visibility': denueChecked ? 'visible' : 'none'
                },
                'paint': {}
            });

            if (mapalibre.getSource('street') && mapalibre.getLayer('id_street')) {
                mapalibre.removeLayer('id_street');
                mapalibre.removeSource('street');
            }
            var urlWms3 = "https://mt0.google.com/vt/lyrs=svv&w=256&h=256&hl=es&style=40,18&x={x}&y={y}&z={z}";
            //console.log(urlWms);
            mapalibre.addSource('street', {
                'type': 'raster',
                'tiles': [urlWms3]
            });

            mapalibre.addLayer({
                'id': 'id_street',
                'type': 'raster',
                'source': 'street',
                'layout': {
                    // Make the layer visible by default.
                    'visibility': 'none'
                },
                maxzoom: 24,
                minzoom: 15
            });
            toggleSidebar('left');
            const {lng, lat} = mapalibre.getCenter();
        });

        mapalibre.on('moveend', addSingleWms(mapalibre, baseUrl));


        /**** xpain ***////
        var scale = new maplibregl.ScaleControl({
            maxWidth: 80,
            unit: "metric",
        });
        mapalibre.addControl(scale);

        scale.setUnit('metric');

        /**** xpain ***////

    } catch (err) {
        console.log("trae un error");
        console.log(err);
    }
}
;

function initMapGoogle() {
    console.log("street view 3");
    try {
        const fenway = {lng: -102.28388799818673, lat: 21.857106872530903};

        panorama = new google.maps.StreetViewPanorama(
                document.getElementById("Vista"),
                {
                    position: fenway,
                    pov: {
                        heading: 34,
                        pitch: 10
                    }
                },
                );


        mapalibre.setStreetView(panorama);

        const transitLayer = new google.maps.TransitLayer();

        transitLayer.setMap(mapalibre);

    } catch (err) {
        //alert("error "+err);
    }

}

function street_view() {
    console.log("street view 1");
    const astorPlace = {lat: latitud, lng: longitud};
    panorama.setPosition(astorPlace);
}

function street_viewcord(latit, longi) {
    console.log("entroooo dtrrreet");
    setTimeout(alertMsg, 3000);
    var url = "https://maps.googleapis.com/maps/api/streetview/metadata?location=(" + latit + "," + longi + ")";

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                console.log(response);
            });
    const astorPlace = {lat: latit, lng: longi};
    panorama.setPosition(astorPlace);
}

function alertMsg() {
    console.log("setTimeOut")
}

function boton_vista_calle() {
    $("#Vista").css("display", "grid");
    $(".conten_Acoordeon").css("display", "none");
}

function geo2psMerc(lat, lon) {
    var coord = proj4('EPSG:4326', 'EPSG:3857', [lon * 1, lat * 1]);
    return coord;
}

function Merc2psgeo(lat, lon) {
    var coord = proj4('EPSG:3857', 'EPSG:4326', [lon * 1, lat * 1]);
    return coord;
}

function bannerRatificar() {
    if ($('#panRatificar').length <= 0) {
        $('#map').append("<div id='panRatificar' style='position: relative;top: 0;left: 0;width: 100%;height: 15%;background-color: #2d2929;border: solid 1px #2b295b; border-radius: 5px;z-index: 100;display: inline-flex; justify-content: space-evenly;align-items: center;' ><button id='ratificar' style='width:25%;height:90%;background-color:green;border:1px #01d701 solid;border-radius:5px;color:white;font-size:large;'>Ratificar</button><button id='noratificar' style='width:25%;height:90%;background-color:#bf0505;border: 1px red solid;border-radius:5px;color:white;font-size:large;'>No Ratificar</button></div>");
        $('#panRatificar').hide();
        $('#ratificar').hide();
        $('#noratificar').hide();
        setRatificarEvents();
    }
    $('#panRatificar').show('blind');
    $('#ratificar').show('fade');
    $('#noratificar').show('fade');


}

function setRatificarEvents() {
    $('#ratificar').on('click', punteaRatificar);
    $('#noratificar').on('click', punteaNoRatificar);
}

function punteaNoRatificar() {
    ratifico = false;
    ratifique = true;
    chinchetaPunteo = true;
    datos["es_ratificable"] = "f";
    console.log(datos);
    $('#panRatificar').hide('blind');
    $('#ratificar').hide('fade');
    $('#noratificar').hide('fade');

    if (mark) {
        clearMarker(mark);
    }

    /*if (markero) {
     markero.removeClassName('markerStreetV');
     }*/

    document.querySelector("#Chincheta_punteo").style.visibility = "visible";
    document.getElementById("textAlert").innerHTML = "Selecciona la ubicación con el marcador";

}
var puntoPunteado;
function punteaRatificar() {
    punteaNR = true;
    ratifique = true;
    ratifico = true;
    datos["es_ratificable"] = "t";
    let ratificando = true;
    console.log(datos);
    let punto = geo2psMerc(y_val, x_val);
    $('#panRatificar').hide('blind');
    $('#ratificar').hide('fade');
    $('#noratificar').hide('fade');
    let x = punto[0];
    let y = punto[1];
    var url = "punteo.do?id_ue=" + idUe + "&ratificado=" + ratificando + "&point=POINT(" + x + " " + y + ")";
    fetchData(url);
}

function fetchData(url) {
    /* Mostrar contenedor de carga */
    Swal.fire({
        title: 'Buscando información de punteo!',
        html: 'Por favor espere un momento',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                punteoObj = response.datos;

                /* Ocultar contenedor de carga */
                Swal.close();
                if (response.mensaje.type === "false" || response.success === false) {
                    errorPunteo = false;
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                            confirmButton: "btn btn-success",
                            cancelButton: "btn btn-danger"
                        },
                        buttonsStyling: false
                    });

                    swalWithBootstrapButtons.fire({
                        title: "Error",
                        text: response.mensaje.messages,
                        icon: "warning",
                        confirmButtonText: "OK",
                        reverseButtons: true
                    });
                } else {
                    errorPunteo = true;
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                            confirmButton: "btn btn-success",
                            cancelButton: "btn btn-danger"
                        },
                        buttonsStyling: false
                    });

                    swalWithBootstrapButtons.fire({
                        title: "Correcto",
                        text: response.mensaje.messages,
                        icon: "success",
                        confirmButtonText: "OK",
                        reverseButtons: true
                    });
                    //console.log("datos del formulario regrasados por servicio")
                    //console.log(datos);
                    Object.getOwnPropertyNames(response.datos).forEach(function (val) {
                        //console.log(val + " -> " + response.datos[val]);
                        if (val === "e10a") {
                            //console.log("te10a");
                            let parsedBody = JSON.parse(response.datos[val]);
                            //console.log(parsedBody);
                            if (document.getElementById(val)) {
                                parsedBody.forEach((option) => {
                                    let opcion = document.createElement("option");
                                    opcion.setAttribute("value", option.tipo_e10n);
                                    opcion.setAttribute("id", option.tipo_e10);
                                    if (option.tipo_e10n === null || option.tipo_e10n === "null" || option.tipo_e10n === "Ninguno 0" || option.tipo_e10n === "Ninguno 1" || option.tipo_e10n === "Ninguno 2") {
                                        opcion.innerHTML = option.tipovial;
                                    } else {
                                        if (option.orden === undefined) {
                                            opcion.innerHTML = option.tipo_e10n;
                                        } else {
                                            opcion.innerHTML = option.orden + ". " + option.tipo_e10n;
                                        }
                                    }
                                    document.getElementById(val).appendChild(opcion);//Agregar el objeto caja de texto Nombres al objeto formulario
                                });
                            }
                        } else if (val === "e10b") {
                            let parsedBody = JSON.parse(response.datos[val]);
                            if (document.getElementById(val)) {
                                parsedBody.forEach((option) => {
                                    let opcion = document.createElement("option");
                                    opcion.setAttribute("value", option.tipo_e10n);
                                    opcion.setAttribute("id", option.tipo_e10);
                                    if (option.tipo_e10n === null || option.tipo_e10n === "null" || option.tipo_e10n === "Ninguno 0" || option.tipo_e10n === "Ninguno 1" || option.tipo_e10n === "Ninguno 2") {
                                        opcion.innerHTML = option.tipovial;
                                    } else {
                                        if (option.orden === undefined) {
                                            opcion.innerHTML = option.tipo_e10n;
                                        } else {
                                            opcion.innerHTML = option.orden + ". " + option.tipo_e10n;
                                        }
                                    }
                                    document.getElementById(val).appendChild(opcion);//Agregar el objeto caja de texto Nombres al objeto formulario
                                });
                            }
                        } else if (val === "e10c") {
                            //console.log("te10a");
                            let parsedBody = JSON.parse(response.datos[val]);
                            //console.log(parsedBody);
                            if (document.getElementById(val)) {
                                parsedBody.forEach((option) => {
                                    let opcion = document.createElement("option");
                                    opcion.setAttribute("value", option.tipo_e10n);
                                    opcion.setAttribute("id", option.tipo_e10);
                                    if (option.tipo_e10n === null || option.tipo_e10n === "null" || option.tipo_e10n === "Ninguno 0" || option.tipo_e10n === "Ninguno 1" || option.tipo_e10n === "Ninguno 2") {
                                        opcion.innerHTML = option.tipovial;
                                    } else {
                                        if (option.orden === undefined) {
                                            opcion.innerHTML = option.tipo_e10n;
                                        } else {
                                            opcion.innerHTML = option.orden + ". " + option.tipo_e10n;
                                        }
                                    }
                                    document.getElementById(val).appendChild(opcion);//Agregar el objeto caja de texto Nombres al objeto formulario
                                });
                            }
                        } else {
                            if (document.getElementById(val)) {
                                document.getElementById(val).value = response.datos[val];
                                datos[val] = response.datos[val];
                            }
                        }
                    });
                }

                let $selectte10a = $('#e10a');
                $selectte10a.on('change', () => {
                    // Buscamos los option seleccionados
                    $selectte10a.children(':selected').each((idx, el) => {
                        // Obtenemos los atributos que necesitamos
                        let id = parseInt(el.id);
                        document.getElementById("tipo_e10a").value = id;
                    });
                });

                let $selectte10b = $('#e10b');
                $selectte10b.on('change', () => {
                    // Buscamos los option seleccionados
                    $selectte10b.children(':selected').each((idx, el) => {
                        // Obtenemos los atributos que necesitamos
                        let id = parseInt(el.id);
                        document.getElementById("tipo_e10b").value = id;
                    });
                });

                let $selectte10c = $('#e10c');
                $selectte10c.on('change', () => {
                    // Buscamos los option seleccionados
                    $selectte10c.children(':selected').each((idx, el) => {
                        // Obtenemos los atributos que necesitamos
                        let id = parseInt(el.id);
                        document.getElementById("tipo_e10c").value = id;
                    });
                });

                var $selects = $('.selectCalle');
                $selects.on('change', function (e) {
                    $("option", $selects).prop("disabled", false);
                    $selects.each(function () {
                        try {
                            var $select = $(this),
                                    $options = $selects.not($select).find('option'),
                                    selectedText = $select.children('option:selected').text();
                            $options.each(function () {
                                if ($(this).text() === selectedText)
                                    $(this).prop("disabled", true);
                            });
                        } catch (error) {
                            console.log(error);
                        }
                    });

                });

                $selects.eq(0).trigger('change');

                datos["x_val"] = punteoObj["x_val"];
                datos["y_val"] = punteoObj["y_val"];
                if (!banderaPunteoDado || banderaPunteoDado === 'false' || banderaPunteoDado === false) {
                    let puntoGeografico = Merc2psgeo(punteoObj["y_val"], punteoObj["x_val"]);
                    street_viewcord(parseFloat(puntoGeografico[1]), parseFloat(puntoGeografico[0]));
                    banderaPunteoDado = true;
                }
                document.getElementById("tipo_e10a").value = "null";
                document.getElementById("tipo_e12p").value = "null";
                document.getElementById("tipo_e19").value = "null";

                Object.keys(punteoObj).forEach((prop) => {
                    datos[prop] = punteoObj[prop];
                });
            });
}



function cancelar() {
    banderaPunteoDado = false;
    punteaNR = false;
    ratifique = false;
    errorPunteo = false;
    chinchetaPunteo = false;
    street_viewcord(21.857106872530903, -102.28388799818673);

    $("#Btn_Accion1").prop('disabled', false);
    $('#Btn_Accion1').attr('style', 'cursor:pointer');

    if (document.getElementById("id_ue").value.length > 0) {
        var id_tramo = $_GET('id_tramo');
        ratifico = true;

        var url = "cancelar.do?id_ue=" + idUe + "&id_tramo=" + id_tramo;

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => res.json())
                .catch((error) => console.error("Error:", error))
                .then((response) => {
                    if (response.success === null) {
                        Swal.fire({
                            title: "Cancelado completo",
                            text: response.valor,
                            icon: "success"
                        });
                    }
                });

        if (markerPunt) {
            markerPunt.removeClassName('markerPunteo');
        }

        if (markero) {
            markero.removeClassName('markerStreetV');
        }

        if (mark) {
            clearMarker(mark);
        }

        $('#panRatificar').hide();
        $('#ratificar').hide();
        $('#noratificar').hide();

        Object.getOwnPropertyNames(datos).forEach(function (val) {
            if (document.getElementById(val)) {
                if (document.getElementById(val).type === "text" || document.getElementById(val).type === "textarea") {
                    document.getElementById(val).setAttribute('readonly', "true");//Asignar el atributo type                    
                    document.getElementById(val).value = "";
                } else {
                    document.getElementById(val).setAttribute('disabled', true);//Asignar el atributo type                    
                    if (document.getElementById(val).value === "S" || document.getElementById(val).value === "M")
                    {
                        document.getElementById(val).value = 0;
                    } else {
                        document.getElementById(val).value = "null";
                    }
                }

            }
        });

        datos = "";
        mapalibre.flyTo({
            zoom: 4,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });

        mapalibre.setLayoutProperty(
                'wms-test-layer',
                'visibility',
                false ? 'visible' : 'none'
                );

        mapalibre.setLayoutProperty(
                'id_denue',
                'visibility',
                false ? 'visible' : 'none'
                );

        $(".Input_Buscador").val("");
        $("#e10a").empty();
        document.getElementById("lble10a").setAttribute("class", "estilo_normal");
        $("#e10b").empty();
        document.getElementById("lble10b").setAttribute("class", "estilo_normal");
        $("#e10c").empty();
        document.getElementById("lble10c").setAttribute("class", "estilo_normal");

        // Validaciones desbloqueo de botones al metodo cancelar (oscar)//
        document.querySelector("#Chincheta_punteo").style.visibility = "hidden";
        document.querySelector("#Btn_iconBusqueda_Id_ue").removeAttribute("disabled");
        document.querySelector("#Btn_iconBusqueda_Id_ue").style.cursor = "pointer";
        document.querySelector("#Txt_Buscar_Id_ue").removeAttribute("disabled");
        document.querySelector("#Txt_Buscar_Id_ue").style.cursor = "auto";
        document.getElementById("Txt_Buscar_Id_ue").value = "";
        document.querySelector("#Boton_ver").removeAttribute("disabled");
        document.querySelector("#Boton_ver").style.cursor = "pointer";
        document.querySelector("#guardar").style.background = "#595959";
        document.querySelector("#guardar").style.cursor = "not-allowed";
        document.querySelector("#cancelar").style.background = "#595959";
        document.querySelector("#cancelar").style.cursor = "not-allowed";
        $("#Contenedor_Vistapre").empty();
        document.querySelector("#guardar").removeAttribute("data-bs-target");

    }
}

function modal_guardar() {
    if (document.getElementById("id_ue").value.length > 0) {
        if (ratifique) {
            if (punteaNR) {
                if (errorPunteo) {
                    validacion.reverse();
                    validacion.forEach((input) => {
                        //console.log(input);
                        if (document.getElementById(input.campo) !== null) {
                            datos[input.campo] = document.getElementById(input.campo).value;
                        }

                        Object.getOwnPropertyNames(datos).forEach(function (valor) {
                            try {
                                if (input.campo === valor) {
                                    let spVal = (input.validacion).split(",");
                                    let value = datos[valor];
                                    if (value === null) {
                                        value = "";
                                    }
                                    spVal.forEach((val) => {
                                        validacionesGuardado(val, value, input);
                                    });
                                }
                            } catch (error) {
                                console.log(error);
                                console.log(valor);
                                errore = valor + " nulo";
                            }
                        });
                    });

                    var arrayNull = [];
                    var arrayNum = [];
                    var arrayLon = [];
                    var arrayCoor = [];
                    var arrayFalse = [];
                    mostrarModal = true;

                    validacion.forEach((inputs) => {
                        if (inputs["openModalNull"] === true || inputs["openModalNull"] === false) {
                            arrayNull.push(inputs["openModalNull"]);
                        }

                        if (inputs["openModalNumeric"] === true || inputs["openModalNumeric"] === false) {
                            arrayNum.push(inputs["openModalNumeric"]);
                        }

                        if (inputs["openModalLon"] === true || inputs["openModalLon"] === false) {
                            arrayLon.push(inputs["openModalLon"]);
                        }

                        if (inputs["openModalCoor"] === true || inputs["openModalCoor"] === false) {
                            arrayCoor.push(inputs["openModalCoor"]);
                        }

                        if (inputs["openModalFalse"] === true || inputs["openModalFalse"] === false) {
                            arrayFalse.push(inputs["openModalFalse"]);
                        }
                    });

                    var arrayCompleto = arrayNull.concat(arrayNum, arrayLon, arrayCoor, arrayFalse);

                    arrayCompleto.forEach((campo) => {
                        if (campo === false) {
                            mostrarModal = false;
                        }
                    });


                    if (mostrarModal) {
                        /* Read more about handling dismissals below */
                        $('#guardar').attr('data-bs-toggle', 'modal');
                        Vista_pree();
                        $('#Modal_Datospree').modal('toggle');
                        $('.modal-content').css("top", "12px");
                        $('.modal-content').css("height", "97vh");
                        $('.modal').css("--mdb-modal-width", "100vw");
                        $('.modal-dialog').css("margin", "0px auto");
                    } else {
                        Swal.fire({
                            icon: "info",
                            title: "Formulario Incompleto",
                            text: "Por favor, Revisar cada uno de los campos del formulario. Los campos incorrectos se mostraran en color rojo."
                        });
                    }
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Por favor, puntee correctamente"
                    });
                }
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Aviso",
                    text: "Por favor,  Realice punteo"
                });
            }
        } else {
            Swal.fire({
                icon: "warning",
                title: "Aviso",
                text: "Por favor, Ratifique"
            });
        }
    } else {
        document.getElementById("guardar").removeAttribute("data-bs-target");
    }
}

function validacionesGuardado(val, value, input) {
    if (input.tipo_control === "select") {
        if (value === "null") {
            value = "";
        }
    }

    if (val === "not null") {
        if (value !== null && value !== undefined && value !== "" && value !== '' && value.length !== 0) {
            input["openModalNull"] = true;
        } else {
            input["openModalNull"] = false;
            document.getElementById("lbl" + input.campo).setAttribute("class", "estilo_error");
            Swal.fire({
                icon: "error",
                title: "Error",
                text: input.error
            });
            activeAccor(input.tema_ide);
        }
    }

    if (val === "numeric") {
        let number = parseInt(value);
        if (Number.isInteger(number)) {
            input["openModalNumeric"] = true;
        } else {
            input["openModalNumeric"] = false;
            document.getElementById("lbl" + input.campo).setAttribute("class", "estilo_error");
            activeAccor(input.tema_ide);
        }
    }

    if (val === "longitud: 13" || val === "longitud:250" || val === "longitud:20" || val === "longitud:255" || val === "longitud:13" || val === "longitud:150" || val === "longitud:1" || val === "longitud:2" ||
            val === "longitud:3" || val === "longitud:255" || val === "longitud:10" || val === "longitud:110" || val === "longitud:5" || val === "longitud: 250" || val === "longitud:4") {
        if (input.max_longitud_campo) {
            if (value.length >= 0 && value.length <= parseInt(input.max_longitud_campo)) {
                input["openModalLon"] = true;
            } else {
                input["openModalLon"] = false;
                document.getElementById("lbl" + input.campo).setAttribute("class", "estilo_error");
                activeAccor(input.tema_ide);
            }
        }
    }

    if (val === "longitud:19.8") {
        if (value === null || value.length === 0) {
            console.log("no existe coordenadas");
        } else {
            let valValida = value.split(".");
            if (valValida[0].length <= 19 && valValida[1].length <= 8) {
                input["openModalCoor"] = true;
            } else {
                input["openModalCoor"] = false;
                activeAccor(input.tema_ide);
            }
        }
    }

    if (val === "not false") {
        if (value) {
            input["openModalFalse"] = true;
        } else {
            input["openModalFalse"] = false;
            activeAccor(input.tema_ide);
        }
    }
}


function activeAccor(tema_ide) {
    var elems = document.querySelector('.collapsible');
    var instances = M.Collapsible.init(elems);

    if (tema_ide === "Referencia") {
        instances.open(0);
    }

    if (tema_ide === "Domicilio") {
        instances.open(1);
    }

    if (tema_ide === "Asentamiento") {
        instances.open(2);
    }

    if (tema_ide === "Ubicación Geográfica") {
        instances.open(3);
    }

    if (tema_ide === "Entre vialidades") {
        instances.open(4);
    }

    if (tema_ide === "Calle posterior") {
        instances.open(5);
    }

    if (tema_ide === "Edificio, centro comercial") {
        instances.open(6);
    }

    if (tema_ide === "Observación") {
        instances.open(7);
    }
}


function guardado() {
    banderaPunteoDado = false;
    var jsonDatos = JSON.stringify(datos);
    var encodeDatos = encodeURIComponent(jsonDatos);
    var usuario = $_GET('usuario');

    var url = 'guardar.do?proyecto=1&obj=' + encodeDatos.toString() + '&usuario=' + usuario;

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                if (response.mensaje.type === "true") {
                    Swal.fire({
                        title: "",
                        text: response.mensaje.messages,
                        icon: "success"
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            cancelarGuardado();
                        }
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Hubo un error",
                        icon: "error"
                    });
                }
            });
}

function cancelarGuardado() {
    banderaPunteoDado = false;
    ratifique = false;
    boolide = false;
    punteaNR = false;
    errorPunteo = false;
    chinchetaPunteo = false;
    street_viewcord(21.857106872530903, -102.28388799818673);
    if (boolide === false) {
        $("#Btn_Accion1").prop('disabled', false);
        $('#Btn_Accion1').attr('style', 'cursor:pointer');
    }
    //console.log(document.getElementById("id_ue").value);
    //console.log(document.getElementById("id_ue").value.length > 0);
    if (document.getElementById("id_ue").value.length > 0) {
        var id_tramo = $_GET('id_tramo');
        ratifico = true;

        if (markerPunt) {
            markerPunt.removeClassName('markerPunteo');
        }

        if (mark) {
            clearMarker(mark);
        }

        if (markero) {
            markero.removeClassName('markerStreetV');
        }

        doButtonMapCenter("center-button", mapalibre);
        var marker = getMarker();
        var markers = getMarkers();

        if (markers) {
            clearMarkers(markers);
        }
        if (marker) {
            clearMarker(marker);
        }

        $('#panRatificar').hide();
        $('#ratificar').hide();
        $('#noratificar').hide();

        Object.getOwnPropertyNames(datos).forEach(function (val) {
            if (document.getElementById(val)) {
                if (document.getElementById(val).type === "text" || document.getElementById(val).type === "textarea") {
                    document.getElementById(val).setAttribute('readonly', "true");//Asignar el atributo type                    
                    document.getElementById(val).value = "";
                } else {
                    document.getElementById(val).setAttribute('disabled', true);//Asignar el atributo type                    
                    if (document.getElementById(val).value === "S" || document.getElementById(val).value === "M")
                    {
                        document.getElementById(val).value = 0;
                    } else {
                        document.getElementById(val).value = "null";
                    }
                }

            }
        });

        datos = "";
        mapalibre.flyTo({
            zoom: 4,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });

        mapalibre.setLayoutProperty(
                'wms-test-layer',
                'visibility',
                false ? 'visible' : 'none'
                );

        mapalibre.setLayoutProperty(
                'id_denue',
                'visibility',
                false ? 'visible' : 'none'
                );

        $(".Input_Buscador").val("");
        $("#e10a").empty();
        document.getElementById("lble10a").setAttribute("class", "estilo_normal");
        $("#e10b").empty();
        document.getElementById("lble10b").setAttribute("class", "estilo_normal");
        $("#e10c").empty();
        document.getElementById("lble10c").setAttribute("class", "estilo_normal");

        // Validaciones desbloqueo de botones al metodo cancelar (oscar)//
        document.querySelector("#Chincheta_punteo").style.visibility = "hidden";
        document.querySelector("#Btn_iconBusqueda_Id_ue").removeAttribute("disabled");
        document.querySelector("#Btn_iconBusqueda_Id_ue").style.cursor = "pointer";
        document.querySelector("#Txt_Buscar_Id_ue").removeAttribute("disabled");
        document.querySelector("#Txt_Buscar_Id_ue").style.cursor = "auto";
        document.getElementById("Txt_Buscar_Id_ue").value = "";
        document.querySelector("#Boton_ver").removeAttribute("disabled");
        document.querySelector("#Boton_ver").style.cursor = "pointer";
        document.querySelector("#guardar").style.background = "#595959";
        document.querySelector("#guardar").style.cursor = "not-allowed";
        document.querySelector("#cancelar").style.background = "#595959";
        document.querySelector("#cancelar").style.cursor = "not-allowed";
        $("#Contenedor_Vistapre").empty();
        document.querySelector("#guardar").removeAttribute("data-bs-target");
    }
}


function layerStreetOnOff(band) {
    try {
        mapalibre.setLayoutProperty(
                "id_street",
                'visibility',
                band ? 'visible' : 'none'
                );
    } catch (error) {
        console.log(error);
    }
}