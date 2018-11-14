const expect = require("chai").expect;

const firstDataset = require('./datasets/one');
const secondDataset = require('./datasets/two');

const { allocateAndReport } = require('../index');
describe("Test algorithm", () => {

    it("Should return 2 butlers", () => {

        const result = allocateAndReport(firstDataset);
        expect(result.length).to.equal(2);
    });


    it("Should return 3 butlers", () => {

        const result = allocateAndReport(secondDataset);
        expect(result.length).to.equal(3);
    });
});