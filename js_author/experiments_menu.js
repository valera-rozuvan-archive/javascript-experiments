define(
    ['text!toc.json', 'jquery', 'ModuleDiv', 'Output', 'RunModules'],
    function (Toc, $, ModuleDiv, Output, RunModules) {

    var moduleDiv, p, out;

    moduleDiv = ModuleDiv('Experiments menu. A list of all available JS experiments.');
    out = Output.out.curry(moduleDiv);

    return ExperimentsMenu;

    function ExperimentsMenu() {
        var toc, c1, todaysDate, day, month, year;

        moduleDiv.addCaption();

        out(
            '<div style="text-align: right;">' +
                'Valera Rozuvan |' +
                ' <a href="https://github.com/valera-rozuvan/javascript-experiments">' +
                    'source on GitHub' +
                '</a>' +
            '</div>'
        );

        toc = JSON.parse(Toc);

        out('<ul>');
        for (c1 = 0; c1 < toc.length; c1 += 1) {
            out(
                '<li data-module_index="' + c1 + '">' +
                    toc[c1].moduleName  +
                '</li>'
            );
        }
        out('</ul>');

        todaysDate = new Date();

        day = todaysDate.getDate();
        month = todaysDate.getMonth() + 1; // January is 0.
        year = todaysDate.getFullYear();

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }

        out(
            '<div style="display: block; clear: both; text-align: right;">' +
                day + '.' + month + '.' + year +
            '</div>'
        );

        // Whenever an item in the menu is clicked, we will hide what is
        // already showing, and then show the content for the clicked item.
        moduleDiv.children('li').each(function (index, value) {
            $(value).click(function () {
                return menuItemClickHandler($(value).data('module_index'));
            });
        });

        moduleDiv.appendToSelector('.toc');

        return;

        function menuItemClickHandler(moduleIndex) {
            var numDivsLeft, divsToProcess;

            // $('.page').empty();

            // Instead of a simple empty(), let us do something a bit more
            // fancy. We will get all of the DIVs that must be removed, and
            // we will hide them using the jQuery's slide up event. The
            // last DIV to slide up will call the function to show the next
            // set of content DIVs. If there are no DIVs to slide up, then
            // we simply call the function to show the next set of content
            // DIVs.

            divsToProcess = $('.page').children('.module');

            if (divsToProcess.length === 0) {
                showSelectedExperiment();
            } else {
                numDivsLeft = divsToProcess.length;

                divsToProcess.each(function (index, value) {
                    $(value).slideUp(500, function () {
                        numDivsLeft -= 1;

                        if (numDivsLeft === 0) {
                            showSelectedExperiment();
                        }
                    });
                });
            }

            return;

            // Function to show the next set of content DIVs.
            function showSelectedExperiment() {
                $('.page').empty();

                $(document).attr(
                    'title',
                    'JavaScript Experiments: ' + toc[moduleIndex].moduleName
                );

                RunModules(
                    'experiments/' + toc[moduleIndex].moduleFolder,
                    toc[moduleIndex].modulesToRun
                );
            }
        }
    }
});
