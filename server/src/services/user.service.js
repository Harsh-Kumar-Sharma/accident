const bcrypt = require('bcryptjs');
const { db } = require('../models');




const CreateNewUser = async (payload) => {
  // Pre-validation
  const existsUser = await db.users.findOne({
    where: {
      email: payload.email,
    },raw:true
  });

  if (existsUser) {
    throw new Error('User already exists with the same email');
  }
  const existsUsername = await db.logins.findOne({
    where: {
      username: payload.username,
    },raw:true
  });
  if (existsUsername) {
    throw new Error('User already exists with the same username');
  }
  // Create role mapping in USER_ROLE_MAPPINGS table
  const role = await db.roles.findOne({ where: { id: payload.roleId },raw:true });
  if (!role) throw new Error('Role does not exists');

 
  // Create user in the "users" table
  const userRes = await db.users.create({
    first_name: payload.firstName,
    last_name: payload.lastName,
    email: payload.email,
    mobile: payload.mobile,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  const plainUser = userRes.get({ plain: true });

  const encPassword = await bcrypt.hash(payload.password, 8);
  await db.logins.create({
    user_id: plainUser.id,
    username: payload.username,
    password: encPassword,
    is_logged_in: false,
    status:'active'
  });

  await db.user_role_mappings.create({
    user_id: plainUser.id,
    role_id: role.id,
  });


  return true
};

const getUsers = async (page) => {
  const limit = 50;
  const offset = (page - 1) * limit;
  const getUsers = await db.users.findAll({
    include: [{ attributes:['username','status'] ,model: db.logins }, {
      required: true,
      model: db.user_role_mappings,
      attributes: ['role_id'],
      include: [
        {
          required: true,
          model: db.roles,
          attributes: ['role_name'],
        },
      ],
    }],
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

  user.first_name = updatedData.firstName;
  user.last_name = updatedData.lastName;
  user.role_id = updatedData.roleId;
  user.mobile = updatedData.mobile;
  user.email = updatedData.email;
  user.updated_at = new Date().toISOString();

  // Update logins table
  const login = await db.logins.findOne({ where: { user_id: id } });
  if (login) {
    login.username = updatedData.username;
    login.password = updatedData.password ? await bcrypt.hash(updatedData.password, 8) : login.password;
    login.status = updatedData.status
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

  // Delete user from user_role mappings
  await db.user_role_mappings.destroy({ where: { user_id: userId } });


  return { message: 'User deleted successfully' };
};

const getAllRoles = async ()=>{
  const roleData = await db.roles.findAll({});
  return roleData
}

module.exports = {
  CreateNewUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllRoles
};