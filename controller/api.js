const fetch = require('node-fetch');



exports.getData = async (api, apiKey) => {
    const response = await fetch(api + apiKey);
    let data = await response.json();
    return data;
}