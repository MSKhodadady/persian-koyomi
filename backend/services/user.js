const { verify } = require('../lib/auth');

/**
 * @type {User[]}
 */
const users = [];

exports.UserService = {
  /**
   *
   * @param {User} u
   */
  add(u) {
    //: check if user exist
    if (users.some((i) => (i.username = u.username))) return 'exits';

    users.push(u);

    return true;
  },

  /**
   * @param {string} username
   */
  find(username) {
    return users.find((i) => i.username == username);
  },
};
