/*
 * module_div.js - Create a DIV container for a module.
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

define(['jquery'], function ($) {
    return ModuleDiv;

    function ModuleDiv(moduleDescription, githubLink) {
        var moduleDiv, captionDiv;

        moduleDiv = $('<div>');
        moduleDiv.addClass('module');

        captionDiv = $('<div>');
        captionDiv.addClass('module_caption');
        captionDiv.html(moduleDescription);

        gitCatDiv = $('<div>');
        gitCatDiv.addClass('octocat');
        gitCatDiv.html(
            '<a href="https://github.com/valera-rozuvan/javascript-experiments/blob/master/' + githubLink + '">' +
                '<img src="images/git_cat_icon.png" />' +
            '</a>'
        );
        gitCatDiv.appendTo(captionDiv);

        moduleDiv.addCaption = addCaption;
        moduleDiv.appendToPage =  appendToPage;
        moduleDiv.appendToSelector =  appendToSelector;

        return moduleDiv;

        function addCaption() {
            captionDiv.appendTo(moduleDiv);
        }

        function appendToPage() {
            this.appendTo('.page');
        }

        function appendToSelector(divSelector) {
            this.appendTo(divSelector);
        }
    }
});
