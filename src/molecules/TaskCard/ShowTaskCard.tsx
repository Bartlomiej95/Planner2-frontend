import styled, { css } from 'styled-components';
import { SubSubHeading } from '../../components/Heading/Heading';

const Wrapper = styled.div <{ readonly isFinish: boolean}>`
    min-width: 250px;
    min-height: 90px;
    padding: 15px 20px;
    margin: 0 auto;
    box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.16);
    border-radius: 10px;
    margin-bottom: 25px;
    
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    ${({ isFinish }) => isFinish && css`
        background-color: gray;
        text-decoration: line-through !important;
    `}
`;

const HeaderTaskCard = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-bottom: 12px;
`;

interface Props {
    id: string,
    title: string;
    brief: string;
    isFinish: boolean;
    isActive: boolean;
}


export const ShowTaskCard: React.FC<Props> = ({ id, title, brief, isFinish }) => {
    console.log(title);
    return(
        <>
            <Wrapper isFinish={isFinish} >
                <HeaderTaskCard>
                    <SubSubHeading>{title}</SubSubHeading>
                    {isFinish && ( <p>FINISH</p> )}
                </HeaderTaskCard>
                <p>{brief}</p>
                
            </Wrapper>
        </>
    )
}
 