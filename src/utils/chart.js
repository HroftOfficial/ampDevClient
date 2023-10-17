const labels = ['12', '01', '02', '03', '0.4', '0.5'];

export const dataChart = {
	labels,
	datasets: [
		{
			label: 'стоимость черного металла',
			data: {
				12: 56489,
				'01': 57047,
				'02': 60153,
				'03': 65746,
				0.4: 67503,
				0.5: 67816,
			},
			backgroundColor: 'rgba(53, 162, 235, 0.5)',
		},
	],
};
