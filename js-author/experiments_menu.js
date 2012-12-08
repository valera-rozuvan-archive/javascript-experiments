define(['text!toc.json', 'jquery', 'ModuleDiv', 'Output', 'RunModules'], function (Toc, $, ModuleDiv, Output, RunModules) {
    var moduleDiv, p, out;

    moduleDiv = ModuleDiv('Experiments menu', 'This is a list of all available JavaScript experiments.');
    p = Output.p.curry(moduleDiv);
    out = Output.out.curry(moduleDiv);

    return ExperimentsMenu;

    function ExperimentsMenu() {
        var toc, c1;

        moduleDiv.addCaption();

        toc = JSON.parse(Toc);

        out('<ul>');
        for (c1 = 0; c1 < toc.length; c1 += 1) {
            out('<li style="color: blue; cursor: pointer;" data-module_index="' + c1 + '">' + toc[c1].moduleName  + '</li>');
        }
        out('</ul>');

        moduleDiv.children('li').each(function (index, value) {
            $(value).click(function () {
                var moduleIndex;

                moduleIndex = $(value).data('module_index');

                $('.page').empty();

                RunModules(toc[moduleIndex].moduleName, parseInt(toc[moduleIndex].modulesToRun, 10));
            });
        });

        moduleDiv.appendToSelector('.toc');
    }
});
