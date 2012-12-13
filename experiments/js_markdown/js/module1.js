/*
 * module1.js - Part of "JS Markdown" JavaScript experiment.
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
    ['ModuleDiv', 'Output', 'showdown', 'text!../index.md', 'Controller'],
    function (ModuleDiv, Output, Showdown, IndexSource, Controller) {

    var moduleDiv, p, out;

    // Create an output <div> for our module.
    moduleDiv = ModuleDiv(
        'Rendering sample markdown content.',
        'experiments/js_markdown/js/module1.js'
    );
    moduleDiv.hide();

    // Short hand for output functions we will use.
    p = Output.p.curry(moduleDiv);
    out = Output.out.curry(moduleDiv);

    // Module code.
    return function () {
        var converter, convertedText;

        moduleDiv.empty();
        moduleDiv.addCaption();

        converter = new Showdown.converter();
        convertedText = converter.makeHtml(IndexSource);

        p('Experimenting with text.');
        out(convertedText);

        moduleDiv.appendToPage();
        moduleDiv.slideDown(500);



        Controller.attachClickEvents();
    };
});
