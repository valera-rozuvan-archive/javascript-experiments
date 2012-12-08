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
        'RunModules': 'js-author/run_modules',
        'ExperimentsMenu': 'js-author/experiments_menu'
    },
    'shim': {
        'showdown': {
            'deps': [],
            'exports': 'Showdown'
        }
    }
});

requirejs(['jquery', 'ExperimentsMenu'], function ($, ExperimentsMenu) {
    ExperimentsMenu();
});
