import React, { useState, useMemo, useEffect, createContext } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { getUsers, getTypes } from "../services/Api";

const AppContext = createContext();

export function AppProvider(props) {
    // STATES
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark" ? true : false);
    const [users, setUsers] = useState([]);
    const [phoneTypes, setPhoneTypes] = useState([]);

    // STATE MODO NOCTURNO
    const theme = useMemo(() =>
            createMuiTheme({
                palette: {
                    type: isDarkMode ? "dark" : "light",
                },
            }),
        [isDarkMode],
    );

    useEffect(() => {

        isDarkMode ? localStorage.setItem("theme", "dark") : localStorage.setItem("theme", "light");

    }, [isDarkMode]);
    // STATE MODO NOCTURNO


    // STATE DATA
    useEffect(() => {

        (async () => {

            const [qryUsers, qryTypes] = await Promise.all([
                getUsers(),
                getTypes()
            ]);

            qryUsers ? setUsers(qryUsers.data) : setUsers([]);
            qryTypes ? setPhoneTypes(qryTypes.data) : setPhoneTypes([]);
        })();

    }, []);


    // return value
    const value = useMemo(() => ({
        theme: {
            isDarkMode,
            setIsDarkMode,
            theme,
        },
        users,
        setUsers,
        phoneTypes
    }), [isDarkMode, theme, users, phoneTypes]);

    return <AppContext.Provider value={value} {...props} />
}

// hook
export function useApp() {
    const context = React.useContext(AppContext);

    if(!context) {
        throw new Error("ERROR COMPONENTE NO ESTA DENTRO DEL CONTEXTO");
    }

    return context;
}