import styled from "styled-components";
import Header from "../organisms/Header/Header";
import { PrimaryBtn } from "../components/Button/Button";
import { useAppDispatch } from "../utils/hooks";
import { employeeLogin, pmLogin } from "../api";
import React, { useContext, useState } from "react";
import { MessageModal } from "../molecules/Modal/MessageModal";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Wrapper = styled.div`
    width: 100vw;
`;

const PrimaryLoginBtn = styled(PrimaryBtn)`
    margin: 20px auto;

    :first-of-type{
        margin-top: 200px;
    }
`;

export const SampleLoginPage = () => {

    const [ popup, setPopup ] = useState('');
    const [ loginError, setLoginError ] = useState('');
    const dispatch = useAppDispatch();
    const nav = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const handleEmployeeLogin = (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const logIn = async () => {
                const data = await dispatch(employeeLogin).then(res => res.data);
                if(!data.id){
                    setPopup("Error");
                    setLoginError("Funkcja tymczasowo niedostępna");
                    setTimeout(() => setPopup(""), 3000);  
                } else if(data.id) {
                    setPopup("Success");
                    setUser(data);
                    setTimeout(() => setPopup(""), 3000);
                    nav('/dashbord/user');
                }
            }
            logIn(); 
        } catch (error) {
            console.error(error);
        }
    }

    const handlePMLogin = (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const logIn = async () => {
                const data = await dispatch(pmLogin).then(res => res.data);
                console.log(data);
                if(!data.id){
                    setPopup("Error");
                    setLoginError("Funkcja tymczasowo niedostępna");
                    setTimeout(() => setPopup(""), 3000);  
                } else if(data.id) {
                    setPopup("Success");
                    setUser(data);
                    setTimeout(() => setPopup(""), 3000);
                    nav('/dashbord/user');
                }
            }
            logIn(); 
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <Wrapper>
            <Header />
            <PrimaryLoginBtn onClick={(e) => handleEmployeeLogin(e)}>Konto pracownika</PrimaryLoginBtn>
            <PrimaryLoginBtn onClick={(e) => handlePMLogin(e)}>Konto menedżera</PrimaryLoginBtn>
            { popup === "Error" && <MessageModal type="Error" content={loginError} /> }  
            { popup === "Success" && <MessageModal type="Success" content="Pomyślnie zalogowano" /> }    
        </Wrapper>
    )
}