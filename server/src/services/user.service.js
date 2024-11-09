const bcrypt = require('bcryptjs');
const { db } = require('../models');




const CreateNewUser = async (record) => {
  // Pre-validation
  const existsUser = await db.users.findOne({
    where: {
      email: record.email,
    },
  });

  if (existsUser) {
    throw new Error('User already exists with the same email');
  }
  const existsUsername = await db.logins.findOne({
    where: {
      username: record.username,
    },
  });
  if (existsUsername) {
    throw new Error('User already exists with the same username');
  }
  // Create role mapping in USER_ROLE_MAPPINGS table
  const role = await db.roles.findOne({ where: { id: record.role_id } });
  if (role == null) throw new Error('Role does not exists');

 
  // Create user in the "users" table
  const userRes = await db.users.create({
    first_name: record.first_name,
    last_name: record.last_name,
    email: record.email,
    mobile_number: record.mobile_number,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  const encPassword = await bcrypt.hash(record.password, 8);
  await db.logins.create({
    user_id: userRes.dataValues.id,
    username: record.username,
    password: encPassword,
    is_logged_in: false,
  });

  await db.user_role_mappings.create({
    user_id: userRes.dataValues.id,
    role_id: role.id,
  });


  return true
};

const getUsers = async (page) => {
  const limit = 50;
  const offset = (page - 1) * limit;
  const getUsers = await db.users.findAll({
    include: [{ attributes:['username','status'] ,model: db.logins }],
    limit,
    offset,
  });
  return getUsers;
};

// get user by Id
const getUserById = async (id) => {
  const user = await db.users.findOne({ where: { id } });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// update User
const updateUser = async (id, updatedData) => {
  const user = await db.users.findOne({ where: { id } });
  if (!user) {
    throw new Error('User not found');
  }

  user.first_name = updatedData.first_name;
  user.last_name = updatedData.last_name;
  user.role_id = updatedData.role_id;
  user.mobile_number = updatedData.mobile_number;
  user.email = updatedData.email;
  user.updated_at = new Date().toISOString();

  // Update logins table
  const login = await db.logins.findOne({ where: { user_id: id } });
  if (login) {
    login.username = updatedData.username;
    login.password = updatedData.password ? await bcrypt.hash(updatedData.password, 8) : login.password;
    login.updated_at = new Date().toISOString();
    await login.save();
  }

  await user.save();
  return user;
};

// delete  User
const deleteUser = async (userId) => {
  const user = await db.users.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error('User not found');
  }

  // Delete the user from users
  await db.users.destroy({ where: { id: userId } });

  // Delete user from logins
  await db.logins.destroy({ where: { user_id: userId } });

  // Delete user from admin_user_role mappings
  await db.admin_user_role_mappings.destroy({ where: { user_id: userId } });


  return { message: 'User deleted successfully' };
};

module.exports = {
  CreateNewUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};