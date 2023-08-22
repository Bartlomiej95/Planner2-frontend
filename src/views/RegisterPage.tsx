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

    const dispatch = useDispatch<AppDispatch>();
    const [ newUserEmail, setNewUserEmail] = useState('');
    const [ validationData, setValidationData ] = useState({ ok: false, message: ""});

    const handleChange = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        setNewUserEmail(target.value);
    }

    const handleClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        try{
            const validate = emailValidation(newUserEmail);
            setValidationData(validate); 
            if(validate.ok){
                dispatch(createNewUser(newUserEmail));
            }
            
        } catch(e){
            console.log(e);
        }
    }

    return(
        <Wrapper>
            <Header />
            <RegisterHeading>Formularz rejestracyjny</RegisterHeading>
            <form>
                <Input type="email" value={newUserEmail} placeholder="Adres email" onChange={(e) => handleChange(e)} />
                { !validationData.ok && <ErrorMsg>{validationData.message}</ErrorMsg> }
                <RegisterBtn onClick={(e) => handleClick(e)}>Zarejestruj się</RegisterBtn>
            </form>
        </Wrapper>
    )
}