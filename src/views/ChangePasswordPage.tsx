import { useState } from "react";
import * as api from '../api/index';
import { PrimaryBtn } from "../components/Button/Button";
import { Heading } from "../components/Heading/Heading";
import { Input } from "../components/Input/Input";
import Header from "../organisms/Header/Header";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MessageModal } from "../molecules/Modal/MessageModal";

const WrapperForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 75%;
    margin: 30px auto 0 auto;
`;

const ChangePassBtn = styled(PrimaryBtn)`
    margin-top: 25px;
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
                
                if(payload.ok){
                    setPopup("Success");
                    setTimeout(() => {
                        nav('/dashbord/user');
                    },1);
                    setError(payload.message);
                } else {
                    setPopup("Error");
                    const msg = payload.messages ?? payload.response.data.message;
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
                <label>Stare hasło</label>
                <Input name="password" type="password" onChange={(e) => handleChange(e)} value={data.password}/>
                <label>Nowe hasło</label>
                <Input name="newPassword" type="password" onChange={(e) => handleChange(e)} value={data.newPassword}/>
                <label>Powtórz nowe hasło</label>
                <Input name="replyNewPassword" type="password" onChange={(e) => handleChange(e)} value={data.replyNewPassword}/>
                <ChangePassBtn onClick={(e) => handleClick(e)}>Zmień hasło</ChangePassBtn>
            </WrapperForm>
            { popup === "Error" && <MessageModal type="Error" content={error} /> }  
            { popup === "Success" && <MessageModal type="Success" content={error} /> } 
        </>
    )
}