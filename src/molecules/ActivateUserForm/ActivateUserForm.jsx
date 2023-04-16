import styled from "styled-components";
import  { useEffect, useState } from "react";
import { Heading, SubHeading } from "../../components/Heading/Heading";
import { Input } from "../../components/Input/Input";
import { PrimaryBtn } from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCompanies, getAllCompanies } from "../../store/Companies/companiesSlice";
import { activateNewUser } from "../../store/Users/usersSlice";
import { useParams } from "react-router-dom";

const ActivateForm = styled.form`
    margin: 30px auto 10px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ActivateFormSubHeading = styled(SubHeading)`
    margin-top: 50px;
    margin-bottom: 25px;
`;

const BtnWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 25px;
`;

const Select = styled.select`
    margin: auto 0;
    margin-bottom: 25px;
`;

export const ActivateUserForm = () => {

    const [selectValue, setSelectValue] = useState('');
    const [secondPartOfForm, setSecondPartOfForm] = useState(false);
    const [activateUserdata, setActivateUserdata] = useState({
        urlCode: "",
        password: "",
        firstName: "",
        lastName: "",
        ifUserHasCompany: false,
        company: "",
        nip: 0,
        position: "",
    });
    const dispatch = useDispatch();
    const companies = useSelector(getAllCompanies);
    const { link } = useParams();

    useEffect(() => {
        dispatch(fetchAllCompanies());
    }, [dispatch]);

    useEffect(() => {
        setActivateUserdata({
            ...activateNewUser,
            urlCode: link,
        })
    }, [])

    
    const handleSelectValue = (e) => {
        e.preventDefault();
        const target = e.target;
        setSelectValue(target.value);
    }

    const handleInpuValue = (e) => {
        e.preventDefault();
        const target = e.target;
        setActivateUserdata({
            ...activateUserdata,
            [target.name]: target.value,
        });
        if(selectValue !== "new" && selectValue !== "-"){
            setActivateUserdata({
                ...activateNewUser,
                ifUserHasCompany: true,
            })
        }
    }

    const handleBtnSetNewPass = (e) => {
        e.preventDefault();
        try {
            dispatch(activateNewUser(activateUserdata));
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <ActivateForm>
            { secondPartOfForm ? (
                <>  
                    <Heading>Ustaw hasło</Heading>
                    <Input type="password" name="password" placeholder="Password" value={activateUserdata.password} onChange={(e) => handleInpuValue(e)}/>
                    <BtnWrapper>
                        <PrimaryBtn onClick={ (e) => setSecondPartOfForm(false)}>Poprzednie</PrimaryBtn>
                        <PrimaryBtn onClick={ (e) => handleBtnSetNewPass(e) }>Ustaw hasło</PrimaryBtn>
                    </BtnWrapper>                    
                </>
            ) : (
                <>
                    <Heading>Uzupełnij profil</Heading>
                    <Input type="text" name="firstName" placeholder="First name" value={activateUserdata.firstName} onChange={(e) => handleInpuValue(e)}/>
                    <Input type="text" name="lastName" placeholder="Last name" value={activateUserdata.lastName} onChange={(e) => handleInpuValue(e)}/>
                    <ActivateFormSubHeading>Dołącz do swojego zespołu lub stwórz nowy</ActivateFormSubHeading>
           
                    <Select onChange={ (e) => handleSelectValue(e)} value={selectValue}>
                        <option value="-">-</option>
                        <option value="new">Załóż nową</option>
                        { companies.map(item => {
                            return(
                                <option value={item.name}>{item.name}</option>
                            )
                        })}
                    </Select>
                    {
                        selectValue === "new" && (
                            <>
                                <Input type="text" name="company" placeholder="Company name" onChange={(e) => handleInpuValue(e)}/>
                                <Input type="number" name="tax" placeholder="Tax number" onChange={(e) => handleInpuValue(e)} />
                            </>
                        )
                    }
                    <PrimaryBtn onClick={() => setSecondPartOfForm(true)}>Dalej</PrimaryBtn>
                    </>
                )}           
        </ActivateForm>
    )
}