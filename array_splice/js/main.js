/*
 * Main point of entrance into JavaScript code.
 */

requirejs.config({
    'baseUrl': 'js',
    'paths': {
        'jquery': '../../js-vendor/jquery-1.8.3.min'
    }
});

requirejs(
    function () {
        var i, numModules, moduleNames;

        // Number of JavaScript modules that exist. They should be in the same
        // directory as this (main.js) script.
        numModules = 5;

        // We will generate the module names dynamically. They all have a
        // pattern to their naming scheme.
        moduleNames = [];

        for (i = 1; i <= numModules; i++) {
            // Module names start with 'module1', and continue with 'module2',
            // 'module3', and so on.
            moduleNames.push('module' + i);
        }

        return moduleNames;
    }(),
    function () {
        var i;

        // Call the module functions sequentially.
        for (i = 0; i < arguments.length; i++) {
            arguments[i]();
        }
    }
);
