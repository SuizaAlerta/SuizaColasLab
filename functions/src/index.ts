import * as functions from "firebase-functions";

export const helloWorld = functions.https.onRequest((request, response) => {

  const axios = require('axios');

  const data = {
    idEmpleado: 21,
    tipoDocumento: 2,
    nroDocumento: '972396963',
    puestoTrabajo: 2,
    areaTrabajo: 2,
    nroTelefono: '32432432',
    direccion: 'John Doe',
    fechaCreacion: '2020-09-20',
    usuario: 'John Doe',
    idSintoma1: 1,
    idSintoma2: 1,
    idSintoma3: 1,
    idSintoma4: 1,
    idSintoma5: 1,
    idSintoma6: 1,
    detalles: 'John Doe'
  };

  axios.post('http://119.8.152.20/ws_suizaalertaapppreprod/api/login/app_fichaSintomatologica', data)
      .then((res) => {
          console.log(`Status: ${res.status}`);
          console.log('Body: ', res.data);
      }).catch((err) => {
          console.error(err);
          functions.logger.info("Error: " + err.message);
      });

      

    /* const https = require('http');

    const data = JSON.stringify({
      todo: 'Buy the milk',
    })

    const options = {
      hostname: 'yourwebsite.com',
      port: 443,
      path: '/todos',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    }

    

    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)
    
      res.on('data', (d) => {
        process.stdout.write(d)
      })
    })

    req.on('error', (error) => {
      console.error(error)
    })
    
    req.write(data)
    req.end() */


    /* https.get('http://119.8.153.52/ws_suizaalertaprod/api/medicamento/app_listarkardex?idunidadmedica=CONS%2016', (resp) => {
     let data = '';
   
     // A chunk of data has been received.
     resp.on('data', (chunk) => {
       data += chunk;
     });
   
     // The whole response has been received. Print out the result.
     resp.on('end', () => {
      functions.logger.info(JSON.parse(data));
       response.send(JSON.parse(data));
     });
   
   }).on("error", (err) => {
     console.log("Error: " + err.message);
     functions.logger.info("Error: " + err.message);
   }); */

  


});
