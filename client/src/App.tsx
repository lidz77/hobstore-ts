import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ROUTES from "./app/ROUTES";
import Admin from "./app/Admin";
import Categories from "./features/admin/categories/Categories";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.adminRoute()} element={<Admin />}>
            <Route path={ROUTES.categoriesAdmin()} element={<Categories />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
