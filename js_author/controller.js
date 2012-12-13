define('Controller', ['jquery', 'RunModules'], function ($, RunModules) {

    return {
        'switchExperiment': switchExperiment,
        'attachClickEvents': attachClickEvents
    };

    function switchExperiment(srcFolder) {
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

            RunModules(srcFolder);
        }
    }

    function attachClickEvents() {
        $('.experiment_link').each(function (index, value) {
            var src_folder, click_attached;

            console.log('Found!');

            src_folder = $(value).data('src_folder');
            click_attached = $(value).data('click_attached');

            if (
                (typeof src_folder === 'string') &&
                (src_folder.length > 0) &&
                (typeof click_attached === 'undefined')
            ) {
                console.log(
                    'Found a "experiment_link" element. ' +
                    'src_folder = "' + src_folder + '".'
                );

                $(value).attr('data-click_attached', 'true');

                $(value).on('click', function () {
                    console.log(src_folder);
                    switchExperiment(src_folder);
                });
            }
        });
    }
});
