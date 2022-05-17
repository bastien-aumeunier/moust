const UserSchema = require('../../utils/schema/User')


const UpdateUser = async (arg) => {
    const id = arg.id
    const username = arg.username
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

module.exports = UpdateUser