import * as functions from "firebase-functions"

export const helloWorld = functions.https.onRequest((request, response) => {



  const axios = require('axios');

  
  axios
    .post('http://119.8.152.20/ws_suizaalertaapppreprod/api/login/app_fichaSintomatologica?idEmpleado=20&tipoDocumento=1&nroDocumento=1&puestoTrabajo=2&areaTrabajo=2&nroTelefono=972396963&direccion=8&fechaCreacion=2020-09-20&usuario=EDDY&idSintoma1=1&idSintoma2=1&idSintoma3=1&idSintoma4=1&idSintoma5=1&idSintoma6=1&detalles=EDDY')
    .then(res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    })

  //const axios = require('axios');

  /* const data = {
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
  }; */
  response.send("Eddy");
  /* axios.post('http://119.8.152.20/ws_suizaalertaapppreprod/api/login/app_fichaSintomatologica?idEmpleado=20&tipoDocumento=1&nroDocumento=1&puestoTrabajo=2&areaTrabajo=2&nroTelefono=972396963&direccion=8&fechaCreacion=2020-09-20&usuario=EDDY&idSintoma1=1&idSintoma2=1&idSintoma3=1&idSintoma4=1&idSintoma5=1&idSintoma6=1&detalles=EDUARDS')
      .then((res) => {
          console.log(`Status: ${res.status}`);
          console.log('Body: ', res.data);

          response.send(JSON.parse(res.data));
      }).catch((err) => {
          console.error(err);
          functions.logger.info("Error: " + err.message);
      }); */

      

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



    export const onMessageUpdate = functions.database.ref('/Proyectos/fichaSintomatologica')
    .onUpdate((change, context) => {
      //const before = change.before.val()
      const idEmpleado = change.after.val()['idEmpleado']
      const tipoDocumento = change.after.val()['tipoDocumento']
      const nroDocumento = change.after.val()['nroDocumento']
      const puestoTrabajo = change.after.val()['puestoTrabajo']
      const areaTrabajo = change.after.val()['areaTrabajo']
      const nroTelefono = change.after.val()['nroTelefono']
      const direccion = change.after.val()['direccion']
      const fechaCreacion = change.after.val()['fechaCreacion']
      const usuario = change.after.val()['usuario']
      const idSintoma1 = change.after.val()['idSintoma1']
      const idSintoma2 = change.after.val()['idSintoma2']
      const idSintoma3 = change.after.val()['idSintoma3']
      const idSintoma4 = change.after.val()['idSintoma4']
      const idSintoma5 = change.after.val()['idSintoma5']
      const idSintoma6 = change.after.val()['idSintoma6']
      const detalles = change.after.val()['detalles']

      const text = "?idEmpleado="+idEmpleado+"&tipoDocumento="+tipoDocumento+"&nroDocumento="+nroDocumento+"&puestoTrabajo="+puestoTrabajo+"&areaTrabajo="+areaTrabajo+"&nroTelefono="+nroTelefono+"&direccion="+direccion+"&fechaCreacion="+fechaCreacion+"&usuario="+usuario+"&idSintoma1="+idSintoma1+"&idSintoma2="+idSintoma2+"&idSintoma3="+idSintoma3+"&idSintoma4="+idSintoma4+"&idSintoma5="+idSintoma5+"&idSintoma6="+idSintoma6+"&detalles="+detalles


      const axios = require('axios');

      
  
      axios
        .post('http://119.8.152.20/ws_suizaalertaapppreprod/api/login/app_fichaSintomatologica'+text)
        .then(res => {
            console.log(`statusCode: ${res.statusCode}`)
        })
        .catch(error => {
            console.error(error)
        })

      /* if (before.text === after.text) {
        console.log("No ha cambiado");
        return null
      }
        
      const text = "valor"
      const timeEdited = Date.now()

      return change.after.ref.update({text,timeEdited}) */
        
      
    });