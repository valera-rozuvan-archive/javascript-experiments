define(['ModuleDiv', 'Output'], function (ModuleDiv, Output) {
    var moduleDiv, p;

    // Create an output <div> for our module.
    moduleDiv = ModuleDiv('module4', 'Array.splice (cont.)');

    // Short hand for output functions we will use.
    p = Output.p.curry(moduleDiv);

    // Module code.
    return function () {
        var myArray, copyOfMyArray, obj1, obj2, obj3;

        moduleDiv.empty();
        moduleDiv.addCaption();

        obj1 = {'x': 100};
        obj2 = {'x': 200};
        obj3 = {'x': 300};

        myArray = [obj1, obj2, obj3];

        copyOfMyArray = myArray.slice(0, 2);

        p('myArray = ' + JSON.stringify(myArray) + '.');
        p('copyOfMyArray = ' + JSON.stringify(copyOfMyArray) + '.');

        p('What if we use the delete operator on the \'x\' property of the second object?');
        delete obj2.x;

        p('myArray = ' + JSON.stringify(myArray) + '.');
        p('copyOfMyArray = ' + JSON.stringify(copyOfMyArray) + '.');
        p('typeof obj2.x = ' + (typeof obj2.x) + '.');

        moduleDiv.appendToPage();
    };
});
