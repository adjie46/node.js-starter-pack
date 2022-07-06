var options = {
		series: [70],
		chart: { height: 120, type: "radialBar" },
		plotOptions: {
			radialBar: {
				offsetY: -12,
				hollow: {
					margin: 5,
					size: "60%",
					background: "rgba(59, 93, 231, .25)",
				},
				dataLabels: {
					name: { show: !1 },
					value: { show: !0, fontSize: "12px", offsetY: 5 },
					style: { colors: ["#fff"] },
				},
			},
		},
		colors: ["#3b5de7"],
	},
	chart = new ApexCharts(document.querySelector("#radial-chart-1"), options);
chart.render();
options = {
	series: [81],
	chart: { height: 120, type: "radialBar" },
	plotOptions: {
		radialBar: {
			offsetY: -12,
			hollow: { margin: 5, size: "60%", background: "rgba(69, 203, 133, .25)" },
			dataLabels: {
				name: { show: !1 },
				value: { show: !0, fontSize: "12px", offsetY: 5 },
				style: { colors: ["#fff"] },
			},
		},
	},
	colors: ["#45CB85"],
};

(chart = new ApexCharts(
	document.querySelector("#radial-chart-2"),
	options
)).render();

options = {
	series: [
		{
			name: "Series B",
			type: "area",
			data: [
				"10000",
				"500000",
				"250000",
				"25000",
				"100000",
				"100000",
				"200000",
				"500000",
				"500000",
				"1000",
				"1000",
				"1000",
			],
		},
	],
	chart: { height: 275, type: "line", stacked: !1, toolbar: { show: !1 } },
	stroke: { width: [0, 2, 2], curve: "smooth", dashArray: [0, 0, 4] },
	plotOptions: { bar: { columnWidth: "15%", endingShape: "rounded" } },
	fill: {
		opacity: [0.85, 0.25, 1],
		gradient: {
			inverseColors: !1,
			shade: "light",
			type: "vertical",
			opacityFrom: 1,
			opacityTo: 1,
			stops: [0, 100, 100, 100],
		},
	},
	xaxis: {
		categories: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
	},
	colors: ["#1986c8"],
	markers: { size: 4 },
};

(chart = new ApexCharts(
	document.querySelector("#mixed-chart"),
	options
)).render();
