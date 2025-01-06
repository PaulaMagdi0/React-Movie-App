import React, { Suspense, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/nav";
import Container from "react-bootstrap/Container";
import "./App.css";
import LanguageContext from "./context/LanguageContext";

// Lazy-loaded components
const Movies = React.lazy(() => import("./pages/movies"));
const MovieDetails = React.lazy(() => import("./pages/MovieDetails"));
const WatchList = React.lazy(() => import("./pages/wishlist"));
const Contact = React.lazy(() => import("./pages/registration"));
const NotFound = React.lazy(() => import("./pages/notFound"));

function App() {
  const [lang, setLang] = useState("en");

  return (
    <BrowserRouter>
      {/* Language Context Provider */}
      <LanguageContext.Provider value={{ lang, setLang }}>
        {/* Container for RTL/LTR support */}
        <Container
          dir={lang === "ar" ? "rtl" : "ltr"}
          className={lang === "ar" ? "text-right" : "text-left"}
          style={{padding:"0"}} 
          fluid
        >
          {/* Header Component */}
          <Navbar />

          {/* Suspense for lazy-loaded components */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Routes for all pages */}
              <Route path="/" element={<Movies />} />
              <Route path="/movies/:id" element={<MovieDetails />} />
              <Route path="/wishlist" element={<WatchList />} />
              <Route path="/registration" element={<Contact />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Container>
      </LanguageContext.Provider>
    </BrowserRouter>
  );
}

export default App;