import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import GlobalStyle from './components/globalStyle';
import MainPage from "./pages/MainPage";
import Sessions from "./pages/Sessions";
import { useState } from "react";

function App() {

const [ticket, setTicket]=useState({movie: "", posterURL:"", session: ""})


  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Header/>
      <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/sessoes/:id" element={<Sessions ticket={ticket} setTicket={setTicket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
