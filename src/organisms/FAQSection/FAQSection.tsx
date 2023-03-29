import styled from 'styled-components';
import { Heading } from '../../components/Heading/Heading';
import QAPlannerCard from '../../molecules/QAPlannerCard/QAPlannerCard';

const Wrapper = styled.section`
    width: 100vw;
    min-height: 800px;
`;


const FAQSection = () => {

    return(
        <Wrapper >
            <Heading>Chcesz poznać nasze narzędzie?</Heading>
            <QAPlannerCard />
            <QAPlannerCard />
            <QAPlannerCard />
            <QAPlannerCard />
            <QAPlannerCard />
        </Wrapper>
    )
}

export default FAQSection;