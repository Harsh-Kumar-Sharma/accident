const bcrypt = require('bcryptjs');
const { db } = require('../models');

const getUsers = async (page) => {
  const limit = 10;
  const offset = (page - 1) * limit;
  const getUsers = await db.users.findAll({
    include: [{ model: db.logins }],
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
  user.shift_id = updatedData.shift_id;
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

  // Delete user from tms_user_role mappings
  await db.tms_user_role_mappings.destroy({ where: { user_id: userId } });

  // Delete user from tms_user_shift_mappings
  await db.tms_user_shift_mappings.destroy({ where: { user_id: userId } });

  return { message: 'User deleted successfully' };
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
