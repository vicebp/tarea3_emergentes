const express = require("express");
const adminRouter = require('./admin');
const companyRouter = require('./company');
const locationRouter = require('./location');
const sensorRouter = require('./sensor');
const sensorDataRouter = require('./sensor_data');



function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/admin', adminRouter);
    router.use('/company', companyRouter);
    router.use('/location', locationRouter);
    router.use('/sensor', sensorRouter);
    router.use('/sensor_data', sensorDataRouter);

}

module.exports = routerApi;