/*
 * module3.js - Part of "Lanczos resampling" JavaScript experiment.
 *
 *
 * Copyright 2012-2013 Valera Rozuvan
 * http://javascript-experiments.net/
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

    return function () {
        var p, out;

        p = this.moduleDiv.p;
        out = this.moduleDiv.out;

        p(
            'The Lanczos filter, on its interval, is a product of two ' +
            'sinc functions. The resulting function is then used as a ' +
            'convolution kernel to resample the input field. In one ' +
            'dimension, its formula is given by:'
        );

        p(
            '`L(x) = { ' +
                '(text{sinc}(x) * text{sinc}(x / a), -a < x < a), ' +
                '(0, text{otherwise}) ' +
            ':}`'
        );

        p(
            'with `a` a positive integer, typically 2 or 3, controlling the ' +
            'size of the kernel. The parameter `a` corresponds to the number ' +
            'of lobes of sinc, as the normalized sinc has zeros at ' +
            'integers; thus `a = 1` corresponds to just the (positive) ' +
            'central lobe, while `a = 2` has the central lobe and the ' +
            'second lobe on each side, which are negative.'
        );

        p(
            'In the above, we can expand the sinc terms (for nonzero x in ' +
            'the specified range): `text{sinc}(x) * text{sinc}(x / a) = ' +
            '(a * sin(pi * x) * sin(pi * x / a)) / (pi^2 * x^2)`.'
        );

        out(
            '<div ' +
                'id="placeholder2" ' +
                'style=" ' +
                    'width: 400px; ' +
                    'height: 400px; ' +
                    'margin-left: auto; ' +
                    'margin-right: auto; ' +
                '" ' +
            '></div>'
        );

        p(
            '<span style="text-decoration: underline;">Figure 2.</span> ' +
            'For any positive value of `a`, the Lanczos window and Lanczos ' +
            'filter are continuous and differentiable even at the ends ' +
            'where they go to zero. In the case of positive integer values ' +
            'of `a`, both sinc functions go to zero at the edge, so the ' +
            'edge of the Lanczos filter is zero to second order, which ' +
            'means its derivative is also continuous, and it is ' +
            'differentiable to second order. Thus integer values yield a ' +
            'smoother cutoff, with no corner, which is why integers are ' +
            'generally used. Use the slider below to change `a`, and see ' +
            'how the Lanczos kernel changes.'
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
                    'id="a_slider_value2" ' +
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
                    'id="a_slider2" ' +
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

        this.moduleDiv.publish();

        $('#a_slider_value2').css('left', (pipeline.a * 60 + 80) + 'px');
        $('#a_slider_value2').html(pipeline.a.toFixed(1));

        $('#a_slider2').slider({
            'min': 0,
            'max': 5,
            'value': 2,
            'step': 0.1,
            'slide': function(event, ui) {
                pipeline.a = ui.value;
                $('#a_slider_value2').css('left', (pipeline.a * 60 + 80) + 'px');
                $('#a_slider_value2').html(pipeline.a.toFixed(1));
                plot();
            }
        });
        plot();

        MathJax.Hub.Typeset();
    };

    function plot() {
        var i, d2;

        d2 = [];
        for (i = -5; i <= 5; i += 0.05) {
            if (i < -pipeline.a - 0.05) {
                d2.push([i, 0]);
            } else if (i < -pipeline.a) {
                d2.push([i, 0]);
                d2.push([
                    i,
                    (Math.sin(Math.PI * i) / (Math.PI * i)) * (Math.sin(Math.PI * (i / pipeline.a)) / (Math.PI * (i / pipeline.a)))
                ]);
            } else if ((i >= pipeline.a - 0.05) && (i < pipeline.a)) {
                d2.push([
                    i,
                    (Math.sin(Math.PI * i) / (Math.PI * i)) * (Math.sin(Math.PI * (i / pipeline.a)) / (Math.PI * (i / pipeline.a)))
                ]);
                d2.push([i, 0]);
            } else if (i >= pipeline.a) {
                d2.push([i, 0]);
            } else if (Math.abs(i * pipeline.a) < 1e-16)  {
                d2.push([i, 1]);
            } else {
                d2.push([
                    i,
                    (Math.sin(Math.PI * i) / (Math.PI * i)) * (Math.sin(Math.PI * (i / pipeline.a)) / (Math.PI * (i / pipeline.a)))
                ]);
            }
        }

        flot(
            $('#placeholder2'),
            [
                {
                    'data': d2,
                    'label': 'Lanczos kernel'
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
