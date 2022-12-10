import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components";

import Sessao from "../components/Sessao";

export default function Sessions({ticket, setTicket}){
    const {id} = useParams();
    const [sessoes, setSessao] = useState([]);
   
   useEffect(()=> {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${id}/showtimes`)
    promise.then((res) => {
        setSessao(res.data.days)
        const novoObj = {...ticket}
        novoObj.movie = res.data.title
        novoObj.posterURL = res.data.posterURL
        setTicket(novoObj)
    })
   },[])
    
    return (
        <ScreenContainer>
            <h1>Selecione o horário</h1>
            <SessionDiv>
                {sessoes.map((sessao) => <Sessao key={sessao.id} sessao ={sessao}/>)}
            </SessionDiv>
            <Footer data-test="footer">
               <div>
                    <img src={ticket.posterURL} alt={ticket.movie} />
               </div>
                <h2>{ticket.movie}</h2>
            </Footer>
        </ScreenContainer>
    )
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
    h1{
        font-size: 24px;
        line-height: 28px;
        text-align: center;
        letter-spacing: 0.04em;
        color: #293845;
        margin: 50px 0px;
    }
`

const SessionDiv = styled.div`
    width: 100%;
    padding: 0px 24px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    p{
        font-size: 20px;
        line-height: 23px;
        align-items: center;
        letter-spacing: 0.02em;
        color: #293845;
        margin-bottom: 22px;
    }
    a{
        text-decoration: none;
        color: inherit;
    }
`

const Footer = styled.div`
    position: fixed;
    width: 100%;
    height: 117px;
    left: 0px;
    bottom: 0px;
    padding: 0px 10px;
    background: #DFE6ED;
    border: 1px solid #9EADBA;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    
    h2{
    font-size: 26px;
    line-height: 30px;
    color: #293845;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;              
    text-overflow:    ellipsis;
    
    }
    div{
        width: 64px;
        margin-right: 15px;
        height: 89px;
        background: #FFFFFF;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        padding: 8px;
        img{
            width: 48px;
            height: 72px;
        }
    }
`