const userNoExist = {
  email: 'test@naoexiste.com',
  password: 'lalala'
}

const userNoEmail = {
  email: '',
  password: 'lalala'
}

const userNoPassword = {
  email: 'admin@admin.com',
  password: ''
}

const user = { 
  email: 'admin@admin.com', 
  password: 'secret_admin'
}

const validSequelizeUser = {
  id: 1,
  username: 'user',
  email: 'valid@gmail.com',
  password: 'validPassword',
  role: 'user'
}

const invalidEmail = {
  email: 'adminadmin', 
  password: 'secret_admin'
}

const invalidPassword = {
  email: 'admin@admin.com', 
  password: '123'
}

const role = {
  role: 'admin'
}

const token = {
  authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2ODc1NjM5NjN9.dVYRoKQyTE4UOZ0m1gxDTVs2rtZXVjvV0O2YVg9pPdY'
}

const empytToken = {
  authorization: ''
}

const invalidToken = {
  authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZGasdasda1pbkBhZG1pbi5jb20iLCJpYXQiOjE2ODc1NjM5NjN9.dVYRoKQyTE4UOZ0m1gxDTVs2rtZXVjvV0O2YVg9pPdY'
}


export {
  userNoExist,
  userNoEmail,
  userNoPassword,
  user,
  validSequelizeUser,
  invalidEmail,
  invalidPassword,
  role,
  token,
  empytToken,
  invalidToken,
};
