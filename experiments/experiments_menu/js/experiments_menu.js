/*
 * experiments_menu.js - An access point to experiments, and other stuff.
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

define(
    ['ModuleDiv', 'Controller', 'ContentManager'],
    function (ModuleDiv, Controller, ContentManager) {

    var moduleDiv, p, out, featured;

    moduleDiv = ModuleDiv(
        'Featured JS experiments',
        'experiments/experiments_menu/js/experiments_menu.js'
    );
    out = moduleDiv.out;

    featured = ContentManager.featured;

    return ExperimentsMenu;

    function ExperimentsMenu() {
        var c1, todaysDate, day, month, year;

        moduleDiv.addCaption();

        out(
            '<div style="text-align: right;">' +
                '<a href="https://github.com/valera-rozuvan/javascript-experiments">' +
                    'source' +
                '</a> ' +
                '|| click octocat' +
            '</div>'
        );

        out('<ul>');
        for (c1 = 0; c1 < featured.length; c1 += 1) {
            out(
                '<li ' +
                    'class="experiment_link" ' +
                    'data-src_folder="' + featured[c1].srcFolder + '">' +
                    featured[c1].name  +
                '</li>'
            );
        }
        out('</ul>');

        todaysDate = new Date();

        day = todaysDate.getDate();
        month = todaysDate.getMonth() + 1; // January is 0.
        year = todaysDate.getFullYear();

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }

        out(
            '<div style="display: block; clear: both; text-align: right;">' +
                '© ' +year + ' Valera Rozuvan' +
            '</div>'
        );

        moduleDiv.appendToSelector('.toc');

        Controller.attachClickEvents();
    }
});
