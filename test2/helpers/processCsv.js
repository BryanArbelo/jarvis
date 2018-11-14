const { Client } = require('pg')

const getHeaderRow = (headerRow) => {
    return {
        clientIdIndex: headerRow.indexOf('clientId'),
        orderIdIndex: headerRow.indexOf('orderId'),
        requestsIndex: headerRow.indexOf('requests'),
        durationIndex: headerRow.indexOf('duration')
    }
}

const processCsv = async (parsedCsv) => {
    let client = new Client();

    const { clientIdIndex, orderIdIndex, requestsIndex, durationIndex } = getHeaderRow(parsedCsv[0]);

    parsedCsv.splice(0, 1); // remove header row
    parsedCsv.reduce(async (promise, row) => {
        await promise;

        await client.connect(); //connect to pg
        const clientId = row[clientIdIndex];
        let res;

        res = await client.query('SELECT * FROM Clients WHERE clientId = $1', [clientId])
        await client.end()

        if (res.rows && res.rows.length > 0) {
            client = new Client();
            await client.connect();

            const orderId = row[orderIdIndex];
            const requests = row[requestsIndex];
            const duration = parseInt(row[durationIndex]);

            const parameters = [orderId, clientId, requests, duration];
            res = await client.query('INSERT INTO Orders(orderId, clientId, request, duration) VALUES($1, $2, $3, $4) RETURNING *', parameters);
            await client.end(); //disconnect
        } else {
            console.error('client does not exist', clientId);
        }
    }, Promise.resolve());
}

module.exports = {
    processCsv
}