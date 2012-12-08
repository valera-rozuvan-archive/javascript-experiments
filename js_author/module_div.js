define(['jquery'], function ($) {
    return ModuleDiv;

    function ModuleDiv(moduleDescription) {
        var moduleDiv, captionDiv;

        moduleDiv = $('<div>');
        moduleDiv.addClass('module');

        captionDiv = $('<div>');
        captionDiv.addClass('module_caption');
        captionDiv.html(moduleDescription);

        moduleDiv.addCaption = addCaption;
        moduleDiv.appendToPage =  appendToPage;
        moduleDiv.appendToSelector =  appendToSelector;

        return moduleDiv;

        function addCaption() {
            captionDiv.appendTo(moduleDiv);
        }

        function appendToPage() {
            this.appendTo('.page');
        }

        function appendToSelector(divSelector) {
            this.appendTo(divSelector);
        }
    }
});
