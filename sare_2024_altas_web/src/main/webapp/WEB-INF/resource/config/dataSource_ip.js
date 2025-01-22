
    var sourcesConfig = {
        proyAlias: 'Mapa Digital de México',
        proyName: 'mdm6',
        servicesVersion: '6.2',
        //mainPath: 'https://10.1.30.102:8181',
        mainPath: 'https://gaia.inegi.org.mx',
        search: {
            contentType: "application/json; charset=utf-8",        
          //  url: 'https://10.1.30.102:8181/mdmsearchengine/search',
          url: 'http://10.152.11.41/mdm_searchengine/search',
          //url: 'https://gaia.inegi.org.mx/mdm_searchengine/search',
            type: 'POST',
            dataType: "json",
            jsonp: 'json.wrf',
            params: {},
            stringify: true
        },
        exportList: {
            /*url: 'https://10.1.30.102:8181/map/export',*/
            url: 'http://10.152.11.41/NLB/tunnel/map/export',
          
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        },
        saveStats: {
                 /*url:'https://10.1.30.102:8181/map/stats/layers',*/
            url: 'http://10.152.11.41/NLB/tunnel/map/stats/layers',         
            
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        },
        share: {
            contentType: "application/json; charset=utf-8",
            /*url: 'https://10.1.30.102:8181/map/share',*/
            url: 'http://10.152.11.41/NLB/tunnel/map/share',
            type: 'POST',
            dataType: "json"
        },
        shareEmail: {
            contentType: "application/json; charset=utf-8",
            /* url: 'https://10.1.30.102:8181/map/share/email',*/
            url: 'http://10.152.11.41/NLB/tunnel/map/share/email',
            type: 'POST',
            dataType: "json"
        },
        identify: {
          /*url: 'https://10.1.30.102:8181/map/identify',*/
            url: 'http://10.152.11.41/NLB/tunnel/map/identify',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        },
        bufferLayer: {
            //url:'http://10.1.30.102:8080/TableAliasV601/consultaTotales',
          /*url: 'https://10.1.30.102:8181/map/totals',*/
            url: 'http://10.152.11.41/NLB/tunnel/map/totals',
            contentType: "application/json; charset=utf-8",
            type: 'POST',
            dataType: "json"
        },
        layersSeaIde: {
            /* url: 'https://10.1.30.102:8181/map/fieldtypes',*/
            url: 'http://10.152.11.41/NLB/tunnel/map/fieldtypes',
            contentType: "application/json; charset=utf-8",
            type: 'POST',
            dataType: "json"
        },
        identifyDetail: {
            //url:'http://10.1.30.102:8181/map/query',
            //url: 'http://gaia.inegi.org.mx/NLB/tunnel/TableAliasV60/consulta ',
            /*  url: 'https://gaia.inegi.org.mx/NLB/tunnel/map/query',*/
            url: 'http://10.152.11.41/NLB/tunnel/map/query',
            //url:'https://10.1.30.102:8080/TableAliasV601/consulta',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            field: 'busqueda'
        },
        mainSearch: {
            /*url: 'http://gaiamapas.inegi.org.mx/mdmSearchEngine/autocomplete',*/
            url: 'http://10.152.11.41/mdmSearchEngine/autocomplete',
            sfield: 'location',
            type: 'POST',
            dataType: "jsonp",
            jsonp: 'json.wrf'
        }
        ,
        crossSearch: {
            /* url: 'http://gaia.inegi.org.mx/NLB/tunnel/TableAliasV601/busqueda',*/
            url: 'http://10.152.11.41/NLB/tunnel/TableAliasV601/busqueda',
            contentType: "application/json; charset=utf-8",
            type: 'POST',
            dataType: "json"
        }, 
        deeepSearch: {
            /*  url: 'http://gaiamapas.inegi.org.mx/mdmSearchEngine/busq-ent',*/
            url: 'http://10.152.11.41:8200/mdmSearchEngine/busq-ent',
            field: 'busqueda',
            type: 'POST',
            dataType: "jsonp",
            jsonp: 'json.wrf'
        }
        ,
        deepSearchTranslate: {
            /* url: 'http://gaia.inegi.org.mx/NLB/tunnel/TableAliasV60/busqueda',*/
            url: 'http://10.152.11.41/NLB/tunnel/TableAliasV60/busqueda',
            type: 'POST',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            stringify: true,
            params: {
                tabla: 'geolocator',
                pagina: 1,
                searchCriteria: '',
                proyName: 'mdm6',
                whereTipo: ''
            }
        },
        denue: {
            url: 'https://10.1.30.101:9090/solr/denue/select',
            field: 'busqueda',
            type: 'POST',
            dataType: "jsonp",
            jsonp: 'json.wrf'
        },
        kml: {
            //save:'http://10.1.30.101:8080/GeneraKML/save2KML.do',
            //read:'http://10.1.30.101:8080/GeneraKML/readKML.do'
            /*
              save: 'https://10.1.30.102:8181/mdmexport/kml/download',
            read: 'https://10.1.30.102:8181/mdmexport/kml/upload'
             */
            save: 'http://10.152.11.41/mdmexport/kml/download',
            read: 'http://10.152.11.41/mdmexport/kml/upload'
        },
        gpx: {
            /*
             save: 'http://10.152.11.41/mdmexport/gpx/download',
            read: 'http://10.152.11.41/mdmexport/gpx/upload'
             */
            save: 'http://10.152.11.41/mdmexport/gpx/download',
            read: 'http://10.152.11.41/mdmexport/gpx/upload'
                    //save:'http://10.106.12.12:8080/Export/gpx/download',
                    //read:'http://10.106.12.12:8080/Export/gpx/upload'

        },
        geometry: {
            //store:'http://10.1.30.102:8080/TableAliasV601/SetGeometry.do',
            store: {
                /*  url: 'https://10.1.30.102:8181/map/geometry',*/
                url: 'http://10.152.11.41/NLB/tunnel/map/geometry',
                type: 'POST',
                dataType: "json",
                contentType: "application/json; charset=utf-8"

            },
            addBuffer: {
                /* url: 'https://10.1.30.102:8181/map/buffer',*/
                url: 'http://10.152.11.41/NLB/tunnel/map/buffer',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8'
            },
            restore: {
                /*     url: 'https://10.1.30.102:8181/map/wkt/geometries',*/
                url: 'http://10.152.11.41/NLB/tunnel/map/wkt/geometries',
                type: 'GET',
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            },
            //addBuffer:'http://10.1.30.102:8080/TableAliasV601/buffer.do'
        },
        timeLine: 'json/linetime.do',
        school: '', //'json/cctsAGS.json',//'http://10.1.30.102/TableAliasV60/busqueda.do',
        //Otars Url de informacion---------------------------------------------
        leyendUrl: 'https://10.152.11.6/fcgi-bin/ms62/mapserv.exe?map=/opt/map/mdm60/mdm61leyendaprueba.map&Request=GetLegendGraphic&format=image/png&Version=1.1.1&Service=WMS&LAYER=',
        synonyms: {
            list: {
                /*farmacia:['botica','drogeria'],
                 banco:['cajero'],
                 restaurant:['bar','merendero'],
                 hospital:['clinica'],
                 hotel:['motel','posada']*/
            }
        },
        routing: {
            movePoint: 'https://10.1.30.102:8181/routing/point/move'
        },
        cluster: {
            moreLevels: [2.388657133483887, 1.1943285667419434, 0.5971642833709717, 0.29858214168548586],
            enableOn: {
                layer: 'cdenue14'
            },
            recordCard: {
                url: 'http://10.152.11.41/NLB/tunnel/map/denue/label',
                type: 'POST',
                dataType: 'json'
            },
            nodes: {
                //url:'http://10.1.30.102:8181/map_etp2/denue/scian',
                url: 'http://10.152.11.41/NLB/tunnel/map/denue/scian',
                type: 'POST',
                dataType: 'json'
            },
            geometry: {
                url: 'http://10.152.11.41/NLB/tunnel/map/wkt/feature',
                type: 'POST',
                dataType: 'json'
            }
        },
        logging: 'https://10.1.32.5/SISEC2013/jerseyservices/ServicioSesionJson',
        georeferenceAddress: {
            url: 'http://10.152.11.41/NLB/tunnel/map/reversegeocoding',
            //url:'json/address.do',
            type: 'POST', //POST
            dataType: "json",
            contentType: "application/json; charset=utf-8"

        },
        mousePosition: {
            elevation: {
                url: 'http://10.152.11.41/NLB/tunnel/map/raster/elevation',
                type: 'POST',
                dataType: 'json'
            }
        },
        files: {
            download: 'https://10.1.30.102:8181/downloadfile/download'
        }
    };
