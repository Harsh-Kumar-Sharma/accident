const { db } = require('../models')


const getReasonOfAccident = async ()=>{
    const data = db.reasons_of_accidents.findAll();
    return data;
}

module.exports={
    getReasonOfAccident
}