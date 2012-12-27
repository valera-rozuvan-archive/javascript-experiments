/*
 * module2.js - Part of "Array.splice()" JavaScript experiment.
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

define(['ModuleDiv'], function (ModuleDiv) {
    var moduleDiv, p;

    moduleDiv = ModuleDiv(
        'Array.slice() method.',
        'experiments/array_splice/js/module2.js'
    );

    p = moduleDiv.p;

    return function () {
        var myArray, copyOfMyArray;

        moduleDiv.prepare();

        myArray = [
            {
                'x': 100
            },
            {
                'x': 200
            },
            {
                'x': 300
            }
        ];

        copyOfMyArray = myArray.slice(0, 2);

        p('myArray = ' + JSON.stringify(myArray) + '.');
        p('copyOfMyArray = ' + JSON.stringify(copyOfMyArray) + '.');

        p('Now we will modify the second element. We will set "x" property of the object to 201');
        myArray[1].x = 201;

        p('myArray = ' + JSON.stringify(myArray) + '.');
        p('copyOfMyArray = ' + JSON.stringify(copyOfMyArray) + '.');

        p('Now we will change the second element completely. Let us assign some string to it.');
        myArray[1] = 'Hello, world!';

        p('myArray = ' + JSON.stringify(myArray) + '.');
        p('copyOfMyArray = ' + JSON.stringify(copyOfMyArray) + '.');

        moduleDiv.publish();
    };
});
