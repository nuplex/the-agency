const router = require('express').Router();
const theAgency = require('../../data/fakeData');
const parse = require('url-parse');

/**
 * This route handles doing a sale. It returns an object holding the sale commission results.
 */
router.get('/doSale', (req, res) => {
    //get the results for the requested plan
    const url = new parse(req.originalUrl, {}, true);
    const query = url.query;
    if(query){
        const planName = query.plan;
        const hierarchyName = query.hierarchy;
        const amt = query.amt;
        try {
            const commission = theAgency.executeSale(amt, hierarchyName, planName);
            res.json({commissions: commission});
        } catch {
            res.json({error: 'There was a problem executing the sale.'})
        }
    } else {
        res.json({
            error: 'Query was invalid'
        })
    }
});

module.exports = router;
