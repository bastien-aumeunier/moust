const UserSchema = require('../../utils/schema/User')

const alreadyExist = async (mail) => {
    try {
        let user = await UserSchema.findOne({mail: mail})
        if (user) {
          return true
        } else {
          return false
        }
      } catch (error) {
        return true
      }
}


const UpdateMail = async (arg) => {
    const id = arg.id
    const mail = arg.mail
    if (alreadyExist(mail)) {
      return 409
    } else {
        try {
            let user = await UserSchema.findOne({ _id: id })
            if (user) {
                user.username = username
                await user.save()
                return 200
            } else {
                return 404
            }
        }
        catch (e) {
            console.log(e)
            return 500
        }
    }
}

module.exports = UpdateMail