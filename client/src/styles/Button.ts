import styled from 'styled-components';
import { theme } from './theme';

export const Button = styled.button`
    border-radius: ${theme.radius.md};
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    padding: 15px 60px;
    background-color: ${theme.colors.background};
    color: ${theme.colors.primary};

    &:hover {
        opacity: 0.9;
        transform: scale(0.98);
    }
`