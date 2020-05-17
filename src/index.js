import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/*
    TODO: para este caso decidi crear un context que englobe toda la app,
    para manejar los estados de manera global ya que es una app pequeña,
    de resto usaria redux o simplemente pasaria estados como props.
*/
import { AppProvider } from "./Context/app-context";

ReactDOM.render(
    <AppProvider>
        <App />
    </AppProvider>,
    document.getElementById("root")
);
