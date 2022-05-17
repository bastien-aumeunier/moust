const ScoreSchema = require('../../utils/schema/Score')


const GetScore = async (arg) =>{
    try {
      let score = await ScoreSchema.find({idUser: arg}).sort({score: -1}).limit(3)
        return [200, score]
    } catch (error) {
        return [403, ""]
    }
}

module.exports = GetScore