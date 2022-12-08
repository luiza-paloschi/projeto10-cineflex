import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components";


export default function Sessions(props){
    const {id} = useParams();
    const [sessoes, setSessao] = useState([]);
    console.log(sessoes)
    console.log(props.ticket)
   
   useEffect(()=> {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${id}/showtimes`)
    promise.then((res) => {
        setSessao(res.data.days)
        const novoObj = {...props.ticket}
        novoObj.movie = res.data.title
        novoObj.posterURL = res.data.posterURL
        props.setTicket(novoObj)
    })
   }, [])
    
    return (
        <ScreenContainer>
            <h1>Selecione o horário</h1>
            <SessionDiv><p>AAAAAAA</p></SessionDiv>
            {props.ticket.movie}
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
    }

`