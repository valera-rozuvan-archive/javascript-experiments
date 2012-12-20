/*
 * run_modules.js - Runs all modules contained in an experiment.
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

define(['jquery', 'logme', 'ExtMd'], function ($, logme, ExtMd) {
    return RunModules;

    function RunModules(moduleDir) {

        // moduleDir is a path to the directory where the experiment is. It
        // should be a string.
        if (typeof moduleDir !== 'string') {
            return;
        }

        // Tell Require JS to load the experiment's configuration JSON file.
        // It will contain the list of modules available for that experiment,
        // (along with the order that they should be displayed in).
        require(['text!' + moduleDir + '/config.json'], function (configJson) {
            var config, c1, moduleNames, matches;

            // configJson is the contents of the 'config.json' file, as
            // retrieved by RequireJS. It should be a string.
            if (typeof configJson !== 'string') {
                return;
            }

            try {
                config = JSON.parse(configJson);
            } catch (err) {
                logme(
                    'Something went wrong while parsing the configJson ' +
                    'string. Most likely the file "' +
                    moduleDir + '/config.json' + '" was not found, and ' +
                    'Require JS gave us back an empty string. We do not ' +
                    'continue.',

                    'JSON.parse() returned with error message: "' + err.message + '".'
                );

                return;
            }

            // We expect an array of module paths (without the trailing '.js').
            // If we don't get an array, or it is empty, do not continue
            if (
                ($.isArray(config.to_run) === false) ||
                (config.to_run.length === 0)
            ) {
                return;
            }

            moduleNames = [];

            for (c1 = 0; c1 < config.to_run.length; c1 += 1) {

                // First check that it is really a string, and then construct a
                // path to the module. All modules JS files are to be placed
                // under the 'js/' directory in the experiment folder.
                if (typeof config.to_run[c1] === 'string') {

                    matches = config.to_run[c1].match(/^md!(.*)$/);
                    if (matches !== null) {
                        logme(matches);

                        moduleNames.push('text!' + moduleDir + '/md/' + matches[1]);
                        // continue;
                    } else {
                        moduleNames.push(moduleDir + '/js/' + config.to_run[c1]);
                    }
                }

            }

            if (typeof config.name === 'string') {
                $(document).attr(
                    'title',
                    'JavaScript Experiments: ' + config.name
                );
            }

            // Tell require JS to load all of the modules defined in the
            // experiment. The anonymous callback will execute once all of them
            // have been loaded.
            require(moduleNames, function () {
                var i;

                // Call the module functions sequentially.
                for (i = 0; i < arguments.length; i++) {
                    if (typeof arguments[i] === 'string') {
                        // logme('Got a string for a module.');
                        ExtMd(arguments[i]);
                    } else {
                        arguments[i]();
                    }
                }

            });

        });

    }
});
