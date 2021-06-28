import * as functions from "firebase-functions"

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var database = admin.database();


export const helloWorld = functions.https.onRequest((request, response) => {


  const https = require('http');

    https.get('http://119.8.152.20/ws_suizaalertaapppreprod/api/login/app_obtenerempleados', (resp) => {
     let data = '';
   
     // A chunk of data has been received.
     resp.on('data', (chunk) => {
       data += chunk;
     });
   
     // The whole response has been received. Print out the result.
     resp.on('end', () => {
      //functions.logger.info(JSON.parse(data));
       response.send(JSON.parse(data));

       functions.database.ref('/Proyectos/MAE_TIPO_DOCUMENTOS').onWrite((snap, context) => {
       })

     });
   
   }).on("error", (err) => {
     console.log("Error: " + err.message);
     functions.logger.info("Error: " + err.message);
   });

  


});

exports.actualizarDatos = functions.database.ref('/Proyectos/fechaTransaccion')
  .onWrite((change, context) => {

    const https = require('http');

    https.get('http://119.8.153.52/ws_suizaalertaprod/api/login/app_obtenerempleados', (resp) => {
     let data = '';
   
     // A chunk of data has been received.
     resp.on('data', (chunk) => {
       data += chunk;
     });
   
     // The whole response has been received. Print out the result.
     resp.on('end', () => {
      //functions.logger.info(JSON.parse(data));
       database.ref('/Proyectos/MAE_EMPLEADOS/').set(JSON.parse(data));
     });
   
   }).on("error", (err) => {
     console.log("Error: " + err.message);
     functions.logger.info("Error: " + err.message);
   });

   https.get('http://119.8.153.52/ws_suizaalertaprod/api/login/app_obtenerareatrabajo', (resp) => {
     let data = '';
   
     // A chunk of data has been received.
     resp.on('data', (chunk) => {
       data += chunk;
     });
   
     // The whole response has been received. Print out the result.
     resp.on('end', () => {
      //functions.logger.info(JSON.parse(data));
       database.ref('/Proyectos/MAE_AREA_TRABAJO/').set(JSON.parse(data));
     });
   
   }).on("error", (err) => {
     console.log("Error: " + err.message);
     functions.logger.info("Error: " + err.message);
   });

   https.get('http://119.8.153.52/ws_suizaalertaprod/api/login/app_obtenerpuestotrabajo', (resp) => {
     let data = '';
   
     // A chunk of data has been received.
     resp.on('data', (chunk) => {
       data += chunk;
     });
   
     // The whole response has been received. Print out the result.
     resp.on('end', () => {
      //functions.logger.info(JSON.parse(data));
       database.ref('/Proyectos/MAE_PUESTO_TRABAJO/').set(JSON.parse(data));
     });
   
   }).on("error", (err) => {
     console.log("Error: " + err.message);
     functions.logger.info("Error: " + err.message);
   });

   https.get('http://119.8.153.52/ws_suizaalertaprod/api/login/app_obtenertipodocumento', (resp) => {
     let data = '';
   
     // A chunk of data has been received.
     resp.on('data', (chunk) => {
       data += chunk;
     });
   
     // The whole response has been received. Print out the result.
     resp.on('end', () => {
      //functions.logger.info(JSON.parse(data));
       database.ref('/Proyectos/MAE_TIPO_DOCUMENTOS/').set(JSON.parse(data));
     });
   
   }).on("error", (err) => {
     console.log("Error: " + err.message);
     functions.logger.info("Error: " + err.message);
   });

    
})

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
      const idSintoma1 = change.after.val()['idSintoma1']
      const idSintoma2 = change.after.val()['idSintoma2']
      const idSintoma3 = change.after.val()['idSintoma3']
      const idSintoma4 = change.after.val()['idSintoma4']
      const idSintoma5 = change.after.val()['idSintoma5']
      const idSintoma6 = change.after.val()['idSintoma6']
      const detalles = change.after.val()['detalles']

      const text = "?idEmpleado="+idEmpleado+"&tipoDocumento="+tipoDocumento+"&nroDocumento="+nroDocumento+"&puestoTrabajo="+puestoTrabajo+"&areaTrabajo="+areaTrabajo+"&nroTelefono="+nroTelefono+"&direccion="+direccion+"&fechaCreacion="+fechaCreacion+"&idSintoma1="+idSintoma1+"&idSintoma2="+idSintoma2+"&idSintoma3="+idSintoma3+"&idSintoma4="+idSintoma4+"&idSintoma5="+idSintoma5+"&idSintoma6="+idSintoma6+"&detalles="+detalles

      const axios = require('axios');
      
      axios.post('http://119.8.153.52/ws_suizaalertaprod/api/login/app_fichaSintomatologica'+text)
           .then(res => {
              console.log(`statusCode: ${res.statusCode}`)
            })
            .catch(error => {
              console.error(error)
      })
});