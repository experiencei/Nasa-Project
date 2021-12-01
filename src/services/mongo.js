const mongoose = require('mongoose')

const MONGO_URL = "mongodb+srv://experiencei:08069311076A@nasacluster.no66x.mongodb.net/nasa?retryWrites=true&w=majority"


mongoose.connection.once("open", () => {
    console.log("MongoDB connection ready");
})

mongoose.connection.on("error" , (err) => {
    console.error(err);
})

async function mongoConnect() {
 await mongoose.connect(MONGO_URL , {
        useNewUrlParser: true,
        useUnifiedTopology : true
    })
}

module.exports = {
    mongoConnect
}