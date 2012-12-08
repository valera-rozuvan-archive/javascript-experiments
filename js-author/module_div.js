define(['jquery'], function ($) {
    var moduleDiv;

    moduleDivs = {};

    return function (moduleName, moduleDescription) {
        if (moduleDivs[moduleName] === undefined) {
            createModuleDiv(moduleName, moduleDescription);
        }

        return moduleDivs[moduleName];
    };

    function createModuleDiv(moduleName, moduleDescription) {
        moduleDivs[moduleName] = $('<div>');
        moduleDivs[moduleName].addClass('module');

        moduleDivs[moduleName].addCaption = addCaption;
        moduleDivs[moduleName].appendToPage =  appendToPage;
        moduleDivs[moduleName].appendToSelector =  appendToSelector;

        return;

        function addCaption() {
            var captionDiv;

            captionDiv = $('<div>');
            captionDiv.addClass('module_caption');
            captionDiv.html(moduleName + ': ' + moduleDescription);
            captionDiv.appendTo(moduleDivs[moduleName]);
        }

        function appendToPage() {
            this.appendTo('.page');
        }

        function appendToSelector(divSelector) {
            this.appendTo(divSelector);
        }
    }
});
