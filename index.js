const mongoose = require("mongoose");
const app = require("./app");
const PORT_SERVER = process.env.PORT || 3977;
const { API_VERSION, IP_SERVER, PORT_DB } = require("./config");
require('dotenv').config();

mongoose.connect(
    `mongodb://${IP_SERVER}:${PORT_DB}/proyect_practice_db`,
    { useNewUrlParser: true, useUnifiedTopology: true},
    (err, res) => {
        if (err) {
            throw err;
        }else {
            console.log("Success connection to db");
            app.listen(PORT_SERVER, () => {
                console.log("####################");
                console.log("######API REST######");
                console.log("####################");
                console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}/`);
            });
        }
    }
);


/* ======================== TWILIO ========================*/
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Prueba Twilo. Ingenieria de Software 2',
    from: '+12182969731',
    to: '+573136414255',
  })
  .then(message => console.log(message.sid));
/* ======================== TWILIO ========================*/



/* ======================== SENDGRID ========================*/

app.use(express.json());
app.use(express.urlencoded({ extend: false}));

app.post('/api/email/confirmacion', async (req, res, next) => {
    try {
        res.json(await ElementInternals.sendOrder(req.body));
    } catch (error) {
        next(error);
    }
});

app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    console-error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message});
    return;
});

/* ======================== SENDGRID ========================*/