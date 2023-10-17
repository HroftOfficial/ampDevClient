import { useState, useEffect } from "react";

import {
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    Typography,
} from "@mui/material";
import config from "../../../../settings/settings";
import { SkeletonGroupPlants } from "../../../../components/Skeletons/SkeletonCardGroupPlants/SkeletonCardGroupPlants";
import { skeletonCost } from "../../../../utils/skeletonArr";
import classes from "./PlantGroupList.module.css";

const { baseUrlUpload } = config;

export const PlantGroupList = ({ data, setSelectGroup, isLoading }) => {
    const plantActiveMainGroup = data.filter((el) => el.enabled === true);

    if (isLoading) {
        return (
            <div className={classes.wrapper}>
                {skeletonCost(12).map((el) => {
                    return <SkeletonGroupPlants key={el} />;
                })}
            </div>
        );
    }

    return (
        <div className={classes.wrapper}>
            {plantActiveMainGroup.map(({ _id, name, images }) => {
                return (
                    <Card
                        key={_id}
                        sx={{ height: "400px" }}
                        onClick={() => setSelectGroup(_id)}
                    >
                        <CardActionArea sx={{ height: "400px" }}>
                            <CardContent className={classes.cardContent}>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    sx={{ textAlign: "center" }}
                                >
                                    {name}
                                </Typography>
                                {!!images && (
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        src={images[0]?.path?.replace(
                                            /public/i,
                                            baseUrlUpload
                                        )}
                                        alt={name}
                                        sx={{
                                            height: "250px",
                                            width: "fit-content",
                                            objectFit: "contain",
                                        }}
                                    />
                                )}
                            </CardContent>
                        </CardActionArea>
                    </Card>
                );
            })}
        </div>
    );
};
