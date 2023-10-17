import { useState } from 'react';
import styled from 'styled-components';
import Asidebar from './components/Asidebar/Asidebar';

const Messages = () => {
	return (
		<Body>
			{/* <Asidebar /> */}

			<div className="context-wrapper ">Уже скоро тут будут сообщения!</div>
		</Body>
	);
};

export default Messages;

const Body = styled.section`
	display: flex;
	color: black;

	.context-wrapper {
		display: flex;
		flex-direction: column;
		padding: 98px 66px 42px;
	}
`;
