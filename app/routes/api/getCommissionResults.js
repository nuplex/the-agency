const router = require('express').Router();
const theAgency = require('../../data/fakeData');
const parse = require('url-parse');

/**
 * This route handles returning the commission results of a sale.
 */
router.get('/getCommissionResults', (req, res) => {
    //get the results for the requested plan
    const url = new parse(req.originalUrl, {}, true);
    const query = url.query;
    if(query){
        const amt = query.amt;
        const hierarchyName = query.hierarchy;
        const planName = query.plan;
        try {
            const commission = theAgency.executeSale(amt, hierarchyName, planName);
            res.json({commissions: commission});
        } catch (error) {
            res.json({error: 'There was a problem executing the sale.'})
        }
    } else {
        res.json({
            error: 'Query was invalid'
        })
    }
});

module.exports = router;
