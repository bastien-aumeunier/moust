const ScoreSchema = require('../../utils/schema/Score')

const PostScore = async (arg) =>{
    try {
        let score = new ScoreSchema(arg)
        await score.save()
        return 201
      } catch (e) {
        console.log(e)
        return 500;
    
      }
}

module.exports = PostScore