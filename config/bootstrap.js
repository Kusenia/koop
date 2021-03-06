// App bootstrap
// Code to run before launching the app
//
// Make sure you call cb() when you're finished.
var argv = require('optimist').argv,
  Peechee = require('peechee'),
  fs = require('fs');

var bunyan = require('bunyan');


module.exports.bootstrap = function (cb) {
  setTimeout(function(){ 
    require('../api/providers/'); 

    sails.config.defaultStyle = fs.readFileSync('./api/templates/renderers/style.mss','utf8');

    sails.config.log = new bunyan({
      'name': 'koop-log',
      streams: [{
              type: 'rotating-file',
              path: '/var/log/koop.log',
              period: '1d',   // daily rotation
              count: 3        // keep 3 back copies
      }]
    });

    Cache.db = PostGIS.connect( sails.config.db_conn );

    // set up an instance of peechee for saving files (downloads) 
    sails.peechee = new Peechee( sails.config.peechee );

    cb();
  }, 1000);
};
