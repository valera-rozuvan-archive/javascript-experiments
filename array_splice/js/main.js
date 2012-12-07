/*
 * Main point of entrance into JavaScript code.
 */

requirejs.config({
    'baseUrl': 'js',
    'paths': {
        'jquery': '../../js-vendor/jquery-1.8.3.min',
        'text': '../../js-vendor/text',
        'showdown': '../../js-vendor/showdown.min',

        'output': '../../js-author/output',
        'moduleDiv': '../../js-author/moduleDiv',
        'runModules': '../../js-author/runModules'
    },
    'shim': {
        'showdown': {
            'deps': [],
            'exports': 'Showdown'
        }
    }
});

requirejs(['runModules'], function (RunModules) {
    RunModules(6);
});
