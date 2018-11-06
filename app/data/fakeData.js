const createAgency = require('../../src/Agency/Agency');

//Make the agency
const theAgency = createAgency('The Agency');

//Add agents
theAgency.addAgent('Bob', 0.02);
theAgency.addAgent('A', 0.0325);
theAgency.addAgent('C', 0.0225);
theAgency.addAgent('D', 0.0275);
theAgency.addAgent('X', 0.025);
theAgency.addAgent('Z', 0.0175);

//Define plans
theAgency.addPlan('A', [0.5, 0.05]);
theAgency.addPlan('B', [0.7, 0.08, 0.04]);

//Define Hierarchies
theAgency.addHierarchy('H1', ['Bob', 'X', 'A', 'C']);
theAgency.addHierarchy('H2', ['Bob', 'A', 'X', 'D', 'Z']);

//Export the agency
module.exports = theAgency;
