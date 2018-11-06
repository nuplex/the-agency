import {createAgent} from "./Agent";

describe('Agent', () => {
    it('can be created with a name and commission percent', () => {
      const newAgent = createAgent('test', 0.3);
      expect(newAgent.name).toBe('test');
      expect(newAgent.commissionPercent).toBe(0.3)
    });
});