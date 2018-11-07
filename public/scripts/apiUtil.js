/**
 * This is a utility file for the front-end that handles API calls.
 */

/**
 * Asynchronous function that will ping the node application and get back the commission results of a sale.
 * @param amt - amount of the sale
 * @param hierarchy - the name of the hierarchy of agents to use
 * @param plan - the name of the commission plan to use
 * @return {Promise<void>}
 */
export const getCommissionResults = async (amt, hierarchy, plan) => {
    const options = {
        method: 'GET',
    };

    const res = await fetch(`/api/getCommissionResults?amt=${amt}&hierarchy=${hierarchy}&plan=${plan}`,options);
    const data = await res.json();

    if(data.error){
        throw new Error(data.error);
    }
    return data;
};