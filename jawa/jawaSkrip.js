function bin_to_dec() {
    var bstr = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        bstr[_i] = arguments[_i];
    }
    bstr.forEach(function (element) {
        console.log(parseInt((element + '').replace(/[^01]/gi, ''), 2));
    });
}
function bin_to_dec2(bstr) {
    for (var i = 0; i < bstr.length; i++) {
        var element = bstr[i];
        console.log("".concat(parseInt((element + '').replace(/[^01]/gi, ''), 2), " ").concat('[' + (i + 1) + ']'));
    }
}

let submit = document.querySelector('#submit')

submit.addEventListener('click', ev => {
    let xmlHTTP = new XMLHttpRequest()

    xmlHTTP.open('GET', '?name=test')
    xmlHTTP.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHTTP.send('name=test')
});

const now = Date.now();



(async () => {
    while (Date.now() - now <= 3000) {
        await null
    }
    console.log('test')
})()
console.log('first')