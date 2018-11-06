import {createCommissionPlan} from "./CommissionPlan";

describe('CommissionPlan', () => {
    it('can be created with a name and percents', () => {
        const plan = createCommissionPlan('test', [0.03, 0.02, 0, 0.01]);
        expect(plan.name).toBe('test');
        expect(plan.percents[0]).toBe(0.03);
        expect(plan.percents[1]).toBe(0.02);
        expect(plan.percents[2]).toBe(0);
        expect(plan.percents[3]).toBe(0.01);
    })
});