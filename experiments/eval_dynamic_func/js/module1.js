/*
 * module1.js - Part of "Dynamic functions with eval()" JavaScript experiment.
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

define(['ModuleDiv', 'Output'], function (ModuleDiv, Output) {
    var moduleDiv, p;

    // Create an output <div> for our module.
    moduleDiv = ModuleDiv(
        'Simple x + 7',
        'experiments/eval_dynamic_func/js/module1.js'
    );
    moduleDiv.hide();

    // Short hand for output functions we will use.
    p = Output.p.curry(moduleDiv);
    preCode = Output.preCode.curry(moduleDiv);

    // Module code.
    return function () {
        var funcString, dynamicFunc;

        funcString = 'return x + getSeven(); function getSeven() { return 7; }';

        moduleDiv.empty();
        moduleDiv.addCaption();

        p(
            'The title of this experiment "Dynamic functions with eval()" is misleading. ' +
            'We will not use the eval() function. ' +
            'Even though initially it was used, it was discovered that you must jump through an extra hoop for IE8 if you want it to work there. ' +
            'The Function() constructor is a better choise for this because it works in all modern browsers AND IE8.'
        );

        p('We will define a dynamic function by passing \'x\' and the string:');
        preCode('funcString = \'' + funcString + '\';');
        p('to the Function constructor. The result we will assign to a variable, and call the dynamic function via that variable, passing 2 as the argument.');

        dynamicFunc = new Function('x', funcString);

        preCode(
            'dynamicFunc = new Function(\'x\', funcString);\n' +
            'x = 2;\n' +
            '\n' +
            'dynamicFunc(x); // The result is ' + dynamicFunc(2) + '.'
        );

        moduleDiv.appendToPage();
        moduleDiv.slideDown(500);
    };
});
