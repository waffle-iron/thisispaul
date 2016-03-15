'use strict';

import SVG from 'svg.js';

module.exports = {

    /**
     *
     */
    build: function () {
        var self = this;

        // set the element
        self.draw = SVG(self.id);

        // start the
        self.start();
    },

    /**
     *
     */
    start: function () {
        console.error('This function needs to be overwritten');
    },

    /**
     *
     * @returns {SVG}
     */
    draw: function () {
        return this.draw;
    }

};