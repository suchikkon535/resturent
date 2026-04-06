// utils/ApiResponse.js

class ApiResponse {
  constructor(statusCode = 200, message = "Success", data) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;

    if (data !== undefined && data !== null) {
      this.data = data;
    }
  }
}

module.exports = ApiResponse;