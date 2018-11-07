const createAgency = require("./Agency");
const theAgency = require("../../app/data/fakeData");

describe('Agency', () => {
    it('can be created', () => {
       const testAgency = createAgency('test');
       expect(testAgency.name).toBe('test');
    });

    it('can take in an agent', () => {
        const testAgency = createAgency('test');
        testAgency.addAgent('tester', 0.4);
        expect(testAgency.agents['tester']).not.toBeFalsy();
        expect(testAgency.agents['tester'].commissionPercent).toBe(0.4)
    });

    it('can take in a plan', () => {
        const testAgency = createAgency('test');
        testAgency.addPlan('testPlan', [0.5]);
        expect(testAgency.plans['testPlan']).not.toBeFalsy();
        expect(testAgency.plans['testPlan'].percents[0]).toBe(0.5);
    });

    it('can take in a hierarchy', () => {
        const testAgency = createAgency('test');
        testAgency.addAgent('tester', 0.4);
        testAgency.addAgent('tester2', 0.3);
        testAgency.addHierarchy('testH', ['tester','tester2']);
        expect(testAgency.hierarchies['testH']).not.toBeFalsy();
        expect(testAgency.hierarchies['testH'].agentsInOrder[0]).toBe('tester');
        expect(testAgency.hierarchies['testH'].agentsInOrder[1]).toBe('tester2');
    });

    it('can execute a sale and return correct commissions for 100000/H1/A', () => {
        const comms = theAgency.executeSale(100000, 'H1', 'A');
        expect(comms.total).toBe(1125);
        expect(comms.agentsWithSaleCommission['Bob']).toBe(1000);
        expect(comms.agentsWithSaleCommission['X']).toBe(125);
        expect(comms.agentsWithSaleCommission['A']).toBe(0);
        expect(comms.agentsWithSaleCommission['C']).toBe(0);
    });

    it('can execute a sale and return correct commissions for 100000/H2/B', () => {
        const comms = theAgency.executeSale(100000, 'H2', 'B');
        expect(comms.total).toBe(1760);
        expect(comms.agentsWithSaleCommission['Bob']).toBe(1400);
        expect(comms.agentsWithSaleCommission['A']).toBe(260);
        expect(comms.agentsWithSaleCommission['X']).toBe(100);
        expect(comms.agentsWithSaleCommission['D']).toBe(0);
        expect(comms.agentsWithSaleCommission['Z']).toBe(0);
    });
});