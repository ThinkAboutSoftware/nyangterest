import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
	position: relative;
	max-height:100%;
	min-height: 100%;
	background: #eee;
	background-size: cover;
	border: 1px solid #cac7c0;
	box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.08);
	display: flex;
	flex-direction: column;
	background-position: center center;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
`;

const Content = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	color: white;
`;

const Info = styled.div`
	width: 100%;
	padding-top: 20px;

	& > h2 {
		padding-bottom: 0.5rem;
		font-size: 2rem;
		color: #303f9f;
		font-weight: 600;
		text-align: center;
	}

	& > p {
		padding: 0.5rem;
		font-size: 0.8rem;
		color: #333;
		text-align: center;
	}
	

	& > figure {
		position: relative;
		display: flex;
		height: 350px;
		max-height: 100%;
		justify-content: center;
		align-items: center;
		
		& > img {
			position: absolute;
			max-width: 100%;
			max-height: 100%;
			justify-content: center;
			align-items: center;
		}
	}
`;

const ListWrapper = styled.ul`
	padding: 2rem 1rem;

	& > li {
		color: #3f51b5;
		padding-bottom: 1rem;
		font-weight: 600;
		text-indent: -14px;
    	padding-left: 14px;
    	line-height: 1.3rem;

		&::before {
			display: inline-block;
			width: 5px;
			height: 5px;
			margin-right: 10px;
			background: #333;
			border-radius: 50%;
			vertical-align: middle;
			content: '';
		}

		&:last-child {
			padding-bottom: 0;
		}

		&>span {
			color: #333;
		}
	} 

`
const StatusDiv = styled.div`
	position: absolute;
	z-index:99;
	top:0;
	left: 0;
	min-width: 100px;
	width: auto;
	padding:1rem;
	background: ${props => props.backgroundColor}

	&.end {
		background: #E74C3C; 
	}
	
	text-align: center;

`
const Item = ({ neuterYn, age, backgroundColor = "#87CEEB", sexCd, weight, colorCd, processState, kindCd, noticeNo, happenDt, noticeEdt, happenPlace, specialMark, popfile, desertionNo, careNm, careTel, orgNm, officetel }) => {

	// 성별여부 알파벳을 한글로 변경
	const female = sexCd.replace("F", "암컷");
	const man = sexCd.replace("M", "수컷");
	const question = sexCd.replace("Q", "성별 미상");
	const gender = (sexCd === "F" && female) || (sexCd === "M" && man) || (sexCd === "Q" && question)

	// 중성화여부 알파벳을 한글로 변경
	const yes = neuterYn.replace("Y", "중성화O");
	const no = neuterYn.replace("N", "중성화X");
	const unknown = neuterYn.replace("U", "중성화 미상");
	const tnr = (neuterYn === "Y" && yes) || (neuterYn === "N" && no) || (neuterYn === "U" && unknown)

	// 보호여부에 종료텍스트가 포함되어 있으면 
	const end = processState.includes("종료")

	// 나이에 괄호제거
	const old = age.replace(/[()]/g, "");

	// 몸무게에 괄호제거
	const bodyWeight = weight.replace(/[()]/g, "");

	return (
		<Container>
			<Content id={desertionNo}>
				<Info>
					<StatusDiv className={end ? "end" : null} backgroundColor={backgroundColor}><span>{processState}</span></StatusDiv>
					<CatImage popfile={popfile} alt={kindCd} processState={processState} />
					<p>{colorCd}/{tnr}/{old}/{gender}/{bodyWeight}</p>
					<ListWrapper>
						<li><span>공고번호:</span> {noticeNo}</li>
						<li><span>공고기간:</span> {happenDt} ~ {noticeEdt}</li>
						<li><span>발견장소:</span> {happenPlace}</li>
						<li><span>특이사항:</span> {specialMark}</li>
						<li><span>보호센터:</span> {careNm} {careTel}</li>
						<li><span>담당기관:</span> {orgNm} {officetel}</li>
					</ListWrapper>
				</Info>
			</Content>
		</Container>
	)
}

const CatImage = props => {
	return (
		<figure>
			<img src={props.popfile} alt={props.alt} className="CatImage" />
		</figure>
	);
};

Item.propTypes = {
	kindCd: PropTypes.string,
	popfile: PropTypes.string,
	neuterYn: PropTypes.string,
	age: PropTypes.string,
	sexCd: PropTypes.string,
	weight: PropTypes.string,
	colorCd: PropTypes.string,
	processState: PropTypes.string,
	happenPlace: PropTypes.string,
	specialMark: PropTypes.string,
	careNm: PropTypes.string,
	orgNm: PropTypes.string,
	noticeNo: PropTypes.string,
	careTel: PropTypes.string,
	officetel: PropTypes.string,
	desertionNo: PropTypes.number,
	noticeEdt: PropTypes.number,
	happenDt: PropTypes.number,

};

CatImage.propTypes = {
	popfile: PropTypes.string,
	alt: PropTypes.string
};

export default Item;
