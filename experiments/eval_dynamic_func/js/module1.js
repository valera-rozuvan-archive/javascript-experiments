define(['ModuleDiv', 'Output', 'jquery'], function (ModuleDiv, Output, $) {
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
