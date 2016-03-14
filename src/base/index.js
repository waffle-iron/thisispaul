'use strict';

module.exports = {

    /**
     *
     */
    build: function () {
        var self = this;

        // set the element
        self.element = document.getElementById(self.id);

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
     * @returns {Element|*}
     */
    getElement: function () {
        return this.element;
    }

};