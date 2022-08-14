import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
	navBG: '#f1f2f3',
	primaryBG: '#ededed',
	secondaryBG: '#ffffff',
	font: '#303841',
	boxShadow: 'lightgray 0px 1px 1px 0px',
	border: '1px solid lightgray',
};

export const darkTheme = {
	navBG: '#121216',
	primaryBG: '#1D2021',
	secondaryBG: '#181A1B',
	font: '#eaeaea',
	boxShadow: 'rgb(19, 19, 19) 0px 1px 1px 0px',
	border: '1px solid #717F90',
};

export const GlobalStyles = createGlobalStyle`
.primary
{
	background-color: ${(props) => props.theme.primaryBG};
	color: ${(props) => props.theme.font};
}
.game-box {
 // border-right: ${(props) => props.theme.border};
}
.secondary,
.links li a
{
  background-color: ${(props) => props.theme.navBG};
  color: ${(props) => props.theme.font};
		box-shadow: ${(props) => props.theme.boxShadow};
}
.links li a.active {
		background-color: ${(props) => props.theme.secondaryBG};
}
.third {
	 background-color: ${(props) => props.theme.secondaryBG};
  color: ${(props) => props.theme.font};
}
.dropdown-links li a,
.dropdown-links button {
		color: ${(props) => props.theme.font};
}`;
