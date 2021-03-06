// holds current course data
//
var Reflux = require('reflux');
var actions = require('../actions');

var parseChallenge = require('../util/parseChallenge');

var courseStore = Reflux.createStore({
  listenables: actions,
  init() { this.rules = {}; },

  updateChallenge(index) {
    var newChallenge = this.course[index];

    if (newChallenge) this.trigger(newChallenge);
    else this.trigger({ courseCompleted: true });
  },

  onLoadCourse(newCourse) {
    if (!Array.isArray(newCourse)) newCourse = [newCourse];
    this.course = newCourse.map(parseChallenge);
    this.challenge = 0;

    this.trigger({ maxIndex: newCourse.length - 1 });
    this.updateChallenge(this.challenge);
  },

  onChallengeCompleted(code) {
    this.course[this.challenge].initialCode = code;
    this.updateChallenge(++this.challenge);
  },

});

module.exports = courseStore;
