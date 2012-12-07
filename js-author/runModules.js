define([], function () {
    var RunModuleExecuted;

    RunModuleExecuted = false;

    return RunModules;

    function RunModules(modules) {
        var moduleNames;

        // We expect that this function will be called only once.
        if (RunModuleExecuted !== false) {
            return;
        }

        if (typeof modules === 'number') {
            // The parameter 'modules' is of type 'number'.
            (function () {
                var i, numModules;

                // Total number of JavaScript modules that should be run.
                numModules = modules;

                // We will generate the module names dynamically. They all have
                // a pattern to their naming scheme.
                moduleNames = [];

                for (i = 1; i <= numModules; i++) {
                    // Module names start with 'module1', and continue with
                    // 'module2', 'module3', and so on.
                    moduleNames.push('module' + i);
                }
            }());
        } else if ((typeof modules === 'object') && (modules instanceof Array)) {
            // The parameter 'modules' is an array.
            (function () {
                var i, moduleNumsToInclude;

                // We will only run modules with numbers specified in the
                // array.
                moduleNumsToInclude = modules;

                // We will generate the module names dynamically. They all have
                // a pattern to their naming scheme.
                moduleNames = [];

                for (i = 0; i < moduleNumsToInclude.length; i++) {
                    // Module names start with 'module1', and continue with
                    // 'module2', 'module3', and so on.
                    moduleNames.push('module' + moduleNumsToInclude[i]);
                }
            }());
        } else {
            // The parameter 'modules' is invalid.
            return;
        }

        require(moduleNames, function () {
            var i;

            // Call the module functions sequentially.
            for (i = 0; i < arguments.length; i++) {
                arguments[i]();
            }
        });

        // Make sure that this function will not execute twice.
        RunModuleExecuted = true;
    }
});
