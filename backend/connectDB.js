const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://TeamUp:drnU9BdQskMzpgwr@teamupdatabase.i91hblu.mongodb.net/TeamUp?retryWrites=true&w=majority')
        console.log("Connect to MongoDB successfully")
    } catch (error) {
        console.log("Connect failed " + error.message )
    }
}

module.exports = connectDB