define(['ModuleDiv', 'Output', 'jquery'], function (ModuleDiv, Output, $) {
    var moduleDiv, p;

    // Create an output <div> for our module.
    moduleDiv = ModuleDiv('Simple x + 7');
    moduleDiv.hide();

    // Short hand for output functions we will use.
    p = Output.p.curry(moduleDiv);

    // Module code.
    return function () {
        var funcString, dynamicFunc;

        funcString = 'return x + getSeven(); function getSeven() { return 7; }';

        moduleDiv.empty();
        moduleDiv.addCaption();

        p('We will define a dynamic function by passing \'x\' and the string:');
        p(funcString);
        p('to the Function constructor. The result we will assign to a variable, and call the dynamic function via that variable, passing 2 as the argument.');

        dynamicFunc = new Function('x', funcString);

        p('x = 2; f(x) = ' + dynamicFunc(2));

        moduleDiv.appendToPage();
        moduleDiv.slideDown(500);
    };
});
