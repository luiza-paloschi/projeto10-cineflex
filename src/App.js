import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import GlobalStyle from './components/globalStyle';
import MainPage from "./pages/MainPage";
import Sessions from "./pages/Sessions";
import { useState } from "react";
import Assentos from "./pages/Assentos";
import TelaSucesso from "./pages/TelaSucesso";

function App() {

const [ticket, setTicket]=useState({movie: "", posterURL:"", day: "", time:"", weekday:"", seats:[], nome:"", cpf:""});
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Header/>
      <Routes>
          <Route path="/" element={<MainPage ticket={ticket}/>}/>
          <Route path="/sessoes/:id" element={<Sessions ticket={ticket} setTicket={setTicket} />} />
          <Route path="/assentos/:idSessao" element={<Assentos ticket={ticket} setTicket={setTicket} />} />
          <Route path="/sucesso" element={<TelaSucesso ticket={ticket} setTicket={setTicket}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
