import React from "react";
import PropTypes from "prop-types";
import {
    AppBar,
    Toolbar,
    Slide,
    Grid,
    Typography,
    useScrollTrigger,
} from "@material-ui/core";
import Normalize from "react-normalize";
import DarkModeToggle from "react-dark-mode-toggle";
import { useApp } from "../Context/app-context";

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function Header(props) {
    const { theme: { isDarkMode, setIsDarkMode } } = useApp();

    return (
        <>
            <Normalize />
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Typography variant="h6">CRUD TO DO List</Typography>
                            <DarkModeToggle
                                onChange={setIsDarkMode}
                                checked={isDarkMode}
                                size={80}
                                speed={4}
                            />
                        </Grid>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};