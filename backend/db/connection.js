const mongoose = require('mongoose')
const DB = process.env.DATABASE_URL.replace("<PASSWORD>", process.env.PASSWORD);
const connectToDB = async () => {
    try{
        await mongoose.connect(DB)
        console.log("Connection Successfull")
    }
    catch(e){
        console.log("Connection to DB Failed")
    }
}

module.exports = connectToDB;