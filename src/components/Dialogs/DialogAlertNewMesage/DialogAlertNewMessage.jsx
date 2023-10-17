import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const DialogAlertNewMessage = ({
    open,
    handleClose,
    handleSubmit,
    data,
}) => {
    console.log(data);
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Уведомление"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    У вас имеeтся <strong>{data}</strong> новое(ых)
                    сообщение(я), для ознакомления перейдите в Профиль, в раздел
                    Чат (или по кнопке снизу)
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Пропустить</Button>
                <Button onClick={handleSubmit}>Перейти</Button>
            </DialogActions>
        </Dialog>
    );
};
