import { useState } from 'react';
import styled, { css } from 'styled-components';
import menuIcon from '../../assets/menuIcon.svg';
import { Logo } from '../../components/Heading/Heading';
import { HiddenMenu } from '../HiddenMenu/HiddenMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import { PrimaryBtn } from '../../components/Button/Button';

const Wrapper = styled.div`
    width: 100vw;
    height: 50px;
    background-color: #EFF1F5;
    display: flex;
    flex: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 33px;

    @media(min-width: 1360px){
        justify-content: space-around;
    }
`;

const IconsDiv = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
`;

const Icon = styled.div<{ readonly bcgIcon :string}>`
    width: 30px;
    height: 30px;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.16);
    border-radius: 50%;
    margin-left: 30px;
    cursor: pointer;
    background-color: white;

    ${({ bcgIcon }) => bcgIcon && css`
    
        background-image: url(${bcgIcon});
        background-position: center;
        background-repeat: no-repeat;
    `}
`;

const BackButton = styled(PrimaryBtn)`
    width: 60px;
    height: 30px;
    font-size: 12px;
    font-weight: 700;
    border: none;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.16);
    margin-left: 30px;
`;

const Header = () => {
    const [showHiddenMenu, setShowHiddenMenu] = useState(false);

    const nav = useNavigate();
    const location = useLocation();

    const searchedLoc = location.pathname === "/" || location.pathname === "/dashbord/user" || location.pathname === "/logout";

    return(
        <> 
        {
            !showHiddenMenu && (
                <Wrapper>
                    <Logo>Planner</Logo>
                    <IconsDiv>
                        { !searchedLoc && ( <BackButton onClick={() => nav(-1)}>Wróć</BackButton> ) }
                        <Icon bcgIcon={menuIcon} onClick={() => setShowHiddenMenu(prev => !prev)}/>
                    </IconsDiv>
                </Wrapper>
            )
        }
        <HiddenMenu isActive={showHiddenMenu} exitHiddenMenu={() => setShowHiddenMenu(false) }/>
        </>
    )
}

export default Header;