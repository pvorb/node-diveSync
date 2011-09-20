var fs = require('fs'),
    append = require('append');

// General function
var diveSync = function(dir, opt, action) {

  // action is the last argument
  action = arguments[arguments.length - 1];

  // default options
  var defaultOpt = {
    recursive: true,
    all: false
  };

  // ensure opt is an object
  if (typeof opt != 'object')
    opt = {};

  opt = append(defaultOpt, opt);

  // Read the directory
  var list = fs.readdirSync(dir);

  // For every file in the list
  list.forEach(function(file) {
    if (opt.all || file[0] != '.') {
      // Full path of that file
      var path = dir + '/' + file;
      // Get the file's stats
      var stat = fs.statSync(path);

      // If the file is a directory
      if (stat && stat.isDirectory()) {
        // Dive into the directory
        if (opt.recursive)
          dive(path, opt, action);
      } else {
        // Call the action
        action(null, path);
      }
    }
  });
};

module.exports = diveSync;
