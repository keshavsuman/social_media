
const apiconfig = require('../config/config')
const serviceroutes = require('../config/serviceroutes')
const axios = require('axios')


export const getStates = async (accessToken, url = apiconfig.baseurl + serviceroutes.getStates) => {
    var response = await axios.get(url+"?country_id=101" , {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    
      )
      return response.data;
}
