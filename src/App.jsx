import React, { useEffect } from "react";
import AppRoutes from "./routes/route";
import AOS from "aos";
import "aos/dist/aos.css";
import FloatingHelp from "./components/FloatingHelp";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <>
      <AppRoutes />
      <FloatingHelp />
    </>
  );
}

export default App;
