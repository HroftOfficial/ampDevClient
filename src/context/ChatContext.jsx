import { useCallback, useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRequest, postRequest } from '../utils/services';
import { io } from 'socket.io-client';
import config from '../settings/settings';

export const ChatContext = createContext();

const { SOCKET_URL } = config;

export const ChatContextProvider = ({ children, user }) => {
	const [userChats, setUserChats] = useState(null);
	const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
	const [userChatsError, setUserChatsError] = useState(null);
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState(null);
	const [messagesError, setMessagesError] = useState(null);
	const [isMessagesLoading, setIsMessagesLoading] = useState(false);
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState(null);
	const [sendTextMessageError, setSendTextMessageError] = useState(null);
	const [newMessage, setNewMessage] = useState(null);
	// const [potentialChats, setPotentialChats] = useState(null);
	const [notifications, setNotifications] = useState([]);
	const [allUsers, setAllUsers] = useState([]);

	const navigate = useNavigate();
	const curPath = '/profile/chat';

	// const location = useLocation();
	// const watsPage = location.pathname;

	// console.log('page', watsPage);

	// console.log("userChats", userChats);
	// console.log("currentChat", currentChat);
	// console.log("messages", messages);
	// console.log("messagesError", messagesError);
	// console.log("onlineUsers", onlineUsers);
	// console.log("sendTextMessageError", sendTextMessageError);
	// console.log("notifications", notifications);

	// initialize socket
	useEffect(() => {
		const newSocket = io(SOCKET_URL);
		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
		};
	}, [user]);

	// set online users
	useEffect(() => {
		if (socket === null) return;

		socket.emit('addNewUser', user?._id);
		socket.on('getUsers', (res) => {
			setOnlineUsers(res);
		});

		return () => {
			socket.off('getUsers');
		};
	}, [socket]);

	// send message
	useEffect(() => {
		if (socket === null) return;

		const recipientId = currentChat?.members.find((id) => id !== user?._id);

		socket.emit('sendMessage', { ...newMessage, recipientId });
	}, [newMessage]);

	// receive message and notifications
	useEffect(() => {
		if (socket === null) return;

		socket.on('getMessage', (res) => {
			if (currentChat?._id !== res.chatId) return;

			setMessages((prev) => [...prev, res]);
		});

		socket.on('getNotification', (res) => {
			const isChatOpen = currentChat?.members.some((Id) => Id === res.senderId);

			if (isChatOpen) {
				setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
			} else {
				setNotifications((prev) => [res, ...prev]);
			}
		});

		return () => {
			socket.off('getMessage');
			socket.off('getNotification');
		};
	}, [socket, currentChat]);

	useEffect(() => {
		if (currentChat) {
			const getMessages = async () => {
				setIsMessagesLoading(true);

				const response = await getRequest(`messages/cl/${currentChat?._id}`);

				setIsMessagesLoading(false);

				if (response.error) {
					// return setMessagesError(error);
					return setMessagesError(response.error);
				}

				setMessages(response);
			};
			getMessages();
		}
	}, [currentChat]);

	useEffect(() => {
		const getUsers = async () => {
			// const response = await getRequest(`users`);
			const response = await getRequest(`users_amp`);

			// if (response.error) {
			//     return console.log("Error fetching users:", response.error);
			// }

			// if (userChats) {
			//     const pChats = response?.filter((u) => {
			//         let isChatCreated = false;

			//         if (user._id === u._id) return false;

			//         isChatCreated = userChats?.some(
			//             (chat) =>
			//                 chat.members[0] === u._id ||
			//                 chat.members[1] === u._id
			//         );
			//         return !isChatCreated;
			//     });

			//     setPotentialChats(pChats);
			// }

			setAllUsers(response);
		};

		getUsers();
	}, []);

	useEffect(() => {
		const getUserChats = async () => {
			try {
				setUserChatsError(null);

				if (user?._id) {
					const userId = user?._id;
					setIsUserChatsLoading(true);

					const response = await getRequest(`chats/${userId}`);

					if (response.error) {
						return setUserChatsError(response.error);
					}

					setUserChats(response);
					setIsUserChatsLoading(false);
				}
			} catch (error) {
				console.log(error);
			}
		};

		getUserChats();
	}, [user, notifications]);

	const updateCurrentChat = useCallback(async (chat) => {
		// console.log('UCC', chat);
		// navigate(curPath);
		// setTimeout(() => {
		// 	setCurrentChat(chat);
		// }, 0);
		setCurrentChat(chat);
	}, []);

	// const updateCurrentChat = (chat) => {
	// 	console.log('UCC', chat);
	// 	setCurrentChat(chat);
	// };

	const sendTextMessage = useCallback(
		async (
			textMessage,
			sender,
			currentChatId,
			setTextMessage,
			urlFile,
			realNameFile
		) => {
			// console.log('sendTextMessage >> ', textMessage, sender, currentChatId);
			if (!textMessage && !urlFile)
				return console.log('You must type something...');

			const formData = new FormData();
			formData.append('chatId', currentChatId);
			formData.append('text', textMessage.trim());
			formData.append('senderId', sender._id);

			if (urlFile && realNameFile) {
				formData.append('urlFile', urlFile);
				formData.append('realNameFile', realNameFile);
			}

			// console.log('messaRes', ...formData);

			const response = await postRequest(
				`messages`,
				formData
				// JSON.stringify({
				// 	chatId: currentChatId,
				// 	senderId: sender._id,
				// 	text: textMessage,
				// }
				// )
			);

			if (response.error) {
				return setSendTextMessageError(response);
			}

			setNewMessage(response);
			setMessages((prev) => [...prev, response]);
			setTextMessage('');
		},
		[]
	);

	const createChat = useCallback(async (senderId, receiverId) => {
		const response = await postRequest(
			`chats`,
			JSON.stringify({ senderId, receiverId })
		);

		if (response.error) {
			return console.log('Error creating chat:', response);
		}

		setUserChats((prev) => [...prev, response]);
	}, []);

	const markAllNotificationsAsRead = useCallback((notifications) => {
		const modifiedNotifications = notifications.map((n) => {
			return { ...n, isRead: true };
		});

		setNotifications(modifiedNotifications);
	}, []);

	const markNotificationAsRead = useCallback(
		(n, userChats, user, notifications) => {
			// find chat to open
			const readChat = userChats.find((chat) => {
				const chatMembers = [user._id, n.senderId];
				const isDesiredChat = chat?.members.every((member) => {
					return chatMembers.includes(member);
				});

				return isDesiredChat;
			});

			// mark notification as read
			const modifiedNotifications = notifications.map((element) => {
				if (n.senderId === element.senderId) {
					return { ...n, isRead: true };
				} else {
					return element;
				}
			});
			navigate(curPath);
			setTimeout(() => {
				updateCurrentChat(readChat);
			}, 0);
			// updateCurrentChat(readChat);
			setNotifications(modifiedNotifications);
		},
		[]
	);

	const markThisUserNotificationsAsRead = useCallback(
		(thisUserNotifications, notifications) => {
			// mark notification as read

			const modifiedNotifications = notifications.map((element) => {
				let notification;

				thisUserNotifications.forEach((n) => {
					if (n.senderId === element.senderId) {
						notification = { ...n, isRead: true };
					} else {
						notification = element;
					}
				});

				return notification;
			});

			setNotifications(modifiedNotifications);
		},
		[]
	);

	// console.log('pchat', potentialChats);

	return (
		<ChatContext.Provider
			value={{
				userChats,
				isUserChatsLoading,
				userChatsError,
				updateCurrentChat,
				currentChat,
				messages,
				messagesError,
				socket,
				sendTextMessage,
				onlineUsers,
				// potentialChats,
				createChat,
				notifications,
				allUsers,
				markAllNotificationsAsRead,
				isMessagesLoading,
				markNotificationAsRead,
				markThisUserNotificationsAsRead,
				newMessage,
				setNotifications,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};
