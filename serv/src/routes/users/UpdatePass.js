const UserSchema = require('../../utils/schema/User')
const bcrypt = require('bcrypt')



const UpdatPass = async (arg) => {
    const id = arg.id
    const password = arg.password
    const newpassword = await bcrypt.hash(password, 10)
    try {
        let user = await UserSchema.findOne({ _id: id })
        if (user) {
            user.password = newpassword
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

module.exports = UpdatPass