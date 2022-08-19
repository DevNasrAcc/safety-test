import React from "react";
import { Provider } from "react-redux";

import axios from "axios";

import { store } from "./redux";
import { DashboardLayout } from "./components/dashboardLayout";
import Dashboard from "./pages/dashboard";

axios.defaults.baseURL = "https://ld.ctsdemo.ae/api";

function App() {
  return (
    <Provider store={store}>
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </Provider>
  );
}

export default App;
