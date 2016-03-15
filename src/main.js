'use strict';

import _ from 'lodash';

var graphs = [];

// this just bootstraps all the different graphs
graphs.push(require('./graphs/time-spent'));

// loop through each graph and build them
_.forEach(graphs, (graph) => {
    setTimeout(function () {
        graph.build();
    }, 0);
});