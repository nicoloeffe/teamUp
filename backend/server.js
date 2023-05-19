const express= require ('express');
const cors= require ('cors');
const config=require ('./config');


const app=express();

var corsOptions={
    origin:"http://localhost8081"
}

app.use(cors(corsOptions));

const authRoute= require ('./routes/autenticazione')

app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.use(authRoute);
app.use('/*', (req,res)=>res.status(404).json({succes:false, message:"Route inesistente"}))

const db= require('./models');

const utente= db.user;

db.mongoose.connect("mongodb://user:pass@localhost:27017",{
    useUnifiedTopology: true
}).then(()=>{
    console.log("successfully connected to mongoDb")
    /*new utente({
        nome:"Carlo",
        email:"carlorigoni@gmail.com",
        password:"carletto",
        ruolo:"utente"
    }).save()*/
}).catch(err=>{
    console.log(err);
    process.exit();
})

const PORT=process.env.PORT ||8080 ;
/*app.get("/",(req,res)=>{
    res.json({message: "welcome to the application. "});
})*/
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})