const express = require('express');
const cors = require('cors');
const config = require('./config');

// connect to DB 
const db = require('./models');

// import all ROUTES
const authRoute = require('./routes/autenticazione');
const prenotazioniRouter = require('./routes/prenotazioni');
const campiRouter = require('./routes/campi');

const app = express();

var corsOptions = {
    origin: config.HOST
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Controllers
app.use("/auth", authRoute);
app.use("/campi", campiRouter)
app.use("/prenotazioni", prenotazioniRouter);

// Handle non-existing routes
app.use('/*', (req, res) => {
  res.status(404).json({ success: false, message: "Route inesistente" });
});

const connectDB = require('./connectDB');
connectDB();

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
