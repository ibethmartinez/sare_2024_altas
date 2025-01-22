<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.io.FileInputStream"%>
<%@page import="java.io.File"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.net.URL"%>
<%@page import="java.io.FileReader"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="java.security.MessageDigest"%>
<%@ page language="java" %>
<%
    String googleKeyProd = "AIzaSyBlPrF-7FLAC-MXJmyG5HegFy7qqm_K--g";
    String googleKeyDesa = "AIzaSyB62Uu-f90rs8RZZSQ5Iyyv--k7iYIRt88";
    String googleKey;
    String hostName = request.getServerName();
    if (hostName.contains("inegi.org.mx") || hostName.contains("ce2024.inegi.org.mx")) {
        googleKey = googleKeyProd;
    } else {
        googleKey = googleKeyDesa;
    }
%>


<%
String entonnoConexionBD= (String) session.getAttribute("entonnoConexionBD");
%>

<%
    String rutaMapaBase = request.getServletContext().getRealPath("/WEB-INF/resource/js/mapaBase.js");
    String archivoMapaBase = getArchivo(rutaMapaBase);
    String versionMapaBase = getMD5(archivoMapaBase);

    String rutaIdentificar = request.getServletContext().getRealPath("/WEB-INF/resource/js/identificar.js");
    String archivoIdentificar = getArchivo(rutaIdentificar);
    String versionIdentificar = getMD5(archivoIdentificar);

    String rutaPrincipal = request.getServletContext().getRealPath("/WEB-INF/resource/css/Principal.css");
    String archivoPrincipal = getArchivo(rutaPrincipal);
    String versionPrincipal = getMD5(archivoPrincipal);

    String rutaBusquedaJs = request.getServletContext().getRealPath("/WEB-INF/resource/js/libreriaLupita/busqueda.js");
    String archivoBusquedaJs = getArchivo(rutaBusquedaJs);
    String versionBusquedaJs = getMD5(archivoBusquedaJs);

    String rutaBusquedaCss = request.getServletContext().getRealPath("/WEB-INF/resource/js/libreriaLupita/busqueda.css");
    String archivoBusquedaCss = getArchivo(rutaBusquedaCss);
    String versionBusquedaCss = getMD5(archivoBusquedaCss);

    String rutaGet = request.getServletContext().getRealPath("/WEB-INF/resource/js/get.js");
    String archivoGet = getArchivo(rutaGet);
    String versionGet = getMD5(archivoGet);

    String rutaSidebar = request.getServletContext().getRealPath("/WEB-INF/resource/js/libreriaLupita/sidebar.css");
    String archivoSidebar = getArchivo(rutaSidebar);
    String versionSidebar = getMD5(archivoSidebar);

    String rutaIconos = request.getServletContext().getRealPath("/WEB-INF/resource/js/libreriaLupita/iconos.css");
    String archivoIconos = getArchivo(rutaIconos);
    String versionIconos = getMD5(archivoIconos);
    
    String ruta_jquery_min = request.getServletContext().getRealPath("/WEB-INF/resource/js/jquery/3.6.0/jquery-3.6.0.min.js");
    String archivo_jquery_min = getArchivo(ruta_jquery_min);
    String version_jquery_min = getMD5(archivo_jquery_min);
                                                                                   
    String ruta_jquery_ui_min = request.getServletContext().getRealPath("/WEB-INF/resource/js/jquery/jquery-ui-1.13.2.custom/jquery-ui.min.js");
    String archivo_jquery_ui_min = getArchivo(ruta_jquery_ui_min);
    String version_jquery_ui_min = getMD5(archivo_jquery_ui_min);
                                                                                
    String ruta_jquery_ui_min_css = request.getServletContext().getRealPath("/WEB-INF/resource/js/jquery/jquery-ui-1.13.2.custom/jquery-ui.min.css");
    String archivo_jquery_ui_min_css = getArchivo(ruta_jquery_ui_min_css);
    String version_jquery_ui_min_css = getMD5(archivo_jquery_ui_min_css);
                                                                                      
    String ruta_popper = request.getServletContext().getRealPath("/WEB-INF/resource/js/popper.min.js");
    String archivo_popper = getArchivo(ruta_popper);
    String version_popper = getMD5(archivo_popper);
                                                                           
    String ruta_qunit = request.getServletContext().getRealPath("/WEB-INF/resource/css/qunit-1.11.0.css"); 
    String archivo_qunit = getArchivo(ruta_qunit);
    String version_qunit = getMD5(archivo_qunit); 
       
    String ruta_Bootstrap = request.getServletContext().getRealPath("/WEB-INF/resource/css/bootstrap.min.css");
    String archivo_Bootstrap = getArchivo(ruta_Bootstrap);
    String version_Bootstrap = getMD5(archivo_Bootstrap);
    
    String ruta_Material_Icons = request.getServletContext().getRealPath("/WEB-INF/resource/css/Material_Icons.css");
    String archivo_Material_Icons = getArchivo(ruta_Material_Icons);
    String version_Material_Icons = getMD5(archivo_Material_Icons);
    
    String ruta_ListadoCarga = request.getServletContext().getRealPath("/WEB-INF/resource/js/ListadoCarga_paginado.js");
    String archivo_ListadoCarga = getArchivo(ruta_ListadoCarga);
    String version_ListadoCarga = getMD5(archivo_ListadoCarga);

    String ruta_VistaPreliminar = request.getServletContext().getRealPath("/WEB-INF/resource/js/VistaPreliminar.js");
    String archivo_VistaPreliminar = getArchivo(ruta_VistaPreliminar);
    String version_VistaPreliminar = getMD5(archivo_VistaPreliminar);
    
    String ruta_cloudflareAjax = request.getServletContext().getRealPath("/WEB-INF/resource/css/Mdb.min_cloudflareAjax.css");
    String archivo_cloudflareAjax = getArchivo(ruta_cloudflareAjax);
    String version_cloudflareAjax = getMD5(archivo_cloudflareAjax);
    
    String ruta_estructura_grid = request.getServletContext().getRealPath("/WEB-INF/resource/css/estructura_grid.css"); 
    String archivo_estructura_grid = getArchivo(ruta_estructura_grid);
    String version_estructura_grid = getMD5(archivo_estructura_grid);
    
    String ruta_materialize_min = request.getServletContext().getRealPath("/WEB-INF/resource/css/materialize.min.css"); 
    String archivo_materialize_min = getArchivo(ruta_materialize_min);
    String version_materialize_min = getMD5(archivo_materialize_min);
    
    String ruta_media_diseño = request.getServletContext().getRealPath("/WEB-INF/resource/css/media_diseño_elementos.css"); 
    String archivo_media_diseño = getArchivo(ruta_media_diseño);
    String version_media_diseño = getMD5(archivo_media_diseño);

    String ruta_funciones_onload =request.getServletContext().getRealPath("/WEB-INF/resource/js/funciones_onload.js");
    String archivo_funciones_onload = getArchivo(ruta_funciones_onload);
    String version_funciones_onload = getMD5(archivo_funciones_onload);

    String ruta_bootstrap_paginator =request.getServletContext().getRealPath("/WEB-INF/resource/js/bootstrap-paginator.js");
    String archivo_bootstrap_paginator = getArchivo(ruta_bootstrap_paginator);
    String version_bootstrap_paginator = getMD5(archivo_bootstrap_paginator);

    String ruta_bootstrap_qunit =request.getServletContext().getRealPath("/WEB-INF/resource/js/qunit-1.11.0.js");
    String archivo_bootstrap_qunit = getArchivo(ruta_bootstrap_qunit);
    String version_bootstrap_qunit = getMD5(archivo_bootstrap_qunit);
    
    String ruta_leaflet_css =request.getServletContext().getRealPath("/WEB-INF/resource/js/leaflet_/leaflet.css"); 
    String archivo_leaflet_css = getArchivo(ruta_leaflet_css);
    String version_leaflet_css = getMD5(archivo_leaflet_css);
    
    String ruta_leaflet_js =request.getServletContext().getRealPath("/WEB-INF/resource/js/leaflet_/leaflet.js"); 
    String archivo_leaflet_js = getArchivo(ruta_leaflet_js);
    String version_leaflet_js = getMD5(archivo_leaflet_js);

    String ruta_leaflet_wellknown =request.getServletContext().getRealPath("/WEB-INF/resource/js/leaflet/wellknown.js"); 
    String archivo_leaflet_wellknown = getArchivo(ruta_leaflet_wellknown);
    String version_leaflet_wellknown = getMD5(archivo_leaflet_wellknown);

    String ruta_proj4js =request.getServletContext().getRealPath("/WEB-INF/resource/js/proj4js-2.11.0/distt/proj4.js"); 
    String archivo_proj4js = getArchivo(ruta_proj4js);
    String version_proj4js = getMD5(archivo_proj4js);

    String ruta_sphericalMercator_mapbox =request.getServletContext().getRealPath("/WEB-INF/resource/js/sphericalMercator_mapbox.js"); 
    String archivo_sphericalMercator_mapbox = getArchivo(ruta_sphericalMercator_mapbox);
    String version_sphericalMercator_mapbox = getMD5(archivo_sphericalMercator_mapbox);

    String ruta_funcionesBloqueados =request.getServletContext().getRealPath("/WEB-INF/resource/js/funcionesBloqueados.js"); 
    String archivo_funcionesBloqueados = getArchivo(ruta_funcionesBloqueados);
    String version_funcionesBloqueados = getMD5(archivo_funcionesBloqueados);

    String ruta_reportes =request.getServletContext().getRealPath("/WEB-INF/resource/js/reportes.js"); 
    String archivo_reportes = getArchivo(ruta_reportes);
    String version_reportes = getMD5(archivo_reportes);
                                                                           
    String ruta_Bootstrap_Jsdelivr =request.getServletContext().getRealPath("/WEB-INF/resource/js/Bootstrap.Jsdelivr.min.js"); 
    String archivo_Bootstrap_Jsdelivr = getArchivo(ruta_Bootstrap_Jsdelivr);
    String version_Bootstrap_Jsdelivr = getMD5(archivo_Bootstrap_Jsdelivr);
                                                                                         
    String ruta_sweetalert = request.getServletContext().getRealPath("/WEB-INF/resource/js/cdn.jsdelivr.sweetalert.js"); 
    String archivo_sweetalert = getArchivo(ruta_sweetalert);
    String version_sweetalert = getMD5(archivo_sweetalert);
    
    String ruta_x_tools = request.getServletContext().getRealPath("/WEB-INF/resource/js/x_tools.js"); 
    String archivo_x_tools = getArchivo(ruta_x_tools);
    String version_x_tools = getMD5(archivo_x_tools);
