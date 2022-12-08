import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";



export default function MainPage(){
    const [moviesList, setMoviesList] = useState([]);
    
    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies");
        promise.then((res)=> setMoviesList(res.data));
        promise.catch((err) => console.log(err));
    }, []);
    


    return (
    <ScreenContainer>
        <h1>Selecione o filme</h1>
        <ContainerFilmes>
            {moviesList.map(movie => 
                <DivFilme key={movie.id}>
                    <Link to={`/sessoes/${movie.id}`}>
                     <img src={movie.posterURL} alt={movie.title} />
                   </Link>
                </DivFilme>) }
        </ContainerFilmes>
        
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
    h1{
        font-size: 24px;
        line-height: 28px;
        text-align: center;
        letter-spacing: 0.04em;
        color: #293845;
        margin: 50px 0px;
    }
`
const ContainerFilmes = styled.div`
    max-width: 375px;
    width:100%;
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    row-gap: 7px;
    column-gap: 30px;
    margin-bottom: 50px;
`

const DivFilme = styled.div`
    width: 145px;
    height: 209px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    padding: 8px;
    img {
        width: 129px;
    height: 193px;
    }
`