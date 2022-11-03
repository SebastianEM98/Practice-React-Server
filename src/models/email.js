const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmailConfirmationHTML(customerName,orderNro) {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" /> 
            <meta http-equiv="X-UA-Compatible" content-"IE-edge" />
            <meta name-"viewport" content="width-device-width, initial-scale-1.0" />
            <title>Documento</titles>
            <style>
                .responsive {
                    width: 100%;
                    height: auto;
                }
            </style>
        </head>
        <body>
            <img
                src=""
                class="responsive"
                alt=""
            />
        </body>
    </html>
    `;
}


function getMessage(emailParams) {
    return {
        to: emailParams.toEmail,
        from:'sebastian.echeverry@autonoma.edu.co',
        subject: 'Confirmación orden de compra BLACKFRIDAY',
        text: `Hola ${emailParams.custonerName}, imagenes de los productos enviados` ,
        html: sendEmailConfirmationHTML(
            emailParams.customerName,
            emailParams.orderNro
        ),
    };
}


async function sendOrder (emailParams) {
    try {
        await sgMail.send(getMessage(emailParams));
        return {message: 'Confirmación de compra enviada'};
    } catch (err) {
    
        const message = 'No se pudo enviar la orden de compra. Valide los errores';
        console.error(nessage);
        console.error(err);
        if (err.response) console.error(err.response.body);
        return { message };
    }
}