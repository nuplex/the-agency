import {createHierarchy} from "./Hierarchy";

describe('Hierarchy', () => {
    it('can be created with a name and list of agents names', () => {
        const hierarchy = createHierarchy('test', ['a','b','c']);
        expect(hierarchy.name).toBe('test');
        expect(hierarchy.agentsInOrder[0]).toBe('a');
        expect(hierarchy.agentsInOrder[1]).toBe('b');
        expect(hierarchy.agentsInOrder[2]).toBe('c');
    });
});