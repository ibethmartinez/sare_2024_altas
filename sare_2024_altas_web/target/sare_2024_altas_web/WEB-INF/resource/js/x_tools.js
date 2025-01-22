/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class x_tools {

    constructor() {}

    descaraga(url) {
        if (!document.getElementById('x_if_dw')) {
            var framedw = document.createElement('iframe');
            framedw.id = "x_if_dw";
            framedw.style.top = "0px";
            framedw.style.left = "0px";
            framedw.width = "0%";
            framedw.height = "0%";
            $('body').append(framedw);
            framedw.src = "about:blank";
            framedw.src = url;
        } else {
            framedw = document.getElementById('x_if_dw');
            framedw.src = "about:blank";
            framedw.src = url;
        }
    }

    async getGoogleToken(key) {
      
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const response = await fetch("https://tile.googleapis.com/v1/createSession?key=" + key, {
            method: "POST",
            body: JSON.stringify({
                "mapType": "satellite",
                "language": "es-MX",
                "region": "MX"}),
            headers: myHeaders
        });
        return await response.json();
        

    }
}

