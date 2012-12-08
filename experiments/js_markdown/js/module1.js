define(['ModuleDiv', 'Output', 'showdown', 'text!../index.md'], function (ModuleDiv, Output, Showdown, IndexSource) {
    var moduleDiv, p, out;

    // Create an output <div> for our module.
    moduleDiv = ModuleDiv('Rendering sample markdown content.');
    moduleDiv.hide();

    // Short hand for output functions we will use.
    p = Output.p.curry(moduleDiv);
    out = Output.out.curry(moduleDiv);

    // Module code.
    return function () {
        var converter, convertedText;

        moduleDiv.empty();
        moduleDiv.addCaption();

        converter = new Showdown.converter();
        convertedText = converter.makeHtml(IndexSource);

        p('Experimenting with text.');
        out(convertedText);

        moduleDiv.appendToPage();
        moduleDiv.slideDown(500);
    };
});
