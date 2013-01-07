/*
 * experiments_menu.js - An access point to experiments, and other stuff.
 *
 *
 * Copyright 2012-2013 Valera Rozuvan
 * http://javascript-experiments.net/
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

define(['ContentManager', 'jquery'], function (ContentManager, $) {
    var oldScrollLeft, oldWindowWidth;

    oldScrollLeft = -1;
    oldWindowWidth = -1;

    return function () {
        var out, featured, c1, todaysDate, year;

        out = this.moduleDiv.out;

        out(
            '<div style="text-align: right;">' +
                '<a href="https://github.com/valera-rozuvan/javascript-experiments">' +
                    'source' +
                '</a> ' +
                '|| click octocat' +
            '</div>'
        );

        featured = ContentManager.featured;
        out('<ul>');
        for (c1 = 0; c1 < featured.length; c1 += 1) {
            out(
                '<li ' +
                    'class="experiment_link" ' +
                    'data-src_folder="' + featured[c1].srcFolder + '" ' +
                '>' +
                    featured[c1].name  +
                '</li>'
            );
        }
        out('</ul>');

        todaysDate = new Date();
        year = todaysDate.getFullYear();

        out(
            '<div style="display: block; clear: both; text-align: right;">' +
                '© 2012 - ' +year + ' Valera Rozuvan' +
            '</div>'
        );

        this.moduleDiv.publish('.toc');

        // We will make sure that the GitHub ribbon always stays at the right
        // side of the screen, even when the window is resized, or when it is
        // scrolled horizontally (if the window width is less than minimal
        // width set in CSS).
        //
        // Remember, that initially, CSS 'position' property of the GitHub
        // ribbon is set to 'fixed'. This makes sure that if the user
        // refreshes the page while the horizontal scroll is not at 0, then the
        // ribbon is initially positioned at the right side of the window. We
        // have to set CSS 'position' property to 'absolute' inorder to be able
        // reposition the ribbon manually.
        //
        // On menu load, we will reposition the GitHub ribbon manually.
        $('.forkme_github').css('position', 'absolute');
        repositionRibbon();
        $(window).on('scroll', repositionRibbon);
        $(window).on('resize', repositionRibbon);
    }

    function repositionRibbon() {
        var currentScrollLeft, currentWindowWidth;

        currentScrollLeft = $(window).scrollLeft();
        currentWindowWidth = $(window).width();

        if (oldScrollLeft !== currentScrollLeft) {
            oldScrollLeft = currentScrollLeft;
        } else if (oldWindowWidth !== currentWindowWidth) {
            oldWindowWidth = currentWindowWidth;
        }

        $('.forkme_github').css(
            'left',
            currentWindowWidth + currentScrollLeft - 149
        );
    }
});
