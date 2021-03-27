const { EErrorCode, Error, Result } = require('../utils/content/result');
const { MailDetails, MailSmtp, MailAttachment } = require('../utils/mail/mailSmtp');
const { Email } = require('../utils/content/validators');
const { IncomingForm } = require('formidable');

const controllerCurriculum = { };

controllerCurriculum.post = async (req, res) => {
  new IncomingForm().parse(req, function(err, fields, files) {
    if (err) return res.json(new Error(EErrorCode.InvalidParams, 'Cannot read parameters'));
    const resultValidation = validatePost(fields, files);
    if (resultValidation) return res.json(resultValidation);

    const mailAttachment = new MailAttachment(
      files.curriculum.name,
      files.curriculum
    );

    const mailDetail = new MailDetails(
      `${fields.websiteName} - Currículo`,
      `<h3>Um novo currículo foi enviado pelo website <a href="${fields.websiteUrl}">${fields.websiteName}</a>, o arquivo está anexado ao email.</h3>` + 
      `<h3>Informações do candidato:</h3>` +
      `<strong>Nome: </strong> ${fields.name}<br />` +
      `<strong>Email: </strong> ${fields.email}<br />` +
      `<strong>Mensagem: </strong> ${fields.message}<br />`,
      process.env.SMTP_CONTACT,
      [mailAttachment]
    );

    const mail = new MailSmtp(mailDetail);
    mail.Send((err, info) => {
      const result = err
        ? new Result(0, undefined, EErrorCode.Fail, 'Fail to send email')
        : new Result(0, info);

      res.json(result);
    });
  });
}

function validatePost(fields, files) {
  if (!fields.websiteName) return new Error(EErrorCode.InvalidParams, 'Parameter websiteName is required');
  if (!fields.websiteUrl) return new Error(EErrorCode.InvalidParams, 'Parameter websiteUrl is required');
  if (!fields.name) return new Error(EErrorCode.InvalidParams, 'Parameter name is required');
  if (!fields.email) return new Error(EErrorCode.InvalidParams, 'Parameter email is required');
  if (!Email.valid(fields.email)) return new Error(EErrorCode.InvalidParams, 'Parameter email is invalid');
  if (!fields.message) return new Error(EErrorCode.InvalidParams, 'Parameter message is required');
  if (!files.curriculum) return new Error(EErrorCode.InvalidParams, 'Curriculum file is required');
  const { name } = files.curriculum;
  const extension = name.substring(name.lastIndexOf('.'));
  if (extension !== '.pdf') return new Error(EErrorCode.InvalidParams, 'Curriculum file only accept .pdf extension');
}

module.exports = {
  ControllerCurriculum: controllerCurriculum
}
