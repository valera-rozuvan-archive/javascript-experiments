/*
 * main.js - Require JS initialization and main point of entry for all JS.
 *
 *
 * Copyright 2012 Valera Rozuvan
 *
 *
 * This file is part of javascript-experiments.
 *
 * javascript-experiments is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * javascript-experiments is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
 */

// Require JS gets configured with the base URL, and appropriate module-to-path
// aliases.
requirejs.config({
    'baseUrl': 'experiments',
    'paths': {
        'jquery': '../js_vendor/jquery-1.8.3.min',
        'text': '../js_vendor/text',
        'showdown': '../js_vendor/showdown.min',

        'Output': '../js_author/output',
        'ModuleDiv': '../js_author/module_div',
        'RunModules': '../js_author/run_modules',
        'ExperimentsMenu': '../js_author/experiments_menu'
    },
    'shim': {
        'showdown': {
            'deps': [],
            'exports': 'Showdown'
        }
    }
});

// Main point of entrance into JavaScript code.
requirejs(['jquery', 'ExperimentsMenu'], function ($, ExperimentsMenu) {

    // Just in case. This will tell jQuery to return the global $ variable it
    // created back to it's previous state. Even thought we will not use other
    // libraries which also define a $ variable, we will still perform this
    // step. Whenever we will require jQuery, we will get it via Require JS
    // dependency system.
    $.noConflict();

    // Show the menu. All of the experiments are accessible from it.
    ExperimentsMenu();

});
