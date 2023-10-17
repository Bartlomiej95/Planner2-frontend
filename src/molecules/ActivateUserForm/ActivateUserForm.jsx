import styled from "styled-components";
import { useEffect, useState } from "react";
import { Heading } from "../../components/Heading/Heading";
import { Input } from "../../components/Input/Input";
import { PrimaryBtn } from "../../components/Button/Button";
import {  fetchAllCompanies } from "../../store/Companies/companiesSlice";
import { activateNewUser } from "../../store/Users/usersSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../utils/hooks";
import { MessageModal } from "../Modal/MessageModal";
import { Position } from "../../types/Users";

const ActivateForm = styled.form`
    margin: 30px auto 10px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Select = styled.select`
    width: ${({ theme }) => theme.Input.mobileWidth};
    height: ${({ theme }) => theme.Input.mobileHeight};
    border: 1px solid #0903B0;
    border-radius: ${({ theme }) => theme.Input.borderRadius};
    padding: ${({ theme }) => theme.Input.mobilePadding};
    margin: 10px auto 30px auto;
    padding-left: 10px;
`;

export const ActivateUserForm = () => {

    const [activateUserData, setActivateUserData] = useState({
        urlCode: "",
        password: "",
        firstName: "",
        lastName: "",
        position: "",
    });
    const [ error, setError ] = useState('');
    const [ popup, setPopup] = useState('');
    const dispatch = useAppDispatch();
    const nav = useNavigate();
    const { link } = useParams();
    const allPositions = Object.values(Position);

    useEffect(() => {
        dispatch(fetchAllCompanies());
    }, [dispatch]);

    useEffect(() => {
        setActivateUserData({
            ...activateUserData,
            urlCode: link,
        })
    }, []);

    const handleInputValue = (e) => {
        e.preventDefault();
        setActivateUserData({
            ...activateUserData,
            [e.target.name]: e.target.value
        });
    }

    const handleSelectChange = (e) => {
        e.preventDefault();
        setActivateUserData({
            ...activateUserData,
            position: e.target.value,
        })
    }

    const handleBtnSetNewPass = (e) => {
        e.preventDefault();
        try {
            (async () => {
                const payload = await dispatch(activateNewUser(activateUserData)).then(res => res.payload);
                console.log(payload); 
                if(payload.actionStatus){
                    setPopup("Success");
                    setTimeout(() => nav('/login'));
                } else {
                    setPopup("Error");
                }
                setTimeout(() => setPopup(""), 3000);
                setError(payload.message);
            })();           
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <ActivateForm>                               
                        <Heading>Uzupełnij profil</Heading>
                        <Input name="firstName" type="text" placeholder="First name" value={activateUserData.firstName} onChange={(e) => handleInputValue(e)}/>
                        <Input name="lastName" type="text" placeholder="Last name" value={activateUserData.lastName} onChange={(e) => handleInputValue(e)}/>
                        <Input type="password" name="password" placeholder="Password" value={activateUserData.password} onChange={(e) => handleInputValue(e)}/>
                        <Select name="position" onChange={(e) => handleSelectChange(e)}>
                            <option value="">Wybierz stanowisko</option>
                            { 
                                allPositions.map(item => (
                                    <option value={item}>{item}</option>
                                ))
                            }
                        </Select>
                        <PrimaryBtn onClick={ (e) => handleBtnSetNewPass(e) }>Ustaw hasło</PrimaryBtn>                         
            </ActivateForm>
            { popup === "Error" && <MessageModal type="Error" content={error} /> }  
            { popup === "Success" && <MessageModal type="Success" content="Twoje konto zostało aktywowane" /> } 
        </>
    )
}