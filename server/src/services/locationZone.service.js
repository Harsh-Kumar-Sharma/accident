const {db} = require('../models');


const getLocationZone = async ()=>{

    const data = await db.location_zone.findAll();

    return data

}


module.exports ={
    getLocationZone
}