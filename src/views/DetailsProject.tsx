import styled from "styled-components";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { Heading, SubHeading } from "../components/Heading/Heading";
import Header from "../organisms/Header/Header";
import Footer from "../organisms/Footer/Footer";
import timeIcon from "../assets/timeIcon.svg";
import { IProject } from "../types/Projects";
import { getProject } from "../store/Projects/projectsSlice";
import { Paragraph } from "../components/Paragraph/Paragraph";
import { ProfabilityProjectSection } from "../organisms/ProfitabilityProjectSection/ProfitabilityProjectSection";

const Wrapper = styled.div`
    margin: 100px 36px 0 36px;
`;

const DetailsSubHeading = styled(SubHeading)`
    margin: 50px 0;
`;

const DetailsParagraph = styled(Paragraph)`
    margin: 30px auto;
`;

const TimeProjectHeading = styled(SubHeading)`
    margin-bottom: 67px;
    margin-top: 50px;
`;

const TimeProjectWrapper = styled.div`
    margin: 0 auto 80px auto;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
`;

const LeftSide = styled.div`
    width: 35px;
    height: 35px;
    box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.16);
    border-radius: 5px;
    background-image: url(${timeIcon});
    background-repeat: no-repeat;
    background-position: center;
`;

const MiddleSide = styled.div`
    flex-grow: 3;
    margin-left: 30px;
`;

const TitleParagraph = styled(Paragraph)`
    font-weight: 800;
`;

const SubtitleParagraph = styled(Paragraph)`
    color: #A5A5A5;
`;


type editedLocState = {
    id: string,
}

export const DetailsProject = () => {

    const location = useLocation();
    const dispatch = useAppDispatch();
    const project = useAppSelector(reducer => reducer.projectsReducer.project) as IProject;

    const { id }: editedLocState = location.state;

    useEffect(() => {
       (async () => {
           await dispatch(getProject(id)).then(res => res.payload).catch(err => console.error(err)); 
       })();
    }, [])


    if(project === null){
        return(
            <h1>Loading ...</h1>
        )
    } else {
        return(
        <>
            <Header/>
                <Wrapper>
                    <Heading>{project.title}</Heading>
                    <DetailsSubHeading>Specyfikacja projektowa</DetailsSubHeading>
                    <DetailsParagraph>
                        {project.assumptions} <br/>
                        {project.content}
                    </DetailsParagraph>
                    <DetailsSubHeading>{project.customer}</DetailsSubHeading>
                    <TimeProjectHeading>Czas pracy nad projektem</TimeProjectHeading>
                    <TimeProjectWrapper>
                        <LeftSide/>
                        <MiddleSide>
                            <TitleParagraph>Realizacja</TitleParagraph>
                            <SubtitleParagraph>W realizacji</SubtitleParagraph>
                        </MiddleSide>
                        <div>
                            {project.hours}H
                        </div>
                    </TimeProjectWrapper>
                    <DetailsSubHeading>Zakres pracy <br/> w ramach projektu</DetailsSubHeading>
                    <DetailsSubHeading>Rentowność projektu</DetailsSubHeading>
                    <ProfabilityProjectSection projectValue={Number(project.value)} hours={Number(project.hours)} />
                </Wrapper>
            <Footer/>
        </>
        )
    }

    
}