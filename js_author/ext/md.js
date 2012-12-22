/*
 * md.js - Create a module DIV from a MarkDown file without a JS definition.
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
    ['ModuleDiv', 'Output', 'showdown', 'Controller', 'logme'],
    function (ModuleDiv, Output, Showdown, Controller, logme) {

    return ExtMd;

    function ExtMd(mdText) {
        var moduleDiv, converter, caption, link;

        caption = '';
        link = '';

        // Remove any leading whitespace and EOL characters.
        mdText = mdText.replace(/^[\s\n]+/, '');

        (function GetCaption(matches) {
            if ((matches !== null) && (typeof matches[1] === 'string')) {
                caption = matches[1];
                mdText = mdText.replace(matches[0], '');
                mdText = mdText.replace(/^[\s\n]+/, '');
            }
        }(mdText.match(/^##\[CAPTION\[(.*)\]\]##/)));

        (function GetLink(matches) {
            if ((matches !== null) && (typeof matches[1] === 'string')) {
                link = matches[1];
                mdText = mdText.replace(matches[0], '');
                mdText = mdText.replace(/^[\s\n]+/, '');
            }
        }(mdText.match(/^##\[LINK\[(.*)\]\]##/)));

        // Remove any trailing whitespace and EOL characters.
        mdText = mdText.replace(/[\s\n]+$/, '');

        moduleDiv = ModuleDiv(
            caption,
            link
        );
        moduleDiv.hide();

        moduleDiv.empty();
        moduleDiv.addCaption();

        converter = new Showdown.converter();
        Output.out(moduleDiv, converter.makeHtml(mdText));

        moduleDiv.appendToPage();
        moduleDiv.slideDown(500);

        Controller.attachClickEvents();
    }
});
