const UserSchema = require('../../utils/schema/User')

const bcrypt = require('bcrypt')

const login = async (arg) =>{
    try {
      let user = await UserSchema.findOne({mail: arg.mail})
      const match = await bcrypt.compare(arg.password, user.password)
        if (match) {
          return [200, user._id]
        } else {
          return [403, 'Mot de passe incorrect']
        }
    } catch (error) {
      return [403, {}]
    }
}

module.exports = login