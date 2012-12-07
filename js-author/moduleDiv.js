define(['jquery'], function ($) {
    var moduleIndex;

    moduleIndex = 0;

    return function (moduleDescription) {
        var moduleDiv, moduleName, captionDiv;

        moduleIndex += 1;
        moduleName = 'module' + moduleIndex;

        moduleDiv = $('<div>');
        moduleDiv.attr('data-module_name', moduleName);
        moduleDiv.css('border', '2px dashed black');
        moduleDiv.css('margin', '20px 0px 20px 0px');
        moduleDiv.css('padding', '5px');

        captionDiv = $('<div>');
        captionDiv.css('text-align', 'center');
        captionDiv.css('border-bottom', '2px dashed red');
        captionDiv.html(moduleName + ': ' + moduleDescription);
        captionDiv.appendTo(moduleDiv);

        moduleDiv.appendTo('.page');

        return moduleDiv;
    };
});
