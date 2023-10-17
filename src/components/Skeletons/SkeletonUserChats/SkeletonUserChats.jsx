import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import classes from "./SkeletonUserChats.module.css";

export const SkeletonUserChats = () => {
    return (
        <Box className={classes.wrapper}>
            <Box className={classes.content}>
                <Skeleton />
                <Skeleton width="50%" height={30} />
                <Skeleton width="80%" height="20%" />
            </Box>
            <Skeleton width={50} height="20%" />
        </Box>
    );
};
