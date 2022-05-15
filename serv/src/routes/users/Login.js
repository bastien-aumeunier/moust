const UserSchema = require('../../utils/schema/User')

const bcrypt = require('bcrypt')

const login = async (arg) =>{
    console.log('enter')
    try {
      let user = await UserSchema.findOne({mail: arg.mail})
      const match = await bcrypt.compare(arg.password, user.password)
        if (match) {
          let newUser = {
            id: user._id,
            username: user.username,
          }
          return [200, newUser]
        } else {
          return [403, 'Mot de passe incorrect']
        }
    } catch (error) {
      return [403, {}]
    }
}

module.exports = login