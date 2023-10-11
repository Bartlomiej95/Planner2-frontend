import { useState } from "react";
import * as api from '../api/index';
import { PrimaryBtn } from "../components/Button/Button";
import { Heading, SubHeading, SubSubHeading } from "../components/Heading/Heading";
import { Input } from "../components/Input/Input";
import Header from "../organisms/Header/Header";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MessageModal } from "../molecules/Modal/MessageModal";

const WrapperForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 30px auto 0 auto;

    @media(min-width: 700px){
        align-items: center;
    }
`;

const ChangePassBtn = styled(PrimaryBtn)`
    margin-top: 25px;
`;

const InputChangePass = styled(Input)`
    margin: 10px 0 20px 0;
`;

const initialData = {
    password: "",
    newPassword: "",
    replyNewPassword: "",
};

export const ChangePasswordPage = () => {

    const [ data, setData ] = useState(initialData); 
    const [ popup, setPopup] = useState('');
    const [ error, setError ] = useState('');
    const nav = useNavigate();

    const handleChange = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLTextAreaElement;
        setData({
            ...data,
            [target.name]: target.value,
        });
    };
    
    const handleClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
       
        try {
            (async () => {
                const payload = await api.changePassword(data).then(res => res.data)
                .catch(err => err);
                console.log(payload);
                
                if(payload.ok){
                    setPopup("Success");
                    setTimeout(() => {
                        nav('/dashbord/user');
                    },1);
                    setError(payload.message);
                } else {
                    setPopup("Error");
                    let msg;
                    if(payload.messages){
                        msg = payload.messages ?? payload.response.data.message;
                    }
                    if(payload.message){
                        msg = payload.message;
                    }
                    setError(msg);
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
            <Heading>Zmiana hasła</Heading>
            <WrapperForm>
                <SubSubHeading>Stare hasło</SubSubHeading>
                <InputChangePass name="password" type="password" onChange={(e) => handleChange(e)} value={data.password}/>
                <SubSubHeading>Nowe hasło</SubSubHeading>
                <InputChangePass name="newPassword" type="password" onChange={(e) => handleChange(e)} value={data.newPassword}/>
                <SubSubHeading>Powtórz nowe hasło</SubSubHeading>
                <InputChangePass name="replyNewPassword" type="password" onChange={(e) => handleChange(e)} value={data.replyNewPassword}/>
                <ChangePassBtn onClick={(e) => handleClick(e)}>Zmień hasło</ChangePassBtn>
            </WrapperForm>
            { popup === "Error" && <MessageModal type="Error" content={error} /> }  
            { popup === "Success" && <MessageModal type="Success" content={error} /> } 
        </>
    )
}