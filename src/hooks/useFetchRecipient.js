import { useEffect, useState } from 'react';
// import { axiosPrivate } from "../api/axios";
import $api from '../http/index';
import config from '../settings/settings';
import PartnerService from '../services/PartnerService';
const { baseUrl } = config;

export const useFetchRecipientUser = (chat, user) => {
	//   console.log("useFetchRecipient", "chat >>", chat, "\n", "user >>>", user);
	const [recipientUser, setRecipientUser] = useState(null);
	const [error, setError] = useState(null);

	const recipientId = chat?.members?.find((id) => id !== user._id);
	// console.log("useFetchRecipient recipientId", recipientId)

	// const recipientId = chat?.members?.find(obj => obj !== user.userId)
	// console.log(recipientId, user.userId)
	// console.log("<<chat>>", chat.members,"\n","user=>>", user.userId,"\n","RECIPIENT ID ==>>", recipientId)
	useEffect(() => {
		const getUser = async () => {
			// console.log("<<useFetchRecipient info(recipientId)>>", recipientId)
			if (!recipientId) return null;
			const response = await PartnerService.getUserInfo(recipientId);
			setRecipientUser(response.data);
			// const response = await getRequest
			// let isMounted = true;
			// const controller = new AbortController();
			// try {
			//   const response = await $api.get(
			//     `${baseUrl}/users_amp/users_portal/${recipientId}`,
			//     {
			//       signal: controller.signal,
			//     }
			//   );
			//   isMounted && setRecipientUser(response.data);
			//   // console.log(response.data)
			// } catch (error) {
			//   console.error(error);
			//   setError(error);
			//   // navigate('/login', { state: { from: location }, replace: true });
			// } finally {
			//   isMounted = false;
			//   controller.abort();
			// }
		};

		getUser();
	}, [recipientId]);
	// console.log(recipientUser, recipientId)
	return { recipientUser, error };
};
