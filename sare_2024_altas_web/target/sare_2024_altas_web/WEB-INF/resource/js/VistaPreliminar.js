/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*----- VARIABLES GLOBALES -----*/
bAND_Tema = "";
IconTema = "";
EtiqCristiano = "";
valor_actualizado = "";

Titul_Vp_referencia = "";
campos_Vp_referencia = "";

Titul_Vp_UbiGeografica = "";
campos_Vp_ubiGeografica = "";

Titul_Vp_Domicilio = "";
campos_Vp_domicilio = "";

Titul_Vp_Asentamiento = "";
campos_Vp_asentamiento = "";

Titul_Vp_Vialidades = "";
campos_Vp_vialidades = "";

Titul_Vp_CallePosterior = "";
campos_Vp_callePosterior = "";

Titul_Vp_Edif_CentComercial  = "";
campos_Vp_edif_centComercial = "";

Titul_Vp_Observacion = "";
campos_Vp_edif_Observacion = "";




//funcion que da estilo responsive al modal boton guardar   
function Vista_pree() {             
      
    fetch(`confProyecto.do?id_proyecto=1`, { method: "POST", headers: { "Content-type": "application/json; charset=UTF-8" }, })
            .then((response) => response.json())
            .then((data) => {
                
               //alert((data.list)); 
               //console.log(JSON.stringify(data.list));          
               
                EtiqCristiano = " ";
                valor_actualizado = " ";
               
                Titul_Vp_referencia = " ";
                campos_Vp_referencia = " ";
                
                Titul_Vp_UbiGeografica = " " ;
                campos_Vp_ubiGeografica = " ";
                
                Titul_Vp_Domicilio = " ";
                campos_Vp_domicilio = " ";
                
                Titul_Vp_Asentamiento = " ";
                campos_Vp_asentamiento = " ";
                
                Titul_Vp_Vialidades = " ";
                campos_Vp_vialidades = " ";
                
                Titul_Vp_CallePosterior = " ";
                campos_Vp_callePosterior = " ";
                
                Titul_Vp_Edif_CentComercial = " ";
                campos_Vp_edif_centComercial = " ";
                
                Titul_Vp_Observacion = " ";
                campos_Vp_edif_Observacion = " ";
                
                
                
                for (single in data.list) {
                    
                    bAND_Tema = (`${data.list[single].tema_ide}`);
                    EtiqCristiano = (`${data.list[single].campo}`);  
                        //console.log('Resultado bAND_Tema: '+ bAND_Tema);
                                                                
                        const bandera =  bAND_Tema;
                            switch (bandera) {
                               case 'Referencia':
                                        IconTema ="label";
                                         
                                        Titul_Vp_referencia = 
                                                         ` <br>
                                                           <div class='Titulo_tema'> 
                                                               <h3 style='text-align:center;font-family:monospace'>
                                                                       <i class='material-icons Medium' style='display:contents !important;line-height:2.8;font-size:21px'> 
                                                                           ${IconTema} 
                                                                       </i>                                                                    
                                                                   ${data.list[single].tema_ide} 
                                                               </h3> 
                                                           </div> 
                                                           <br>
                    
                                                           <div class='row'>
                                                         `;  
                    
                                                   Object.getOwnPropertyNames(datos).forEach(function (valor, idx, array) {
                                                         
                                                           let value = datos[valor];
                                                         
                                                               if( array[idx] == EtiqCristiano){

                                                                   valor_actualizado = value;
                                                                   
                                                                      if( value === null){
                                                                              valor_actualizado = " ";
                                                                      } 
                                                              }
                                                   });                                      
                                                
                                      //console.log(datos);  
                                      campos_Vp_referencia += ` <div class='Campos col-sm-6'> <span class='etiqueta_titulo'><strong> ${data.list[single].etiqueta_ide}: </strong></span> &nbsp ${valor_actualizado} </div>`;                                                                                                                                                                          
                               break;
                                
                               case 'Ubicación Geográfica':
                                        
                                         IconTema ="gps_fixed";
                                        
                                           Titul_Vp_UbiGeografica = 
                                                         ` <br>
                                                           <div class='Titulo_tema'> 
                                                               <h3 style='text-align:center;font-family:monospace'>
                                                                       <i class='material-icons Medium' style='display:contents !important;line-height:2.8;font-size:21px'> 
                                                                           ${IconTema} 
                                                                       </i>                                                                    
                                                                   ${data.list[single].tema_ide} 
                                                               </h3> 
                                                           </div> 
                                                           <br>
                        
                                                           <div class='row'>
                                                         `;
                        
                                                   Object.getOwnPropertyNames(datos).forEach(function (valor, idx, array) {
                                                         
                                                           let value = datos[valor];

                                                               if( array[idx] == EtiqCristiano){

                                                                   valor_actualizado = value;
                                                                   
                                                                       if( value === null){
                                                                              valor_actualizado = " ";
                                                                      } 
                                                              }
                                                   });  
                                                                                                                                
                                     campos_Vp_ubiGeografica += ` <div class='Campos col-sm-6'> <span class='etiqueta_titulo'><strong> ${data.list[single].etiqueta_ide}: </strong></span> &nbsp ${valor_actualizado} </div>`;   
                               break;
                                
                               case 'Domicilio':
                                        IconTema ="home";
                                        
                                        Titul_Vp_Domicilio =
                                                       ` <br>
                                                           <div class='Titulo_tema'> 
                                                               <h3 style='text-align:center;font-family:monospace'>
                                                                       <i class='material-icons Medium' style='display:contents !important;line-height:2.8;font-size:21px'> 
                                                                           ${IconTema} 
                                                                       </i>                                                                    
                                                                   ${data.list[single].tema_ide} 
                                                               </h3> 
                                                           </div> 
                                                           <br>
                            
                                                           <div class='row'>
                                                         `;
                                       
                                                       Object.getOwnPropertyNames(datos).forEach(function (valor, idx, array) {
                                                         
                                                           let value = datos[valor];                                                                                                                     

                                                               if( array[idx] == EtiqCristiano){
                                                                        
                                                                  valor_actualizado = value;
                                                                  
                                                                       if( value === null){
                                                                              valor_actualizado = " ";
                                                                      }                                                                                                                                    
                                                              }
                                                      }); 
                                                      
                                      campos_Vp_domicilio += ` <div class='Campos col-sm-6'> <span class='etiqueta_titulo'><strong> ${data.list[single].etiqueta_ide}: </strong></span> &nbsp ${valor_actualizado} </div>`;                
                               break;
                                
                               case 'Asentamiento':
                                        IconTema ="person_pin_circle";
                                        
                                        Titul_Vp_Asentamiento =
                                                       ` <br>
                                                           <div class='Titulo_tema'> 
                                                               <h3 style='text-align:center;font-family:monospace'>
                                                                       <i class='material-icons Medium' style='display:contents !important;line-height:2.8;font-size:21px'> 
                                                                           ${IconTema} 
                                                                       </i>                                                                    
                                                                   ${data.list[single].tema_ide} 
                                                               </h3> 
                                                           </div> 
                                                           <br>
                                
                                                           <div class='row'>
                                                       `;
                                                                                       
                                                       Object.getOwnPropertyNames(datos).forEach(function (valor, idx, array) {
                                                         
                                                           let value = datos[valor];

                                                               if( array[idx] == EtiqCristiano){

                                                                   valor_actualizado = value;
                                                                   
                                                                      if( value === null){
                                                                              valor_actualizado = " ";
                                                                      } 
                                                              }
                                                      }); 
                                                      
                                      campos_Vp_asentamiento += ` <div class='Campos col-sm-6'> <span class='etiqueta_titulo'><strong> ${data.list[single].etiqueta_ide}: </strong></span> &nbsp ${valor_actualizado} </div>`; 
                                      
                               break;
                                
                               case 'Entre vialidades':
                                        IconTema ="crop";
                                        
                                        Titul_Vp_Vialidades = 
                                                       ` <br>
                                                           <div class='Titulo_tema'> 
                                                               <h3 style='text-align:center;font-family:monospace'>
                                                                       <i class='material-icons Medium' style='display:contents !important;line-height:2.8;font-size:21px'> 
                                                                           ${IconTema} 
                                                                       </i>                                                                    
                                                                   ${data.list[single].tema_ide} 
                                                               </h3> 
                                                           </div> 
                                                           <br>
                                    
                                                          <div class='row'>
                                                      `;                                                                     
                                     
                                                       Object.getOwnPropertyNames(datos).forEach(function (valor, idx, array) {
                                                         
                                                           let value = datos[valor];

                                                               if( array[idx] == EtiqCristiano){

                                                                   valor_actualizado = value;
                                                                   
                                                                       if( value === null){
                                                                              valor_actualizado = " ";
                                                                      } 
                                                              }
                                                      }); 
                                                      
                                      campos_Vp_vialidades += ` <div class='Campos col-sm-6'> <span class='etiqueta_titulo'><strong> ${data.list[single].etiqueta_ide}: </strong></span> &nbsp ${valor_actualizado} </div>`;                                                                           
                               break;
                                
                               case 'Calle posterior':
                                        IconTema ="crop_rotate";
                                        var col =" ";
                                        var Text_area1 =" ";
                                        var Text_area2 =" ";
                                                                              
                                        Titul_Vp_CallePosterior = 
                                                        ` <br>
                                                           <div class='Titulo_tema'> 
                                                               <h3 style='text-align:center;font-family:monospace'>
                                                                       <i class='material-icons Medium' style='display:contents !important;line-height:2.8;font-size:21px'> 
                                                                           ${IconTema} 
                                                                       </i>                                                                    
                                                                   ${data.list[single].tema_ide} 
                                                               </h3> 
                                                           </div> 
                                                           <br>
                                        
                                                           <div class='row'>
                                                        `;
                                                       
                                                       
                                                        Object.getOwnPropertyNames(datos).forEach(function (valor, idx, array) {
                                                         
                                                           let value = datos[valor];

                                                               if( array[idx] == EtiqCristiano){ 

                                                                   valor_actualizado = value;
                                                                   
                                                                      if( value === null){
                                                                              valor_actualizado = " ";
                                                                      } 
                                                              }
                                                              
                                                               if( EtiqCristiano == "te19"){                                                                                                 
                                                                      col = "col-sm-12";
                                                                      Text_area1 = "<textarea disabled rows='2' cols='215'>";
                                                                      Text_area2 = "</textarea>";                                                                    
                                                              }
                                                               else{
                                                                      col = "col-sm-6";
                                                                      Text_area1 = " ";
                                                                      Text_area2 = " ";                                                                   
                                                              }
                                                      }); 
                                                      
                                      campos_Vp_callePosterior += ` <div class='Campos ${col}'> <span class='etiqueta_titulo'><strong> ${data.list[single].etiqueta_ide}: </strong></span> &nbsp ${Text_area1} ${valor_actualizado} ${Text_area2}</div>`;                                                                                                      
                               break;
                                
                               case 'Edificio, centro comercial':
                                        IconTema ="location_city";
                                        
                                        Titul_Vp_Edif_CentComercial =
                                                      ` <br>
                                                           <div class='Titulo_tema'> 
                                                               <h3 style='text-align:center;font-family:monospace'>
                                                                       <i class='material-icons Medium' style='display:contents !important;line-height:2.8;font-size:21px'> 
                                                                           ${IconTema} 
                                                                       </i>                                                                    
                                                                   ${data.list[single].tema_ide} 
                                                               </h3> 
                                                           </div> 
                                                           <br>
                                            
                                                           <div class='row'>
                                                      `;
                                                                                       
                                               Object.getOwnPropertyNames(datos).forEach(function (valor, idx, array) {
                                                         
                                                           let value = datos[valor];

                                                               if( array[idx] == EtiqCristiano){

                                                                   valor_actualizado = value;
                                                                   
                                                                       if( value === null){
                                                                              valor_actualizado = " ";
                                                                      } 
                                                              }
                                                      }); 
                                                      
                                     campos_Vp_edif_centComercial += ` <div class='Campos col-sm-6'> <span class='etiqueta_titulo'><strong> ${data.list[single].etiqueta_ide}: </strong></span> &nbsp ${valor_actualizado} </div>`;                                                                 
                               break;
                                
                               case 'Observación':
                                        IconTema ="edit";
                                        
                                        Titul_Vp_Observacion =
                                                      ` <br>
                                                           <div class='Titulo_tema'> 
                                                               <h3 style='text-align:center;font-family:monospace'>
                                                                       <i class='material-icons Medium' style='display:contents !important;line-height:2.8;font-size:21px'> 
                                                                           ${IconTema} 
                                                                       </i>                                                                    
                                                                   ${data.list[single].tema_ide} 
                                                               </h3> 
                                                           </div> 
                                                           <br>
                                                
                                                           <div class='row'>
                                                      `;
                                      
                                      
                                                       Object.getOwnPropertyNames(datos).forEach(function (valor, idx, array) {
                                                         
                                                           let value = datos[valor];

                                                               if( array[idx] == EtiqCristiano){

                                                                   valor_actualizado = value;
                                                                   
                                                                       if( value === null){
                                                                              valor_actualizado = " ";
                                                                      } 
                                                              }
                                                      }); 
                                                      
                                     campos_Vp_edif_Observacion += ` <div class='Campos col-sm-12'> <span class='etiqueta_titulo'><strong> ${data.list[single].etiqueta_ide}: </strong></span> &nbsp <textarea disabled rows='2' cols='215'> ${valor_actualizado} </textarea></div>`;                                                                                                      
                               break;
                                  
                               
                               default:
                                   
                                  console.log(`no entro a ninguna opcion ${bandera}.`);
                          }
                    
                        

                       if (bAND_Tema == "json validacion" ) {
                           // alert('ENTRO A LA VALIDACION BANDERA TEMA EXECPCION: ' + bAND_Tema);
                      }                                                                                                 
               }
               
           document.getElementById("Contenedor_Vistapre").innerHTML = Titul_Vp_referencia + campos_Vp_referencia +"</div>"+ Titul_Vp_UbiGeografica + campos_Vp_ubiGeografica +"</div>"+ Titul_Vp_Domicilio + campos_Vp_domicilio +"</div>"+ Titul_Vp_Asentamiento + campos_Vp_asentamiento +"</div>"+ Titul_Vp_Vialidades + campos_Vp_vialidades +"</div>"+ Titul_Vp_CallePosterior + campos_Vp_callePosterior +"</div>"+ Titul_Vp_Edif_CentComercial + campos_Vp_edif_centComercial +"</div>"+ Titul_Vp_Observacion + campos_Vp_edif_Observacion +"</div>";                              
        });           

}



    function genera_Vistapreevia(datos) {
        //console.log({'xpain':Object.keys(data.list[0])});
            var campos = Object.keys(datos.list[0]);
            var bander = " ";
            var innerHTML = " <div class='Titulo_tema'> <h3 style='text-align:center;font-family:monospace'> <i class='material-icons Medium' style='display:contents!important;line-height:2.8;font-size:21px'>label </i>";
                             
                for (Contador in campos) {
                    
                  console.log(campos[Contador]);                  
               }
               
             innerHTML += " </h3> </div> ";
      return innerHTML;        
   }