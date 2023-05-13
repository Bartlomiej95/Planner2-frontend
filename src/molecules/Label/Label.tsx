import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import companiesSlice, { switchActiveDepartment } from '../../store/Companies/companiesSlice';

const Wrapper = styled.div<{ readonly isClick: any}>`
    height: 24px;
    background-color: #D1D1D1;
    padding: 7px 14px;
    border-radius: 15px;
    margin-bottom: 10px;
    margin-right: 10px;
    cursor: pointer;

    ${({ isClick }) => isClick && 
    css`
        background-color: #F37B01;
    `}
`;

const LabelName = styled.p`
    font-size: 10px;
    line-height: 10px;
    color: white;
    font-weight: 600;
`;

interface Props {
    division: string;
    name?: string;
    getStatus: () => void,
    type?: string,
    status?: boolean,
}

export const Label = ({ division, name, getStatus, type } : Props) => {

    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();

    const getActiveStatus = () => {
        if(type === "card"){
            return null
        } 
        setIsActive(isActive => !isActive);
        getStatus();
        dispatch(switchActiveDepartment({ name, isActive: !isActive}))
        return isActive;  
    }

    const handleColor = () => {
        if(type === "card"){
            return true;   
        }
        if(type === "task"){
            return isActive;
        }
        
        return isActive;
    }
    

    return(
        <Wrapper isClick={handleColor()} onClick={() => getActiveStatus()}>
            <LabelName>{division}</LabelName>
        </Wrapper>
    )
}