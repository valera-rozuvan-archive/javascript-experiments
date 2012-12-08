define(['ModuleDiv', 'Output'], function (ModuleDiv, Output) {
    var moduleDiv, p;

    // Create an output <div> for our module.
    moduleDiv = ModuleDiv('module1', 'object references');

    // Short hand for output functions we will use.
    p = Output.p.curry(moduleDiv);

    // Module code.
    return function () {
        var myObj, copyOfMyObj;

        moduleDiv.empty();
        moduleDiv.addCaption();

        myObj = {
            'property1': {
                'x': 100
            }
        };

        copyOfMyObj = myObj;

        p('myObj.property1.x = ' + myObj.property1.x + '.');
        p('copyOfMyObj.property1.x = ' + copyOfMyObj.property1.x + '.');
        p('Now we will assign myObj.property1.x the value 200.');

        myObj.property1.x = 200;

        p('myObj.property1.x = ' + myObj.property1.x + '.');
        p('copyOfMyObj.property1.x = ' + copyOfMyObj.property1.x + '.');

        p('Now we will change myObj completely. Let us assign {} to it (i.e. a new object).');

        myObj = {};
        p('typeof myObj.property1 = ' + (typeof myObj.property1) + '.');
        p('copyOfMyObj.property1.x = ' + copyOfMyObj.property1.x + '.');

        moduleDiv.appendToPage();
    };
});
