import {createAgent} from "../Agent/Agent";
import {createHierarchy} from "../Hierarchy/Hierarchy";
import {createCommissionPlan} from "../CommissionPlan/CommissionPlan";

/**
 * The Agency defines all agents, plans, and hierarchies, and handles sales.
 */
const Agency = {
    name: '',
    agents: {},
    plans: {},
    hierarchies: {},
    addAgent(name, commissionPercent){
        this.agents[name] = createAgent(name, commissionPercent);
    },
    addPlan(name, percents){
        this.plans[name] =  createCommissionPlan(name, percents);
    },
    /**
     * Adds a new Hierarchy. If the not all agents defined in the hierarchy are in the Agency, this will throw an error.
     * @param name - The name of this hierarchy
     * @param agentsInOrder - Agent Names, where the first is the selling agent, and successive agents being supers.
     */
    addHierarchy(name, agentsInOrder){
        //we need to check that the agents described exist
        agentsInOrder.forEach((agentName) => {
            if(!this.agents[agentName]){
                throw new Error('Unknown Agent defined in Hierarchy')
            }
        });

        this.hierarchies[name] = createHierarchy(name, agentsInOrder);
    },
    /**
     * Handles a sale and returns an object that holds: the total commission, and an array of each agent in the
     * hierarchy with the amount of commission they received. If the Hierarchy or Plan is not defined in the Agency,
     * this will throw an error.
     * @param amt - the sold policy face amount
     * @param hierarchyName - the name of the hierarchy of agents for which a plan will be executed on
     * @param planName - the name of the commission plan for this sale
     */
    executeSale(amt, hierarchyName, planName){
        const hierarchy = this.hierarchies[hierarchyName];
        const plan = this.plans[planName].percents;
        let commissions = {
                total: 0,
                agentsWithSaleCommission: {},
                saleStrings: [], //this is an easy way to print out information about the commissions
        }
        ;
        if(hierarchy && plan){
            let i = 0; //for tracking percent in the plan
            hierarchy.agentsInOrder.forEach((agentName) => {
                let percent;
                if(i >= plan.length){
                    //If the plan has less percents than agents, assume those agents receive nothing.
                    percent = 0;
                } else {
                    percent = plan[i];
                }

                const agent = this.agents[agentName];
                let commission = agent.commissionPercent * percent * amt;
                commission = parseFloat(commission.toFixed(2)); //needed due to float imprecision
                commissions.total += commission;
                commissions.agentsWithSaleCommission[agentName] = commission;

                //Generate string
                commissions.saleStrings.push(
                    `${i === 0 ? 'Selling Agent':`Super Agent ${i}`} (${agent.name}) gets `+
                    `${percent * 100}% of the agent commission % of policy amount = `+
                    `${percent * 100}% * ${agent.commissionPercent * 100}% * ${amt} = ${commission}`
                );

                i++;
            })
        } else {
            throw new Error('Unknown Hierarchy or Plan');
        }

        return commissions;
    }
};

/**
 * Creates an Agency.
 * @param name
 * @return {Agency}
 */
function createAgency(name){
    let newAgency = Object.create(Agency);
    newAgency.name = name;

    return newAgency;
}

module.exports = createAgency; //for exporting to node