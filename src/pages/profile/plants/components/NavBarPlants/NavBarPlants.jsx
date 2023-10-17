import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';

const StyledTab = styled(Tab)({
	boxShadow: 'none',
	color: '#4B525C',
	border: '1px solid',
	// textTransform: 'none',
	fontSize: 16,
	marginLeft: 4,
	borderRadius: 4,
	// padding: '6px 12px',
	// lineHeight: 1.5,
	backgroundColor: '#fff',
	'&:hover': {
		border: '1px solid #00AEAE',
		color: '#00AEAE',
	},
	'&.Mui-selected': {
		color: '#fff',
		backgroundColor: '#00AEAE',
	},
});

const NavBarPlants = ({ filter, setFilter, tabs, matches }) => {
	const currentTab = (state) => {
		if (state.id === 1) return 0;
		else if (state.id === 2) return 1;
		else if (state.id === 3) return 2;
		else if (state.id === 4) return 3;
	};
	const [value, setValue] = useState(currentTab(filter));

	const handleChangeTabs = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			<Tabs
				value={value}
				onChange={handleChangeTabs}
				orientation={matches ? 'horizontal' : 'vertical'}
				aria-label="icon tabs example"
				sx={{
					p: 1,
					m: 2,
				}}
				TabIndicatorProps={{
					style: { display: 'none' },
				}}
			>
				{tabs.map((item) => {
					return (
						<StyledTab
							label={item.title}
							aria-label={item.title}
							onClick={() => setFilter(item)}
							key={item.id}
						/>
					);
				})}
			</Tabs>
		</>
	);
};

export default NavBarPlants;
