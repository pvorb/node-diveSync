var diveSync = require("../");

diveSync(process.cwd(), { directories: true, all: false, recursive: false },
    function(err, file) {
  if (err) throw err;
    console.log(file);
});
