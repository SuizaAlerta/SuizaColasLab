import * as functions from 'firebase-functions';
import admin = require('firebase-admin');


const nodemailer = require('nodemailer');
const axios = require('axios');


admin.initializeApp(functions.config().firebase);

const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  secureConnection: false,
  port: 587,
  tls: {rejectUnauthorized: false},
  auth: {
    /* user: 'edenegri@suizaalerta.com',
    pass: '@Eduards01' */
    user: 'notificacion@suizalab.com',
    pass: '$Lab4853@suiz',
  },
});

export const onMessageUpdate = functions.database.ref('/SuizaMoto/EnvioMensaje')
    .onUpdate((change) => {
      const CodDireccion = change.after.val()['CodDireccion'];
      const Direccion = change.after.val()['Direccion'];
      const Motorizado = change.after.val()['Motorizado'];
      const Observacion = change.after.val()['Observacion'];

      const mailOptions = {
        from: 'notificacion@suizalab.com',
        to: 'asistente.comercial@suizalab.com, klavado@suizalab.com, ebenavides@suizalab.com, edenegri@suizaalerta.com',
        subject: 'Observación Motorizado',
        text: 'Hello World',
        html: '<!DOCTYPE html><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"><title></title><style>div,h1,p,table,td{font-family:Arial,sans-serif}</style></head><body style="margin:0;padding:0"><table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#fff"><tr><td align="center" style="padding:0"><table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #ccc;border-spacing:0;text-align:left"><tr><td align="center" style="padding:40px 0 30px 0;background:#dfdfdf"><img src="https://firebasestorage.googleapis.com/v0/b/suizamoto-557a4.appspot.com/o/Archivos%2FlogoSuizaMoto.png?alt=media&token=8a497963-a296-46b9-bd75-27a59755070f" alt="" width="300" style="height:auto;display:block"></td></tr><tr><td style="padding:36px 30px 42px 30px"><table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0"><tr><td style="padding:0 0 36px 0;color:#153643"><h1 style="font-size:32px;margin:0;font-family:Arial,sans-serif;text-align:center">Observación de Motorizado</h1><hr><table class="table table-striped table-bordered" style="text-align:center"><thead class="thead-light"><tr><th scope="col">Cod.</th><th scope="col">Dirección</th><th scope="col">Motorizado</th></tr></thead><tbody><tr><th scope="row">'+CodDireccion+'</th><td>'+Direccion+'</td><td>'+Motorizado+'</td></tr></tbody></table><div class="card"> <br><br><br> <div class="card-header" style="font-weight:700">Observación</div><div class="card-body"><p class="card-text">'+Observacion+'</p></div></div></td></tr><tr><td style="padding:0"><table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0"><tr><td style="width:260px;padding:0;vertical-align:top;color:#153643;text-align:center"><p style="margin:0 0 25px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif"><img src="https://firebasestorage.googleapis.com/v0/b/suizamoto-557a4.appspot.com/o/Archivos%2Fservicio-de-entrega.png?alt=media&token=8be61b5e-8ad5-4526-9f70-54a9321d202e" alt="" width="120" style="height:auto;text-align:center"></p><p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif">Toma de muestras</p></td><td style="width:260px;padding:0;vertical-align:top;color:#153643;text-align:center"><p style="margin:0 0 25px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif"><img src="https://firebasestorage.googleapis.com/v0/b/suizamoto-557a4.appspot.com/o/Archivos%2Fcomida.png?alt=media&token=425978f3-61da-4676-bbbb-9bbaf65fd316" alt="" width="120" style="height:auto;text-align:center"></p><p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif">Recojo Inmediato</p></td></tr></table></td></tr></table></td></tr><tr><td style="padding:30px;background:#ee4c50"><table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif"><tr><td style="padding:0;width:100%"><p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#fff;text-align:center">Suiza Moto 2022<br></p></td></tr></table></td></tr></table></td></tr></table></body></html>',
      };

      if (Observacion!='') {
        transporter.sendMail(mailOptions, function(err, info) {
          if (err) {
            return console.log(err);
          } else {
            console.log('Message sent: ' + info.response);
          }
        });
      }
    });

export const onNotificationsUpdate = functions.database.ref('/SuizaMoto/EnvioNotificaciones')
    .onUpdate((change) => {
      const token = change.after.val()['token'];
      const dtEnvio = change.after.val()['dtEnvio'];
      console.log(token);
      console.log(dtEnvio);

      const data = {
        to: token,
        data: {
          'titulo': 'Suiza Moto',
          'mensaje': 'Usted tiene una nueva atencion',
        },
      };

      const config = {
        headers: {
          'Authorization': 'key=AAAAtCty8Ko:APA91bF4QfJNQktzRUiPtVnM2AQ7t-xt3rsnqDQRcZcJaUjxb97wZUq38xiQgNIPIMgAdiUrNw9AIKiXy59VNF9uV4vC_oYWmjX0C7LHd9eewHgqrAyFCyvVN1Uh9zkPcxFPWSPMZe3W',
          'Content-Type': 'application/json',
        },
      };

      axios.post('https://fcm.googleapis.com/fcm/send', data, config);
    });
