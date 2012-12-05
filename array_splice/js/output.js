define([], function () {
    // Add the method curry() to all functions.
    Function.prototype.curry = curry;

    // What the module makes available for other modules to use.
    return {
        'p': p,
        'out': out,
        'br': br
    };

    /*
     * Methods p(), out(), and br() expect a jQuery object moduleDiv on which
     * they will do their work.
     */
    function p(moduleDiv, text) {
        moduleDiv.append('<p>' + text + '</p>');
    }

    function out(moduleDiv, text) {
        moduleDiv.append(text);
    }

    function br(moduleDiv) {
        moduleDiv.append('<br />');
    }

    /*
     * Functions toArray() and curry() will simplify calling the same function
     * similar parameters. Please see the great article at:
     *
     *     http://javascriptweblog.wordpress.com/2010/04/05/curry-cooking-up-tastier-functions/
     *
     * where I got the idea from.
     */
    function toArray(args) {
        return Array.prototype.slice.call(args);
    }

    function curry() {
        var __method, args;

        if (arguments.length < 1) {
            return this;
        }

        __method = this;
        args = toArray(arguments);

        return function() {
            return __method.apply(this, args.concat(toArray(arguments)));
        };
    }
});
