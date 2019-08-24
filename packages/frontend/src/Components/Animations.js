import { keyframes } from "styled-components";

export const fadeInUp = keyframes`
		from {  transform: translate3d(0,40px,0); opacity: 0; }
		to   { transform: translate3d(0,0,0);opacity: 1; }
`;

export const fadeInDown = keyframes`
		from {  transform: translate3d(0,0,0); opacity: 0; }
		to   { transform: translate3d(0,40,0);opacity: 1; }
`;

export const fadeOutUp = keyframes`
		from {  transform: translate3d(0,40,0); opacity: 1; }
		to   { transform: translate3d(0,0,0);opacity: 0; }
`;

export const fadeOutDown = keyframes`
		from {  transform: translate3d(0,0,0); opacity: 1; }
		to   { transform: translate3d(0,40,0); opacity: 0; }
`;




