const UserSchema = require('../../utils/schema/User')

const bcrypt = require('bcrypt')

const alreadyExist = async (arg) =>{
    try {
      let user = await UserSchema.findOne({mail: arg.mail})
      if (user) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return true
    }
}


const Register = async (arg) =>{
    let exist = await alreadyExist(arg)
    if (exist) {
      return 409
    }
    try {
      arg.password = await bcrypt.hash(arg.password, 10)
      let user = new UserSchema(arg)
      await user.save()
      return 201
    } catch (e) {
      console.log(e)
      return 500;
  
    }
}

module.exports = Register