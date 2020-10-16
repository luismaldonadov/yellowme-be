/**
 * Creates a function IIFE closure in order to create
 * a fake database implementation to store
 * urls. By being IFFE we immediately create a closure,
 * and by importing the module anywhere in our application
 * we have access to the database
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
      const result = fakeDatabase.get(key);
      return result ? result : null;
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
