const router = require('express').Router();

const { ControllerCurriculum } = require('./controllers/curriculum.controller');

router.post('/curriculum', ControllerCurriculum.post);

module.exports = {
    Router: router
};
