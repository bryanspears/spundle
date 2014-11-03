"use strict";

var gloob = require('./gloob');
var async = require('async');
var path = require('path');
var glob = require('glob');

var base = path.resolve('locales');
glob(path.resolve(base, '*/*'), function (err, files) {
    if (err) {
        throw err;
    }

    var out = {};
    async.eachSeries(files, function (ent, next) {
        gloob(ent, function (err, o) {
            out[path.relative(base, ent).replace(/(.*)\/(.*)/, "$2-$1")] = o;
            next();
        });
    }, function (err) {
        if (err) {
            throw err;
        }

        process.stdout.write(JSON.stringify(out));
    });

});
