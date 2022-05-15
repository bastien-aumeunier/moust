const UserSchema = require('../../utils/schema/User')

const GetUser = async (arg) =>{
    let newUser = {}
    try {
      let user = await UserSchema.findOne({_id: arg})
        newUser = {
            id: user._id,
            username: user.username,
            mail: user.mail,
        }
        return [200, newUser]
    } catch (error) {
        return [403, {}]
    }
}

module.exports = GetUser