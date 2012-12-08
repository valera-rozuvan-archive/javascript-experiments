/*
 * Main point of entrance into JavaScript code.
 */

requirejs.config({
    'baseUrl': '',
    'paths': {
        'jquery': 'js-vendor/jquery-1.8.3.min',
        'text': 'js-vendor/text',
        'showdown': 'js-vendor/showdown.min',

        'Output': 'js-author/output',
        'ModuleDiv': 'js-author/module_div',
        'RunModules': 'js-author/run_modules'
    },
    'shim': {
        'showdown': {
            'deps': [],
            'exports': 'Showdown'
        }
    }
});

requirejs(['RunModules', 'jquery'], function (RunModules, $) {
    RunModules('array_splice', 6);
});
