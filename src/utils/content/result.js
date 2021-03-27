const EErrorCode = {
  None: 0,
  InvalidParams: 1,
  DuplicateUnique: 2,
  NotAllowedCommad: 3,
  NotFound: 4,
  Fail: 5
};

class Error {
  constructor(
      errorCode,
      message
  ) {
      this.ErrorCode = errorCode;
      this.Message = message;
  }
};

class Result {
  constructor(
      rows,
      data,
      errorCode,
      message
  ) {
      this.Rows = rows;
      this.Data = data;
      this.Message = message;
      this.ErrorCode = errorCode || EErrorCode.None;
  }
};

module.exports = {
  EErrorCode,
  Error,
  Result
}
