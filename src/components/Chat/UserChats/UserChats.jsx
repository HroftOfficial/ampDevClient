import UserCard from "../UserCard";
import { SkeletonUserChats } from "../../Skeletons/SkeletonUserChats/SkeletonUserChats";
import classes from "./UserChats.module.css";

const skeletonArr = [...Array(3).keys()];

export const UserChats = ({ data, isLoading, update, user }) => {
    if (isLoading || !data) {
        return (
            <div className={classes.chatUsers}>
                {skeletonArr.map((el) => {
                    return <SkeletonUserChats key={el} />;
                })}
            </div>
        );
    }

    return (
        <div className={classes.chatUsers}>
            {/* {!data.length ? (
                <p>No Chats..</p>
            ) : (
                <> */}
            {data?.map((chat, index) => {
                return (
                    <div key={index} onClick={() => update(chat)}>
                        <UserCard chat={chat} user={user} />
                    </div>
                );
            })}
            {/* </>
            )} */}
        </div>
    );
};
