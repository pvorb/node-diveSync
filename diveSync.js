var fs = require('fs'), append = require('append'), ignoreDirs = [], ignoreDirsCreated = false;

// General function
var diveSync = function(dir, opt, action) {

	// action is the last argument
	action = arguments[arguments.length - 1];

	// default options
	var defaultOpt = {
		recursive:true,
		all:false,
		directories:false
	};

	// ensure opt is an object
	if (typeof opt != 'object')
		opt = {};

	opt = append(defaultOpt, opt);

	//if opt.ignore create the ignoring array
	if (!ignoreDirsCreated && opt.ignore) {
		opt.ignore.forEach(function(item) {
			ignoreDirs.push(process.cwd() + '/' + item);
		});
		ignoreDirsCreated = true;
	}

	// Read the directory unless ignoring it
	if (ignoreDirs.indexOf(dir) != -1) {
		return;
	}

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
				// Call the action if enabled for directories
				if (opt.directories)
					action(null, path);

				// Dive into the directory
				if (opt.recursive)
					diveSync(path, opt, action);
			} else {
				// Call the action
				action(null, path);
			}
		}
	});
};

module.exports = diveSync;