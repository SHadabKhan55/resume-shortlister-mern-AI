const mongoose = require("mongoose")

async function dbconn() {
    try {
        
        await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DBNAME}`)
        console.log(`db connect `)
        
    } catch (error) {
        console.log(`db connect failed : ${error}`)
        
    }
    
}

module.exports = {
    dbconn
}