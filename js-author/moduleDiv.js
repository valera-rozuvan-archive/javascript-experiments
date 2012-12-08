define(['jquery'], function ($) {
    var moduleIndex;

    moduleIndex = 0;

    return function (moduleDescription) {
        var moduleDiv, moduleName, captionDiv;

        moduleIndex += 1;
        moduleName = 'module' + moduleIndex;

        moduleDiv = $('<div>');
        moduleDiv.attr('data-module_name', moduleName);
        moduleDiv.addClass('module');

        captionDiv = $('<div>');
        captionDiv.addClass('module_caption');
        captionDiv.html(moduleName + ': ' + moduleDescription);
        captionDiv.appendTo(moduleDiv);

        moduleDiv.appendTo('.page');

        return moduleDiv;
    };
});
