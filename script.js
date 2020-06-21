var index = 0;
var amount = 0;

document.getElementById('left').onclick = function () {
    if (index > 0) {
        index--;
        updateClasses();
    }
};

document.getElementById('right').onclick = function () {
    if (index + 3 <= amount) {
        index++;
        updateClasses();
    }
};

function updateClasses() {
    const Http = new XMLHttpRequest();
    const url = '/boxes?index=' + index;
    Http.open('GET', url, true);
    Http.send();

    Http.onloadend = (e) => {
        document.getElementById('boxes').innerHTML = Http.responseText;
    };
}

function getAmount() {
    const Http = new XMLHttpRequest();
    const url = '/amount';
    Http.open('GET', url, true);
    Http.send();

    Http.onloadend = (e) => {
        amount = Http.responseText;
        amount--;
    };
}

getAmount();
updateClasses();
