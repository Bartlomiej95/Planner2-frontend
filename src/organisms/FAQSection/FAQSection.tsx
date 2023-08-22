import styled from 'styled-components';
import { Heading } from '../../components/Heading/Heading';
import QAPlannerCard from '../../molecules/QAPlannerCard/QAPlannerCard';
import { data } from '../../data';

const Wrapper = styled.section`
    width: 100vw;
    min-height: 650px;
`;


const FAQSection = () => {

    return(
        <Wrapper >
            <Heading>Chcesz poznać nasze narzędzie?</Heading>
            {
                data.faq.map(item => (
                    <QAPlannerCard 
                        key={item.id}
                        id={item.id}
                        question={item.question}
                        answer={item.answer}
                    />
                ))
            }
        </Wrapper>
    )
}

export default FAQSection;