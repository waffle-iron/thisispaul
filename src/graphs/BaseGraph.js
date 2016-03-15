'use strict';

import SVG from 'svg.js';
import _ from 'lodash';

export var BaseGraph = function () {
    this.constructor();
};

BaseGraph.prototype = {

    /**
     * Called when this is created
     */
    constructor() {
        var self = this;

        // attributes for this object
        self._attributes = {};
    },

    /**
     *
     */
    build() {
        var self = this;

        // create an element for this graph
        self._element = document.createElement('div');

        // set the elements id
        self._element.id = self.id;

        // add the div to the page
        document.body.appendChild(self._element);

        // set the element
        self._svg = SVG(self.id);

        // initialise the graph
        self.init();

        // add a listener for the window resizing
        window.addEventListener("resize", () => {
            self.resize()
        });
    },

    /**
     *
     */
    init() {
        console.error('This function needs to be overwritten');
    },

    /**
     * This is called every frame
     * @param time
     */
    render(time) {
        console.error('This function needs to be overwritten', time);
    },

    /**
     *
     * @returns {SVG}
     */
    draw() {
        return this._svg;
    },

    /**
     * Called when the window is resized
     */
    resize() {
        var self = this;

        // reset the attributes
        self._attributes = {};
    },

    /**
     * Returns the width of this svg container
     * @returns {number}
     */
    width() {
        var self = this;

        // if the width is undefined then we need to get it
        if (_.isUndefined(self._attributes.width)) {
            self._attributes.width = self._element.clientWidth;
        }

        // return the width
        return self._attributes.width;
    },

    /**
     * Returns the height of this svg container
     * @returns {number}
     */
    height() {
        var self = this;

        // if the height is undefined then we need to get it
        if (_.isUndefined(self._attributes.height)) {
            self._attributes.height = self._element.clientHeight;
        }

        // return the height
        return self._attributes.height;
    }

};