export const tabs = [
	{
		title: 'Все',
		config: { deleted: null, enabled: null, shouldBeFiltered: false },
		id: 1,
	},
	{
		title: 'Активные',
		config: { deleted: false, enabled: true, shouldBeFiltered: true },
		id: 2,
	},
	{
		title: 'На модерации',
		config: { deleted: false, enabled: false, shouldBeFiltered: true },
		id: 3,
	},
	{
		title: 'Удаленные',
		config: { deleted: true, enabled: false, shouldBeFiltered: true },
		id: 4,
	},
];
