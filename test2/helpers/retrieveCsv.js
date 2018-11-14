const csv = require('csvtojson')
const fetch = require('node-fetch');
const retrieveCsv = async (csvUrl) => {
    //retrieve csv
    const response = await fetch(csvUrl);
    const csvData = await response.text();

    const parsedCsv = await csv({
        noheader: true,
        output: "csv"
    }).fromString(csvData);

    return parsedCsv;
}

module.exports = {
    retrieveCsv
}