import styled from 'styled-components';

export const Heading = styled.h1`
    font-size: ${({ theme }) => theme.Heading.mobileFontSize};
    text-align: center;
`;

export const SubHeading = styled.h2`
    font-size: ${({ theme }) => theme.SubHeading.mobileFontSize};
    text-align: center;
    font-weight: 500;
`;

export const SubSubHeading = styled.h3`
    font-size: ${({ theme }) => theme.SubSubHeading.mobileFontSize};
`;

export const Logo = styled.h2`
    font-size: ${({ theme }) => theme.SubSubHeading.mobileFontSize};
    font-weight: bold;
    display: block;
    :hover{
        cursor: pointer;
    }
`;