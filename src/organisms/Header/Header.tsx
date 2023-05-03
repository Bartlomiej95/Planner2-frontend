import { useState } from 'react';
import styled from 'styled-components';
import menuIcon from '../../assets/menuIcon.svg';
import { Logo } from '../../components/Heading/Heading';
import { HiddenMenu } from '../HiddenMenu/HiddenMenu';

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
`;

const Header = () => {
    const [showHiddenMenu, setShowHiddenMenu] = useState(false);
    return(
        <> 
        {
            !showHiddenMenu && (
                <Wrapper>
                    <Logo>Planner</Logo>
                    <img src={menuIcon} alt="ikona menu" onClick={() => setShowHiddenMenu(prev => !prev)}/>
                </Wrapper>
            )
        }
        <HiddenMenu isActive={showHiddenMenu} exitHiddenMenu={() => setShowHiddenMenu(false) }/>
        </>
    )
}

export default Header;