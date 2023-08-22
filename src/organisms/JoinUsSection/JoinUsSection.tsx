import styled from 'styled-components';
import { Heading } from '../../components/Heading/Heading';
import { PrimaryBtn } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';


const Wrapper = styled.section`
    width: 100vw;
    height: 300px;
`;

const JoinUsButton = styled(PrimaryBtn)`
    margin: 50px auto 0 auto;
    border: none;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.16);
`;

const JoinUsSection = () => {

    const nav = useNavigate();

    return(
        <Wrapper>
            <Heading>Chcesz skorzystać z aplikacji? </Heading>
            <JoinUsButton onClick={() => nav('/register')}>Dołącz</JoinUsButton>
        </Wrapper>
    )
}

export default JoinUsSection;