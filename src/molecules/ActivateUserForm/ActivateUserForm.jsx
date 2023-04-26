import styled from "styled-components";
import { useEffect, useState } from "react";
import { Heading } from "../../components/Heading/Heading";
import { Input } from "../../components/Input/Input";
import { PrimaryBtn } from "../../components/Button/Button";
import { useDispatch } from "react-redux";
import {  fetchAllCompanies } from "../../store/Companies/companiesSlice";
import { activateNewUser } from "../../store/Users/usersSlice";
import { useParams } from "react-router-dom";

const ActivateForm = styled.form`
    margin: 30px auto 10px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ActivateUserForm = () => {

    const [activateUserData, setActivateUserData] = useState({
        urlCode: "",
        password: "",
        firstName: "",
        lastName: "",
        position: "",
    });
    const dispatch = useDispatch();
    const { link } = useParams();

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

    const handleBtnSetNewPass = (e) => {
        e.preventDefault();
        try {
            dispatch(activateNewUser(activateUserData));           
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <ActivateForm>                               
                    <Heading>Uzupełnij profil</Heading>
                    <Input name="firstName" type="text" placeholder="First name" value={activateUserData.firstName} onChange={(e) => handleInputValue(e)}/>
                    <Input name="lastName" type="text" placeholder="Last name" value={activateUserData.lastName} onChange={(e) => handleInputValue(e)}/>
                    <Input type="password" name="password" placeholder="Password" value={activateUserData.password} onChange={(e) => handleInputValue(e)}/>
                    <PrimaryBtn onClick={ (e) => handleBtnSetNewPass(e) }>Ustaw hasło</PrimaryBtn>                         
        </ActivateForm>
    )
}