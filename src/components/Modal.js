import React, { forwardRef } from "react";
import {
    makeStyles,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Form from "./Form";
import isEmpty from "lodash/isEmpty";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "relative",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal({ openModal, setOpenModal, setOpenAlerts, rowUpdate, setRowUpdate }) {
    const classes = useStyles();

    const handleClose = () => {
        setOpenModal(false)
        setTimeout(() => {
            setRowUpdate({});
        }, 500);
    };

    return (
        <Dialog fullScreen open={openModal} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar color={isEmpty(rowUpdate) ? "primary" : "secondary"} className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {isEmpty(rowUpdate) ?  "Create User" : `${rowUpdate.firstName} ${rowUpdate.lastName}`}
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* component form */}
            <Form
                setOpenModal={setOpenModal}
                setOpenAlerts={setOpenAlerts}
                rowUpdate={rowUpdate}
                setRowUpdate={setRowUpdate}
            />

        </Dialog>
    );
}