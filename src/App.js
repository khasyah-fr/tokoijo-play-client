import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Gallery from "./components/Gallery.js";
import Detail from "./components/Detail.js";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/videos/:id" element={<Detail />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
