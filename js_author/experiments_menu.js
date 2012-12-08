define(['text!toc.json', 'jquery', 'ModuleDiv', 'Output', 'RunModules'], function (Toc, $, ModuleDiv, Output, RunModules) {
    var moduleDiv, p, out;

    moduleDiv = ModuleDiv('Experiments menu. A list of all available JS experiments.');
    out = Output.out.curry(moduleDiv);

    return ExperimentsMenu;

    function ExperimentsMenu() {
        var toc, c1, todaysDate;

        moduleDiv.addCaption();

        toc = JSON.parse(Toc);

        out('<div style="text-align: right;">' +
                'Author: Valera Rozuvan | Source: <a href="https://github.com/valera-rozuvan/javascript-experiments">on GitHub</a>' +
            '</div>');

        out('<ul>');
        for (c1 = 0; c1 < toc.length; c1 += 1) {
            out('<li data-module_index="' + c1 + '">' + toc[c1].moduleName  + '</li>');
        }
        out('</ul>');


        (function () {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!

            var yyyy = today.getFullYear();
            if(dd<10) {
                dd='0'+dd;
            }
            if(mm<10) {
                mm='0'+mm;
            }

            todaysDate = mm+'/'+dd+'/'+yyyy;
        }());

        out('<div style="display: block; clear: both; text-align: right;">' +
                todaysDate +
            '</div>');

        moduleDiv.children('li').each(function (index, value) {
            $(value).click(function () {
                var moduleIndex, numDivsLeft;

                moduleIndex = $(value).data('module_index');

                // $('.page').empty();

                // Instead of a simple hide(), let us do something a bit more
                // fancy.

                numDivsLeft = $('.page').children('.module').length;

                if (numDivsLeft === 0) {
                    showSelectedExperiment();
                } else {
                    $('.page').children('.module').each(function (index, value) {
                        $(value).slideUp(500, function () {
                            numDivsLeft -= 1;

                            if (numDivsLeft === 0) {
                                showSelectedExperiment();
                            }
                        });
                    });
                }

                return;

                function showSelectedExperiment() {
                    $('.page').empty();

                    $(document).attr('title', 'JavaScript Experiments: ' + toc[moduleIndex].moduleName);

                    RunModules('experiments/' + toc[moduleIndex].moduleFolder, toc[moduleIndex].modulesToRun);
                }
            });
        });

        moduleDiv.appendToSelector('.toc');
    }
});
