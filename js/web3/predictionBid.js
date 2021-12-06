const dummyTableData = [
    {
        date: '19-12-2021, 20:45',
        round: 1,
        myBid: '$58,900.34',
        firstWon: '$60,000.45',
        secondWon: '$59,000.45',
    },
    {
        date: '21-12-2021, 20:45',
        round: 2,
        myBid: '-',
        firstWon: '$160,000.45',
        secondWon: '$159,000.45',
    },
    {
        date: '21-12-2021, 20:45',
        round: 3,
        myBid: '$60,000.45',
        firstWon: '$260,000.45',
        secondWon: '$259,000.45',
    },
    {
        date: '21-12-2021, 20:45',
        round: 4,
        myBid: '$58,900.34',
        firstWon: '$60,000.45',
        secondWon: '$59,000.45',
    },
];

const bidHistoryTableBody = document.querySelector(
	'.bid__history__table .table__body'
);

/*
======= Utility Funcs
*/

const populateBidsHistoryTable = (bids) => {
    bidHistoryTableBody.innerHTML = '';
	bids.map((bid, idx) => {
        const bidRow = `
            <tr class="table__row">
                <td class="table__data">${bid.date}</td>
                <td class="table__data">${bid.round}</td>
                <td class="table__data">${bid.myBid}</td>
                <td class="table__data">${bid.firstWon}</td>
                <td class="table__data">${bid.secondWon}</td>
                ${idx === 0 ? (
                    `<td class="table__data buttons" rowspan="4">
                        <div>
                            <button>Reclaim $Bid</button>
                            <button>Go to stake</button>
                        </div>
                    </td>
                    `
                ) : ''}
            </tr>
        `;
        bidHistoryTableBody.innerHTML += bidRow;
    });
};

//filter rows based on showing bids
const filteredRowsShowBids = (rows, checked) => {
	return [...rows].filter((row) => {
		return checked
			? row.myBid !== '-'
			: row.myBid !== '';
	});
};

//filter rows based on dates
const filteredRowsDate = (rows, date) => {
	return [...rows].filter((row) =>
		row.date.includes(date)
	);
};

// filter rows based on rounds
const filteredRowsRounds = (rows, rounds) => {
	return [...rows].filter(
		(row) => row.round <= +rounds
	);
};

/*
======= Utility Funcs
*/

populateBidsHistoryTable(dummyTableData);

const calender = document.querySelector('#choose-date');
const calenderValue = document.querySelector('.search__date .calender__value');

calender.addEventListener('change', () => {
	let showBids = document.querySelector('#show-bid');
	let showRoundsOption = document.querySelector('#show-rounds');
	let filteredRows;
	if (calender.value === '') {
		calenderValue.innerText = 'Search by Date';
		filteredRows = filteredRowsShowBids(dummyTableData, showBids.checked);
	} else {
		let formattedDate = calender.value.split('-').reverse().join('-');
		calenderValue.innerText = formattedDate;
		filteredRows = filteredRowsDate(dummyTableData, formattedDate);
		filteredRows = filteredRowsShowBids(filteredRows, showBids.checked);
	}
	filteredRows = filteredRowsRounds(filteredRows, showRoundsOption.value);
	populateBidsHistoryTable(filteredRows);
});

const showBids = document.querySelector('#show-bid');

showBids.addEventListener('change', () => {
	let calenderValue = document.querySelector('.search__date .calender__value');
	let showRoundsOption = document.querySelector('#show-rounds');
	let filteredRows = filteredRowsShowBids(
		dummyTableData,
		showBids.checked
	);
	if (calenderValue.innerText !== 'Search by Date') {
		filteredRows = filteredRowsDate(filteredRows, calenderValue.innerText);
	}
	filteredRows = filteredRowsRounds(filteredRows, showRoundsOption.value);
	populateBidsHistoryTable(filteredRows);
});

const showRoundsOption = document.querySelector('#show-rounds');

showRoundsOption.addEventListener('change', () => {
	let showBids = document.querySelector('#show-bid');
	let calenderValue = document.querySelector('.search__date .calender__value');
	let filteredRows = filteredRowsShowBids(
		dummyTableData,
		showBids.checked
	);
	if (calenderValue.innerText !== 'Search by Date') {
		filteredRows = filteredRowsDate(filteredRows, calenderValue.innerText);
	}
	filteredRows = filteredRowsRounds(filteredRows, showRoundsOption.value);
	populateBidsHistoryTable(filteredRows);
});
