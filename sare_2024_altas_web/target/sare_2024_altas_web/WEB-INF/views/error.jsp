<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://fonts.googleapis.com/css?family=Pathway+Gothic+One" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bowser/1.9.4/bowser.min.js"></script>
  <title>ERROR</title>
  <style>
    @import url(https://fonts.googleapis.com/css?family=Righteous);
    body{ margin: 0; width: 100%; background-color: #2d384a;}
    .container-error{ display: flex; flex-direction: column; justify-content: center; align-items: center; margin: 15px 0; width: 100%; /*height: 97vh*/; }
    .container-img-error, .container-texto-error{ text-align: center; }
    .container-img-error img{ 
      width: 90%; 
      margin: 40px 0 60px 0;
      /* animation: mueve 3s linear infinite;  */
    }
    .container-texto-error h2{
      color: white;
      font-family: sans-serif;
      text-transform: uppercase;
    }

    .img-alerta{ position: absolute; bottom: 0; cursor: pointer; animation: crece 2.5s infinite; }
    h1 { display: inline-block; color: white; font-family: 'Righteous', serif; font-size: 6em; text-shadow: .03em .03em 0 hsla(230,40%,50%,1); position: relative; margin: 0;}
    h1:after { content: attr(data-shadow); position: absolute; top: .05em; left: .05em; z-index: -1; text-shadow: none; background-size: .05em .05em; -webkit-background-clip: text;-webkit-text-fill-color: transparent;
      animation: shad-anim 15s linear infinite;
      width: 100.4%;
      background-image: linear-gradient( 45deg, transparent 45%,hsla(48,20%,90%,1) 45%,hsla(48,20%,90%,1) 55%, transparent 0 );
    }

    .logo-inegi {
      width: 140px !important;
      margin-top: 80px;
    }

    .container-logo-inegi{
      text-align: center;
    }

     @keyframes crece{
      from { width: 40%; }
      50% { width: 45%; }
      to { width: 40%; }
    }

    @keyframes mueve {
      0% { transform: rotateY(0)}
      50% { transform: rotateY(-20deg)}
      100% { transform: rotateY(0)}
    }

    @keyframes shad-anim {
      0% {background-position: 0 0}
      0% {background-position: 100% -100%}
    }

    @media screen and (max-width: 768px){
      body{height: 100vh;}
      h1:after { top: .06em; left: .06em;  }

      @keyframes crece{
        from { width: 60%; }
        50% { width: 65%; }
        to { width: 60%; }
      }
    }

    @media screen and (max-width:480px){
      body{height: auto;}
      .container-img-error img{ width: 90%; }
      h1 { font-size: 3em; }
      .img-alerta{ bottom: -3px; }

      @keyframes crece{
        from { width: 95%; }
        50% { width: 100%; }
        to { width: 95%; }
      }

    }
  </style>
</head>
<body>
    
  
  <section class="container-error">
    <div class="container-img-error">
      <!-- <img src="resources/images/error-dino.png" alt="error"> -->
      <img class="logo-sare" src="resources/images/logos/logo-sare-azul.png" alt="error" />
    </div>
    
    <div class="container-texto-error">
      <h1 data-shadow='Error en los Parámetros'>Error en los Parámetros</h1>
      <h2>Agregue parámetros o reporte este problema a su administrador</h2>
    </div>
  </section>

  <div class="container-logo-inegi">
    <img class="logo-inegi" src="resources/images/logos/INEGI.png" alt="logo" />
    
  </div>
    <div class="container-texto-error" id="error-navegador" style="display: none">
        <h2>NAVEGADOR NO SOPORTADO</h2>
      <h2>Puedes descargar Chrome <a href="https://www.google.com/chrome/" target="blank">Aquí</a></h2>
    </div>
  
    
    <script>
            if(bowser.name == 'Internet Explorer' || bowser.name=='Microsoft Edge'){
                const contenedorAlertaNavegador = document.getElementById('error-navegador')
                contenedorAlertaNavegador.style.display="block"
            }
    </script>
  

</body>

</html>