'use strict';

import objectAssign from 'object-assign';
import BaseGraph from '../BaseGraph';

module.exports = objectAssign(BaseGraph, {

    // this is the id
    id: 'time-spent',

    // holds all the shapes for this graph
    shapes: {},

    /**
     *
     */
    start: function () {
        var self = this,
            width = 0;

        self.shapes.time = self.draw().rect(width, 50).addClass('user-time');

        setInterval(function () {
            width++;
            self.shapes.time.width(width);
        }, 100);
    }

});