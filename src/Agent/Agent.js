/**
 * This is where Agent objects are generated. An Agent has a name and their commission percent, which is used to
 * calculate commission on sales.
 * @type {{name: string, commissionPercent: number}}
 */
const Agent = {
    name: '',
    commissionPercent: 0.0,
};

/**
 * Creates an Agent.
 * @param agentName - the name of the Agent
 * @param commissionPercent - their commission percent, defined from 0.0 - 1.0
 * @return {Agent}
 */
function createAgent(agentName, commissionPercent){
    const newAgent = Object.create(Agent);
    newAgent.commissionPercent = commissionPercent;
    newAgent.name = agentName;

    return newAgent;
}

export { createAgent };