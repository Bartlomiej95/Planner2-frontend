import styled from 'styled-components';
import valueIcon from '../../assets/valueProject.svg';
import costIcon from '../../assets/costProject.svg';
import profitIcon from '../../assets/profitProject.svg';
import { Paragraph } from '../../components/Paragraph/Paragraph';


const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
`;

const DivImg = styled.div`
    width: 30px;
    margin-right: 40px;
`;

const TitlePart = styled.div`
    display: flex; 
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: left;
    justify-self: start;
    flex-grow: 2;

    @media(min-width: 600px){
        padding-left: 30px;
    }

`;

const TitleParagraph = styled(Paragraph)`
    font-weight: 800;
`;

const SubtitleParagraph = styled(Paragraph)`
    color: #A5A5A5;
`;

const AmountPart = styled.div`
`;

interface Props {
    category: string,
    amount: string,
}

export const ProfabilityRow = ({ category, amount }: Props) => {
    return(
        <Wrapper>
            {
                category === "value" && (
                    <>  
                        <DivImg>
                            <img src={valueIcon} alt="symbol dolara onzaczający wartość projektu" />
                        </DivImg>
                    </>
                    )
            }
            {
                category === "cost" && (
                    <>  
                        <DivImg>
                            <img src={costIcon} alt="symbol kosztu" />
                        </DivImg>
                    </>
                    )
            }
            {
                category === "profit" && (
                    <>  
                        <DivImg>
                            <img src={profitIcon} alt="symbol zysku" />
                        </DivImg>
                    </>
                    )
            }
            <TitlePart>
                {
                    category ==="value" && ( 
                        <>
                            <TitleParagraph>Wartość projektu</TitleParagraph>
                            <SubtitleParagraph>W realizacji</SubtitleParagraph>
                        </>
                        )
                }
                  {
                    category ==="cost" && ( 
                        <>
                            <TitleParagraph>Koszt projektu</TitleParagraph>
                            <SubtitleParagraph>Oczekiwany</SubtitleParagraph>
                        </>
                        )
                }
                  {
                    category ==="profit" && ( 
                        <>
                            <TitleParagraph>Szacowany zysk</TitleParagraph>
                            <SubtitleParagraph>Zakładany</SubtitleParagraph>
                        </>
                        )
                }
            </TitlePart>
            <AmountPart>
                {amount}
            </AmountPart>
        </Wrapper>
        
    )
}