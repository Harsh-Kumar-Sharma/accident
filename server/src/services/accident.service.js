const { db, sequelize } = require('../models');
const { convertTo24HourFormat } = require('./TimeOfDay.service')


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
      rpv_response_time: (val.RPV_RESPONSE_TIME === 'NA' ? null : val.RPV_RESPONSE_TIME),
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

const createAccident = async (body) => {


  const payload = {
    incident_id: body.incidentId,
    accident_date: body.accidentDate,
    accident_time: convertTo24HourFormat(body.accidentTime),
    location: body.location,
    direction: body.direction,
    primary_vehicle: body.primaryVehicle,
    secondary_vehicle: body.secondaryVehicle,
    third_vehicle: body.thirdVehicle,
    source_of_information: body.sourceOfInformation,
    no_of_person_involve_in_accident: body.personInvolveInAccident,
    fatal_injury: body.fatalInjury,
    major_injury: body.majorInjury,
    minor_injury: body.minorInjury,
    no_injury: body.noInjury,
    rpv_response_time: convertTo24HourFormat(body.rpvResponseTime),
    ambulance_response_time: convertTo24HourFormat(body.ambulanceResponseTime),
    recovery_response_time: convertTo24HourFormat(body.recoveryResponseTime),
    reason_of_accidents: body.reasonOfAccident,
  }

  await db.accident_data.create(payload);

  return true;

}

const getAccidentData = async (body, page) => {
  const limit = 50;
  const offset = (page - 1) * limit;
  const data = await db.accident_data.findAll({
    limit,
    offset,
  });
  return data;
}

const getDataforDashboard = async (body) => {

  let condition = '';
  const currentYear = new Date().getFullYear();
  const startDate = `${currentYear}-01-01`; // Start of the jan 1st
  const endDate = `${currentYear}-12-31`; // Current year's December 31st

  if (body.fromDate && body.toDate && !String(body.fromDate).includes('1970') && !String(body.toDate).includes('1970')) {
    condition = ` accident_date BETWEEN '${body.fromDate}' AND '${body.toDate}'`;
  } else {
    condition = ` accident_date BETWEEN '${startDate}' AND '${endDate}'`;
  }
  if (body.reasonOfAccident && body.reasonOfAccident !== 'null') {
    condition += `AND reason_of_accidents = '${body.reasonOfAccident}'`;
  }
  if (body.locationZone && body.locationZone !== 'null') {
    condition += `AND location_zone = '${body.locationZone}'`;
  }
  const query = `
        SELECT
          DATE_FORMAT(accident_date, '%m') AS accident_month,
          SUM(CASE WHEN fatal_injury THEN fatal_injury ELSE 0 END) AS fatal_injury,
          SUM(CASE WHEN major_injury THEN major_injury ELSE 0 END) AS major_injury,
          SUM(CASE WHEN minor_injury THEN minor_injury ELSE 0 END) AS minor_injury
        FROM accident_data
        WHERE ${condition}
        GROUP BY accident_month;
      `;
  // Execute the query using sequelize.query or your preferred database client
  const sumOfInjury = await sequelize.query(query);

  const query1 = `SELECT
      DATE_FORMAT(accident_date, '%m') AS accident_month,
      Count(*) AS CountData
    FROM accident_data
    WHERE ${condition}
    GROUP BY accident_month;`

  const countAccident = await sequelize.query(query1);

  const query2 = `SELECT
    SUM(CASE WHEN fatal_injury THEN fatal_injury ELSE 0 END) AS fatal_injury,
    SUM(CASE WHEN major_injury THEN major_injury ELSE 0 END) AS major_injury,
    SUM(CASE WHEN minor_injury THEN minor_injury ELSE 0 END) AS minor_injury,
    Count(*) AS total_accident
  FROM accident_data WHERE ${condition}`

  const cardData = await sequelize.query(query2);

  return { sumInjury: sumOfInjury[0], CountData: countAccident[0], cardData: cardData[0] };
}


module.exports = {
  insertAccidentData,
  createAccident,
  getAccidentData,
  getDataforDashboard
};
