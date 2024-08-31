const n1 = {
    name: 'n1',
    binary: [0,0,0,0,0,0,0,0],
    boxBinary: undefined,
    boxDecimal: undefined,
    num: function() {
        return this.binary.toString().replaceAll(',', '');
    }
};

const n2 = {
    name: 'n2',
    binary: [0,0,0,0,0,0,0,0],
    boxBinary: undefined,
    boxDecimal: undefined,
    num: function() {
        return this.binary.toString().replaceAll(',', '');
    }
};

const op = {
    name: 'op',
    op: '&',
    box: undefined
};

let resultBox = undefined;

function printArray(obj) {
    let str = "";
    for (const b in obj.binary) {
        str += `<div class="bitBox" onclick="swapBit(${obj.name}, ${b})">${obj.binary[b]}</div>`;
    }
    obj.boxBinary.innerHTML = str;
}

function swapBit(obj, b) {
    obj.binary[b] = +!obj.binary[b];
    obj.boxDecimal.innerText = parseInt(fullLengthBinary(obj.num()), 2);
    printArray(obj);
    updateResult();
}

function setOp(newOp, i) {
    op.op = newOp;
    const children = document.getElementById("op").children;
    for (const box of children) {
        box.style.backgroundColor = "#333";
        box.style.color = "#DDD";
    }
    children[i].style.backgroundColor = "#DDD";
    children[i].style.color = "#333";

    updateResult();
}

function fullLengthBinary(n) {
    while (n.length < 8) {
        n = '0'+n;
    }
    return n;
}

function updateResult() {
    const n = eval(parseInt(n1.num(), 2) + op.op + parseInt(n2.num(), 2));
    resultBox.children[0].innerText = n;
    resultBox.children[1].innerText = fullLengthBinary(n.toString(2));
}

function startup() {
    n1.boxBinary = document.getElementById("n1");
    n1.boxDecimal = document.getElementById("n1Base10");
    n2.boxBinary = document.getElementById("n2");
    n2.boxDecimal = document.getElementById("n2Base10");
    op.box = document.getElementById("op");
    resultBox = document.getElementById("result");
    updateResult();

    printArray(n1);
    printArray(n2);

    setOp('&', 0);

    document.getElementsByTagName("body")[0].addEventListener("mousedown", updateResult);
}