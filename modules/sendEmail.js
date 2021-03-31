// const nodemailer = require('nodemailer');
const sgMail =  require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY)

function mailMessage(products, client, number){
    let finalMessageList = []
    let messageHeaders = `Novo pedido Recebido\nNome do Cliente: ${client}\nWhatsapp: ${number}`
    finalMessageList.push(messageHeaders);

    products.forEach(element => {
        partialMessageList = []
        partialMessageHeader = `\n- ${element.productRefer} - ${element.productDescri.trim()}, ${element.productDescr.trim()}:\n`
        partialMessageList.push(partialMessageHeader);
        if (element.P){
            partialMessageList.push( `${element.P}P `)
        }
        if (element.M){
            partialMessageList.push( `${element.M}M `)
        }
        if (element.G){
            partialMessageList.push( `${element.G}G `)
        }
        if (element.GG){
            partialMessageList.push( `${element.GG}GG `)
        }

        partialMessage = partialMessageList.join(' ');

        finalMessageList.push(partialMessage);
    });

    finalMessage = finalMessageList.join()

    return finalMessage
}

function sendEmail(message, user){
    console.log(process.env.SENDGRID_KEY)
    const msg = {
        to: user,
        from: process.env.MAIL_REMET,
        subject: 'NOVO PEDIDO CATALOGO ON',
        text: message,
      }

      sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
}

// function sendEmail(message, user){
//     const remetente = nodemailer.createTransport({
//         service: "Hotmail",
//         auth: {
//             user: process.env.MAIL_REMET,
//             pass: process.env.MAIL_REMET_PASS
//         }
//     })
//     const emailToSend = {
//         from: process.env.MAIL_REMET,
//         to: user,
//         subject: "NOVO PEDIDO CATALAGO ON",
//         text: message
//     }

//     remetente.sendMail(emailToSend, function(error) {
//         if (error) {
//             console.log(error)
//         } else {
//             console.log("Email Enviado Com Sucesso!")
//         }
//     })
// }

module.exports = {
    mailMessage,
    sendEmail
}