const http = require('http');
// const mongoose = require('mongoose');


const app = require("./app")

const { loadPlanetsData} = require('./models/planets.model');
const { loadLaunchData} = require('./models/launches.model');
const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 8000;

// const MONGO_URL = "mongodb+srv://experiencei:08069311076A@nasacluster.no66x.mongodb.net/nasa?retryWrites=true&w=majority"

const server = http.createServer(app);

// mongoose.connection.once("open", () => {
//     console.log("MongoDB connection ready");
// })

// mongoose.connection.on("error" , (err) => {
//     console.error(err);
// })

async function startServer() {
    await  mongoConnect() 
    await loadPlanetsData();
    await loadLaunchData();
    server.listen(PORT , () =>{
        console.log(`Listening on port ${PORT}`);
    })
}

startServer();

// mongoose.connect(MONGO_URL , {
//     useNewUrlParser: true,
//     useUnifiedTopology : true
// })