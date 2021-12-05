const showBids = document.querySelector('#show-bid');
const calender = document.querySelector('#choose-date');
const calenderValue = document.querySelector('.search__date .calender__value');

calender.addEventListener('change', () => {
    if(calender.value === ''){
        calenderValue.innerText = 'Search by Date';
    } else {
        calenderValue.innerText = calender.value;
    }
});

showBids.addEventListener('change', () => {
    console.log(showBids.checked)
});