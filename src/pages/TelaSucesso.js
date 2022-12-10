import {useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BotaoSubmit } from "./Assentos";


export default function TelaSucesso({ticket, setTicket}){
    const navigate = useNavigate();
    return(
        <ScreenContainer>
            <h1>Pedido feito com sucesso!</h1>
            <div data-test="movie-info">
                <h2>Filme e sessão</h2>
                <p>{ticket.movie}</p>
                <p>{`${ticket.day} ${ticket.time}`}</p>
            </div>
            <div data-test="seats-info">
                <h2>Ingressos</h2>
                {ticket.seats.map((assento) => <p key={assento}> Assento {assento}</p>)}
            </div>
            <div data-test="client-info">
                <h2>Comprador</h2>
                <p>{ticket.nome}</p>
                <p>{ticket.cpf}</p>
            </div>
    
                <BotaoSubmit data-test="go-home-btn" onClick={()=> {
                    setTicket({movie: "", posterURL:"", day: "", time:"", weekday:"", seats:[], nome:"", cpf:""})
                    navigate("/")
                }}>Voltar pra Home</BotaoSubmit>
            
        </ScreenContainer>
    );
}

const ScreenContainer = styled.div`
    background-color: #FFFFFF;;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px;
    margin-top: 67px;
    padding: 0px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    a{
        text-decoration: none;
    }
    h1{
        font-size: 24px;
        width:50%;
        font-weight: 700;
        line-height: 28px;
        text-align: center;
        letter-spacing: 0.04em;
        color: #247A6B;
        margin: 30px 0px;
        margin-bottom: 40px;
    }
    div{
        width:100%;
        padding: 0px 25px;
        color: #293845;
        margin-bottom:35px;
        h2{
            font-weight: 700;
            font-size: 24px;
            line-height: 28px;
            display: flex;
            align-items: center;
            letter-spacing: 0.04em;
            margin-bottom: 8px;
        }
        p{
            font-size: 22px;
            line-height: 26px;
            letter-spacing: 0.04em;
            
        }
    }
    
    
    `