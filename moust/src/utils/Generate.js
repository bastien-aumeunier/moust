const axios = require('axios')

const Generate = async (length) => {
    try {
        let req = await axios.get(`http://172.27.48.1:9000/api/generate/${length}`)
        return req.data
    } catch (error) {
        console.log(error)
    }
}

export default Generate