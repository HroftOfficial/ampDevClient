// import { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import DraftService from '../../services/DraftService';

// const AvitoDraft = () => {
// 	const [ready, setReady] = useState();
// 	const [currentPage, setCurrentPage] = useState(1);
// 	const [value, setValue] = useState('101');
// 	const [query, setQuery] = useState('');
// 	const [filters, setFilters] = useState();
// 	const [limit, setLimit] = useState(12);

// 	const [draft, setDraft] = useState([]);

// 	useEffect(() => {
// 		(async () => {
// 			try {
// 				const response = await DraftService.getOpenDraft(
// 					currentPage,
// 					value,
// 					query,
// 					filters,
// 					limit
// 				);

// 				setDraft(response?.data);
// 				console.log(response);
// 			} catch (e) {
// 				console.error(e);
// 			} finally {
// 				setReady(true);
// 			}
// 		})();
// 	}, [currentPage, value, query, filters]);

// 	return (
// 		<>
// 			{ready && (
// 				<Body>
// 					Im body Array -
// 					<>
// 						{draft.map((item) => (
// 							<div key={item._id}>{item.number}</div>
// 						))}
// 					</>
// 				</Body>
// 			)}
// 		</>
// 	);
// };

// export default AvitoDraft;

// const Body = styled.div`
// 	display: flex;
// 	min-height: calc(100vh - 278.5px - 271px);
// 	color: black;
// `;
