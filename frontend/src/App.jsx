import {BrowserRouter} from "react-router-dom";
import Router from "./router/Router.jsx";
import {GlobalStyle} from "./styles/globalStyle.js";
import {ThemeProvider} from "styled-components";
import {themes} from "./styles/themes.js";
import ChatBotComponent from "./components/Chatbot/ChatBotComponent.jsx";
import {ToastContainer} from "react-toastify";

function App() {


    return (
        <>
            <ToastContainer/>
            <ChatBotComponent/>
            <ThemeProvider theme={themes}>
                <GlobalStyle/>
                <BrowserRouter>
                    <Router/>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

export default App;
