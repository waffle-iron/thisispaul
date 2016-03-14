'use strict';

var objectAssign = require('object-assign'),
    Base = require('../base');

module.exports = objectAssign(Base, {

    // this is the id
    id: 'time-graph',

    start: function () {
        var self = this;

        console.debug("starting");
    }

});