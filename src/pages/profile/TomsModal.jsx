import { useState, useEffect } from 'react';
import styled from 'styled-components';
import FormLabel from '@mui/material/FormLabel';
import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import User from '../../services/User';

export const TomsModal = ({
	selected,
	setSelected,
	setShowModal,
	postUsersToms,
}) => {
	const [toms, setToms] = useState([]);

	useEffect(() => {
		const getTomsList = async () => {
			try {
				const toms = await User.getUsersToms();

				setToms(toms.data);
			} catch (error) {
				console.error(error);
			}
		};
		getTomsList();
	}, []);

	const handleClose = () => {
		setShowModal(false);
	};

	const handleSubmite = async (e) => {
		e.preventDefault();
		if (postUsersToms) {
			try {
				const formData = new FormData();

				Object.values(selected).forEach((category) => {
					formData.append('work_category', category);
				});

				await postUsersToms(formData);
			} catch (error) {
				console.error(error);
			}
		}

		setShowModal(false);
	};

	const handleCheck = (e) => {
		const id = e.target?.id;

		if (!selected.includes(id)) {
			setSelected((selected) => [...selected, id]);
		} else {
			setSelected(selected.filter((el) => el !== id));
		}
	};

	return (
		<ModalContent>
			<FormLabel
				id="controlled-radio-buttons-group"
				style={{
					color: 'black',
					fontWeight: 700,
					fontSize: '1.4rem',
					padding: '30px 0px 5px 0px',
				}}
			>
				Виды механической обработки:
				<span className="close" onClick={handleClose}>
					&times;
				</span>
			</FormLabel>

			<ModalBody>
				{toms?.map((group) => (
					<GroupLabel key={group?._id}>
						{group?.name_key}

						{group.items?.map((item) => (
							<FormControlLabel
								className="width100"
								key={item?.id_name}
								id={item?.id_name}
								name={item?.name}
								control={
									<Checkbox
										id={item?.id_name}
										checked={Boolean(
											selected?.find((el) => el === item?.id_name)
										)}
										onChange={handleCheck}
										name={item.id_name}
									/>
								}
								label={<ItemLebel>{item?.name} </ItemLebel>}
							/>
						))}
					</GroupLabel>
				))}
			</ModalBody>

			<button onClick={handleSubmite}>Готово</button>
		</ModalContent>
	);
};

const ModalContent = styled.div`
	position: relative;
	background-color: #fefefe;
	margin: auto;
	padding: 55px 79px;
	width: 85%;
	height: auto;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	-webkit-animation-name: animatetop;
	-webkit-animation-duration: 0.4s;
	animation-name: animatetop;
	animation-duration: 0.4s;
	font-family: 'Roboto', sans-serif;
	font-style: normal;
	font-weight: 400;

	@media screen and (max-width: 1024px) {
		padding: 35px 59px;
	}

	@media screen and (max-width: 768px) {
		padding: 25px 20px;
	}

	@-webkit-keyframes animatetop {
		from {
			left: -300px;
			opacity: 0;
		}
		to {
			left: 0;
			opacity: 1;
		}
	}

	@keyframes animatetop {
		from {
			left: -300px;
			opacity: 0;
		}
		to {
			left: 0;
			opacity: 1;
		}
	}

	.close {
		color: black;
		float: right;
		font-size: 40px;
		font-weight: bold;
		margin-right: 40px;
		@media screen and (max-width: 768px) {
			margin-right: -4px;
			margin-top: -10px;
		}
	}

	.close:hover,
	.close:focus {
		color: #00aeae;
		text-decoration: none;
		cursor: pointer;
	}

	button {
		display: flex;
		padding: 15px 35px;
		margin: 0 auto;
		background: #00aeae;
		border-radius: 5px;
		margin-top: 25px;
		cursor: pointer;
		font-size: 24px;
		text-align: center;
		color: #ffffff;
	}
`;

const ModalBody = styled.div`
	margin-top: 30px;
	column-count: 3;
	text-align: left;
	color: black;

	.width100 {
		width: 100%;
	}

	@media screen and (max-width: 1024px) {
		column-count: 2;
	}

	@media screen and (max-width: 768px) {
		column-count: 1;
	}
`;

const GroupLabel = styled.div`
	margin-bottom: 30px;
	font-weight: 500;
	font-size: 24px;
	color: #333333;
`;

const ItemLebel = styled.div`
	font-size: 18px;
	color: #525252;
`;
