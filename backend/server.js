const express = require('express');
const cors = require('cors');
const config = require('./config');

// connect to DB 
const db= require('./models');

// import all ROUTES
const authRoute = require ('./routes/autenticazione');
const prenotazioniRouter = require('./routes/prenotazioni');

const app=express();

var corsOptions={
    origin:"http://127.0.0.1:8081"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Use Controllers
app.use("/auth", authRoute);
app.use("/prenotazioni", prenotazioniRouter);


// Gestisci le pagine che non esistono
app.use('/*', (req,res)=> {
    res.status(404).json({succes:false, message:"Route inesistente"}) 
})

// controllare questo URI, nel senso che mondodb docs dice di fare un URI cosi
// mongodb://username:password@127.0.0.1:27017/<nome_db>?options
db.mongoose.connect("mongodb://127.0.0.1:27017",{
    useUnifiedTopology: true
}).then(()=>{
    console.log("Successfully connected to mongoDb")
}).catch(err=>{
    console.log(err);
    process.exit();
})

const PORT = config.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})