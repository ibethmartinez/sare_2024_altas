var MapConfig = {
        layers:[
            
            {
                    type:'Wms',
                    label:'Vectorial',		             
                    url:'https://10.1.33.123/fcgi-bin/ms62/mapserv.exe?map=/opt/map/mdm60/mdm6Ecoseg.map&',
                    tiled:false,
                    format:'png'
            },
            {
                    type:'Wms',
                    label:'Text',		             
                    url:'https://10.1.30.102/fcgi-bin/mapserv.exe?map=/opt/map/mdm6texto.map&',
                    tiled:false,
                    format:'png'
            },
			{
                    type:'Wms',
                    label:'colibri',		             
                    url:'https://10.1.33.123/fcgi-bin/ms62/mapserv.exe?map=/opt/map/mdm60/mdm6Ecoseg.map&',
                    tiled:false,
                    format:'png'
            }
        ],
        projection:"EPSG:4326",
        initialExtent:{lon:[-120.9103, 10.9999 ],lat:[-83.3810,34.5985]},
        restrictedExtent:{lon:[-120.9103, 10.9999 ],lat:[-83.3810,34.5985]},
        resolutions:[4891.969809375,2445.9849046875,1222.99245234375,611.496226171875,305.7481130859375,152.87405654296876,76.43702827148438,38.21851413574219,19.109257067871095,9.554628533935547,4.777314266967774,2.388657133483887,1.1943285667419434,0.5971642833709717,0.29858214168548586,0.14929107084274293,0.074645535421371465,0.0373227677106857325],
         buffers:{
                limit:'1000'
        },
        timeLine:{
          base:{
               url:'http://10.1.30.102/fcgi-bin/mapserv.exe?map=/opt/map/mercator.map',
               layer:'c104'
           },
           layers:'http://10.1.30.102/fcgi-bin/mapserv.exe?map=/opt/map/mercator.map&'
       }
    }
                  