%>

<%!
    public String getArchivo(String rurta) {
        BufferedReader br = null;
        String everything = "nada";
        try {
            br = new BufferedReader(new FileReader(rurta));
            StringBuilder sb2 = new StringBuilder();
            String line2 = br.readLine();

            while (line2 != null) {
                sb2.append(line2);
                sb2.append(System.lineSeparator());
                line2 = br.readLine();
            }
            everything = sb2.toString();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (br != null) {
                    br.close();
                }
            } catch (Exception e) {
            }
        }
        return everything;
    }
%>

<%!
    public String getMD5(String rurta) throws Exception {
        String regreso = "nada";
        String plainText = rurta;
        MessageDigest mdAlgorithm = MessageDigest.getInstance("MD5");
        mdAlgorithm.update(plainText.getBytes());

        byte[] digest = mdAlgorithm.digest();
        StringBuffer hexString = new StringBuffer();

        for (int i = 0; i < digest.length; i++) {
            plainText = Integer.toHexString(0xFF & digest[i]);

            if (plainText.length() < 2) {
                plainText = "0" + plainText;
            }

            hexString.append(plainText);
        }

        return hexString.toString();
    }
%>


<html>
    <head>       
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">       
        <title>SARE_2024</title>

        <!-- librerias estilos css -->
        <link href="resources/css/Principal.css?version=<%=versionPrincipal%>" rel="stylesheet" type="text/css"/>

        <!-- Jquery -->
        <script src="resources/js/jquery/3.6.0/jquery-3.6.0.min.js?version=<%=version_jquery_min%>" type="text/javascript"></script>
        <script src="resources/js/jquery/jquery-ui-1.13.2.custom/jquery-ui.min.js?version=<%=version_jquery_ui_min%>" type="text/javascript"></script> 
        <link href="resources/js/jquery/jquery-ui-1.13.2.custom/jquery-ui.min.css?version=<%=version_jquery_ui_min_css%>" rel="stylesheet" type="text/css"/>
        <script src="resources/js/popper.min.js?version=<%=version_popper%>" type="text/javascript"></script> 
        <link href="resources/css/qunit-1.11.0.css?version=<%=version_qunit%>" rel="stylesheet" type="text/css"/> 

        <!-- MapLibre -->
        <link href="resources/js/mapLibre-gl_js/maplibre-gl.css" rel="stylesheet" type="text/css"/>
        <script src="resources/js/mapLibre-gl_js/maplibre-gl.js" type="text/javascript"></script>
        <link href="resources/css/maptiler-sdk.css" rel="stylesheet" type="text/css"/>
        <script src="resources/js/maptiler-sdk.umd.min.js" type="text/javascript"></script>
       
        <!-- Bootstrap -->      
        <link href="resources/css/bootstrap.min.css?version=<%=version_Bootstrap%>" rel="stylesheet" type="text/css" crossorigin="anonymous"/>

        <!-- Materialize_icons -->
        <link href="resources/css/Material_Icons.css?version=<%=version_Material_Icons%>" rel="stylesheet" type="text/css"/>
        <link href="resources/css/materialize.min.css?version=<%=version_materialize_min%>" rel="stylesheet" type="text/css"/>

        <!-- Libreria Oscar--> 
        <script src="resources/js/ListadoCarga_paginado.js?version=<%=version_ListadoCarga%>" type="text/javascript"></script>
        <script src="resources/js/VistaPreliminar.js?version=<%=version_VistaPreliminar%>" type="text/javascript"></script>  
        <!-- MDB -->
        <link href="resources/css/Mdb.min_cloudflareAjax.css?version=<%=version_cloudflareAjax%>" rel="stylesheet" type="text/css"/>
        <link href="resources/css/estructura_grid.css?version=<%=version_estructura_grid%>" rel="stylesheet" type="text/css"/>

        <!-- Libreria Lupita --> 
        <script src="resources/js/identificar.js?version=<%=versionIdentificar%>" type="text/javascript"></script>
        <script src="resources/js/mapaBase.js?version=<%=versionMapaBase%>" type="text/javascript"></script>   
        <script src="resources/js/get.js?version=<%=versionGet%>" type="text/javascript"></script>
        <link href="resources/js/libreriaLupita/busqueda.css?version=<%=versionBusquedaCss%>" rel="stylesheet" type="text/css"/>
        <script src="resources/js/libreriaLupita/busqueda.js?version=<%=versionBusquedaJs%>" type="text/javascript"></script>
        <link href="resources/js/libreriaLupita/iconos.css?version=<%=versionIconos%>" rel="stylesheet" type="text/css"/>
        <link href="resources/js/libreriaLupita/sidebar.css?version=<%=versionSidebar%>" rel="stylesheet" type="text/css"/>

        <!--librerias luis-->
        <link href="resources/css/media_diseño_elementos.css?version=<%=version_media_diseño%>" rel="stylesheet" type="text/css"/>
        <script src="resources/js/funciones_onload.js?version=<%=version_funciones_onload%>" type="text/javascript"></script>
        <script src="resources/js/bootstrap-paginator.js?version=<%=version_bootstrap_paginator%>" type="text/javascript"></script>
        <script src="resources/js/qunit-1.11.0.js?version=<%=version_bootstrap_qunit%>" type="text/javascript"></script>


        <!-- librerias adicionales javascript -->
        <link href="resources/js/leaflet_/leaflet.css?version=<%=version_leaflet_css%>" rel="stylesheet" type="text/css"/>
        <script src="resources/js/leaflet_/leaflet.js?version=<%=version_leaflet_js%>" type="text/javascript"></script>
        <script src="resources/js/leaflet/wellknown.js?version=<%=version_leaflet_wellknown%>" type="text/javascript"></script>
        <script src="resources/js/proj4js-2.11.0/distt/proj4.js?version=<%=version_proj4js%>" type="text/javascript"></script>
        <script src="resources/js/sphericalMercator_mapbox.js?version=<%=version_sphericalMercator_mapbox%>" type="text/javascript"></script>
        <script src="resources/js/funcionesBloqueados.js?version=<%=version_funcionesBloqueados%>" type="text/javascript"></script>
        <script src="resources/js/reportes.js?version=<%=version_reportes%>" type="text/javascript"></script>
        
        <!-- x_tools-->
         <script src="resources/js/x_tools.js?version=<%=version_x_tools%>" type="text/javascript"></script> 

    </head>



    <body style="overflow: hidden" onload="initMap2();">

        <!--SECCION CONTENEDOR PRINCIPAL-->
        <div class=""  id="contenedor_principal">

            <!--SECCION ENCABEZADO HEADER-->
            <div class="Encabezado">

                <div class="Div_Img_LogoSare">                
                    <img class="Img_Logo_Sare " src="resources/imagenes_1/Logos/Sare-azul_transparent.png" alt=""/>
                </div>

                <div class="Div_Busqueda_cve">  

                    <!--Icon barra busqueda id_ue-->
                    <form id="formBusqueda" autocomplete="off" class="was-validated"> 
                        <button id="Btn_iconBusqueda_Id_ue" class="Btn_busqueda" type="submit"> <i  class="large material-icons icono_buscar " > find_in_page </i> </button> 
                        <input id="Txt_Buscar_Id_ue" class="Input_Buscador "     name="filtro" type="text" placeholder=" Buscar clave..."  class="form-control" > 

                        <span class="tooltip_buscador" style="display:none;"><img src="resources/imagenes_1/Logos/dialog-warning-symbolic_36223.png" style="width:23px;height:23px;position:relative;margin-right:5px"> Clave <strong>Id_ue</strong> no identificada </span>
                        <span class="tooltip_buscador2" style="display:none;"><img src="resources/imagenes_1/Logos/dialog-warning-symbolic_36223.png" style="width:23px;height:23px;position:relative;margin-right:8px">Formato incorrecto </span>
                    </form>


                    <!--Boton swicth-->
                    <div class="onoffswitch" id="boton_swith">                       
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="mySwitch" name="darkmode" value="yes" checked>
                            <label class="form-check-label" id="texto_denue" for="mySwitch">Denue</label> 
                        </div>
                    </div>




                    <!--Boton ver carga trabajo-->
                    <div class="btn_listado_ver contenedor_listado_ver ">

                        <span class="tooltiptext">Listado carga de trabajo</span>
                        <button type="button" id="Boton_ver" class="Btn_Listado_Ver  listado_ver " data-bs-toggle="modal" data-bs-target="#myModal" data-backdrop="static" data-keyboard="false" onclick="Listado_CargaTrabajo()"> <i  class="large material-icons"> featured_play_list</i> </button>

                    </div>       

                    <!--Usuario coordinacion login-->
                    <ul class="nav Usuario" id="user">
                        <li id="Usuar_coord" class="nav-item">

                        </li>
                    </ul>                   


                </div> 

                <!--Contenido boton modal VER-->                                        
                <div class="modal fade " style="z-index: 999" id="myModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                    <div id="modal-dialog-ver" class="modal-dialog  ">
                        <div id="modal-content-ver" class="modal-content ">

                            <!-- Modal Header -->
                            <div id="modal-header-ver" class="modal-header  " style="text-align: center">
                                <h4 id="modal-title-ver" class=" modal-title " id="staticBackdropLabel">Listado Carga Trabajo</h4>
                                <!--<button type="button" class="btn-close" data-bs-dismiss="modal"></button>-->

                                <input id="input_filtrar" onkeyup="Buscar_clave()" placeholder=" Filtrar ID_UE.." title="filtrar busqueda" >
                            </div>


                            <!-- Modal body -->
                            <div id="modal-body-ver" class="modal-body">
                                <div  id="contenedor_tabla" class="table-responsive-sm"> 
                                    <table class="table table-bordered table-sm table-hover" id="Listado">

                                        <div id="cargando" style="font-size:19px;font-weight:bolder;margin-left:50%;text-transform:capitalize"> </div> <div id="Icon_cargando" class="spinner-border" style="width:1.3rem;height:1.3rem;margin:-2% 58%"> </div>

                                    </table>
                                    <br>                                                                      
                                    <span class="tooltiptext2">N° pagina</span>
                                    <select id="select_paginado" onmouseover="tooltip_paginado()"  onmouseout="tooltip_paginado_desaparecer()"  class="form-select form-select-sm form-select-md form-select-lg w-auto py-sm-0 py-md-1 py-lg-1"  aria-label=".form-select-sm " style="float: left;display: block"  aria-label="Default select example">

                                    </select>

                                    <div id="display_pag" onclick="TablaDynamic('', '', Bandpag)"> 

                                    </div>


                                    <div id="display_pagBloqueados" onclick="TablaDinamicaCargaTrabajoBloqueados('', '', Bandpag_bloq)"> 

                                    </div>

                                </div>                                                                     
                            </div>


                            <!-- Modal footer -->
                            <div id="modal-footer-ver" class=" modal-footer " style="box-shadow:none!important;background:#ffffff!important">

                                <button  id="btn-ver" type="button" class="btn btn-danger" style="height:auto" data-bs-dismiss="modal" onclick="LimpiaContent()">cerrar</button>
                            </div>

                        </div>
                    </div>
                </div>




                <div class="topnav"> 
                    <div class="tab">
                        <div class="boton_3">
                            <button class="tablinks Btn_3 Activa_BtnPuntear boton_tab" id="Btn_Activo" onclick="openCity(event, 'Puntear')"> <img id="ImgIcon_Tabs" src="resources/Icon's_tabs/Puntear.png" alt=""/> PUNTEAR</button>                                      
                        </div>
                        <div class="boton_2">
                            <button class="tablinks Btn_2 boton_tab" id="Btn_Accion2" onclick="openCity(event, 'Vista')"> <img id="ImgIcon_Tabs" src="resources/Icon's_tabs/Vista_Calle.png" alt=""/> VISTA CALLE</button>
                        </div>
                        <div class="boton_1">
                            <button class="tablinks Btn_1 boton_tab" id="Btn_Accion1" onclick="openCity(event, 'Identificar')"> <img id="ImgIcon_Tabs" src="resources/Icon's_tabs/Identificar_01.png" alt=""/> IDENTIFICAR </button>             
                        </div>

                    </div>          
                </div>

            </div>


            <!--SECCION MAPA-->
            <div id="map" style="height:92vh; position:relative; outline:currentcolor none medium" tabindex="0">  
                <div id="Chincheta_punteo"> 
                    <i class="large material-icons iconChincheta" style="font-size:30px"> report_problem </i> 
                    <span id="textAlert" class="Texto_span"></span>
                </div>
            </div>


            <!--SECCION SIDER_BAR LATERAL-->
            <div class="Sider">

                <div id="Puntear" class="tabcontent">                      
                    <div class="conten_Acoordeon">                                   
                        <ul class="collapsible Content_UL">
                            <li class="style_li active">
                                <div class="collapsible-header Div_1"  id="divReferencia"> <i class="material-icons" style="float:left; font-size:18.5px"> label </i> &nbsp &nbsp REFERENCIA <i class="material-icons" style="float:right;cursor:pointer"> keyboard_arrow_down </i> </div> 
                                <div class="collapsible-body" id="containerRefer">
                                    <span> 
                                        <br>
                                    </span>
                                </div>
                            </li>

                            <li class="style_li">
                                <div class="collapsible-header Div_2" id="divDomicilio"> <i class="material-icons" style="float:left; font-size:18px"> home </i> &nbsp &nbsp DOMICILIO <i class="material-icons" style="float:right;cursor:pointer"> keyboard_arrow_down </i> </div>
                                <div class="collapsible-body" id="containerDomic">
                                    <span> 
                                        <br>
                                    </span>                                    
                                </div>
                            </li>

                            <li class="style_li">
                                <div class="collapsible-header Div_3"  id="divAsentamiento"> <i class="material-icons" style="float:left; font-size:18px"> person_pin_circle </i> &nbsp &nbsp ASENTAMIENTO <i class="material-icons" style="float:right;cursor:pointer"> keyboard_arrow_down </i> </div>
                                <div class="collapsible-body" id="containerAsent">
                                    <span> 
                                        <br>
                                    </span>                                    
                                </div>
                            </li>

                            <li class="style_li">
                                <div class="collapsible-header Div_3" id="divUbicacionGeog"> <i class="material-icons" style="float:left; font-size:18px"> gps_fixed </i> &nbsp &nbsp UBICACIÓN GEOGRÁFICA  <i class="material-icons" style="float:right;cursor:pointer"> keyboard_arrow_down </i> </div>
                                <div class="collapsible-body" id="containerUbiGeo">
                                    <span> 
                                        <br>
                                    </span>                                    
                                </div>
                            </li>                            

                            <li class="style_li">
                                <div class="collapsible-header Div_3" id="divEntreVialidades"> <i class="material-icons" style="float:left; font-size:18px"> crop </i> &nbsp &nbsp ENTRE VIALIDADES <i class="material-icons" style="float:right;cursor:pointer"> keyboard_arrow_down </i> </div>
                                <div class="collapsible-body" id="containerVial">
                                    <span> 
                                        <br>
                                    </span>                                    
                                </div>
                            </li>

                            <li class="style_li">
                                <div class="collapsible-header Div_3" id="divCallePosterior"> <i class="material-icons" style="float:left; font-size:18px"> crop_rotate </i> &nbsp &nbsp CALLE POSTERIOR <i class="material-icons" style="float:right;cursor:pointer"> keyboard_arrow_down </i> </div>
                                <div class="collapsible-body" id="containerCaPost">
                                    <span> 
                                        <br>
                                    </span>                                    
                                </div>
                            </li>

                            <li class="style_li">
                                <div class="collapsible-header Div_3" id="divEdificioCentroCom"> <i class="material-icons" style="float:left; font-size:18px"> location_city </i> &nbsp &nbsp EDIFICIO - CENTRO COMERCIAL <i class="material-icons" style="float:right;cursor:pointer"> keyboard_arrow_down </i> </div>
                                <div class="collapsible-body" id="containerEdif">
                                    <span> 
                                        <br>
                                    </span>                                    
                                </div>
                            </li>

                            <li class="style_li">
                                <div class="collapsible-header Div_3" id="divObservacion"> <i class="material-icons" style="float:left; font-size:18px"> edit </i> &nbsp &nbsp OBSERVACIÓN <i class="material-icons" style="float:right;cursor:pointer"> keyboard_arrow_down </i> </div>
                                <div class="collapsible-body" id="containerObse">
                                    <span> 
                                        <br>
                                    </span>                                    
                                </div>
                            </li>
                        </ul>
                    </div>                         
                </div>


                <div id="Vista"  style="height: 100%;z-index:0;" class="tabcontent">
                </div>

                <div id="Identificar" class="tabcontent">
                    <div class="row headerIdentifi" style="display:contents!important; position:absolute;">
                        <button type="button" class="btn Btn_LimpiaDatos_identi" onclick="limpiaIdentif()"> <i id="LimpiaDatos_identi"class="material-icons">highlight_off</i> </button>
                        <div class="col-sm-12 Titu_identificar"><h1>Identificación de Unidades Económicas</h1> </div>
                        <div class="col-sm-12 SubTitulo_identificar"> <h3>Establecimiento</h3> <hr></div>
                    </div>

                    <div class="row" id="contenedor_establecimiento" style="margin-bottom:200px">
                        <div class="col-sm-12 campos_Indenti"> <p class="Text_camposIdenti"><strong> Clave Unica entidades: </strong><p id="idUe"> </p> </p> </div>
                        <div class="col-sm-12 campos_Indenti"> <p class="Text_camposIdenti"><strong> Nombre Unidades: </strong><p id="nomEst"> </p> </p> </div>
                        <div class="col-sm-12 campos_Indenti"> <p class="Text_camposIdenti"><strong> Razón Social Unidades: </strong><p id="razonS"> </p> </p> </div>
                        <div class="col-sm-12 margen" id="div_TextFicha1"> <p id="TextFicha1">Ficha ampliada</p> <a id="Ficha_Btn" href="#detalles" class="btn btn-primary" data-bs-toggle="collapse"> <i id="Ficha_Icon" class="material-icons" style="font-size:25px;line-height:12px">event_note</i> </a> </div>                                
                    </div>

                    <div class="row" style="-webkit-transition:0.6s ease-in-in;display:contents!important">                                                          
                        <div id="detalles" class="collapse">
                            <div class="col-sm-12">
                                <p id="TextFicha2">Ficha ampliada</p>
                                <a id="Ficha_Btn_regresa" href="#detalles" data-bs-toggle="collapse" style="float:inline-end"> <i id="Ficha_Icon" class="material-icons" style="line-height:30px;color:#c18d85">backspace</i> </a>                                  
                            </div>

                            <div id="Content_Detalles" class="col-sm-12">
                                <table id="TablaDetalle" class="tabla_Detalle">
                                </table>
                            </div>              
                        </div>                               

                    </div>
                </div>             

                <!-- Menu flotante opciones -->
                <div class="container">
                    <input type="checkbox" id="btn-mas">

                    <div class="redes">                                                   
                        <a id="guardar" class="con-tooltip top" onclick="modal_guardar()"> <i class="large material-icons Icon_MenuFlot" style="font-size:32px"> <p class="tooltip">Guardar</p> save</i> </a>
                        <a id="cancelar" class="con-tooltip top" onclick="cancelar()"> <i class="large material-icons Icon_MenuFlot" style="font-size:32px"> <p class="tooltip">Cancelar</p> highlight_off </i> </a>
                        <!--<a id="noLocalizado" class="con-tooltip top"> <i class="large material-icons Icon_MenuFlot" style="font-size:32px"> <p class="tooltip">No localizado</p>  location_off</i> </a>-->
                        <a id="reporte" class="con-tooltip top" onclick="doAbreReporte()"> <i class="large material-icons Icon_MenuFlot" style="font-size:32px"> <p class="tooltip">Reporte</p> assignment</i> </a>
                        <a id="imprimir" class="con-tooltip top"> <i class="large material-icons Icon_MenuFlot" style="font-size:32px"> <p class="tooltip">Imprimir </p> local_printshop</i> </a>
                        <a id="claves" class="con-tooltip top" data-bs-toggle="modal" data-bs-target="#myModal"  onclick="Listado_ClavesBloqueadas()"> <i class="large material-icons Icon_MenuFlot" style="font-size:32px"> <p class="tooltip">Claves</p> https</i> </a>
                        <a id="ayuda" class="con-tooltip top" href="resources/Documento_Ayuda/Manual del Usuario -SARE -Censos Económicos 2024.pdf" download> <i class="large material-icons Icon_MenuFlot" style="font-size:32px"> <p class="tooltip">Ayuda</p> help_outline</i> </a>
                    </div>

                    <div class="btn-mas">
                        <label for="btn-mas" class="fa fa-plus"> <i id="boton_flotante" class="large material-icons" style="font-size:39px;padding-top:3px; padding-left:4px">add</i> </label>
                    </div>
                </div>

            </div> 


            <!---2°_MODAL VISTA PREELIMINAR DATOS FORMULARIO--->
            <div class="modal fade" id="Modal_Datospree" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"  >    
                <div class="modal-dialog modal-fullscreen-sm-down px-2">
                    <div id="modal-content-guardar" class=" modal-content ">

                        <!-- Modal Header -->
                        <div class="modal-header" style="justify-content:center;background:#2d384a;color:whitesmoke;margin-top:0px;letter-spacing:18px;border-radius:6px;">
                            <h1 class="modal-title" id="staticBackdropLabel" style="font-family:monospace"> VISTA PRELIMINAR</h1>                      
                        </div>

                        <!-- Modal body -->
                        <div class="modal-body" style="background:#ecedf2;color:#010101;overflow-y:scroll;overflow-x:hidden">
                            <div id="Contenedor_Vistapre">                                


                            </div>
                        </div>

                        <!-- Modal footer -->
                        <div class="modal-footer" style="justify-content: center">
                            <button type="button" class="btn btn-sm" data-bs-dismiss="modal" style="background:#2b2726;color:whitesmoke;margin: 5px 5px" onclick="guardado()">Aceptar</button>
                            <button type="button" class="btn btn-sm" data-bs-dismiss="modal" style="background:#b04254b5;color:#F1F1F1;margin: 5px 5px" onclick="cerrar()">Cancelar</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>  
    </body>


    <script>
        var G_AMBIENTE='<%=entonnoConexionBD%>';
        function loadScript(url, callback) {
            var script = document.createElement("script");
            script.type = "text/javascript";

            if (script.readyState) {
                //IE
                script.onreadystatechange = function () {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else {
                script.onload = function () {
                    callback();
                };
            }
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
        }


        //----Funcionalidad Acordeon-SiderBar---------
        $(document).ready(function () {
           
            $('.collapsible').collapsible();       
            $(".Activa_BtnPuntear").click();
            
            var url = window.location.hostname; 
           // var pattern1 = /[a-z]+/gi;
            var pattern1 = /inegi\.org\.mx/gi;
            var result1 = pattern1.test(url);          
            if(result1){ //Elimina el console.log bajo dominios nombrados tipo inegi.org.mx
                var console=window.console;
                console.log=function(){};
                window.console = console;

            }
            
              var xTools = new x_tools();
                 const respuesta= xTools.getGoogleToken('<%=googleKey%>');
                 console.log(respuesta);
            
        });

        $(".Btn_3").on("click", function (e) {
            console.log(e);

            //document.querySelector("#Chincheta_identify").style.visibility = "hidden";
            //clearMarker(markerIdenti);
            //identificarChecked = false;
            $("#Btn_Activo").css({'border-bottom': ''});
            chinchetaStreet = false;
            /*if (markero) {
             markero.removeClassName('markerStreetV');
             }*/
        });

        $('.Btn_3').click(function (e) {
            console.log(e);
            layerStreet = false;
            layerStreetOnOff(layerStreet)

            document.querySelector("#Chincheta_punteo").style.visibility = "hidden";
            infIden = false;

            chinchetaStreet = false;
            if (markerIdenti) {
                markerIdenti.removeClassName('marker2');
            }

            if (chinchetaPunteo) {
                ratifico = false;
                document.querySelector("#Chincheta_punteo").style.visibility = "visible";
            }
            /*if (markero) {
             markero.removeClassName('markerStreetV');
             }*/
            $('#Boton_ver').attr('style', 'cursor:pointer');
            $(function () {
                $('body').find('#Boton_ver').each(function () {
                    $(this).attr('disabled', false);
                });
            });

            $('#Txt_Buscar_Id_ue').attr('style', 'cursor:pointer');
            $(function () {
                $('body').find('#Txt_Buscar_Id_ue').each(function () {
                    $(this).attr('disabled', false);
                });
            });

            identificarChecked = false;
            $("#Btn_Activo").css({'background-color': '#1c4c5f'});
        });

        $('#Btn_Accion2').click(function (e) {
            console.log(e);
            layerStreet = true;
            layerStreetOnOff(layerStreet);

            document.querySelector("#Chincheta_punteo").style.visibility = "visible";
            document.getElementById("textAlert").innerHTML = "Seleccione calle a consultar en el mapa";
            chinchetaStreet = true;
            ratifico = true;
            $('#Boton_ver').attr('style', 'cursor:pointer');
            $(function () {
                $('body').find('#Boton_ver').each(function () {
                    $(this).attr('disabled', false);
                });
            });

            $('#Txt_Buscar_Id_ue').attr('style', 'cursor:pointer');
            $(function () {
                $('body').find('#Txt_Buscar_Id_ue').each(function () {
                    $(this).attr('disabled', false);
                });
            });

            identificarChecked = false;
            $("#Btn_Activo").css({'background-color': '#063142'});

        });

        $('#Btn_Accion1').click(function (e) {
            console.log(e);
            document.querySelector("#Chincheta_punteo").style.visibility = "visible";
            document.getElementById("textAlert").innerHTML = "Seleccione establecimiento en el mapa";

            if (infIden) {
                document.querySelector("#Identificar").style.visibility = "visible";
                document.querySelector("#Ficha_Btn").style.visibility = "visible";
            } else {
                document.querySelector("#Identificar").style.visibility = "hidden";
                document.querySelector("#Ficha_Btn").style.visibility = "hidden";
            }

            identificarChecked = true;
            chinchetaStreet = false;
            layerStreet = false;
            layerStreetOnOff(layerStreet);

            $('#Boton_ver').attr('style', 'cursor:not-allowed');
            $(function () {
                $('body').find('#Boton_ver').each(function () {
                    $(this).attr('disabled', 'disabled');
                });
            });

            $('#Txt_Buscar_Id_ue').attr('style', 'cursor:not-allowed');
            $(function () {
                $('body').find('#Txt_Buscar_Id_ue').each(function () {
                    $(this).attr('disabled', 'disabled');
                });
            });

            $("#Btn_Activo").css({'background-color': '#063142'});

        });


        function openCity(evt, cityName) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
  
            tabcontent[0].style.display = "none";
            tabcontent[1].style.display = "contents";
            tabcontent[2].style.display = "none";

            if (tabcontent[0].style.display === "none" || tabcontent[2].style.display === "none") {
                tabcontent[1].style.visibility = "hidden";
            } 
           
            tablinks = document.getElementsByClassName("tablinks");

            for (i = 0; i < tablinks.length; i++) {
                console.log(tablinks[i]);
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }


            document.getElementById(cityName).style.display = "grid";
            
            if(tabcontent[1].style.display === "grid"){
                tabcontent[1].style.visibility = "visible";
            }
            
            evt.currentTarget.className += " active";
            $(".conten_Acoordeon").css("display", "flex");
            //$(".style_li").className("active");            

            if (cityName === "Vista") {
                //let puntoGeografico = Merc2psgeo(datos["coor_x"], datos["coor_y"]);
                console.log(datos["coor_x"]);
                console.log(datos["coor_y"]);
                setTimeout(street_viewcord, 1000, parseFloat(datos["coor_x"]), parseFloat(datos["coor_y"]));
                //setTimeout(street_viewcord(parseFloat(datos["coor_x"]),parseFloat(datos["coor_y"])),1000);
                //street_viewcord(parseFloat(datos["coor_x"]), parseFloat(datos["coor_y"]));
            }
        }

        //----script Menu Flotante----
        $(".botonF1").hover(function () {
            $(".btn").addClass("animacionVer");
        });

        $(".contenedor").mouseleave(function () {
            $(".btn").removeClass("animacionVer");
        });


        /*---funcion para Buscar columna Id_ue tabla ver---*/
        function Buscar_clave() {
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("input_filtrar");
            filter = input.value.toUpperCase();
            table = document.getElementById("Listado");
            tr = table.getElementsByTagName("tr");

            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[0];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }




        /*---- Funcion quitar atriibuto data toggle para el icono ficha -----*/
        $(document).on('click', '#Ficha_Btn', function (event) {
            document.querySelector("#Ficha_Btn").style.visibility = "hidden";
            document.querySelector("#div_TextFicha1").style.display = "none";
        });

        $(document).on('click', '#Ficha_Btn_regresa', function (event) {
            document.querySelector("#Ficha_Btn").style.visibility = "visible";
            document.querySelector("#div_TextFicha1").style.display = "block";
        });

    </script>




    <script src="resources/js/Bootstrap.Jsdelivr.min.js?version=<%=version_Bootstrap_Jsdelivr%>" type="text/javascript"></script> 
    <script src="resources/js/cdn.jsdelivr.sweetalert.js?version=<%=version_sweetalert%>" type="text/javascript"></script>
    <script src="resources/js/materialize.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=<%=googleKey%>&callback=initMapGoogle"></script> 

</html>
