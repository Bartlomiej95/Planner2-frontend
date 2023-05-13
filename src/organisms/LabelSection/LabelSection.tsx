import { useState } from "react";
import styled from "styled-components";
import { SubHeading } from "../../components/Heading/Heading";
import { Label } from "../../molecules/Label/Label";

const Wrapper = styled.section`
     max-width: 300px;
     margin: 0 auto 45px auto;
     padding-top: 75px;
`;

const LabelWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: 40px auto;
`;

interface Props {
    title: string, 
    category: string,
    changeStatus: (isActive: boolean) => void,
}

export const LabelSection = ({ title, category, changeStatus } :Props) => {

    const [isActive, setIsActive] = useState(false);

    const handleChangeStatus = () => {
        setIsActive(!isActive);
        changeStatus(isActive);
    }

    return(
        <Wrapper>
                <SubHeading>{title}</SubHeading>
                <LabelWrapper>

                    { category === "tasks" && (
                        <>
                         <Label division="UX/UI" type="task" getStatus={() => handleChangeStatus()}/>
                         <Label division="Copywriting" type="task" getStatus={() => handleChangeStatus()} />
                         <Label division="Branding"  type="task" getStatus={() => handleChangeStatus()}/>
                         <Label division="Development"  type="task"  getStatus={() => handleChangeStatus()}/>
                         <Label division="Spotkanie organizacyjne" type="task" getStatus={() => handleChangeStatus()}/>
                         <Label division="Testy" type="task" getStatus={() => handleChangeStatus()}/>
                         <Label division="Marketing"  type="task" getStatus={() => handleChangeStatus()}/>
                         <Label division="Konsultacje" type="task" getStatus={() => handleChangeStatus()}/>
                        </>
                    )}
                     { category === "department" && (
                        <>
                         <Label division="Dział graficzny" name="graphic" status={isActive} getStatus={() => handleChangeStatus()} />
                         <Label division="Dział marketingu" name="marketing" status={isActive} getStatus={() => handleChangeStatus()} />
                         <Label division="Dział programistyczny" name="programming" status={isActive} getStatus={() => handleChangeStatus()} />
                         <Label division="Administracja" name="administration" status={isActive} getStatus={() => handleChangeStatus()} />
                         <Label division="Testerzy" name="tester" status={isActive} getStatus={() => handleChangeStatus()} />
                         <Label division="Dział handlowy" name="sales" status={isActive} getStatus={() => handleChangeStatus()} />
                        </>
                    )
                    }
                </LabelWrapper>
        </Wrapper>
    )
}
