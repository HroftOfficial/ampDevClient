import { useContext } from "react";
// import avatar from "../../assets/avarter.svg";
import { ChatContext } from "../../context/ChatContext";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";
// import moment from 'moment';
import classes from "./userCard.module.css";

const UserCard = ({ chat, user }) => {
  // console.log('UserCard recipientUser', chat, user);
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { latestMessage } = useFetchLatestMessage(chat);
  const { onlineUsers, notifications, markThisUserNotificationsAsRead } =
    useContext(ChatContext);

  // console.log(
  // 	'UserCArd',
  // 	onlineUsers,
  // 	notifications,
  // 	markThisUserNotificationsAsRead
  // );

  const unreadNotifications = unreadNotificationsFunc(notifications);

  // console.log("userCard", user)

  const isOnline = onlineUsers?.some(
    (user) => user?._id === recipientUser?._id
  );

  const thisUserNotifications = unreadNotifications?.filter(
    (n) => n.senderId == recipientUser?._id
  );

  const truncateText = (text) => {
    let shortText = text.substring(0, 20);

    if (text.length > 10) {
      shortText = shortText + "...";
    }

    return shortText;
  };
  return (
    <>
      <div
        role="button"
        className={classes.userCard}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          justifyContent: "space-between",
          gap: "10px",
        }}
        onClick={() => {
          if (thisUserNotifications?.length !== 0) {
            markThisUserNotificationsAsRead(
              thisUserNotifications,
              notifications
            );
          }
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ padding: "10px" }}>
            {/* <img src={avatar} alt="person-circle" height="35px" /> */}
          </div>
          <div className={classes.textContent}>
            <div className={classes.name}>{recipientUser?.name}</div>
            <div className={classes.name}>{recipientUser?.org}</div>
            <div className={classes.text}>
              {latestMessage?.text && (
                <span>{truncateText(latestMessage?.text)}</span>
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
          <div className={classes.date}>
            {latestMessage?.createdAt &&
              formatRelative(new Date(latestMessage?.createdAt), new Date(), {
                locale: ru,
              })}
            {/* {moment(latestMessage?.createdAt).calendar()} */}
          </div>
          <div
            className={
              thisUserNotifications?.length > 0
                ? classes.thisUserNotifications
                : ""
            }
          >
            {thisUserNotifications?.length > 0
              ? thisUserNotifications?.length
              : ""}
          </div>
          <span className={isOnline ? "user-online" : ""}></span>
        </div>
      </div>
    </>
  );
};

export default UserCard;
