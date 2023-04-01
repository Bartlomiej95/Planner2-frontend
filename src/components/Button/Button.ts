import styled from 'styled-components';


export const PrimaryBtn = styled.button`
    display: block;
    width: ${({ theme }) => theme.PrimaryBtn.mobileWidth};
    height: ${({ theme }) => theme.PrimaryBtn.mobileHeight};
    background-color: ${({ theme }) => theme.PrimaryBtn.buttonsPrimaryBcgColor};
    border-radius: ${({ theme }) => theme.buttonsBorderRadius};
    color: ${({ theme }) => theme.PrimaryBtn.buttonsPrimaryColor};
    margin: 0 auto;
    cursor: pointer;
    outline: none;
    :hover {
        background-color: ${({ theme }) => theme.buttonsPrimaryHoverBcgColor}
    }
`;

export const SecondaryBtn = styled.button`
    display: block;
    width: ${({ theme }) => theme.SecondaryBtn.mobileWidth};
    height: ${({ theme }) => theme.SecondaryBtn.mobileHeight};
    background-color: ${({ theme }) => theme.SecondaryBtn.buttonsSecondaryBcgColor};
    border-radius: ${({ theme }) => theme.buttonsBorderRadius};
    color: ${({ theme }) => theme.SecondaryBtn.buttonsSecondaryColor};
    margin: 0 auto;
    cursor: pointer;
    outline: none;
    :hover {
        background-color: ${({ theme }) => theme.SecondaryBtn.buttonsSecondaryHoverBcgColor};
        color: ${({ theme }) => theme.SecondaryBtn.buttonsSecondaryHoverColor};
    }
`;