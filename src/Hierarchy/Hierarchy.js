/**
 * Represents a hierarchy of Agents, which is used for Plans.
 *
 * Important: Hierarchies make the assumption that all defined agents still exist (so if you delete an Agent, it will
 * throw an error later when the Agency makes a sale using this hierarchy).
 * @type {{name: String, agentsInOrder: Array}}
 */
const Hierarchy = {
    name: '',
    agentsInOrder: []
};

/**
 * Creates a hierarchy of agents.
 * @param name - the name of this hierarchy
 * @param hierarchy - An array of Agents, the first being the selling agent, and successive agents being supers.
 * @return {Hierarchy}
 */
function createHierarchy(name, hierarchy){
    const newHierarchy = Object.create(Hierarchy);
    newHierarchy.name = name;
    newHierarchy.agentsInOrder = hierarchy;

    return newHierarchy;
}

export { createHierarchy };