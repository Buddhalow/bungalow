var os = require('os');
var fs = require('fs');
var md5 = require('md5');
var tmp = require('tmp');
var path = require('path');


function getFileName(uri) {
    return path.join(md5(uri) + '.json')
}


function getFilePath(uri) {
    return path.join(os.tmpdir(), getFileName(uri));
}


function Cache() {

}


Cache.prototype.save = function (uri, contents) {
    var filePath = getFilePath(uri);
    fs.writeFileSync(filePath, JSON.stringify(contents));
}

Cache.prototype.invalidate = function (uri) {
    var filePath = getFilePath(uri);
    fs.unlinkSync(filePath);
}


Cache.prototype.load = function (uri) {
    var filePath = path.join(os.tmpdir(), getFileName(uri));
    return JSON.parse(fs.readFileSync(filePath));
}


Cache.prototype.isCached = function (uri) {
    return fs.existsSync(getFilePath(uri));
}


var cache = new Cache();


module.exports = cache;