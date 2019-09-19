const express = require('express');
const router = express.Router();
const interface = require('../../models/interface/main');

router.get('/route/url', async function (req, res) {
    // get params
    const p1 = await interface.getParam1(req);
    const p2 = await interface.getParam2(req);

    console.log("Got Params: " + p1 + " " + p2);

    // call utility functions in interface - if required
    const details = await interface.getUtility(p1, p2);
    
    // return response
    return res.json(details);
});

module.exports = router;