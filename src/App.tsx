// Import React
import { useEffect } from "react";

// Import Store
import { Provider } from "react-redux";
import { store } from "./store/store";

// Import Router
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router/AppRoutes";

// Import i18next
import { withTranslation } from "react-i18next";
import "./common/locales/i18n";

// Import Utils
import { getTheme } from "./common/utils/getTheme";

// Import Style
import "antd/dist/reset.css";
import "./assets/style/global.scss";
import "./assets/style/app.scss";

function App() {
  // useEffect
  useEffect(() => {
    getTheme();
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default withTranslation()(App);
