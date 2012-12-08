/*
 * Main point of entrance into JavaScript code.
 */

requirejs.config({
    'baseUrl': '',
    'paths': {
        'jquery': 'js_vendor/jquery-1.8.3.min',
        'text': 'js_vendor/text',
        'showdown': 'js_vendor/showdown.min',

        'Output': 'js_author/output',
        'ModuleDiv': 'js_author/module_div',
        'RunModules': 'js_author/run_modules',
        'ExperimentsMenu': 'js_author/experiments_menu'
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
