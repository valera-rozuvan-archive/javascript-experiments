/*
 * logme.js - Utility to output information to the JS console.
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

define([], function () {
    var debugMode;

    // debugMode can be one of the following:
    //
    //     true - All messages passed to logme will be written to the internal
    //            browser console.
    //     false - Suppress all output to the internal browser console.
    //
    // Obviously, if anywhere there is a direct console.log() call, we can't do
    // anything about it. That's why use logme() - it will allow to turn off
    // the output of debug information with a single change to a variable.
    debugMode = true;

    // Provide methods to enable/disable logging.
    logme.enable = function () { debugMode = true; };
    logme.disable = function () { debugMode = false; };

    return logme;

    // ########################################################################
    //
    // Function: logme([arg1 [, arg2 [, ...]]])
    //
    // A helper function that provides logging facilities. We don't want
    // to call console.log() directly, because sometimes it is not supported
    // by the browser. Also when everything is routed through this function.
    // the logging output can be easily turned off.
    //
    // logme() supports multiple parameters. Each parameter will be passed to
    // the console.log() function separately.
    //
    // ########################################################################
    function logme() {
        var i;

        if (
            (typeof debugMode === 'undefined') ||
            (debugMode !== true) ||
            (typeof window.console === 'undefined')
        ) {
            return;
        }

        for (i = 0; i < arguments.length; i++) {
            window.console.log(arguments[i]);
        }
    } // End-of: function logme
});
