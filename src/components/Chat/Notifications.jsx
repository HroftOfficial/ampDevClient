import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { ChatContext } from "../../context/ChatContext";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import moment from 'moment';
import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";
// import AuthContext from '../../context/AuthProvider';
import { AuthContext } from "../../hoc/AuthProvider";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { getRequest } from "../../utils/services";
import classes from "./Notifications.module.css";

const Notifications = ({ matches }) => {
    // const { auth } = useContext(AuthContext);
    // const user = { _id: auth.userId, name: auth.fio };
    const { store } = useContext(AuthContext);
    const user = { _id: store?.user?._id, name: store?.user?.name };
    const {
        notifications,
        // allUsers,
        markAllNotificationsAsRead,
        userChats,
        markNotificationAsRead,
    } = useContext(ChatContext);
    const [isOpen, setIsOpen] = useState(false);
    const [allUsers, setAllUsers] = useState([]);

    const unreadNotifications = unreadNotificationsFunc(notifications);

    useEffect(() => {
        if (!!unreadNotifications.length) {
            const getUsers = async () => {
                const response = await getRequest(`users_amp`);
                setAllUsers(response);
            };

            getUsers();
        }
    }, [unreadNotifications]);

    const modifiedNotifications = unreadNotifications.map((n) => {
        const sender = allUsers.find((user) => user._id === n.senderId);
        // console.log("SENDER", sender, allUsers,notifications);
        return {
            ...n,
            // senderName: sender?.fio,
            senderName: sender?.name,
        };
    });

    return (
        <div className={classes.notifications}>
            <div
                // className={classes.notificationsIcon}
                onClick={() => setIsOpen(!isOpen)}
                className={
                    unreadNotifications?.length === 0
                        ? classes.notificationsIcon
                        : `${classes.notificationsIcon} ${classes.pulsate}`
                }
            >
                <EmailOutlinedIcon
                    fontSize="large"
                    color={
                        unreadNotifications?.length === 0 ? "inherit" : "error"
                    }
                />
                {unreadNotifications?.length === 0 ? null : (
                    <span className={classes.notificationCount}>
                        <span>{unreadNotifications?.length}</span>
                    </span>
                )}
            </div>
            {isOpen ? (
                <div
                    className={
                        matches
                            ? classes.notificationsBoxMobile
                            : classes.notificationsBox
                    }
                >
                    <div className={classes.notificationsHeader}>
                        <div
                            className={classes.markAsRead}
                            onClick={() =>
                                markAllNotificationsAsRead(notifications)
                            }
                        >
                            Прочитать все
                        </div>
                        <h3>Уведомления</h3>
                    </div>
                    <div className={classes.notificationList}>
                        {modifiedNotifications?.length === 0 ||
                        unreadNotifications?.length === 0 ? (
                            <span className={classes.notification}>
                                Нет новых сообщений...
                            </span>
                        ) : null}
                        {modifiedNotifications &&
                            unreadNotifications?.length !== 0 &&
                            modifiedNotifications
                                ?.filter((el) => el.isRead === false)
                                .map((n, index) => (
                                    <div
                                        key={index}
                                        className={
                                            n.isRead
                                                ? `${classes.notification}`
                                                : `${classes.notification} ${classes.notRead}`
                                        }
                                        onClick={() => {
                                            markNotificationAsRead(
                                                n,
                                                userChats,
                                                user,
                                                notifications
                                            );
                                            setIsOpen(false);
                                        }}
                                    >
                                        <span>{`${n.senderName} отправил вам сообщение...`}</span>
                                        <span
                                            className={classes.notificationTime}
                                        >
                                            {n?.date &&
                                                formatRelative(
                                                    new Date(n?.date),
                                                    new Date(),
                                                    {
                                                        locale: ru,
                                                    }
                                                )}
                                        </span>
                                    </div>
                                ))}
                    </div>
                    <NavLink
                        to="/profile/chat"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            textDecoration: "none",
                        }}
                        onClick={() => setIsOpen(false)}
                    >
                        <Button
                            startIcon={<ContactMailIcon />}
                            sx={{ color: "#fff" }}
                        >
                            Все диалоги
                        </Button>
                    </NavLink>
                </div>
            ) : null}
        </div>
    );
};

export default Notifications;
