import styled from "styled-components"

export default function Header(){
    return (
        <StyledHeader>
            CINEFLEX
        </StyledHeader>
    )
}

const StyledHeader = styled.div`
    position: fixed;
    width: 100%;
    height: 67px;
    left: 0px;
    top: 0px;
    background: #C3CFD9;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    text-align: center;
    color: #E8833A;

`