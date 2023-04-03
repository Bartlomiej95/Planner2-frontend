import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoutIcon from '../../assets/logoutIcon.svg';
import { SubHeading, SubSubHeading } from '../../components/Heading/Heading';
import { BackSpan } from '../../components/Paragraph/Paragraph';

const Wrapper = styled.section`
    width: 100vw;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 50px);
    > * {
        margin-top: 15px;
    }
`;

const Img = styled.img`
    display: block;
    padding-bottom: 20px;
  
`;


export const LogoutSection = () => {

    const nav = useNavigate();

    const setFarewell = () => {
        const data = new Date();
        const hours = data.getHours();

        if( hours >= 6 && hours < 13){
            return 'Miłego dnia !';
        } else if( hours >= 13 && hours < 18){
            return 'Miłego popołudnia !';
        } else if( hours >= 18 && hours < 22 ) {
            return 'Miłego wieczoru !'; 
        } else if( ( hours >= 22 && hours <= 24 ) || ( hours >= 0 && hours < 6 ) ){
            return 'Dobrej nocy ! Lepiej idź już spać';
        } else if( hours < 0 || hours > 24 ){
            return 'Hmm... zaginasz czasoprzestrzeń';
        }
        
    }

    return(
        <Wrapper>
            <Img src={logoutIcon} alt="ikonka zatwierdzające udane wylogowanie" />
            <SubHeading>{setFarewell()}</SubHeading>
            <SubSubHeading>Zostałeś pomyślnie wylogowany z konta.</SubSubHeading>
            <BackSpan onClick={() => nav('/')}>Wróc do strony głównej</BackSpan>
        </Wrapper>
    )
}
