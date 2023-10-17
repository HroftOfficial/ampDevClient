import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import classes from "./SkeletonCardPlant.module.css";

export const SkeletonCardPlant = () => {
    return (
        <Box className={classes.wrapper}>
            <Skeleton
                width="100%"
                sx={{ height: "50%", marginBottom: 4 }}
                variant="rectangular"
            />
            <Skeleton width="50%" height={30} />
            <Skeleton width="80%" height="20%" />
            <Skeleton width="30%" />
        </Box>
    );
};
