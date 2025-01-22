/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

/* global BasemapsControl, globalThis, define, self, fetch, maplibregl */
/*Declaracion de variables globales*/
var tc_scian_2018 = [];
let markers = [];
var categories = "";
var inputValue = "";
var servicio = "";
var marker;
var mapa;

/*Da inicio al funcionamiento del api, con el uso de este método 
 se crea la barra de búsqueda en un sidebar sin botones */
function initSearch() {
    // Crear un elemento div 
    var div = document.getElementById("map");
    var divDrop = document.createElement("div");
    var divForm = document.createElement("div");
    var divLeft = document.createElement("div");
    var input = document.createElement("input");
    //var label = document.createElement("label");
    var span = document.createElement('span');
    span.innerHTML = '<div class="sidebar-toggle rounded-rect left" onclick="toggleSidebar()" ><span class="icon"></span></div>';


    divLeft.classList.add("sidebar", "flex-center", 'left', "collapsed");
    //divLeft.setAttribute("style","width:30%;top:10%;background:#fff;height:50px");
    divLeft.setAttribute("id", "left");
    divDrop.classList.add("input-group", "dropdown", 'btn-group', "sidebar-content", "rounded-rect");
    divDrop.setAttribute("style", "top:10%;background:#fff;height:50px");
    divDrop.setAttribute("id", "div-drop");
    divForm.className += "form-outline";
    input.classList.add("form-control", "formin", 'btn-group');
    input.setAttribute("id", "search-input");
    input.setAttribute("id", "form1");
    input.setAttribute("style", "width:97%;height:30px;top:10px;left:19px;border-width:1px;border-style:solid;border-color:gray;");
    input.setAttribute("type", "search");
    input.setAttribute("placeholder", "Buscar");
    /*label.className += "form-label";
     label.setAttribute("for","form1");
     label.setAttribute("style","top:10px;font-size:14px;left:30px;");
     label.innerHTML = "Buscar";*/

    divForm.appendChild(input);
    //divForm.appendChild(label);

    divDrop.appendChild(divForm);

    divDrop.appendChild(span);

    divLeft.appendChild(divDrop);

    div.appendChild(divLeft);
}

/*Función para el funcionamiento de la barra de búsqueda para poder ocultarla.*/
function toggleSidebar() {
    var marker = getMarker();
    var markers = getMarkers();
    document.getElementById('form1').value = "";
    document.getElementById('dropdown').style.display = 'none';
    var elem = document.getElementById("left");
    var classes = elem.className.split(' ');
    var collapsed = classes.indexOf('collapsed') !== -1;

    var padding = {};

    if (collapsed) {
        // Remove the 'collapsed' class from the class list of the element, this sets it back to the expanded state.
        classes.splice(classes.indexOf('collapsed'), 1);
    } else {
        // Add the 'collapsed' class to the class list of the element
        classes.push('collapsed');
    }

    // Update the class list on the element
    elem.className = classes.join(' ');
    if (markers) {
        clearMarkers(markers);
    }
    
    if(marker) {
        clearMarker(marker);
    }
}

/*Recupera la lista de markers creada en el mapa 
 al momento de hacer una busqueda */
function getMarkers() {
    return markers;
}

/*Recupera el marker que se creó cuando seleccionas alguna opción en la barra 
 de búsqueda*/
function getMarker() {
    return marker;
}

/*Define tu propio mapa al api de búsqueda.*/
function setMap(map) {
    mapa = map;
}

/*Función para crear el botón que sirve para reiniciar el mapa, se añade en 
 la barra de búsqueda, recibe el mapa creado, la lista de markers, y el 
 marker de búsqueda.*/
function createButtonMapCenter(map) {
    var div = document.getElementById("div-drop");
    var buttonCenter = document.createElement("button");
    var icon = document.createElement("i");

    buttonCenter.classList.add("btn", "color");
    buttonCenter.setAttribute("id", "center-button");
    buttonCenter.setAttribute("role", "button");

    icon.className += "material-icons";
    icon.setAttribute("style", "font-size: 18px");
    icon.innerHTML = "sync";

    buttonCenter.appendChild(icon);
    div.appendChild(buttonCenter);

    doButtonMapCenter("center-button", map);
}

