const UserSchema = require('../../utils/schema/User')
const ScoreSchema = require('../../utils/schema/Score')


const DeleteUser = async (arg) =>{
    try {
      await UserSchema.deleteOne({_id: arg})
      await ScoreSchema.deleteMany({idUser: arg})
      return 200
    } catch (error) {
      console.log(error)
      return 500
    }
}

module.exports = DeleteUser