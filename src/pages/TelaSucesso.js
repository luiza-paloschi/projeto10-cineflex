import styled from "styled-components";


export default function TelaSucesso(){
    return(
        <ScreenContainer>
            <div>Sucesso</div>
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
        margin: 40px 0px;
        margin-bottom: 25px;
    }`