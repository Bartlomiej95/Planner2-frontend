import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PrimaryBtn } from '../../components/Button/Button';
import { Heading, SubHeading } from '../../components/Heading/Heading';
import { BannerCardAboutPlanner } from '../../molecules/Card/Card';
import { data } from '../../data';
import { SyntheticEvent, useState } from 'react';


const Wrapper = styled.section`
    width: 100vw;
    min-height: 800px;
    padding-top: 150px;
`;

const BannerLoginButton = styled(PrimaryBtn)`
    margin: 50px auto 20px auto;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.16);
    border: 0px;

    :last-of-type{
        margin: 30px auto 110px auto;
    }
`;

const CardNavigation = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    margin: 0 auto;
`;

const SingleNav = styled.div<{ readonly isActive: boolean }>`
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: 1px solid #120D45;
    background-color: ${({ isActive }) => isActive === true ? 'black' : 'white'};
    margin-right: 10px;

    :hover{
        cursor: pointer;
    }
`;

const CardWrapper = styled.div<{ readonly activeId: number }>`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 335px;
    overflow: hidden;
    margin: 0 auto;  

    @media(min-width: 600px){
        width: 370px;
    }
`;

const Banner = () => {

    const nav = useNavigate();
    const [idActiveNav, setIdActiveNav] = useState(1);

    const handleClick = (e: SyntheticEvent, id: number) => {
        // id - id klikniętego kółka nawigacji - mają takie samo id jak komponent BannerCardAboutPlanner
        e.preventDefault();
        setIdActiveNav(id);
    }

    const checkActive = (idNav: number) => {
        // id kropki nawigacyjnej , idActive - id aktywnej kropki
        if(idNav === idActiveNav){
            return true;
        }
        return false;
    }

    return(
        <Wrapper>
            <Heading> Zaloguj się lub utwórz konto </Heading>
            <BannerLoginButton onClick={() => nav('/login')}>Zaloguj się </BannerLoginButton>
            <BannerLoginButton onClick={() => nav('/sample-login')}>Konto testowe </BannerLoginButton>
            <SubHeading>Poznaj nasze rozwiązanie</SubHeading>
            <CardWrapper activeId={idActiveNav}>
                {
                    data.solutions.map(item => (
                        <BannerCardAboutPlanner 
                            key={item.id}
                            id={item.id}
                            content={item.content}
                            activeId={idActiveNav}
                        />
                        ))
                }
            </CardWrapper>
            <CardNavigation >
                {
                    data.solutions.map(item => (
                        <SingleNav 
                            key={item.id}
                            onClick={(e) => handleClick(e, item.id)}
                            isActive={checkActive(item.id)}
                        />
                    ))
                }
            </CardNavigation>
        </Wrapper>
    )
}

export default Banner;