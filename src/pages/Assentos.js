import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components";
import Assento from "../components/Assento";
import arrow from "../assets/arrow.png"

export default function Assentos({ticket, setTicket}){
    const {idSessao} = useParams();
    const[assentos, setAssentos] = useState([]);
    const [selecionado, setSelecionado] =useState([]);
    const [nome, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const navigate = useNavigate();


    useEffect(()=>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`);
        promise.then((res)=> {
            setAssentos(res.data.seats);
            const novoObj = {...ticket};
            novoObj.day = res.data.day.date;
            novoObj.weekday = res.data.day.weekday;
            novoObj.time = res.data.name;
            novoObj.movie = res.data.movie.title;
            novoObj.posterURL = res.data.movie.posterURL;
            setTicket(novoObj);
        })
    }, [])
    
    function reservarAssentos(assento){
        if (assento.isAvailable === false){
            return alert("Esse assento não está disponível");
        }
        const novoObj = {...ticket};
        const arrayIds = [...selecionado];
        if (arrayIds.includes(assento.id)){
            const valor = assento.id;
            const numero  = assento.name;
            const arrayFiltrado = arrayIds.filter((item => item !== valor));
            const arrayTicketFiltrado = novoObj.seats.filter((item => item !== numero));
            novoObj.seats = arrayTicketFiltrado;
            setSelecionado(arrayFiltrado);
            setTicket(novoObj);
        } else{
            arrayIds.push(assento.id);
            setSelecionado(arrayIds);
            novoObj.seats.push(assento.name)
            setTicket(novoObj);
        }
    }
    function finalizar(event){
        event.preventDefault();
        if(cpf.length > 11 || cpf.includes(".") || cpf.includes("-") || cpf.length <11){
            return alert("O CPF deve conter apenas números, totalizando onze dígitos!");
        }

        if(selecionado.length === 0){
            return alert("Selecione pelo menos um assento!");
        }
        const obj = {
                ids: selecionado,
                name: nome,
                cpf: cpf
            };
        ticket.nome= nome;
        const primeiroPonto = cpf.substring(0, 3) + "." + cpf.substring(3, cpf.length);
        const segundoPonto = primeiroPonto.substring(0, 7) + "." + cpf.substring(6, cpf.length);
        const traco = segundoPonto.substring(0, 11) + "-" + cpf.substring(9, cpf.length);
        ticket.cpf = traco;
        
        const promise = axios.post(`https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many`, obj);
        promise.then(() => {
            navigate("/sucesso");
        });
        promise.catch((err)=>{
            alert(
           `${err.code}
            ${err.message}  
            Por favor, recarregue a página`);
        });
    }
    return (
        <ScreenContainer>
             <DivArrow>
                <button data-test="go-home-header-btn" onClick={()=> navigate(-1)}>
                <img src={arrow} alt="voltar"/>
                </button>
            </DivArrow>
            <h1>Selecione o(s) assento(s)</h1>
            <DivAssentos>
                {assentos.map((assento) => <Assento assento={assento} key={assento.id} reservarAssentos={reservarAssentos} selecionado={selecionado}/>)}
            </DivAssentos>
            <DivDisponibilidade>
                <div>
                    <SpanEstilizada color={"#1AAE9E"} border={"#0E7D71"}></SpanEstilizada>
                    <p>Selecionado</p>
                </div>
                <div>
                    <SpanEstilizada color={"#C3CFD9"} border={"#7B8B99"}></SpanEstilizada>
                    <p>Disponível</p>
                </div>
                <div>
                    <SpanEstilizada color={"#FBE192"} border={"#F7C52B"}></SpanEstilizada>
                    <p>Indisponível</p>
                </div>
            </DivDisponibilidade>
            <FazerPedido onSubmit={finalizar}>
                <div>
                    <label htmlFor="nome">Nome do comprador:</label>
                    <input data-test="client-name" name ="nome" type="text" value={nome} required onChange={e => setNome(e.target.value)} placeholder="Digite seu nome..." />
                </div>
                <div>
                    <label htmlFor="cpf" >CPF do comprador:</label>
                    <input data-test="client-cpf" name="cpf"  type="number" value={cpf} onChange={e => setCPF(e.target.value)} placeholder="Digite seu CPF..."/>
                </div>
                <BotaoSubmit data-test="book-seat-btn" type="submit">Reservar Assento(s)</BotaoSubmit>
            </FazerPedido>
            <Footer data-test="footer">
                <DivMovie>
                <img src={ticket.posterURL} alt={ticket.movie} />
                </DivMovie>
                <DivDados>
                    <p>{ticket.movie}</p>
                    <p>{`${ticket.weekday} - ${ticket.time}`}</p>
                </DivDados>
            </Footer>
        </ScreenContainer>
    )
}

const DivArrow = styled.div`
    position: fixed;
    top: 13px;
    left: 10px;
    img{
        width:40px;
        height:40px;
    }
    button{
        border:none;
        background: none;
    }
`

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

const DivAssentos =styled.div`
    width:100%;
    padding: 0px 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 20px;
    column-gap: 8px;
    margin-bottom: 16px;
`
const DivDisponibilidade=styled.div`
    width:100%;
    display: flex;
    justify-content:center;
    align-items: center;
    column-gap:20px;
    div{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p{
            font-size: 13px;
            line-height: 15px;
            letter-spacing: -0.013em;
        }
    }
`
const SpanEstilizada=styled.span`
    width: 25px;
    height: 25px;
    background: ${props => props.color};
    border: 1px solid ${props => props.border};
    border-radius: 17px;
    margin-bottom:5px;
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
`
const DivMovie = styled.div`
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
`
const DivDados = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width:99%;
    p{
    font-size: 24px;
    
    align-items: flex-start;
    line-height: 30px;
    color: #293845;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    }
`
const FazerPedido = styled.form`
    width:100%;
    display:flex;
    flex-direction: column;
    align-items:center;
    margin-top: 40px;
    div{
        display: flex;
        flex-direction: column;
        width:100%;
        padding:0px 20px;
        margin-bottom:10px;
        label{
            font-size: 18px;
            line-height: 21px;
            margin-bottom:5px;
            color: #293845;
        }
        input{
            width: 100%;
            height: 51px;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 3px;
            padding: 0px 15px;
        }
        & ::placeholder{
            font-style: italic;
            font-weight: 400;
            font-size: 18px;
            line-height: 21px;
            color: #AFAFAF;
        }
    }
`
const BotaoSubmit = styled.button`
    width: 225px;
    height: 42px;
    background: #E8833A;
    border: none;
    border-radius: 3px;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.04em;
    color: #FFFFFF;
    margin-top: 47px;
    margin-bottom: 50px;
`
export {BotaoSubmit};