/*Funcionamiento del botón de reiniciar mapa, se le asigna directo a la 
 función donde se crea el botón, pero también se puede asignar al algún 
 botón creado por ti y asignarle la funcionalidad.
 Recibe los parámetros id botón, mapa, lista de markers, marker.*/
function doButtonMapCenter(idButton, map) {
    var buttonCenter = document.getElementById(idButton);
    buttonCenter.addEventListener('click', () => {
        var marker = getMarker();
        var markers = getMarkers();
        document.getElementById('form1').value = "";
        document.getElementById('dropdown').style.display = 'none';
        if(markers) {
            clearMarkers(markers);
        }
        if(marker) {    
            clearMarker(marker);
        }
        map.flyTo({
            center: [-102.28259, 21.88234],
            zoom: 4,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    });
}

/*Función para crear el botón que sirve para eliminar markers, marker, la 
 información de la búsqueda, y se añade en la barra de búsqueda.*/
function createButtonDelete() {

    var div = document.getElementById("div-drop");
    var buttonTrash = document.createElement("button");
    var icon = document.createElement("i");

    buttonTrash.classList.add("btn", "color");
    buttonTrash.setAttribute("id", "eliminar-button");
    buttonTrash.setAttribute("type", "button");

    icon.className += "material-icons";
    icon.setAttribute("style", "font-size: 18px");
    icon.innerHTML = "highlight_off";


    buttonTrash.appendChild(icon);
    div.appendChild(buttonTrash);

    doButtonDelete("eliminar-button");
}

/*Funcionamiento del botón de eliminar, se le asigna directo a la función 
 donde se crea el botón, pero también se puede asignar al algún botón creado 
 por ti y asignarle la funcionalidad. 
 Recibe el parámetro del id del botón.*/
function doButtonDelete(idButtonDelete) {

    var buttonDelete = document.getElementById(idButtonDelete);

    buttonDelete.addEventListener('click', () => {
        var marker = getMarker();
        var markers = getMarkers();
        document.getElementById('form1').value = "";
        document.getElementById('dropdown').style.display = 'none';
        
        if(markers) {
            clearMarkers(markers);
        }
        if(marker) {
            clearMarker(marker);
        }
    });
}

/*Función para crear el botón que sirve para crear el botón que realiza la 
 búsqueda, y se añade en la barra de búsqueda. 
 Recibe de parámetros el mapa, marker y la lista de markers creadas.*/
function createButtonSearch(map, marker, markers) {
    var div = document.getElementById("div-drop");
    var buttonSearch = document.createElement("button");
    var icon = document.createElement("i");
    var divDropdown = document.createElement("div");

    buttonSearch.classList.add("btn", "color");
    buttonSearch.setAttribute("id", "search-button");
    buttonSearch.setAttribute("type", "button");
    buttonSearch.setAttribute("data-toggle", "dropdown");
    buttonSearch.setAttribute("aria-haspopup", "true");
    buttonSearch.setAttribute("aria-expanded", "false");
    buttonSearch.setAttribute("data-offset", "0");

    divDropdown.classList.add("dropdown-menu", "dropdown-menu-right");
    divDropdown.setAttribute("id", "dropdown");
    divDropdown.setAttribute("aria-labelledby", "search-button");
    divDropdown.setAttribute("style", "overflow-x: hidden;overflow-y: auto;");

    icon.className += "material-icons";
    icon.setAttribute("style", "font-size: 18px");
    icon.innerHTML = "search";

    buttonSearch.appendChild(icon);
    div.appendChild(buttonSearch);
    div.appendChild(divDropdown);

    doButtonSearch("search-button", map, marker, markers);

}

/*Funcionamiento del botón de búsqueda su funcionamiento consiste en hacer 
 la búsqueda cuando un usuario inserte un lugar en el input y sale la lista 
 desplazada en un dropdown donde se muestra los nombres de los lugares 
 encontrados, muestra su ubicación en el mapa y también cuando seleccionas 
 algún lugar te lo muestra con acercamiento, este se le asigna directo a la 
 función donde se crea el botón, también se puede asignar al algún botón 
 creado por ti y asignarle la funcionalidad.
 Recibe de parámetros el id del botón de busqueda, el mapa, marker de 
 busqueda, y la lista de los markers buscados.*/
function doButtonSearch(idButtonSearch, map, marker1, markers1) {
    var buttonSearch = document.getElementById(idButtonSearch);
    var input = document.getElementById("form1");
    fetch('resources/imagenes_2/resource/tc_scian_2018_202309141411.json')
            .then((response) => response.json())
            .then((json) => {
                tc_scian_2018 = json.tc_scian_2018;

                input.addEventListener("keyup", function (event) {
                    if (event.keyCode === 13) {
                        event.preventDefault();
                        buttonSearch.click();
                    }
                });

                buttonSearch.addEventListener('click', () => {
                    document.getElementById('dropdown').style.display = 'block';
                    const searchInput = document.getElementById('form1');
                    if (marker1) {
                        clearMarker(marker1);
                    }
                    inputValue = searchInput.value;
                    var myBounds = getBounds(map);
                    console.log(myBounds);
                    var geograficoCentroide = myBounds.getCenter();
                    var pt2 = geograficoCentroide.lat + "," + geograficoCentroide.lng;
                    var extent = getExtent(myBounds);
                    var point1 = extent[0];
                    var point2 = extent[1];
                    point1 = point1[1] + "," + point1[0];
                    point2 = point2[1] + "," + point2[0];
                    var obj = new Object();
                    obj.point1 = point1;
                    obj.point2 = point2;
                    obj.pt = pt2;
                    obj.q = inputValue;
                    var jsonString = JSON.stringify(obj);

                    fetch('https://gaia.inegi.org.mx/mdm_searchengine/search', {
                        method: "POST",
                        body: jsonString,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                            .then((res) => res.json())
                            .catch((error) => console.error("Error:", error))
                            .then((response) => {
                                console.log(response.response);
                                if (response.response.success === false) {
                                    var div = document.getElementById("dropdown"); //Seleccionamos el select
                                    div.innerHTML = '';
                                    var option2 = document.createElement("option");
                                    option2.value = false;
                                    option2.text = "No se encontraron coincidencias";
                                    option2.className += "dropdown-item";
                                    div.appendChild(option2);
                                } else {
                                    var div = document.getElementById("dropdown"); //Seleccionamos el select
                                    div.innerHTML = '';
                                    var valuesResults = response.data.results;
                                    categories = response.data.categories;
                                    servicio = response.data.service;
                                    var clase = "";
                                    var zoom = "";
                                    var entidades = ["Calle", "Entidad federativa", "Localidad Rural", "Localidad Urbana", "Municipio", "Rasgos hidrográficos", "Rasgos orográficos", "Sitio de interés", "Delegación", "Rasgos hidrográficos"];

                                    for (let entidad of entidades) {
                                        var total = categories[entidad];
                                        if (total > 0 || total !== undefined) {
                                            var option = document.createElement("option");
                                            option.value = entidad;
                                            option.text = entidad + " " + total;
                                            option.className += "dropdown-item";
                                            div.appendChild(option);
                                        }
                                    }

                                    var descripcion;
                                    for (let cont of tc_scian_2018) {
                                        var total = categories[cont.descripcion];
                                        if (total > 0 || total !== undefined) {
                                            var option = document.createElement("option");
                                            option.value = cont.descripcion;
                                            option.text = cont.descripcion + " " + total;
                                            option.className += "dropdown-item";
                                            clase = "default";
                                            zoom = "zoom17";
                                            div.appendChild(option);
                                        }
                                        descripcion = cont.descripcion;
                                    }


                                    var divSep = document.createElement("div");
                                    divSep.className += "dropdown-divider";
                                    div.appendChild(divSep);

                                    for (let val of valuesResults) {
                                        var busqueda = val.busqueda.split("-");
                                        busqueda = busqueda[0].split(",");
                                        const last = busqueda[busqueda.length - 1];
                                        var tipo = val.tipo;
                                        var coordenadas = val.locacion;
                                        coordenadas = coordenadas.split(",");
                                        var latln = [coordenadas[1], coordenadas[0]];
                                        var el = document.createElement('div');
                                        el.className = 'marker';

                                        // create the marker
                                        let marcador = new maplibregl.Marker(el)
                                                .setLngLat(latln)
                                                // .setPopup(popup) // sets a popup on this marker
                                                .addTo(map);

                                        markers.push(marcador);
                                        console.log(markers);

                                        markers.forEach((marker) => {
                                            console.log(marker._element.innerHTML);
                                            marker._element.innerHTML = "";
                                        });

                                        busqueda.pop();
                                        var texto = "";
                                        for (let val of busqueda) {
                                            texto += val + (", ");
                                        }

                                        texto = texto.toString();
                                        var cantidad = 2;
                                        var text = texto.substring(0, texto.length - cantidad);


                                        if (tipo.toLowerCase() === "municipio") {
                                            clase = "icon-municipio";
                                            zoom = "zoom11";
                                        } else if (tipo.toLowerCase() === "localidad urbana") {
                                            clase = "icon-localidadUrbana";
                                            zoom = "zoom14";
                                        } else if (tipo.toLowerCase() === "localidad rural") {
                                            clase = "icon-localidadrural";
                                            zoom = "zoom15";
                                        } else if (tipo.toLowerCase() === "calle") {
                                            clase = "icon-calle";
                                            zoom = "zoom17";
                                        } else if (tipo.toLowerCase() === "rasgos hidrográficos" || tipo === "Rasgos Hidrográficos") {
                                            clase = "icon-rasgosHidrograficos";
                                            zoom = "zoom15";
                                        } else if (tipo.toLowerCase() === "rasgos orográficos" || tipo === "Rasgos Orográficos") {
                                            clase = "icon-rasgosOrografico";
                                            zoom = "zoom15";
                                        } else if (tipo.toLowerCase() === "sitio de interés") {
                                            clase = "icon-localidadrural";
                                            zoom = "zoom15";
                                        } else if (tipo.toLowerCase() === "entidad federativa") {
                                            clase = "icon-entidadFederativa";
                                            zoom = "zoom7";
                                        } else if (tipo.toLowerCase() === "delegación") {
                                            clase = "icon-localidadrural";
                                            zoom = "zoom15";
                                        } else if (tipo.toLowerCase() === "manzana") {
                                            clase = "icon-manzana";
                                            zoom = "zoom18";
                                        } else if (tipo.toLowerCase() === "marcas geodésicas" || tipo === "Marcas geodésicas") {
                                            clase = "icon-marcasGeodésicas";
                                            zoom = "zoom19";
                                        } else {
                                            clase = "icon-default";
                                            zoom = "zoom15";
                                        }


                                        var divPrin = document.createElement("div");
                                        var divImg = document.createElement("div");
                                        var img = document.createElement("img");
                                        var divMedia = document.createElement("div");
                                        var h4 = document.createElement("h6");
                                        var p = document.createElement("h9");
                                        h4.classList.add(val.locacion, zoom);
                                        p.classList.add(val.locacion, zoom);
                                        h4.innerHTML = last;
                                        p.innerHTML = text;
                                        divImg.className += clase;
                                        divMedia.classList.add(val.locacion, zoom, 'media-body', );
                                        img.src = "resources/imagenes_2/resource/mainSprite.png";
                                        divImg.appendChild(img);
                                        divPrin.classList.add(val.locacion, zoom, 'dropdown-item', 'media', "item");
                                        divMedia.appendChild(h4);
                                        divMedia.appendChild(p);
                                        div.appendChild(divPrin).appendChild(divImg).appendChild(divMedia);
                                        div.appendChild(divPrin).appendChild(divMedia);

                                    }
                                }
                            });
                });

                document.getElementById("dropdown").addEventListener('click', function (e) {
                    if(markers1) {
                        clearMarkers(markers1);
                    }
                    if (marker1) {
                        clearMarker(marker1);
                    }
                    var value = e.target.classList[0];
                    var tipo = e.target.classList[1];
                    var coordenadas = value;

                    if (tipo === undefined) {
                        var valueOp = e.target.value;
                        var myBounds = map.getBounds();
                        var extent = getExtent(myBounds);
                        var point1 = extent[0];
                        var point2 = extent[1];
                        point1 = point1[1] + "," + point1[0];
                        point2 = point2[1] + "," + point2[0];
                        var obj = new Object();
                        obj.category = valueOp;
                        obj.point1 = point1;
                        obj.point2 = point2;
                        obj.q = inputValue;
                        var jsonString = JSON.stringify(obj);

                        if (servicio === "entidades") {
                            fetch('https://gaia.inegi.org.mx/mdm_searchengine/search/entidades', {
                                method: "POST",
                                body: jsonString,
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })
                                    .then((res) => res.json())
                                    .catch((error) => console.error("Error:", error))
                                    .then((response) => {
                                        console.log(response);
                                        var div = document.getElementById("dropdown"); //Seleccionamos el select
                                        div.innerHTML = '';
                                        var valuesResults = response.data.results;
                                        var clase = "";
                                        var zoom = "";
                                        var entidades = ["Calle", "Entidad federativa", "Localidad Rural", "Localidad Urbana", "Municipio", "Rasgos hidrográficos", "Rasgos orográficos", "Sitio de interés", "Delegación"];

                                        for (let entidad of entidades) {
                                            var total = categories[entidad];
                                            if (total > 0 || total !== undefined) {
                                                console.log(entidad + total);
                                                var option = document.createElement("option");
                                                option.value = entidad;
                                                option.text = entidad + " " + total;
                                                option.className += "dropdown-item";
                                                div.appendChild(option);
                                            }
                                        }

                                        var descripcion;
                                        for (let cont of tc_scian_2018) {
                                            var total = categories[cont.descripcion];
                                            if (total > 0 || total !== undefined) {
                                                var option = document.createElement("option");
                                                option.value = cont.descripcion;
                                                option.text = cont.descripcion + " " + total;
                                                option.className += "dropdown-item";
                                                clase = "default";
                                                zoom = "zoom17";
                                                div.appendChild(option);
                                            }
                                            descripcion = cont.descripcion;
                                        }


                                        var divSep = document.createElement("div");
                                        divSep.className += "dropdown-divider";
                                        div.appendChild(divSep);

                                        for (let val of valuesResults) {
                                            var busqueda = val.busqueda.split("-");
                                            busqueda = busqueda[0].split(",");
                                            const last = busqueda[busqueda.length - 1];
                                            var tipo = val.tipo;

                                            var coordenadas = val.locacion;
                                            coordenadas = coordenadas.split(",");
                                            var latln = [coordenadas[1], coordenadas[0]];
                                            // create DOM element for the marker
                                            var el2 = document.createElement('div');
                                            el2.className = 'marker';

                                            // create the marker
                                            let marcador = new maplibregl.Marker(el2)
                                                    .setLngLat(latln)
                                                    // .setPopup(popup) // sets a popup on this marker
                                                    .addTo(map);

                                            markers.push(marcador);
                                            console.log(markers);

                                            markers.forEach((marker) => {
                                                console.log(marker._element.innerHTML);
                                                marker._element.innerHTML = "";
                                            });

                                            busqueda.pop();
                                            var texto = "";

                                            for (let val of busqueda) {
                                                texto += val + (", ");
                                            }

                                            texto = texto.toString();
                                            var cantidad = 2;
                                            var text = texto.substring(0, texto.length - cantidad);

                                            if (tipo.toLowerCase() === "municipio") {
                                                clase = "icon-municipio";
                                                zoom = "zoom11";
                                            } else if (tipo.toLowerCase() === "localidad urbana") {
                                                clase = "icon-localidadUrbana";
                                                zoom = "zoom14";
                                            } else if (tipo.toLowerCase() === "localidad rural") {
                                                clase = "icon-localidadrural";
                                                zoom = "zoom15";
                                            } else if (tipo.toLowerCase() === "calle") {
                                                clase = "icon-calle";
                                                zoom = "zoom17";
                                            } else if (tipo.toLowerCase() === "rasgos hidrográficos" || tipo === "Rasgos Hidrográficos") {
                                                clase = "icon-rasgosHidrograficos";
                                                zoom = "zoom15";
                                            } else if (tipo.toLowerCase() === "rasgos orográficos" || tipo === "Rasgos Orográficos") {
                                                clase = "icon-rasgosOrografico";
                                                zoom = "zoom15";
                                            } else if (tipo.toLowerCase() === "sitio de interés") {
                                                clase = "icon-localidadrural";
                                                zoom = "zoom15";
                                            } else if (tipo.toLowerCase() === "entidad federativa") {
                                                clase = "icon-entidadFederativa";
                                                zoom = "zoom7";
                                            } else if (tipo.toLowerCase() === "delegación") {
                                                clase = "icon-localidadrural";
                                                zoom = "zoom15";
                                            } else if (tipo.toLowerCase() === "manzana") {
                                                clase = "icon-manzana";
                                                zoom = "zoom18";
                                            } else if (tipo.toLowerCase() === "marcas geodésicas" || tipo === "Marcas geodésicas") {
                                                clase = "icon-marcasGeodésicas";
                                                zoom = "zoom19";
                                            } else {
                                                clase = "icon-default";
                                                zoom = "zoom15";
                                            }

                                            var divPrin = document.createElement("div");
                                            var divImg = document.createElement("div");
                                            var img = document.createElement("img");
                                            var divMedia = document.createElement("div");
                                            var h4 = document.createElement("h6");
                                            var p = document.createElement("h9");
                                            h4.classList.add(val.locacion, zoom);
                                            p.classList.add(val.locacion, zoom);
                                            h4.innerHTML = last;
                                            p.innerHTML = text;
                                            divImg.className += clase;
                                            divMedia.classList.add(val.locacion, zoom, 'media-body', );
                                            img.src = "resources/imagenes_2/resource/mainSprite.png";
                                            divImg.appendChild(img);
                                            divPrin.classList.add(val.locacion, zoom, 'dropdown-item', 'media', "item");
                                            divMedia.appendChild(h4);
                                            divMedia.appendChild(p);
                                            div.appendChild(divPrin).appendChild(divImg).appendChild(divMedia);
                                            div.appendChild(divPrin).appendChild(divMedia);

                                        }
                                        $(div).show();
                                    });
                        } else if (servicio === "entidadesref") {
                            fetch('https://gaia.inegi.org.mx/mdm_searchengine/search/entidadesref', {
                                method: "POST",
                                body: jsonString,
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })
                                    .then((res) => res.json())
                                    .catch((error) => console.error("Error:", error))
                                    .then((response) => {
                                        if (response.response.message === "Los datos de Busqueda no arrojan ningun resultado") {
                                            console.log("hola tengo message");
                                            Swal.fire({
                                                icon: 'error',
                                                title: response.response.message
                                            });
                                        } else {
                                            console.log("entroooo funcion");
                                            var div = document.getElementById("dropdown"); //Seleccionamos el select
                                            div.innerHTML = '';
                                            var valuesResults = response.data.results;
                                            var clase = "";
                                            var zoom = "";
                                            var entidades = ["Calle", "Entidad federativa", "Localidad Rural", "Localidad Urbana", "Municipio", "Rasgos hidrográficos", "Rasgos orográficos", "Sitio de interés", "Delegación"];

                                            for (let entidad of entidades) {
                                                var total = categories[entidad];
                                                if (total > 0 || total !== undefined) {
                                                    var option = document.createElement("option");
                                                    option.value = entidad;
                                                    option.text = entidad + " " + total;
                                                    option.className += "dropdown-item";
                                                    div.appendChild(option);
                                                }
                                            }

                                            var descripcion;
                                            for (let cont of tc_scian_2018) {
                                                var total = categories[cont.descripcion];
                                                if (total > 0 || total !== undefined) {
                                                    var option = document.createElement("option");
                                                    option.value = cont.descripcion;
                                                    option.text = cont.descripcion + " " + total;
                                                    option.className += "dropdown-item";
                                                    clase = "default";
                                                    zoom = "zoom17";
                                                    div.appendChild(option);
                                                }
                                                descripcion = cont.descripcion;
                                            }


                                            var divSep = document.createElement("div");
                                            divSep.className += "dropdown-divider";
                                            div.appendChild(divSep);

                                            for (let val of valuesResults) {
                                                var busqueda = val.busqueda.split("-");
                                                busqueda = busqueda[0].split(",");
                                                const last = busqueda[busqueda.length - 1];
                                                var tipo = val.tipo;

                                                var coordenadas = val.locacion;
                                                coordenadas = coordenadas.split(",");
                                                var latln = [coordenadas[1], coordenadas[0]];
                                                // create DOM element for the marker
                                                var el2 = document.createElement('div');
                                                el2.className = 'marker';

                                                // create the marker
                                                let marcador = new maplibregl.Marker(el2)
                                                        .setLngLat(latln)
                                                        // .setPopup(popup) // sets a popup on this marker
                                                        .addTo(map);

                                                markers.push(marcador);
                                                console.log(markers);

                                                markers.forEach((marker) => {
                                                    console.log(marker._element.innerHTML);
                                                    marker._element.innerHTML = "";
                                                });
                                                busqueda.pop();
                                                var texto = "";

                                                for (let val of busqueda) {
                                                    texto += val + (", ");
                                                }

                                                texto = texto.toString();
                                                var cantidad = 2;
                                                var text = texto.substring(0, texto.length - cantidad);

                                                if (tipo.toLowerCase() === "municipio") {
                                                    clase = "icon-municipio";
                                                    zoom = "zoom11";
                                                } else if (tipo.toLowerCase() === "localidad urbana") {
                                                    clase = "icon-localidadUrbana";
                                                    zoom = "zoom14";
                                                } else if (tipo.toLowerCase() === "localidad rural") {
                                                    clase = "icon-localidadrural";
                                                    zoom = "zoom15";
                                                } else if (tipo.toLowerCase() === "calle") {
                                                    clase = "icon-calle";
                                                    zoom = "zoom17";
                                                } else if (tipo.toLowerCase() === "rasgos hidrográficos" || tipo === "Rasgos Hidrográficos") {
                                                    clase = "icon-rasgosHidrograficos";
                                                    zoom = "zoom15";
                                                } else if (tipo.toLowerCase() === "rasgos orográficos" || tipo === "Rasgos Orográficos") {
                                                    clase = "icon-rasgosOrografico";
                                                    zoom = "zoom15";
                                                } else if (tipo.toLowerCase() === "sitio de interés") {
                                                    clase = "icon-localidadrural";
                                                    zoom = "zoom15";
                                                } else if (tipo.toLowerCase() === "entidad federativa") {
                                                    clase = "icon-entidadFederativa";
                                                    zoom = "zoom7";
                                                } else if (tipo.toLowerCase() === "delegación") {
                                                    clase = "icon-localidadrural";
                                                    zoom = "zoom15";
                                                } else if (tipo.toLowerCase() === "manzana") {
                                                    clase = "icon-manzana";
                                                    zoom = "zoom18";
                                                } else if (tipo.toLowerCase() === "marcas geodésicas" || tipo === "Marcas geodésicas") {
                                                    clase = "icon-marcasGeodésicas";
                                                    zoom = "zoom19";
                                                } else {
                                                    clase = "icon-default";
                                                    zoom = "zoom15";
                                                }

                                                var divPrin = document.createElement("div");
                                                var divImg = document.createElement("div");
                                                var img = document.createElement("img");
                                                var divMedia = document.createElement("div");
                                                var h4 = document.createElement("h6");
                                                var p = document.createElement("h9");
                                                h4.classList.add(val.locacion, zoom);
                                                p.classList.add(val.locacion, zoom);
                                                h4.innerHTML = last;
                                                p.innerHTML = text;
                                                divImg.className += clase;
                                                divMedia.classList.add(val.locacion, zoom, 'media-body', );
                                                img.src = "resources/imagenes_2/resource/mainSprite.png";
                                                divImg.appendChild(img);
                                                divPrin.classList.add(val.locacion, zoom, 'dropdown-item', 'media', "item");
                                                divMedia.appendChild(h4);
                                                divMedia.appendChild(p);
                                                div.appendChild(divPrin).appendChild(divImg).appendChild(divMedia);
                                                div.appendChild(divPrin).appendChild(divMedia);
                                            }
                                            $(div).show();
                                        }
                                    });
                        }
                    } else {
                        coordenadas = coordenadas.split(",");
                        tipo = tipo.split("m");
                        tipo = tipo[1];
                        parseInt(tipo);

                        var el2 = document.createElement('div');
                        el2.className = 'marker2';

                        // create the marker
                        marker = new maplibregl.Marker(el2)
                                .setLngLat([coordenadas[1], coordenadas[0]])
                                // .setPopup(popup) // sets a popup on this marker
                                .addTo(map);

                        document.getElementById('dropdown').style.display = 'none';
                        console.log("marker1")
                        console.log(marker);

                        marker._element.innerHTML = "";
                        if(markers1) {
                            clearMarkers(markers1);
                        }
                        if (marker1) {
                            clearMarker(marker1);
                        }

                        map.flyTo({
                            center: [
                                coordenadas[1],
                                coordenadas[0]
                            ],
                            zoom: tipo,
                            essential: true // this animation is considered essential with respect to prefers-reduced-motion
                        });
                    }
                });
            });
}

/*Recupera la lista de tc_scian_2018 y con lista se obtienen todas las 
 empresas que hay en México del 2018 sirve para asignársela a la 
 funcionalidad del botón de busqueda*/
function getTcScian() {
    //fetch to json
    fetch('resources/imagenes_2/resource/tc_scian_2018_202309141411.json')
            .then((response) => response.json())
            .then((json) => {
                tc_scian_2018 = json.tc_scian_2018;
            });
    return tc_scian_2018;
}

/*Asignas tu apiKey al mapa que creaste desde el api de búsqueda.
 Recibe como parámetro el apiKey del usuario.*/
function setApiKey(apiKey) {
    return maplibregl.config.apiKey = apiKey;
}

/*Función para crear un mapa con varias funcionalidades.*/
function createMap(apiKey, attributionControl, terrainControl, scaleControl, fullscreenControl, geolocateControl, navigationControl, zoom, maxzoom, minzoom, center) {
    maplibregl.config.apiKey = apiKey;

    const map = new maplibregl.Map({
        container: "map",
        attributionControl: attributionControl,
        terrainControl: terrainControl,
        scaleControl: scaleControl,
        fullscreenControl: fullscreenControl,
        geolocateControl: geolocateControl,
        navigationControl: navigationControl, //disable the navigation control
        style: {
            version: 8,
            sources: {},
            layers: []
        },
        zoom: zoom,
        maxzoom: maxzoom,
        minzoom: minzoom,
        center: center, // starting position [lng, lat]
        geolocate: maplibregl.GeolocationType.POINT
    });

    return map;
}


/*Función para crear el mapa mas simple de mapLibre.*/
function createSimpleMap(apiKey, center, zoom) {
    maplibregl.config.apiKey = apiKey;

    const map = new maplibregl.Map({
        container: 'map', // container's id or the HTML element in which the SDK will render the map
        style: maplibregl.MapStyle.STREETS,
        center: center, // starting position [lng, lat]
        zoom: zoom // starting zoom
    });

    return map;
}

/*Recupera una lista de coordenadas extend. Recibe de parámetro bounds.*/
function getExtentCoordinatesFromBounds(bounds) {
    return [
        bounds.getNorthWest().toArray(),
        bounds.getNorthEast().toArray(),
        bounds.getSouthEast().toArray(),
        bounds.getSouthWest().toArray()
    ];
}

/*Recupera la lista del extend donde conviertes las coordenadas bounds a 
 wextend130. Recibe como parámetro bounds.*/
function wmsExtent130FromBounds(bounds) {
    var sm = new SphericalMercator({
        size: 256
    });
    return [
        ...sm.forward(bounds.getSouthWest().toArray()),
        ...sm.forward(bounds.getNorthEast().toArray())
    ];
}

/*Recupera la lista de extend simple para dar funcionalidad al método de 
 busqueda.*/
function getExtent(bounds) {
    return [
        bounds.getSouthWest().toArray(),
        bounds.getNorthEast().toArray()
    ];
}

/*Método que sirve para borrar una lista de markers. Recibe de parámetros la 
 markers.*/
function clearMarkers(markers) {
    if(markers) {
        markers.forEach((marker) => marker.remove());
        markers = [];
    }
}

/*Método que sirve para borrar un marker. Recibe de parámetros marker.*/
function clearMarker(marker) {
    if(marker) {
        marker.remove();
    }
}

/*Recupera la lista de bounds que sirve oara poder obtener los extend de las 
 coordenadas.*/
function getBounds(map) {
    var myBounds = map.getBounds();
    return myBounds;
}

/*Recupera el centroide del mapa de forma dinamica.*/
function getCentroide(myBounds) {
    console.log("bounds");
    console.log(myBounds);
    return myBounds.getCenter();
}

