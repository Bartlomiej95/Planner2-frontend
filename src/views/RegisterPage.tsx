import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "..";
import Header from "../organisms/Header/Header";
import { PrimaryBtn } from "../components/Button/Button";
import { Heading } from "../components/Heading/Heading";
import { Input } from "../components/Input/Input";
import { createNewUser } from "../store/Users/usersSlice";
import { emailValidation } from "../utils/emailValidation";
import { MessageModal } from "../molecules/Modal/MessageModal";
import { useAppDispatch } from "../utils/hooks";

const Wrapper = styled.section`
    width: 100%;
`;

const RegisterHeading = styled(Heading)`
    width: 80vw;
    margin: 50px auto 20px auto;
`;

const RegisterBtn = styled(PrimaryBtn)`
    margin-top: 20px;
`;

const ErrorMsg = styled.h2`
    color: red;
    margin: 0 auto;
`;

export const RegisterPage = () => {

    const dispatch = useAppDispatch();
    const [ newUserEmail, setNewUserEmail] = useState('');
    const [ validationData, setValidationData ] = useState({ ok: false, message: ""});
    const [ error, setError ] = useState('');
    const [ popup, setPopup] = useState('');

    const handleChange = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        setNewUserEmail(target.value);
    }

    const handleClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        try{
            const validate = emailValidation(newUserEmail);
            if(validate.ok){
                (async () => {
                    const payload = await dispatch(createNewUser(newUserEmail)).then(res => res.payload);
                    if(payload.ok){
                        setPopup("Success");
                    } else {
                        setPopup("Error");
                    }
                    setTimeout(() => setPopup(""), 3000);
                    setError(payload.message);
                    })(); 
            } else {
                setPopup("Error");
                setTimeout(() => setPopup(""), 3000);
                setError(validate.message);
            }
            
        } catch(e){
            console.log(e);
        }
    }

    return(
        <>
            <Wrapper>
                <Header />
                <RegisterHeading>Formularz rejestracyjny</RegisterHeading>
                <form>
                    <Input type="email" value={newUserEmail} placeholder="Adres email" onChange={(e) => handleChange(e)} />
                    <RegisterBtn onClick={(e) => handleClick(e)}>Zarejestruj się</RegisterBtn>
                </form>
            </Wrapper>
            { popup === "Error" && <MessageModal type="Error" content={error} /> }  
            { popup === "Success" && <MessageModal type="Success" content="Na podany mail wysłano link aktywacyjny" /> } 
        </>
    )
}