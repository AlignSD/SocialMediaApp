const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const User = require('../../models/User');
const SECRET_KEY = process.env.SECRET_KEY;
const {validateRegisterInput, validateLoginInput} = require('../../util/validators')

function generateToken(user){
  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username
  }, SECRET_KEY, { expiresIn: '1h'});
}

module.exports = {
  Mutation: {
    async login(_, { username, password }){
      const {errors, valid } = validateLoginInput(username, password);

      if(!valid){
        throw new UserInputError('Errors',{errors});
      }

      const user = await User.findOne({ username });

      if(!user){
        errors.general = 'User not found';
        throw new UserInputError('User not found',{errors});

      }
      const match = await bcrypt.compare(password, user.password);
      if(!match){
        errors.general = 'Wrong Credentials';
        throw new UserInputError('Wrong Credentials',{errors});
      }

      const token = generateToken(user)
      return{
        ...user._doc,
        id: user._id,
        token
      }
    },
    async register(
      _,
      { 
        registerInput: {username, email, password, confirmPassword}
      },
       context,
       info
       ) {  // args will have registerInput fields

      // TODO validate user data
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
      if(!valid) {
        throw new UserInputError('Errors', {errors})
      }

      // make sure user doesnt already exist
      const user = await User.findOne({ username }); // search db for existing user
        if(user){ // if the user exists throw a apollo error 
          throw new UserInputError('Username is taken', { //set the error
            errors: {
              username: "This username is taken" 
            }
          })
        }
      // hash password
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt)

      const newUser = new User({
        username,
        password,
        email,
        createdAt: new Date().toISOString()
      });

      const res = await newUser.save();

      const token = generateToken(res)

      return{
        ...res._doc,
        id: res._id,
        token
      }
    }

  }
}