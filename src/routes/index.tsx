import { Routes, Route } from "react-router-dom";

import { Home } from "pages/home";

export const RouteSelector = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
