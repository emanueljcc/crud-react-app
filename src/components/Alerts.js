import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
    makeStyles,
    Slide,
    Snackbar,
    IconButton,
} from "@material-ui/core";
import { amber, green } from "@material-ui/core/colors";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import WarningIcon from "@material-ui/icons/Warning";
import CloseIcon from "@material-ui/icons/Close";

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
};

const useStyles = makeStyles((theme) => ({
    success: {
        backgroundColor: green[600],
        color: "#fff",
    },
    error: {
        backgroundColor: theme.palette.error.dark,
        color: "#fff",
    },
    warning: {
        backgroundColor: amber[700],
        color: "#fff",
    },
    default: {
        backgroundColor: theme.palette.primary.main,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: "flex",
        alignItems: "center",
    },
}));

// function que retorna el Slide
function TransitionUp(props) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Slide {...props} direction="up" />;
}

function Alerts({ openAlerts, setOpenAlerts }) {
    const classes = useStyles();
    const [color, setColor] = useState();
    const [msg, setMsg] = useState();
    // eslint-disable-next-line react/prop-types
    const Icon = variantIcon[openAlerts.type];

    useEffect(
        () => {
            // eslint-disable-next-line default-case
            switch (openAlerts.type) {
                case "success":
                    setColor(classes.success);
                    break;
                case "error":
                    setColor(classes.error);
                    break;
                case "warning":
                    setColor(classes.warning);
                    break;
            }

            setMsg(openAlerts.msg);
        },
        [openAlerts, classes],
    );

    // cerrar Snackbar Alerts
    const handleClose = () => {
        setOpenAlerts({ ...openAlerts, open: false });
    };

    return (
        <Snackbar
        open={openAlerts.open}
        onClose={handleClose}
        TransitionComponent={TransitionUp}
        autoHideDuration={openAlerts.type === "error" ? 15000 : 3000}
        ContentProps={{
            "aria-describedby": "message-id",
            classes: {
            root: color,
            },
        }}
        message={(
            <span id="client-snackbar" className={classes.message}>
            {Icon ? <Icon className={clsx(classes.icon, classes.iconVariant)} /> : ""}
            {msg}
            </span>
        )}
        action={[
            <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
            >
            <CloseIcon />
            </IconButton>,
        ]}
        />
    );
}

Alerts.propTypes = {
    openAlerts: PropTypes.object.isRequired,
    setOpenAlerts: PropTypes.func.isRequired,
};

export default Alerts;
