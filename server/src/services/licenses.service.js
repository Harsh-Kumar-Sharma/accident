const { Op } = require('sequelize');
const { db } = require('../models');

// get all licenses
const getAllLicenses = async () => {
  const result = await db.licenses.findAll({
    include: [{ model: db.customers }],
    order: [['id', 'DESC']],
  });
  return result;
};

// create new license key
const createNewLicense = async (body) => {
  const payload = {
    customer_id: body.client_id,
    valid_from: new Date(body.valid_from).toISOString(),
    valid_to: new Date(body.valid_to).toISOString(),
    license_key: body.license_key,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const isLicenseAlreadyAssied = await db.licenses.findOne({
    where: {
      customer_id: body.client_id,
    },
  });

  if (isLicenseAlreadyAssied) {
    throw new Error('License already assied to this customer');
  }

  const isLicenseExist = await db.licenses.findOne({
    where: {
      license_key: body.license_key,
    },
  });

  if (isLicenseExist) {
    throw new Error('Generate again !');
  }

  const license = await db.licenses.create(payload);
  return license;
};

const getLicensesForSync = async () => {
  const result = await db.licenses.findAll({
    include: [{ model: db.customers }],
    where: {
      [Op.or]: [{ is_sync: false }, { is_sync: null }]
    }
  });
  return result;
};

const updateSyncLicensesStatus = async (ID) => {

  // Check if the license with the given ID exists
  const check = await db.licenses.findOne({
    where: {
      id: ID
    }
  });

  if (!check) {
    throw new Error("Given ID does not exist");
  }

  // Update the is_sync field to true for the license with the given ID
  await db.licenses.update(
    { is_sync: true },
    {
      where: {
        id: ID
      }
    }
  );


  return true;
};


setInterval(async () => {
  const result = await db.licenses.findAll();
  for (let val of result) {
    // Convert strings to Date objects
    let valid_from = new Date(val.valid_from);
    let valid_to = new Date(val.valid_to);

    // Calculate the difference in milliseconds
    let difference_ms = valid_to - valid_from;

    // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
    let difference_days = difference_ms / (1000 * 60 * 60 * 24);

    if (difference_days < 1) {
      difference_days = 0;
    }
    if (!difference_days) {
      await db.licenses.update({ is_exp: true, is_sync: false }, {
        where: {
          id: val.id
        }
      })
    }
    if (difference_days && val.is_exp) {
      await db.licenses.update({ is_exp: false, is_sync: false }, {
        where: {
          id: val.id
        }
      })
    }
  }
}, 10000)

module.exports = {
  getAllLicenses,
  createNewLicense,
  getLicensesForSync,
  updateSyncLicensesStatus
};
