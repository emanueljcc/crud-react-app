import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { Container, CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ButtonCreate from "./components/ButtonCreate";
import TableList from "./components/TableList";
import Modal from "./components/Modal";
import NotData from "./components/NotData";
import Alerts from "./components/Alerts";
import { useApp } from "./Context/app-context";
import size from "lodash/size";

function App() {
    // hook useApp and doble destructuring para acceder a los datos
    const { theme: { theme }, users } = useApp();

    const [openModal, setOpenModal] = useState(false);
    const [openAlerts, setOpenAlerts] =  useState(defaultValue);
    const [rowUpdate, setRowUpdate] = useState({});

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Header />

            {/* center content */}
            <Grid container direction="row" justify="center" alignItems="center">
                <Container maxWidth="md">

                    {size(users) > 0 ? (<TableList
                        setOpenAlerts={setOpenAlerts}
                        setOpenModal={setOpenModal}
                        rowUpdate={rowUpdate}
                        setRowUpdate={setRowUpdate}
                    />) : (
                        <NotData />
                    )}

                </Container>
            </Grid>

            <ButtonCreate setOpenModal={setOpenModal} />

            <Footer />

            <Modal
                openModal={openModal}
                setOpenModal={setOpenModal}
                setOpenAlerts={setOpenAlerts}
                rowUpdate={rowUpdate}
                setRowUpdate={setRowUpdate}
            />

            <Alerts openAlerts={openAlerts} setOpenAlerts={setOpenAlerts} />
        </ThemeProvider>
    );
}

function defaultValue() {
    return {
        open: false,
        msg: '',
        type: '',
    };
}

export default App;