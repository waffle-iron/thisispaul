'use strict';

import objectAssign from 'object-assign';
import {BaseGraph} from '../BaseGraph';

module.exports = objectAssign(new BaseGraph(), {

    // this is the id
    id: 'time-spent',

    // this is 5 minutes in seconds
    max: 300,

    // holds references to the shapes
    shapes: {},

    /**
     *
     */
    init() {
        var self = this;

        // create the shape for the users current time
        self.shapes.currentTime = self.draw().rect(0, self.height()).addClass('user-time');
    },

    /**
     * This is called every frame
     * @param {float} time number of milliseconds since the start
     */
    render(time) {
        var self = this,
            max = self.max * 1000,
            ratio = time / max,
            width = self.width() * ratio;

        // set the width
        self.shapes.currentTime.width(width);
    }

});