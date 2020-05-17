import React from "react";
import { Box, Link, Typography} from "@material-ui/core";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Developer © "}
            <Link target="_blank" rel="noreferrer" color="inherit" href="https://emanueljcc.github.io/">
                Ing. Emanuel Castillo
                </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default function Footer() {

    return (
        <Box mt={5}>
            <Copyright />
        </Box>
    );
}