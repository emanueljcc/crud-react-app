import React from "react";
import { makeStyles, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        bottom: 10,
        right: 20,
    },
}));

export default function ButtonCreate({ setOpenModal }) {
    const classes = useStyles();

    const handleClick = () => setOpenModal(true);

    return (
        <div className={classes.root}>
            <Fab color="primary" aria-label="add" onClick={handleClick}>
                <AddIcon />
            </Fab>
        </div>
    );
}