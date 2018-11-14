const { retrieveCsv } = require('../helpers/retrieveCsv');
var nock = require('nock');
const { CSV_URL } = require('../config/externalUrls');
const expect = require("chai").expect;

describe("Test Helpers",  () => {

    before(() => {
        nock(CSV_URL)
            .get('')
            .reply(200, `orderId,clientId,requests,duration
                sample-123,client-321,House Cleaning,2`);
    })

    it("Should process CSV", async () => {
        const parsedCsv = await retrieveCsv(CSV_URL);
        expect(parsedCsv.length).to.equal(2);
    });

});