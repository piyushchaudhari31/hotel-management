const mongoose = require('mongoose')

function ConnectToDb(){
    mongoose.connect(process.env.MONGO_URL).then(()=>{console.log("✅ Connected Successfully")}).catch(()=>{console.log("❌error")})
}

module.exports = ConnectToDb