/*
======= Utility Funcs
*/

//filter rows based on showing bids
const filteredRowsShowBids = (rows, checked) => {
	return [...rows].filter((row) => {
		return checked
			? row.querySelectorAll('td')[2].innerText !== '-'
			: row.querySelectorAll('td')[2].innerText !== '';
	});
};

//filter rows based on dates
const filteredRowsDate = (rows, date) => {
	return [...rows].filter((row) =>
		row.querySelector('td').innerText.includes(date)
	);
};

// filter rows based on rounds
const filteredRowsRounds = (rows, rounds) => {
	return [...rows].filter(
		(row) => row.querySelectorAll('td')[1].innerText <= +rounds
	);
};

/*
======= Utility Funcs
*/

const bidHistoryTableBody = document.querySelector(
	'.bid__history__table .table__body'
);
const bidHistoryTableRows = bidHistoryTableBody.querySelectorAll('.table__row');

const calender = document.querySelector('#choose-date');
const calenderValue = document.querySelector('.search__date .calender__value');

calender.addEventListener('change', () => {
	let showBids = document.querySelector('#show-bid');
	let showRoundsOption = document.querySelector('#show-rounds');
	bidHistoryTableBody.innerHTML = '';
	let filteredRows;
	if (calender.value === '') {
		calenderValue.innerText = 'Search by Date';
		filteredRows = filteredRowsShowBids(bidHistoryTableRows, showBids.checked);
	} else {
		let formattedDate = calender.value.split('-').reverse().join('-');
		calenderValue.innerText = formattedDate;
		filteredRows = filteredRowsDate(bidHistoryTableRows, formattedDate);
		filteredRows = filteredRowsShowBids(filteredRows, showBids.checked);
	}
	filteredRows = filteredRowsRounds(filteredRows, showRoundsOption.value);
	filteredRows.map((row) => bidHistoryTableBody.appendChild(row));
});

const showBids = document.querySelector('#show-bid');

showBids.addEventListener('change', () => {
	let calenderValue = document.querySelector('.search__date .calender__value');
	let showRoundsOption = document.querySelector('#show-rounds');
	bidHistoryTableBody.innerHTML = '';
	let filteredRows = filteredRowsShowBids(bidHistoryTableRows, showBids.checked);
	if (calenderValue.innerText !== 'Search by Date') {
		filteredRows = filteredRowsDate(
			filteredRows,
			calenderValue.innerText
		);
	}
	filteredRows = filteredRowsRounds(filteredRows, showRoundsOption.value);
	filteredRows.map((row) => bidHistoryTableBody.appendChild(row));
});

const showRoundsOption = document.querySelector('#show-rounds');

showRoundsOption.addEventListener('change', () => {
	let showBids = document.querySelector('#show-bid');
	let calenderValue = document.querySelector('.search__date .calender__value');
	bidHistoryTableBody.innerHTML = '';
	let filteredRows = filteredRowsShowBids(bidHistoryTableRows, showBids.checked);
	if (calenderValue.innerText !== 'Search by Date') {
		filteredRows = filteredRowsDate(
			filteredRows,
			calenderValue.innerText
		);
	}
	filteredRows = filteredRowsRounds(filteredRows, showRoundsOption.value);
	filteredRows.map((row) => bidHistoryTableBody.appendChild(row));
});
