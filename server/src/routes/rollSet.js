const express = require('express');
const middleware = require('../middlewares');
const controller = require('../controllers/rollSet');

const router = express.Router();

/**
 * This post request creates a new Roll Set. The JSON payload is validated
 * before its received by the controller.
 */
router.post('/', middleware.validateCreateRollRequest,
                 middleware.verifySMTPConnection,
                 controller.createRollRequest);

module.exports = router;