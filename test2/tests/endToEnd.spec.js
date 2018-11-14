const expect = require("chai").expect;
const { retrieveCsv } = require('../helpers/retrieveCsv');
const { processCsv } = require('../helpers/processCsv');
const { CSV_URL } = require('../config/externalUrls');
const { Client } = require('pg');
require('dotenv').load(); //load environment variables

describe("Test Helpers", () => {

    it("Should process real CSV and insert in real database, then clean up", async () => {
        let client = new Client();
        await client.connect(); //connect to pg
        let resultsFirst = await client.query('SELECT * FROM Orders');
        const numberOfOrdersBeforeAppRuns = resultsFirst.rows.length;
        await client.end(); //disconnect

        //app runs here
        const parsedCsv = await retrieveCsv(CSV_URL);
        await processCsv(parsedCsv);


        setTimeout(async () => {
            client = new Client();
            await client.connect(); //connect to pg
            let resultsSecond = await client.query('SELECT * FROM Orders');
            const numberOfOrdersAfterAppRuns = resultsSecond.rows.length;
            await client.end(); //disconnect
            console.log(resultsSecond.rows.length);
            expect(numberOfOrdersAfterAppRuns - numberOfOrdersBeforeAppRuns).to.equal(1);


            setTimeout(async () => {
                const lastRowInserted = resultsSecond.rows[resultsSecond.rows.length - 1];
                client = new Client();
                await client.connect(); //connect to pg
                resultsSecond = await client.query('DELETE FROM Orders WHERE orderId = $1', [lastRowInserted.orderid])
                await client.end(); //disconnect
            }, 1); //expect runs out of sync so this needs to happen after the select
        }, 200); // changes are not persisted immediately so this needs to happen after the app runs 

    });

});