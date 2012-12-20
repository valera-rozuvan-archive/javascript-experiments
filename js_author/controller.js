/*
 * controller.js - Switch current experiment, process links to experiments.
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

define(['jquery', 'RunModules'], function ($, RunModules) {

    return {
        'switchExperiment': switchExperiment,
        'attachClickEvents': attachClickEvents
    };

    function switchExperiment(srcFolder) {
        var numDivsLeft, divsToProcess;

        // $('.page').empty();

        // Instead of a simple empty(), let us do something a bit more
        // fancy. We will get all of the DIVs that must be removed, and
        // we will hide them using the jQuery's slide up event. The
        // last DIV to slide up will call the function to show the next
        // set of content DIVs. If there are no DIVs to slide up, then
        // we simply call the function to show the next set of content
        // DIVs.

        divsToProcess = $('.page').children('.module');

        if (divsToProcess.length === 0) {
            showSelectedExperiment();
        } else {
            numDivsLeft = divsToProcess.length;

            divsToProcess.each(function (index, value) {
                $(value).slideUp(500, function () {
                    numDivsLeft -= 1;

                    if (numDivsLeft === 0) {
                        showSelectedExperiment();
                    }
                });
            });
        }

        return;

        // Function to show the next set of content DIVs.
        function showSelectedExperiment() {
            $('.page').empty();

            RunModules(srcFolder);
        }
    }

    function attachClickEvents() {
        $('.experiment_link').each(function (index, value) {
            var src_folder, click_attached;

            src_folder = $(value).data('src_folder');
            click_attached = $(value).data('click_attached');

            if (
                (typeof src_folder === 'string') &&
                (src_folder.length > 0) &&
                (typeof click_attached === 'undefined')
            ) {
                $(value).attr('data-click_attached', 'true');

                $(value).on('click', function () {
                    switchExperiment(src_folder);
                });
            }
        });
    }
});
