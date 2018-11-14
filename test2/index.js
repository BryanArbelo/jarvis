require('dotenv').load(); //load environment variables
const { CSV_URL } = require('../config/externalUrls')
const { processCsv } = require('./helpers/processCsv');
const { retrieveCsv } = require('./helpers/retrieveCsv');

const main = async () => {

    const parsedCsv = await retrieveCsv(CSV_URL);
    
    await processCsv(parsedCsv);
}


main();
