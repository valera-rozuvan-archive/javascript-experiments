/*
 * Main point of entrance into JavaScript code.
 */

requirejs.config({
    'baseUrl': 'js',
    'paths': {
        'jquery': '../../js-vendor/jquery-1.8.3.min',
        'moduleDiv': '../../js-author/moduleDiv',
        'output': '../../js-author/output',
        'runModules': '../../js-author/runModules'
    }
});

requirejs(['runModules'], function (RunModules) {
    RunModules(5);
});
