import { useContext, useEffect } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { Typography } from '@mui/material';
import { AuthContext } from '../../hoc/AuthProvider';
import ChatBox from '../../components/Chat/ChatBox';
import UserCard from '../../components/Chat/UserCard';
import { UserChats } from '../../components/Chat/UserChats/UserChats';
import classes from './Notice.module.css';
import userService from '../../services/User';

const Chat = () => {
	// const { auth } = useContext(AuthContext);
	// const user = { _id: auth.userId, name: auth.fio };
	const { store } = useContext(AuthContext);
	const user = { _id: store?.user?._id, name: store?.user?.name };
	// console.log(auth, user)
	const {
		userChats,
		isUserChatsLoading,
		updateCurrentChat,
		useFetchLatestMessage,
	} = useContext(ChatContext);
	// console.log("CHAT", userChats,isUserChatsLoading,updateCurrentChat)

	useEffect(() => {
		return () => {
			updateCurrentChat(null);
		};
	}, []);

	/**update user AMP lastVisit params */
	useEffect(() => {
		const updateLastVisitUser = async () => {
			try {
				await userService.updateLastVisitUser();
			} catch (error) {
				console.log(error);
			}
		};

		updateLastVisitUser();
	}, []);
	/**============================ */

	return (
		<main className={classes.main}>
			<section className={classes.section}>
				<Typography variant="h4" paragraph sx={{ paddingTop: '10px' }}>
					Диалоги
				</Typography>
				<div className={classes.messenger}>
					<div className={classes.chatWrapper}>
						<UserChats
							data={userChats}
							isLoading={isUserChatsLoading}
							update={updateCurrentChat}
							user={user}
						/>

						<div className={classes.chatMenuWrapper}>
							<ChatBox />
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Chat;
