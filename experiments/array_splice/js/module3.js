define(['ModuleDiv', 'Output'], function (ModuleDiv, Output) {
    var moduleDiv, p;

    // Create an output <div> for our module.
    moduleDiv = ModuleDiv(
        'Array.slice() method. Part 2.',
        'experiments/array_splice/js/module3.js'
    );
    moduleDiv.hide();

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

        p('Now we will modify the second object. We will set "x" property of the object to 201');
        obj2.x = 201;

        p('myArray = ' + JSON.stringify(myArray) + '.');
        p('copyOfMyArray = ' + JSON.stringify(copyOfMyArray) + '.');

        p('What if we use the delete operator on the second element?');
        delete myArray[1];

        p('myArray = ' + JSON.stringify(myArray) + '.');
        p('copyOfMyArray = ' + JSON.stringify(copyOfMyArray) + '.');

        moduleDiv.appendToPage();
        moduleDiv.slideDown(500);
    };
});
