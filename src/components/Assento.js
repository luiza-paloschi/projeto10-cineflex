import styled from "styled-components";



export default function Assento(props){
    return (
        <BotaoAssento data-test="seat" onClick={()=> props.reservarAssentos(props.assento)} assento={props.assento} selecionado={props.selecionado}>
            {props.assento.name}
        </BotaoAssento>
    )
}

const BotaoAssento = styled.button`
    width: 26px;
    height: 26px;
    padding: 0px;
    background: ${props => props.assento.isAvailable ? props.selecionado.includes(props.assento.id) ? "#1AAE9E" : "#C3CFD9" : "#FBE192"};
    border: 1px solid ${props => props.assento.isAvailable ? props.selecionado.includes(props.assento.id) ? "#0E7D71" : "#7B8B99" : "#F7C52B"};
    border-radius: 12px;
    font-size: 11px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000000;
    `