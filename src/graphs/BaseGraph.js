'use strict';

import SVG from 'svg.js';

module.exports = {

    /**
     *
     */
    build: function () {
        var self = this;

        // create an element for this graph
        self.element = document.createElement('div');

        // set the elements id
        self.element.id = self.id;

        // add the div to the page
        document.body.appendChild(self.element);

        // set the element
        self.svg = SVG(self.id);

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
        return this.svg;
    }

};