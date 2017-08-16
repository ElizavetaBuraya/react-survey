import Chart from 'chart.js';

document.addEventListener("DOMContentLoaded", function(event) {
    (function () {
        var data_1 = {
            labels: ["Ответ 1", "Ответ 2", "Ответ 3"],
            datasets: [{
                label: "Вопрос с несколькими вариантами ответа",
                backgroundColor: ["lightpink", "lightgreen", "lightblue"],
                borderColor: "rgba(75,192,192,1)",
                data: [78, 55, 92],
            }]
        };

        var data_2 = {
            labels: ["Ответ 1", "Ответ 2", "Ответ 3"],
            datasets: [{
                label: "Вопрос с одним вариантом ответа",
                backgroundColor: ["lightpink", "lightgreen", "lightblue"],
                borderColor: "rgba(75,192,192,1)",
                data: [45, 32, 23],
            }]
        };

        var data_3 = {
            labels: ["1 \u2605", "2 \u2605", "3 \u2605", "4 \u2605", "5 \u2605"],
            datasets: [{
                label: "Вопрос-рейтинг",
                backgroundColor: ["lightpink", "lightgreen", "lightblue", "lightcoral", "lightgray"],
                borderColor: "rgba(75,192,192,1)",
                data: [70, 20, 5, 3, 2],
            }]
        };

        var ctx_1 = document.getElementById("chart-1");
        var ctx_2 = document.getElementById("chart-2");
        var ctx_3 = document.getElementById("chart-3");

        var chart_1 = new Chart(ctx_1, {
            type: 'horizontalBar',
            data: data_1,
            options: {
                legend:{
                    display:false
                },
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        barPercentage:0.6,
                        stacked: true,
                        gridLines: {
                            display: false,
                            color: "rgba(255,99,132,0.2)"
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            max: 100,
                            min: 0,
                            stepSize: 20
                        }
                    }]
                }
            }
        });

        var chart_2 = new Chart(ctx_2, {
            type: 'horizontalBar',
            data: data_2,
            options: {
                legend:{
                    display:false
                },
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        barPercentage:0.6,
                        stacked: true,
                        gridLines: {
                            display: false,
                            color: "rgba(255,99,132,0.2)"
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            max: 100,
                            min: 0,
                            stepSize: 20
                        }
                    }]
                }
            }
        });

        var chart_3 = new Chart(ctx_3, {
            type: 'horizontalBar',
            data: data_3,
            options: {
                legend:{
                    display:false
                },
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        barPercentage:0.6,
                        stacked: true,
                        gridLines: {
                            display: false,
                            color: "rgba(255,99,132,0.2)"
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            max: 100,
                            min: 0,
                            stepSize: 20
                        }
                    }]
                }
            }
        });

    })();
});

