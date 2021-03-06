#!/usr/bin/env node

var shell = require("shelljs");
var _ = require("lodash");
var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars');
var recursive = require('recursive-readdir');

var paths = {
    src: 'src',
    target: 'target'
};

// clean up target
shell.rm('-rf', paths.target + '/');

var configs = [
    _.assign({env: 'staging'}, require('./config/staging.json')),
    _.assign({env: 'production'}, require('./config/production.json'))
];


// for each config file
_.forEach(configs, function (config) {

    // read each template file
    recursive(paths.src, function (error, templates) {
        _.forEach(templates, function (templateFile) {

            // compile template file to target/env folder
            var outputFolder = path.join(paths.target, config.env);
            var outputPath = templateFile.replace(paths.src, outputFolder);
            outputPath = outputPath.replace('.tpl.conf', '.conf');

            var templateFileContent = fs.readFileSync(templateFile, 'utf8');
            var template = handlebars.compile(templateFileContent);
            var output = template(config);
            shell.mkdir('-p', path.dirname(outputPath));
            fs.writeFileSync(outputPath, output);

        })
    });
});