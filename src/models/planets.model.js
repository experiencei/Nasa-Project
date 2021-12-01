const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const planets = require('./planets.mongo')

// const habitablePlanet = [];


function isHabitable(planet) {
    return planet["koi_disposition"] === "CONFIRMED"
    && planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11 && planet["koi_prad"] < 1.6
}


function loadPlanetsData() {
 return new Promise((resolve , reject)=> { 
     fs.createReadStream(path.join(__dirname,".." , ".." , "data" ,"kepler_data.csv"))
    .pipe(parse({
            comment : "#" ,
            columns : true,
        }))
    .on("data" , async (data) => {
        if(isHabitable(data)){
            // TODO : replace create below with upsert = insert + update (meaning they have to be addded once!)
            // habitablePlanet.push(data)
            savePlanets(data)
        }
    })
    .on("error" , (err) => {
        console.log(err);
        reject(err)
    })
    .on("end" , () =>{
       const 

        console.log(`${habitablePlanet.length} habitablePlanets found`);
        console.log(habitablePlanet.map((planet) => {
            return planet["kepler_name"]
        }))
        resolve()
    });
})
}

// function getAllPlanets() {
//     return habitablePlanet
// }

async function getAllPlanets() {
    return await planets.find({})
}

async function savePlanets(planet) {
    try {
        await planets.updateOne({
            keplerName : planet.kepler_name,
         } , {
            keplerName : planet.kepler_name,
         } , {
             upsert : true,
         }) ;
    } catch(err) {
        console.error(`Could not save planet ${err}`)
    }
   
}

module.exports = {
    loadPlanetsData,
    getAllPlanets
}