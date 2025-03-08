const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
const msg = document.querySelector('.msg');


for (let select of dropdowns) {
    for (currcode in countryList) {
        // console.log(code, countryList[code]);

        let newOption = document.createElement('option');
        newOption.value = currcode;
        newOption.innerText = currcode;
        if (select.name === "from" && currcode === "USD") {
            newOption.selected = "selected";
        }

        else if (select.name === "to" && currcode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener('change', (evt) => {
        updateflag(evt.target);
    });
}

const updateflag = (element) => {
    // console.log(element);

    let currcode = element.value;
    let contrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${contrycode}/flat/64.png`;
    let flag = element.parentElement.querySelector('img');
    flag.src = newsrc;

}

btn.addEventListener('click', async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector('.amount input');
    let amtval = amount.value;
    if (amtval === "" || amtval < 1) {
        alert("Please enter the correct amount");
        return;
    }

    const URL = `https://api.exchangerate-api.com/v4/latest/${document.querySelector('select[name="from"]').value}`;
    let respons = await fetch(URL);
    let data = await respons.json();
    let rate = data.rates[document.querySelector('select[name="to"]').value];
    let result = rate * amtval;

    console.log(rate);

    msg.innerText = `Converted Amount is ${result} ${document.querySelector('select[name="to"]').value}`;

});

const swapIcon = document.querySelector('.fa-arrow-right-arrow-left');

swapIcon.addEventListener('click', () => {
    let fromSelect = document.querySelector('select[name="from"]');
    let toSelect = document.querySelector('select[name="to"]');
    
    // Swap selected values
    let tempValue = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = tempValue;

    // Update flags after swapping
    updateflag(fromSelect);
    updateflag(toSelect);
});


