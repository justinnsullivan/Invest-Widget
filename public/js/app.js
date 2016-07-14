var data = {
	labels: ["5 years", "10 years", "15 years", "20 years", "25 years"],
	datasets: [{

		fill: false,
		lineTension: 0.34,
		backgroundColor: "rgba(63,195,128,0.4)",
		borderColor: "#3FC380",
		borderCapStyle: 'butt',
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: 'miter',
		pointBorderColor: "#3FC380",
		pointBackgroundColor: "#fff",
		pointBorderWidth: 1,
		pointHoverRadius: 5,
		pointHoverBackgroundColor: "#3FC380",
		pointHoverBorderColor: "rgba(220,220,220,1)",
		pointHoverBorderWidth: 2,
		pointRadius: 0,
		pointHitRadius: 10,
		data: [0, 0, 0, 0, 0, 0],
	}, {
		fill: false,
		lineTension: 0.34,
		backgroundColor: "rgba(246,36,89,0.4)",
		borderColor: "#F62459",
		borderCapStyle: 'butt',
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: 'miter',
		pointBorderColor: "#F62459",
		pointBackgroundColor: "#fff",
		pointBorderWidth: 1,
		pointHoverRadius: 5,
		pointHoverBackgroundColor: "#F62459",
		pointHoverBorderColor: "rgba(220,220,220,1)",
		pointHoverBorderWidth: 2,
		pointRadius: 0,
		pointHitRadius: 10,
		data: [0, 0, 0, 0, 0, 0],
	}]
};

var ctx = $('.slider__graph');
var myChart;

$(function() {
	myChart = new Chart(ctx, {
		type: 'line',
		options: {
			scales: {
				yAxes: [{
					ticks: {
						max: 275000,
						min: 0,
						stepSize: 25000
					},
					gridLines: {
						display: false
					}
				}],
				xAxes: [{
					gridLines: {
						display: false
					}
				}]
			},
			legend: {
				display: false,
			}
		},
		data: data
	});
	$("#monthly").val(100);
	$("#return").val(3);
	generateData();
	$.extend($.ui.slider.prototype.options, {
		animate: 300
	});

	$(".monthly-val")
		.slider({
			range: "min",
			value: 100,
			step: 10,
			min: 0,
			max: 250,
			slide: function(event, ui) {
				$("#monthly").html("$" + ui.value);
				$("#monthly").val(ui.value);
				generateData();
			}
		})
		.slider("pips", {
			first: "pip",
			last: "pip",
		});
	$(".return-val")
		.slider({
			range: "min",
			value: 3.0,
			step: 0.5,
			min: -3.0,
			max: 9.0,
			slide: function(event, ui) {
				$("#return").html(ui.value + "%");
				$("#return").val(ui.value);
				generateData();
			}
		})
		.slider("pips", {
			first: "pip",
			last: "pip",
		});

});

function generateData() {
	var monthly = $("#monthly").val();
	var rate = $("#return").val();
	var linear = calculateLinear(monthly, rate);
	var expo = calculateExpo(monthly, rate);
	linear.shift();
	expo.shift();
	console.log(expo);
	renderResults([expo[0], expo[4], linear[0], linear[4]]);
	for (var i = 0; i < myChart.data.datasets[0].data.length; i++) {
		myChart.data.datasets[0].data[i] = expo[i];
		myChart.data.datasets[1].data[i] = linear[i];
	}
	myChart.update();
}

function calculateLinear(monthly, rate) {
	var result = [];
	for (var i = 5; i <= 25; i += 5) {
		result[i / 5] = ((monthly * 12) * i);
	}
	return result;
}

function calculateExpo(monthly, rate) {
	var result = [];
	var temp = (rate / 100);
	for (var i = 5; i <= 25; i += 5) {
		result[i / 5] = Math.round((((monthly * 12) * (Math.pow((1 + temp), i) - 1)) / temp));
		if (result[i / 5] == -0 || isNaN(result[i / 5])) {
			result[i / 5] = ((monthly * 12) * i);
		}
	}
	return result;
}

function renderResults(results) {
	var temp = [];
	for (var i = 0; i < results.length; i++) {
		if (results[i] < 1000) {
			temp[i] = "$0." + results[i].toString().charAt(0) + "k";
		} else {
			temp[i] = "$" + results[i].toString().slice(0, -3) + "k";
		}
	}
	$('.invest-5').html(temp[0]);
	$('.invest-25').html(temp[1]);
	$('.save-5').html(temp[2]);
	$('.save-25').html(temp[3]);
}
