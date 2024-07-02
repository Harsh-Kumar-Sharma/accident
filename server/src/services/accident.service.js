const { db } = require('../models');

const data = require('./accident');

const insertAccidentData = async () => {
  const headers = [
    'SL.NO.',
    'INCIDENT_ID',
    'ACCIDENT_DATE',
    'ACCIDENT_TIME',
    'LOCATION',
    'DIRECTION',
    'PRIMARY_VEHICLE',
    'SECONDARY_VEHICLE',
    'THIRD_VEHICLE',
    'SOURCE_OF_INFORMATION',
    'NO_OF_PERSON_INVOLVE_IN_ACCIDENT',
    'FATAL_INJURY',
    'MAJOR_INJURY',
    'MINOR_INJURY',
    'NO_INJURY',
    'RPV_RESPONSE_TIME',
    'AMBULANCE_RESPONSE_TIME',
    'RECOVERY_RESPONSE_TIME',
    'REASON_OF_ACCIDENTS',
    'LOCATION_VALUE',
    'LOCATION_ZONE',
    'Accident_Time_in_Value',
    'Times_of_the_Day',
    'LIGHT',
    'HEAVY',
    'NON_TOLLABLE',
    'UNKNOWN',
    'Blackspot_Loaction_Value',
    'Blackspot_Count',
  ];

  // Convert array of arrays to array of objects
  const jsonArray = data.accident.map((row) => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
  for (let val of jsonArray) {
    const payload = {
      incident_id: val.INCIDENT_ID,
      accident_date: val.ACCIDENT_DATE,
      accident_time: val.ACCIDENT_TIME,
      location: val.LOCATION,
      direction: val.DIRECTION,
      primary_vehicle: val.PRIMARY_VEHICLE,
      secondary_vehicle: val.SECONDARY_VEHICLE,
      third_vehicle: val.THIRD_VEHICLE,
      source_of_information: val.SOURCE_OF_INFORMATION,
      no_of_person_involve_in_accident: val.NO_OF_PERSON_INVOLVE_IN_ACCIDENT,
      fatal_injury: val.FATAL_INJURY,
      major_injury: val.MAJOR_INJURY,
      minor_injury: val.MINOR_INJURY,
      no_injury: val.NO_INJURY,
      rpv_response_time: ( val.RPV_RESPONSE_TIME === 'NA' ? null : val.RPV_RESPONSE_TIME),
      ambulance_response_time: val.AMBULANCE_RESPONSE_TIME,
      recovery_response_time: val.RECOVERY_RESPONSE_TIME,
      reason_of_accidents: val.REASON_OF_ACCIDENTS,
      location_value: val.LOCATION_VALUE,
      location_zone: val.LOCATION_ZONE,
      accident_time_in_value: val.Accident_Time_in_Value,
      times_of_the_day: val.Times_of_the_Day,
      light: val.LIGHT,
      heavy: val.HEAVY,
      non_tollable: val.NON_TOLLABLE,
      unknown: val.UNKNOWN,
      blackspot_location_value: val.Blackspot_Loaction_Value,
    }
    console.log(payload)
    await db.accident_data.create(payload);
  }
  return true;
};

const createAccident = async(body)=>{
console.log(body);
}

const getAccidentData= async(body,page) => {
  const limit = 10;
  const offset = (page - 1) * limit;
  const data = await db.accident_data.findAll({
    limit,
    offset,
  });
return data;
}


module.exports = {
  insertAccidentData,
  createAccident,
  getAccidentData
};
