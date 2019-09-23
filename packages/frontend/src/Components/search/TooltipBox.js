import React, { Fragment } from "react";
import CookieConsent from "react-cookie-consent";
import { MdPets, MdClose } from "react-icons/md";
import styled from "styled-components";
import { fadeOutDown } from "../Animations";

// 툴팁

const TooltipBoxWrapper = styled.div`
	position: relative;
	top: 42px;
	margin-left: auto;
	// min-width: 180px;
	height: 100px;

	@media screen and (max-width: 1024px) {
		top: unset;
		height: auto;
	}
	
	@media screen and (max-width: 700px) {
		margin:24px 0 0;
		height: 0;
	}

`;

const IconButton = styled.button`
	width: 3.2rem;
	height: 3rem;
	border: none;
	background: none;
	font-size: 2.3rem;
	color: #ccc;
	transition: all 2s ease;
	outline: none;

		&.active {
			color: #45B3E0;


			& + div {
				opacity: 0;
				// animation: ${fadeOutDown} 0.5s both;

			}
		}

		& + div {

			position: absolute;
			width: 166px;
			height: 50px;
			// bottom: 18%;
			right: -98%;	
			z-index: 99;
			opacity: 1;
			padding: 10px 24px 5px 13px;
			background-color: #808080;
			border: 1px solid rgba(115, 115, 115, 0.8);
			border-radius: 5px;
			font-size: 14px;
			text-align: center;
			-webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
			box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
			
			& > button {
				position: absolute;
				top: 0;
				right: 0;
				padding: 0;
				font-size: 1.2rem;
				color: #fff;
				background: transparent;
				border: 0;

				& svg {
					vertical-align: top;
				}

				 &:hover {
				 	top: -0.8rem;
				 	left: 1rem;
				 	// right: 0;
				 	// text-align: center; 

				 	 &:before {
				 	 	position: relative;
						padding: 5px 2px;
				 	 	font-size: 0.8rem;
				 	 	font-weight: 600;
				 	 	content:"오늘 하루 보이지 않기 X";
				 	 	color: #333;
						background: #fff;
						border: 1px solid #000;
						border-radius: 3px;
						 
				 	}
				 }
			}

			&  p {color: #fff;line-height: 1.5rem;}

		}

		& + div:before {

			position: absolute;
			left: 84px;
			top: -6px;
			width: 9px;
			height: 9px;
			border: solid rgba(115, 115, 115, 0.8);
			border-width: 0 1px 1px 0;
			border-radius: 0 0 2px 0;
			background-color: #808080;
			-webkit-transform: rotate(45deg);
			-ms-transform: rotate(45deg);
			transform: rotate(45deg);
			content: '';
		}

		&:hover + div {
			// display: block;
		}
`;


const TooltipBox = (props) => {
	return (
		<Fragment>
			<TooltipBoxWrapper className="btn-wrap">
				<IconButton className={props.active ? 'active' : ''} onClick={props.onClick} ><MdPets /></IconButton>
				<CookieConsent disableStyles cookieName="TooltipBox" location="none" onAccept={() => { alert("오늘 하루 툴팁박스가 보이지 않게 되었습니다! ") }} buttonText={<MdClose />} expires={1}>
					<p>날짜/종류/상태 필터</p>
				</CookieConsent>
			</TooltipBoxWrapper>
		</Fragment>
	);
};

export default TooltipBox;