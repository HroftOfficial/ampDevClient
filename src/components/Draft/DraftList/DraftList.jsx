import { useEffect, useState } from "react";
import Orders from "../../../services/Orders";
import { SkeletonCardPlant } from "../../Skeletons/SkeletonCardPlant/SkeletonCardPlant";
import { skeletonCost } from "../../../utils/skeletonArr";
import { DraftListItem } from "../DraftListItem/DraftListItem";

import classes from "./DraftList.module.css";

export const DraftList = ({ data, pageFromUrl, reklama, isLoading }) => {
    const newData = [...data];
    if (pageFromUrl !== "favorite") {
        reklama.forEach((item, index) => {
            if (item.card_place !== 0 && item.enabled) {
                newData.splice(item.card_place - 1, 0, item);
            }
        });
    }
    const [favoriteId, setFavoriteId] = useState([]);

    useEffect(() => {
        const getFavoriteDraft = async () => {
            try {
                const response = await Orders.getFavorite();
                const currentData = response?.data;
                const arr = [];
                currentData?.map((item) => {
                    arr.push(item._id);
                });
                setFavoriteId(arr);
            } catch (e) {
                console.error(e);
            }
        };
        getFavoriteDraft();
    }, []);

    if (isLoading) {
        return (
            <div className={classes.wrapper}>
                {skeletonCost(12).map((el) => {
                    return <SkeletonCardPlant key={el} />;
                })}
            </div>
        );
    }

    if (!data.length) {
        return (
            <>
                <p></p>
                <div className={classes.notFound}>
                    По вашему запросу ничего не найдено
                </div>
            </>
        );
    }

    return (
        <div className={classes.wrapper}>
            {newData.map((p) => {
                const isFavorite = favoriteId.includes(p._id);
                return (
                    <DraftListItem
                        key={p._id}
                        title={p.title}
                        id={p._id}
                        number={p.number}
                        details={p.details}
                        photo_url={p.photo_url}
                        description={p.description}
                        overlay={p.overlay}
                        preview_url={p.preview_url}
                        card_text={p.card_text}
                        index_photo={p.index_photo}
                        pageFromUrl={pageFromUrl}
                        isFavorite={isFavorite}
                        favoriteId={favoriteId}
                        setFavoriteId={setFavoriteId}
                        reklama={reklama}
                    />
                );
            })}
        </div>
    );
};
