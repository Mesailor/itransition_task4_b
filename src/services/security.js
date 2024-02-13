const bcrypt = require("bcrypt");

class Security {
  saltRounds = 10;
  async createHash(password) {
    return await bcrypt.hash(password, this.saltRounds);
  }
  async checkPassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}

module.exports = new Security();
