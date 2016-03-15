'use strict';

// import lodash
import _ from 'lodash';
import AnimationFrame from 'animation-frame';

// this is an array of graphs
var graphs = [];

// create a new frame
var animationFrame = new AnimationFrame();

// just doing this so it doesnt stop the page loading
setTimeout(function () {

    // this just bootstraps all the different graphs
    graphs.push(require('./graphs/time-spent'));

    // loop through each graph and build them
    _.forEach(graphs, (graph) => {
        graph.build();
    });

    var render = function (time) {
        // loop through each graph and build them
        _.forEach(graphs, (graph) => {
            graph.render(time);
        });

        // request the frame again
        animationFrame.request(render);
    };

    // start the animation
    animationFrame.request(render);

}, 0);