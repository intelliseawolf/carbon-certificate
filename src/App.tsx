import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout";
import Certificate from "./pages/certificates";
import Favorite from "./pages/favorites";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Certificate />} />
          <Route path="/favorites" element={<Favorite />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
