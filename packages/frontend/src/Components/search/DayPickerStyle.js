import { createGlobalStyle } from "styled-components";

const DayPickerStyle = createGlobalStyle`

/* DayPicker styles */

.DayPicker {
	display: inline-block;
	font-size: 1rem;

	&-wrapper {
		position: relative;
		z-index: 100;
		flex-direction: row;
		padding-bottom: 1em;
		-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
				user-select: none;
	}

	
	&-Months {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	&-Month {
		display: table;
		margin: 0 1em;
		margin-top: 1em;
		border-spacing: 0;
		border-collapse: collapse;

		-webkit-user-select: none;

			-moz-user-select: none;

			-ms-user-select: none;

				user-select: none;
	}

	&-NavBar {
	}

	&-NavButton {
		position: absolute;
		top: 1em;
		right: 1.5em;
		left: auto;

		display: inline-block;
		margin-top: 2px;
		width: 1.25em;
		height: 1.25em;
		background-position: center;
		background-size: 50%;
		background-repeat: no-repeat;
		color: #8B9898;
		cursor: pointer;
	}

	&-NavButton:hover {
		opacity: 0.8;
	}

	&-NavButton--prev {
		margin-right: 1.5em;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAVVJREFUWAnN2G0KgjAYwPHpGfRkaZeqvgQaK+hY3SUHrk1YzNLay/OiEFp92I+/Mp2F2Mh2lLISWnflFjzH263RQjzMZ19wgs73ez0o1WmtW+dgA01VxrE3p6l2GLsnBy1VYQOtVSEH/atCCgqpQgKKqYIOiq2CBkqtggLKqQIKgqgCBjpJ2Y5CdJ+zrT9A7HHSTA1dxUdHgzCqJIEwq0SDsKsEg6iqBIEoq/wEcVRZBXFV+QJxV5mBtlDFB5VjYTaGZ2sf4R9PM7U9ZU+lLuaetPP/5Die3ToO1+u+MKtHs06qODB2zBnI/jBd4MPQm1VkY79Tb18gB+C62FdBFsZR6yeIo1YQiLJWMIiqVjQIu1YSCLNWFgijVjYIuhYYCKoWKAiiFgoopxYaKLUWOii2FgkophYp6F3r42W5A9s9OcgNvva8xQaysKXlFytoqdYmQH6tF3toSUo0INq9AAAAAElFTkSuQmCC');
	}

	&-NavButton--next {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAXRJREFUWAnN119ugjAcwPHWzJ1gnmxzB/BBE0n24m4xfNkTaOL7wOtsl3AXMMb+Vjaa1BG00N8fSEibPpAP3xAKKs2yjzTPH9RAjhEo9WzPr/Vm8zgE0+gXATAxxuxtqeJ9t5tIwv5AtQAApsfT6TPdbp+kUBcgVwvO51KqVhMkXKsVJFXrOkigVhCIs1Y4iKlWZxB1rX4gwlpRIIpa8SDkWmggrFq4IIRaJKCYWnSgnrXIQV1r8YD+1Vrn+bReagysIFfLABRt31v8oBu1xEBttfRbltmfjgEcWh9snUS2kNdBK6WN1vrOWxObWsz+fjxevsxmB1GQDfINWiev83nhaoiB/CoOU438oPrhXS0WpQ9xc1ZQWxWHqUYe0I0qrKCQKjygDlXIQV2r0IF6ViEBxVTBBSFUQQNhVYkHIVeJAtkNsbQ7c1LtzP6FsObhb2rCKv7NBIGoq4SDmKoEgTirXAcJVGkFSVVpgoSrXICGUMUH/QBZNSUy5XWUhwAAAABJRU5ErkJggg==');
	}

	&-NavButton--interactionDisabled {
		display: none;
	}

	&-Caption {
		display: table-caption;
		margin-bottom: 0.5em;
		padding: 0 0.5em;
		text-align: left;
	}

	&-Caption > div {
		font-weight: 500;
		font-size: 1.15em;
	}

	&-Weekdays {
		display: table-header-group;
		margin-top: 1em;
	}

	&-WeekdaysRow {
		display: table-row;
	}

	&-Weekday {
		display: table-cell;
		padding: 0.5em;
		color: #8B9898;
		text-align: center;
		font-size: 0.875em;
	}

	&-Weekday abbr[title] {
		border-bottom: none;
		text-decoration: none;
	}

	&-Body {
		display: table-row-group;
	}

	&-Week {
		display: table-row;
	}

	&-Day {
		display: table-cell;
		padding: 0.5em;
		border-radius: 50%;
		vertical-align: middle;
		text-align: center;
		cursor: pointer;
	}

	&-WeekNumber {
		display: table-cell;
		padding: 0.5em;
		min-width: 1em;
		border-right: 1px solid #EAECEC;
		color: #8B9898;
		vertical-align: middle;
		text-align: right;
		font-size: 0.75em;
		cursor: pointer;
	}

	&--interactionDisabled &-Day {
		cursor: default;
	}

	&-Footer {
		padding-top: 0.5em;
	}

	&-TodayButton {
		border: none;
		background-color: transparent;
		background-image: none;
		box-shadow: none;
		color: #4A90E2;
		font-size: 0.875em;
		cursor: pointer;
	}

	/* Default modifiers */

	&-Day--today {
		color: #D0021B;
		font-weight: 700;
	}

	&-Day--outside {
		color: #8B9898;
		cursor: default;
	}

	&-Day--disabled {
		color: #DCE0E0;
		cursor: default;
		/* background-color: #eff1f1; */
	}


	/* Example modifiers */

	&-Day--sunday {
		background-color: #F7F8F8;
	}

	&-Day--sunday:not(&-Day--today) {
		color: #DCE0E0;
	}

	&-Day--selected:not(&-Day--disabled):not(&-Day--outside) {
		position: relative;

		background-color: #3f51b5;
		color: #F0F8FF;
	}

	&-Day--selected:not(&-Day--disabled):not(&-Day--outside):hover {
		background-color: #51A0FA;
	}

	&:not(&--interactionDisabled)
		&-Day:not(&-Day--disabled):not(&-Day--selected):not(&-Day--outside):hover {
		background-color: #F0F8FF;
	}

}



/* DayPickerInput */

.DayPickerInput {
  display: inline-block;

	&-OverlayWrapper {
		position: relative;
	}

	&-Overlay {
		position: absolute;
		// left: 0;
		z-index: 1;

		background: white;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
	}

}





`;

export default DayPickerStyle;