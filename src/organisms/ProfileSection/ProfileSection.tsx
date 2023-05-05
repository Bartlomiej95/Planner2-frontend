import styled from 'styled-components';
import { SubHeading } from '../../components/Heading/Heading';
import { Paragraph } from '../../components/Paragraph/Paragraph';
import { SliderTheme } from '../../molecules/SliderTheme/SliderTheme';
import userIcon from '../../assets/user.svg';
import { useContext, useEffect, useState } from 'react';
import { useAppSelector } from '../../utils/hooks';
import { UserContext } from '../../context/UserContext';
import { IUser } from '../../types/Users';

const Wrapper = styled.section`
    height: 400px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
`;

const ProfileParagraph = styled(Paragraph)`
    width: 60%;
    text-align: center;
    margin-top: 20px;
`;

const SpanLogout = styled.span`
    color: #0903B0;
    font-weight: 700;
`;

const BorderImageUser = styled.div`
    position: relative;
    width: 130px;
    height: 130px;
    border: 2px solid #372FFF;
    border-radius: 50%;
    background-color: transparent;
`;

const ImageUser = styled.div<{ icon: string}>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-image: url(${({ icon }) => icon});
    padding: 40px;
`;

const NameHeading = styled(SubHeading)`
    font-size: 30px;
    color: #22005F;
`;

const PositionParagprah = styled(Paragraph)`
    font-size: 20px;
`;


export const ProfileSection = () => {

    const [userData, setUserData] = useState<IUser>();
    const loggedInUser = useAppSelector(reducer => reducer.usersReducer.user);
    const { user, setUser} = useContext(UserContext);

    useEffect(() => {
        user ? setUserData(user) : setUserData(loggedInUser as IUser);       
    }, [user, loggedInUser]);

    if(!userData || Object.keys(userData).length === 0){
        return(
            <h2>Wczytywanie danych...</h2>
        )
    }else{
        return(
        <Wrapper>
            <ProfileParagraph>Pamiętaj, aby po zakończonej pracy <SpanLogout>wylogować się</SpanLogout> z konta</ProfileParagraph>
            <BorderImageUser>
                <ImageUser icon={userIcon} />
            </BorderImageUser>
            <NameHeading>{userData.firstName ?? "Imię"} {userData.lastName ?? "Nazwisko"}</NameHeading>
            <PositionParagprah>{userData.position ?? "Stanowisko"}</PositionParagprah>
            <SliderTheme />
        </Wrapper>
    )
    }

    
}