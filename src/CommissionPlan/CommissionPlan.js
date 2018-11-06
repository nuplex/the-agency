/**
 * Represents a commission plan. It simply holds an array of percents to later assign to a hierarchy. If
 * there are less percents defined than Agents in a hierarchy, when the Agency executes a sale they will be assumed
 * to be 0%.
 * @type {{name: String, percents: Array}}
 */
const CommissionPlan = {
    name: '',
    percents: []
};

/**
 * Creates a commission plan.
 * @param name - the name of the plan
 * @param percents - the percents of the plan, where the first is the percent assigned to the selling agent, and
 * the rest are for successive supers.
 * @return {CommissionPlan}
 */
function createCommissionPlan(name, percents){
    let newCommissionPlan = Object.create(CommissionPlan);
    newCommissionPlan.name = name;
    newCommissionPlan.percents = percents;

    return newCommissionPlan;
}

export { createCommissionPlan };