define(['ModuleDiv', 'Output'], function (ModuleDiv, Output) {
    var moduleDiv, p;

    // Create an output <div> for our module.
    moduleDiv = ModuleDiv('module5', 'Array.splice (cont.)');

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

        p('What if we set the second object to null?');
        obj2 = null;

        p('myArray = ' + JSON.stringify(myArray) + '.');
        p('copyOfMyArray = ' + JSON.stringify(copyOfMyArray) + '.');
        p('typeof obj2 = ' + obj2 + '.');

        p('And now try to update the second element.');
        myArray[1].x = 201;

        p('myArray = ' + JSON.stringify(myArray) + '.');
        p('copyOfMyArray = ' + JSON.stringify(copyOfMyArray) + '.');

        moduleDiv.appendToPage();
    };
});
