import { css } from 'styled-components';

export const mobile = (props) => css`
@media only screen and (max-width: 540px){
    ${props}
}
`;

export const mobilesm = (props) => css`
@media only screen and (max-width: 380px){
    ${props}
}
`;

export const tablet = (props) => css`
@media only screen and (max-width: 768px){
    ${props}
}
`;

export const laptop = (props) => css`
@media only screen and (max-width: 1024px){
    ${props}
}
`;

export const desktop = (props) => css`
@media only screen and (max-width: 1200px){
    ${props}
}
`;

export const desktopLg = (props) => css`
@media only screen and (max-width: 1400px){
    ${props}
}
`;

export const desktopXlg = (props) => css`
@media only screen and (max-width: 1550px){
    ${props}
}
`;
