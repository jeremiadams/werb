const axios = require('axios')

exports.handler = async function(event, context) {

    try {
        let options = {
            method: 'GET',
            url: 'https://api.newscatcherapi.com/v2/search?q=crypto&lang=en&sort_by=relevancy&page=1',
            headers: {
              'x-api-key': process.env.REACT_APP_NEWS_API_KEY
            }
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