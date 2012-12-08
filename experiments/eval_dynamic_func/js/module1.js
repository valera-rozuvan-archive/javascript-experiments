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

        moduleDiv.empty();
        moduleDiv.addCaption();

        p('We will define a dynamic function by passing the string:');
        p('function (x) { return x + 7; }');
        p('to eval() (wrapping the string with \'(\' and \')\'). The result we will assign to a variable, and call the dynamic function via that variable, passing 2 as the argument.');

        funcString = 'function (x) { return x + 7; }';
        dynamicFunc = eval('(' + funcString + ')');

        p('x = 2; f(x) = ' + dynamicFunc(2));

        moduleDiv.appendToPage();
        moduleDiv.slideDown(500);
    };
});
