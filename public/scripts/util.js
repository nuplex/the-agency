import {getCommissionResults} from "./apiUtil";
/**
 * This is a utility file for the front-end that holds functions and front-end HTML generation logic;
 */

/**
 * Calls the getCommissionResults function in apiUtil for a predefined sale.
 * @param amt - the policy face amount
 * @param hierarchy - the hierarchy to be used
 * @param plan - the plan to be used
 */
function onClickOption(amt, hierarchy, plan){
    const root = document.getElementById("app");
    
    //delete error or loading
    if(root.getElementsByClassName("error-cont").length > 0){
        root.removeChild(root.getElementsByClassName("error-cont")[0]);
    }

    if(root.getElementsByClassName("loading-cont").length > 0){
        root.removeChild(root.getElementsByClassName("loading-cont")[0]);
    }

    //delete pre-existing results
    if(root.getElementsByClassName("sale-results").length > 0){
        root.removeChild(root.getElementsByClassName("sale-results")[0]);
    }

    //get the answer
    const loading = getLoading();
    root.appendChild(loading);
    Promise.resolve(getCommissionResults(amt, hierarchy, plan))
        .then((data) => {
            const answer  = generateAnswer(data.commissions.total, data.commissions.saleStrings);
            root.removeChild(loading);
            root.appendChild(answer);
        })
        .catch((error) => {
            root.removeChild(loading);
            root.appendChild(getError());
        });
}
/**
 * Generates the HTML for an option (what displays sales to simulate).
 * @param num - the sale number
 * @param amt - the policy face amount
 * @param hierarchy - the hierarchy to be used
 * @param plan - the plan to be used
 * @return {Node}
 */
function generateOptionText(num, amt, hierarchy, plan){
    const saleTxt = `Sale <span class="special--sale">${num}</span>: `;
    const policyTxt = `Policy Face Amount: <span class="special--amt">\$${amt}</span>; `;
    const hierarchyTxt = `Agent Hierarchy: <span class="special--hierarchy">${hierarchy}</span>; `;
    const planTxt = `Commission Plan: <span class="special--plan">${plan}</span>`;

    const div = document.createElement('div');
    div.className = "sale-text-cont";
    div.innerHTML =`${saleTxt}${policyTxt}${hierarchyTxt}${planTxt}`;

    const btn = document.createElement('button');
    btn.innerText = "Do Sale!";
    btn.addEventListener("click", () => onClickOption(amt, hierarchy, plan));

    div.appendChild(btn);

    return div;
}

/**
 * Generates the HTML for an option (what displays sales to simulate).
 */
function generateCustomOption(){
    //define inputs
    /* generating spans in here because over-use of innerHTML can affect listeners */
    const saleSpan = document.createElement('span');
    saleSpan.innerHTML = 'Custom Sale: ';

    const policySpan = document.createElement('span');
    policySpan.innerHTML = 'Policy Face Amount: $';
    const policyInput = document.createElement('input');
    policyInput.type = "text";
    policyInput.className = "custom-input--num";

    const hierarchySpan = document.createElement('span');
    hierarchySpan.innerHTML = 'Agent Hierarchy: ';
    const hierarchyInput = document.createElement('input');
    hierarchyInput.type = "text";
    hierarchyInput.className = "custom-input";
    
    const planSpan = document.createElement('span');
    planSpan.innerHTML = 'Commission Plan: ';
    const planInput = document.createElement('input');
    planInput.type = "text";
    planInput.className = "custom-input";

    //combine it all
    const div = document.createElement('div');
    div.className = "sale-text-cont";
    div.appendChild(saleSpan);
    div.appendChild(policySpan);
    div.appendChild(policyInput);
    div.appendChild(hierarchySpan);
    div.appendChild(hierarchyInput);
    div.appendChild(planSpan);
    div.appendChild(planInput);


    //set listeners and button
    const btn = document.createElement('button');
    btn.innerText = "Do Sale!";
    btn.addEventListener("click", () => {
        let amt, hierarchy, plan;

        amt = policyInput.value;
        hierarchy = hierarchyInput.value;
        plan = planInput.value;

        onClickOption(amt, hierarchy, plan);
    });

    div.appendChild(btn);

    return div;
}

/**
 * Generates the HTML for displaying the commission results.
 * @param total - the total of the commission results
 * @param saleStrings - the array of strings of results returned from getCommissionResults
 * @return {Node}
 */
function generateAnswer(total, saleStrings){
    let combined = '<span class="special--results">Commission Results</span><br/>';
    saleStrings.forEach((str) => {
        combined += str+"<br/>";
    });
    combined += `Total Commission: ${total}`;

    const p = document.createElement('p');
    p.className = "sale-results";
    p.innerHTML = combined;

    return p;
}

/**
 * Helper function that returns HTML for loading
 * @return {Node}
 */
function getLoading() {
    const loadingCont  = document.createElement('div');
    loadingCont.className = "loading-cont";
    const loading = document.createElement('div');
    loading.className = "loading";
    loadingCont.appendChild(loading);
    return loadingCont;
}

/**
 * Helper function that return HTML to display an error
 * @return {Node}
 */
function getError() {
    const errorCont  = document.createElement('div');
    errorCont.className = "error-cont";
    const error = document.createElement('span');
    error.className = "error";
    error.innerText = "There was a problem, try again.";
    errorCont.appendChild(error);
    return errorCont;
}


export {generateCustomOption, generateOptionText};