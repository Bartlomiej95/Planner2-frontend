import styled from "styled-components";
import * as api from "../api/index";
import Header from "../organisms/Header/Header";
import { SubHeading } from "../components/Heading/Heading";
import { Input } from "../components/Input/Input";
import { useState } from "react";
import { PrimaryBtn } from "../components/Button/Button";
import { MessageModal } from "../molecules/Modal/MessageModal";

const ResetForm = styled.form`
    width: 90%;
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    
`;

const ResetInput = styled(Input)`
    margin: 30px auto;
`;

export const ResetPasswordPage = () => {

    const [ email, setEmail ] = useState('');
    const [ popup, setPopup ] = useState('');
    const [ popupMsg, setPopupMsg ] = useState('');

    const handleChange = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLTextAreaElement;

        setEmail(target.value);
    }

    const handleClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            (async () => {
                const payload = await api.sendEmailToReset(email).then(res => res.data)
                    .catch(error => {
                        setPopup("Error");
                        setPopupMsg(error.response.data.message);
                    });
                const { ok, message } = payload;
               
                if(ok){
                    setPopup("Success");
                    setPopupMsg(message);

                } else {
                    setPopup("Error");
                    setPopupMsg(message);
                }
                setTimeout(() => setPopup(""), 3000);
            })();
        } catch (error) {
            console.log(error);
        }
    }


    return(
        <>
            <Header />
            <ResetForm>
                <SubHeading>Podaj maila do zrestartowania hasła</SubHeading>
                <ResetInput name="email" type="email" onChange={(e) => handleChange(e)} value={email} placeholder="Adres email"/>
                <PrimaryBtn onClick={(e) => handleClick(e)}>Zrestartuj hasło</PrimaryBtn>
            </ResetForm>
            { popup === "Error" && <MessageModal type="Error" content={popupMsg} /> }
            { popup === "Success" && <MessageModal type="Success" content={popupMsg} /> }
        </>
    )
}