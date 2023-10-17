import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";

import classes from "./SkeletonCardGroupPlants.module.css";

export const SkeletonGroupPlants = () => {
    return (
        <Card className={classes.wrapper}>
            <Skeleton width="80%" height="20%" />
            <Skeleton
                width="90%"
                sx={{ height: "250px" }}
                variant="rectangular"
            />
        </Card>
    );
};
