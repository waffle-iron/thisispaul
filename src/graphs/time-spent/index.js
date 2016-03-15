'use strict';

import objectAssign from 'object-assign';
import {BaseGraph} from '../BaseGraph';

module.exports = objectAssign(new BaseGraph(), {

    // this is the id
    id: 'time-spent',

    // holds all the shapes for this graph
    shapes: {},

    /**
     *
     */
    init() {
        var self = this,
            width = 0;

        self.shapes.time = self.draw().rect(width, 50).addClass('user-time');
    },

    /**
     * This is called every frame
     * @param time
     */
    render(time) {

    }

});