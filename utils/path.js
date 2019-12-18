const path = require('path');

// it looks for the file which run the certain function
module.exports = path.dirname(process.mainModule.filename)