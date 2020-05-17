import React from "react";
import { Paper, Typography } from '@material-ui/core';

export default function NotData() {
    return (
        <Paper elevation={0} style={{ padding: 100, textAlign: "center", marginTop: 50 }}>
            <Typography variant="h5" gutterBottom>
                No data available.
            </Typography>
        </Paper>
    );
}