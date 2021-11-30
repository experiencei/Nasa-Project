const launches = new Map();


let latestFlightNumber = 100;

const launch = {
    flightNumber : 100 ,
    mission  : "Kepler Exploration X" ,
    rocket : "Explorer IS1",
    launchDate : new Date("December 27, 2030"),
    target : "Kepler-442 b" ,
    customer : ["Experience" , "NASA"] ,
    upcoming : true,
    success : true ,
}

launches.set(launch.flightNumber , launch)

function existsLaunchWithId(launchIdd){
  return  launches.has(launchIdd)
}
function getAllLaunches() { 
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber++
    launches.set(latestFlightNumber , Object.assign(launch , {
        success : true ,
        upcoming: true ,
        customers : ["Experience iq" , "NASA"] ,
        flightNumber : latestFlightNumber
    }))
}

function abortLaunchById(launchId) {
     
}

module.exports = {
    getAllLaunches ,
    addNewLaunch ,
    existsLaunchWithId ,
    abortLaunchById
}