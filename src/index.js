const sample = require('./sample.js');


// sample.getTitle('http://www.cryptedtruth.com/entry/2018/01/07/151705').then(title => console.log(title));
sample.getNekoProfileOfRocketChat('neko', 'neko')
.then(image => console.log(image));
