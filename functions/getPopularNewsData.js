const axios = require('axios')

exports.handler = async function(event, context) {

    try {
        let options = {
          method: 'GET',
          url: `https://api.thenewsapi.com/v1/news/all?categories=general&api_token=${process.env.REACT_APP_NEWS_API_KEY}&language=en`,
        }
        

        const { data } = await axios.request(options)
    
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }

        
    } catch (error) {
        const { status, statusText, headers, data } = error.response
        return {
            statusCode: status,
            body: JSON.stringify({status, statusText, headers, data})
        }
    }
}