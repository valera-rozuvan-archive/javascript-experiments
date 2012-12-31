/*
 * module2.js - Part of "Lanczos resampling" JavaScript experiment.
 *
 *
 * Copyright 2012 Valera Rozuvan
 *
 *
 * This file is part of javascript-experiments.
 *
 * javascript-experiments is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * javascript-experiments is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
 */

define(
    ['ModuleDiv', 'pipeline', 'MathJax', 'jquery', 'jquery_ui', 'flot'],
    function (ModuleDiv, pipeline, MathJax, $, jui, flot) {
    var moduleDiv, p, out;

    moduleDiv = ModuleDiv(
        'Theory: part 1',
        'experiments/lanczos_resampling/js/module2.js'
    );

    p = moduleDiv.p;
    out = moduleDiv.out;

    return function () {
        moduleDiv.prepare();

        p(
            'The Lanczos filter impulse response is the normalized sinc ' +
            'function, `text{sinc}(x)`, windowed by the Lanczos window. The ' +
            'Lanczos window is the central lobe of a horizontally-stretched ' +
            'sinc, `text{sinc}(x / a)` for `−a <= x <= a`. Due to its form, ' +
            'the Lanczos window is also called the sinc window.'
        );

        out(
            '<div ' +
                'id="placeholder1" ' +
                'style=" ' +
                    'width: 500px; ' +
                    'height: 500px; ' +
                    'margin-left: auto; ' +
                    'margin-right: auto; ' +
                '" ' +
            '></div>'
        );

        p(
            '<span style="text-decoration: underline;">Figure 1.</span> The ' +
            'sinc function and the Lanczos filter are overlayed on a single ' +
            'graph. For calrity, the window cut-off is indicated by ' +
            'vertical lines. In this example the `a` parameter lies in the ' +
            'range `[0, 5]`. Use the slider below to change `a`.'
        );

        out(
            '<div ' +
                'style=" ' +
                    'width: 510px; ' +
                    'height: 20px; ' +
                    'margin-left: auto; ' +
                    'margin-right: auto; ' +
                    'margin-bottom: 15px; ' +
                    'margin-top: 30px; ' +
                    'position: relative; ' +
                '" ' +
            '>' +

                '<div ' +
                    'id="a_slider_value" ' +
                    'style=" ' +
                        'width: 90px; ' +
                        'position: absolute; ' +
                        'top: -27px; ' +
                        'left: 100px; ' +
                    '" ' +
                '></div> ' +

                '<div ' +
                    'style=" ' +
                        'width: 90px; ' +
                        'display: inline; ' +
                        'float: left; ' +
                    '" ' +
                '> ' +
                    '`a_text{min} = 0` ' +
                '</div> ' +

                '<div ' +
                    'id="a_slider" ' +
                    'style=" ' +
                        'width: 300px; ' +
                        'display: inline; ' +
                        'float: left; ' +
                    '" ' +
                '></div>' +

                '<div ' +
                    'style=" ' +
                        'margin-left: 20px; ' +
                        'width: 90px; ' +
                        'display: inline; ' +
                        'float: left; ' +
                    '" ' +
                '> ' +
                    '`a_text{max} = 5` ' +
                '</div> ' +

            '</div>'
        );

        moduleDiv.publish();

        pipeline.a = 2;
        $('#a_slider_value').css('left', (pipeline.a * 60 + 80) + 'px');
        $('#a_slider_value').html(pipeline.a.toFixed(1));

        $('#a_slider').slider({
            'min': 0,
            'max': 5,
            'value': 2,
            'step': 0.1,
            'slide': function(event, ui) {
                pipeline.a = ui.value;
                $('#a_slider_value').css('left', (pipeline.a * 60 + 80) + 'px');
                $('#a_slider_value').html(pipeline.a.toFixed(1));
                plot();
            }
        });

        plot();

        MathJax.Hub.Typeset();
    }; // End-of: return function ()

    function plot() {
        var i, d1, d2;

        d1 = [];
        for (i = -5; i <= 5; i += 0.05) {
            if (Math.abs(i) < 1e-16)  {
                d1.push([i, 1]);
            } else {
                d1.push([i, Math.sin(Math.PI * i) / (Math.PI * i)]);
            }
        }
        d1.push([5, Math.sin(Math.PI * 5) / (Math.PI * 5)]);

        d2 = [];
        if (pipeline.a !== 0) {
            d2.push([
                -pipeline.a,
                // Math.sin(Math.PI * (-pipeline.a / pipeline.a)) / (Math.PI * (-pipeline.a / pipeline.a))
                Math.sin(-Math.PI) / (-Math.PI)
            ]);
        } else {
            d2.push([0, 1]);
        }
        for (i = -5; i <= 5; i += 0.05) {
            if ((i < -pipeline.a) || (i > pipeline.a)) {
                continue;
            }

            if (Math.abs(i * pipeline.a) < 1e-16)  {
                d2.push([i, 1]);
            } else {
                d2.push([
                    i,
                    Math.sin(Math.PI * (i / pipeline.a)) / (Math.PI * (i / pipeline.a))
                ]);
            }
        }
        if (pipeline.a !== 0) {
            d2.push([
                pipeline.a,
                // Math.sin(Math.PI * (pipeline.a / pipeline.a)) / (Math.PI * (pipeline.a / pipeline.a))
                Math.sin(Math.PI) / Math.PI
            ]);
        }

        flot(
            $('#placeholder1'),
            [
                {
                    'data': d1,
                    'label': 'sinc'
                },
                {
                    'data': d2,
                    'label': 'Lanczos window'
                }
            ],
            {
                'legend': {
                    'show': true,
                    'backgroundOpacity': 0
                },
                'grid': {
                    'markings': [
                        {
                            'color': '#000',
                            'lineWidth': 1,
                            'xaxis': {
                                'from': -pipeline.a,
                                'to': -pipeline.a
                            }
                        },
                        {
                            'color': '#000',
                            'lineWidth': 1,
                            'xaxis': {
                                'from': pipeline.a,
                                'to': pipeline.a
                            }
                        }
                    ]
                },
                'xaxis': {
                    'min': -5,
                    'max': 5
                },
                'yaxis': {
                    'min': -0.4,
                    'max': 1.2
                }
            }
        );
    } // End-of: function plot()
});
