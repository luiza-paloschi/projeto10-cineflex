import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Sessao({sessao}){
    const showtimes = sessao.showtimes
    return (
        <>
        <p>{`${sessao.weekday} - ${sessao.date}`}</p>
        <DivButtons>
            {showtimes.map((horarios) => 
            <Link key={horarios.id} to={`/assentos/${horarios.id}`}>
                <ButtonTime > {horarios.name}</ButtonTime>
            </Link> )}
        </DivButtons>
        
        </>
    );
}

const ButtonTime = styled.button`
    width: 83px;
    height: 43px;
    background: #E8833A;
    border-radius: 3px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.02em;
    color: #FFFFFF;
    justify-content: center;
    border: 1px solid #E8833A;
`

const DivButtons = styled.div`
    display:flex;
    align-items: center;
    column-gap: 8px;
    margin-bottom: 22px;
`