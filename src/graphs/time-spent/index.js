'use strict';

import objectAssign from 'object-assign';
import {BaseGraph} from '../BaseGraph';
import prettySeconds from 'pretty-seconds';

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

        // create text for the current time
        self.shapes.currentTimeText = self.draw().text(self.getTimeText(0)).move(10, 10);
    },

    /**
     *
     * @param {number} time time in milliseconds
     * @returns {string}
     */
    getTimeText(time) {
        return "Time on site: " + prettySeconds(Math.floor(time / 1000));
    },

    /**
     * This is called every frame
     * @param {number} time number of milliseconds since the start
     */
    render(time) {
        var self = this,
            max = self.max * 1000,
            ratio = time / max,
            width = self.width() * ratio;

        // set the width
        self.shapes.currentTime.width(width);

        // update the text
        let text = self.getTimeText(time);
        if(text !== self.shapes.currentTimeText.text()) {
            self.shapes.currentTimeText.text(text);
        }
    }

});