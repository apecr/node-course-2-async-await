const {expect} = require('chai');
const {getUser, getGrades, getStatus, getStatusAlt} = require('./../app-promises');

/* global define, it, describe, before, beforeEach, afterEach, after */
describe('app', () => {
  it('should get the user 2', () => {
    return getUser(2).then(user => expect(user.name).to.be.equal('Jessica'));
  });
  it('should get the grades of user 1', () => {
    return getGrades(101).then(grades => {
      expect(grades).to.be.an('array');
      expect(grades[0].grade).to.be.equal(86);
    });
  });
  it('Should get the status of user 1', () => {
    return getStatus(1).then(result => expect(result).to.be.equal('Andrew has a 83 in the class'));
  });
  it('Should get the status of user 1 with async-await', () => {
    return getStatusAlt(1).then(result => expect(result).to.be.equal('Andrew has a 83 in the class'));
  });
  it('Should get the status of user 3', () => {
    return getStatus(3).catch(error => expect(error).to.be.equal('Unable to find user with id of 3.'));
  });
  it('Should get the status of user 3 with async-await', () => {
    return getStatusAlt(3).catch(error => expect(error).to.be.equal('Unable to find user with id of 3.'));
  });
});