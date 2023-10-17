import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import classes from "./SkeletonMessages.module.css";

export const SkeletonMessages = () => {
    return (
        <Box className={classes.wrapper}>
            <Skeleton
                variant="rounded"
                height="100%"
                width="40%"
                sx={{ borderRadius: "8px" }}
            />
        </Box>
    );
};
