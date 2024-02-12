const User = require("./User");

class DataBase {
  async getAll() {
    return await User.find();
  }
  async getUserByEmail(email) {
    return await User.findOne({ email });
  }
  async createUser(user) {
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password, // create hash from user.password
      lastLoginTime: Date.now(),
      registrationTime: Date.now(),
      status: "active",
    };
    return await User.create(newUser);
  }
  async updateStatus(ids, status) {
    let results = [];
    for (let id of ids) {
      let user = await User.findById(id);
      user.set("status", status);
      results.push(await user.save());
    }
    return results;
  }
  async updateLoginTime(email) {
    let user = await User.findOne({ email });
    user.set("lastLoginTime", Date.now());
    await user.save();
  }
  async delete(ids) {
    let results = [];
    for (let id of ids) {
      results.push(await User.deleteOne({ _id: id }));
    }
    return results;
  }
}

module.exports = new DataBase();
