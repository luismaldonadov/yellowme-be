/**
 * Creates a function IIFE closure in order to create
 * a fake database implementation to store
 * urls
 * @returns{Object}
 */
const database = (function start_database() {
  let fakeDatabase = null;

  function _init_closure() {
    fakeDatabase = new Map();
  }

  _init_closure();
  return {
    get(key) {
      return fakeDatabase.get(key);
    },
    set(key, value) {
      fakeDatabase.set(key, value);
      return true;
    },
    all() {
      return fakeDatabase;
    },
  };
})();

export default database;
