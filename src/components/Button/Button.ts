import styled from 'styled-components';


export const PrimaryBtn = styled.button`
    width: ${({ theme }) => theme.PrimaryBtn.mobileWidth};
    height: ${({ theme }) => theme.PrimaryBtn.mobileHeight};
    background-color: ${({ theme }) => theme.PrimaryBtn.buttonsPrimaryBcgColor};
    border-radius: ${({ theme }) => theme.PrimaryBtn.buttonsBorderRadius};
    color: ${({ theme }) => theme.PrimaryBtn.buttonsPrimaryColor};
    cursor: pointer;
    outline: none;
    :hover {
        background-color: ${({ theme }) => theme.buttonsPrimaryHoverBcgColor}
    }
`;

export const SecondaryBtn = styled.button`
    width: ${({ theme }) => theme.SecondaryBtn.mobileWidth};
    height: ${({ theme }) => theme.SecondaryBtn.mobileHeight};
    background-color: ${({ theme }) => theme.SecondaryBtn.buttonsSecondaryBcgColor};
    border-radius: ${({ theme }) => theme.SecondaryBtn.buttonsBorderRadius};
    color: ${({ theme }) => theme.SecondaryBtn.buttonsSecondaryColor};
    cursor: pointer;
    outline: none;
    :hover {
        background-color: ${({ theme }) => theme.SecondaryBtn.buttonsSecondaryHoverBcgColor};
        color: ${({ theme }) => theme.SecondaryBtn.buttonsSecondaryHoverColor};
    }
`;