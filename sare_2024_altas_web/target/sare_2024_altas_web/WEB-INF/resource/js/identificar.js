/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

/* global fetch, Swal, markero, markerIdenti */
var identificar;
var infIden = false;
//lng: -102.28388799818673, lat: 21.857106872530903

function fetchIdentificar(x, y) {
    var buffer = calculoMetricoBuffer();

    const urlTipo_el14 = "getIdentifica.do?x=" + x + "&y=" + y + "&buffer=" + Math.ceil(buffer);
    var url = `confProyecto.do?id_proyecto=1`;

    fetch(urlTipo_el14, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((resp) => {
                if (resp.datos !== null) {
                    identificar = resp.datos[0];
                }
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((res) => res.json())
                        .catch((error) => console.error("Error:", error))
                        .then((response) => {
                            if (resp.mensaje === null) {
                                document.querySelector("#Identificar").style.visibility = "visible";
                                document.querySelector("#Ficha_Btn").style.visibility = "visible";

                                infIden = true;

                                document.getElementById('idUe').innerHTML = identificar["id_ue"];//Agregar el formulario a la etiquete con el ID	
                                document.getElementById('nomEst').innerHTML = identificar["e08"];//Agregar el formulario a la etiquete con el ID	
                                document.getElementById('razonS').innerHTML = identificar["e09"];//Agregar el formulario a la etiquete con el ID	


                                Object.getOwnPropertyNames(identificar).forEach(function (val) {
                                    response.list.forEach((input) => {
                                        if (input.campo === val) {
                                            let tr = document.createElement("tr");
                                            let td1 = document.createElement("td");
                                            let td2 = document.createElement("td");
                                            tr.setAttribute('id', "Fila");//Asignar el atributo method
                                            td1.setAttribute('id', "Etiqueta");//Asignar el atributo method
                                            td2.setAttribute('id', "valor");//Asignar el atributo method
                                            td1.innerHTML = input.etiqueta_ide;
                                            td2.innerHTML = identificar[val];
                                            tr.appendChild(td1);//Agregar el objeto caja de texto Nombres al objeto formulario
                                            tr.appendChild(td2);//Agregar el objeto caja de texto Nombres al objeto formulario
                                            document.getElementById('TablaDetalle').appendChild(tr);//Agregar el formulario a la etiquete con el ID	
                                        }
                                    });
                                });
                            } else {
                                document.querySelector("#Identificar").style.visibility = "hidden";
                                document.querySelector("#Ficha_Btn").style.visibility = "hidden";
                                Swal.fire({
                                    icon: "warning",
                                    text: resp.mensaje.messages
                                });
                                markerIdenti.removeClassName('marker2');
                                infIden = false;
                                street_viewcord(21.857106872530903, -102.28388799818673);
                            }

                        });

            });
}

function calculoMetricoBuffer() {
    var buffer = x_getMetrosPpixel();
    var TOLERANCIA = 10;
    buffer = buffer * TOLERANCIA;
    return buffer;
    console.log(buffer);
}

/***xpain****/
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function x_getMetrosPpixel() {
    var ancho = $('.maplibregl-ctrl-scale').width();
    var contenido = decodeHtml($('.maplibregl-ctrl-scale').html());
    contenido = contenido.trim();
    var valor = contenido.match(/\d+/)[0];
    var unidades = contenido.match(/[a-z]*$/)[0];
    var metrosPorPixel = 1;
    switch (unidades) {
        case 'm':
            metrosPorPixel = (valor) / ancho;
            break;
        case 'km':
            metrosPorPixel = (valor * 1000) / ancho;
            break;
    }
    return metrosPorPixel;
}
/**xpain**/

function limpiaIdentif() {
    markerIdenti.removeClassName('marker2');
    infIden = false;
    document.querySelector("#Identificar").style.visibility = "hidden";
    document.querySelector("#Ficha_Btn").style.visibility = "hidden";
    markero.removeClassName('markerStreetV');
    document.querySelector("#Chincheta_punteo").style.visibility = "visible";
    document.getElementById("textAlert").innerHTML = "Seleccione establecimiento en el mapa";
    street_viewcord(21.857106872530903, -102.28388799818673);
}