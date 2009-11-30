require.paths.unshift("./spec/lib", "./lib");
process.mixin(GLOBAL, require("sys"))

require("jspec")
require("express")
require("express.mocks")

readFile = function(path, callback) {
  var promise = require('posix').cat(path, "utf8")
  promise.addErrback(function(){ throw "failed to read file `" + path + "'" })
  promise.addCallback(function(contents){
    callback(contents)
  })
  promise.wait()
}

print = puts

if (process.ARGV[2])
  JSpec.exec('spec/spec.' + process.ARGV[2] + '.js')  
else
  JSpec
    .exec('spec/spec.core.js')
    .exec('spec/spec.routing.js')
    .exec('spec/spec.mocks.js')
    .exec('spec/spec.modules.js')
    .exec('spec/spec.mime.js')
    .exec('spec/spec.cookie.js')
    .exec('spec/spec.session.js')
    .exec('spec/spec.view.js')  
    .exec('spec/spec.async.js')
JSpec.run({ formatter: JSpec.formatters.Terminal, failuresOnly: false })
JSpec.report()

