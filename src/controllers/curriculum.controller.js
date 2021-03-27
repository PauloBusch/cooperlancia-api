const { EErrorCode, Error, Result } = require('../utils/result');

const controllerCurriculum = { };

controllerCurriculum.post = async (req, res) => {
  res.json(new Result(0));
}

module.exports = {
  ControllerCurriculum: controllerCurriculum
}
