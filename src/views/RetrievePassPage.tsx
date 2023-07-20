import styled from "styled-components";
import { useParams } from "react-router-dom";
import * as api from "../api/index";
import { Heading, SubHeading } from "../components/Heading/Heading";
import Header from "../organisms/Header/Header";
import { Input } from "../components/Input/Input";
import { useEffect, useState } from "react";
import { PrimaryBtn } from "../components/Button/Button";
import { MessageModal } from "../molecules/Modal/MessageModal";
import { useNavigate } from "react-router-dom";

const RetrieveFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    align-items: center;
    justify-content: center;
`;

const initialData = {
    link: '',
    password: '',
    replyPassword: '',
};

export const RetrievePassPage = () => {

    const [ data, setData ] = useState(initialData);
    const [ popup, setPopup ] = useState('');
    const [ modalMsg, setModalMsg ] = useState('');
    const nav = useNavigate();

    const { link } = useParams();

    useEffect(() => {
        if(link){
            setData({
                ...data,
                link,
            })
        } else {
            setPopup("Error");
            setModalMsg("Brak poprawnego linku, upewnij się czy kliknąłeś w dobry link albo zrestartuj hasło jeszcze raz");
            setTimeout(() => setPopup(""), 3000);
        }
        
    },[])

    const handleChange = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        setData({
            ...data,
            [target.name]: target.value
        });
    };

    const handleClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(data);
        try {
            (async () => {
                const payload = await api.restartPassword(data).then(res => res.data)
                    .catch(error => {
                        setPopup("Error");
                        setModalMsg(error.response.data.message);
                        setTimeout(() => setPopup(""), 3000);
                    });
                if(payload.ok){
                    setPopup("Success");
                    setModalMsg(payload.message);
                    setTimeout(() => {
                        nav('/login');
                    },1);
                } else {
                    setPopup("Error");
                    setModalMsg(payload.message);
                }
                setTimeout(() => setPopup(""), 3000);
                
            })();
            
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <Header/>
            <RetrieveFormWrapper>
                <Heading>Odzyskiwanie konta</Heading>
                <SubHeading>Ustaw nowe hasło</SubHeading>
                <Input type="password" name="password" placeholder="Hasło" onChange={(e) => handleChange(e)} value={data.password}/>
                <Input type="password" name="replyPassword" placeholder="Powtórz hasło" onChange={(e) => handleChange(e)} value={data.replyPassword} />
                <PrimaryBtn onClick={(e) => handleClick(e)}>Ustaw nowe hasło</PrimaryBtn>
            </RetrieveFormWrapper>
            { popup === "Error" && <MessageModal type="Error" content={modalMsg} /> }  
            { popup === "Success" && <MessageModal type="Success" content={modalMsg} /> } 
            
        </>
    )
}