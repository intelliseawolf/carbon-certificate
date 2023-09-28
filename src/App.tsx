import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Certificate from "./pages/certificates";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Certificate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
