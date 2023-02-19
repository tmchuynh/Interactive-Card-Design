VanillaTilt.init(document.querySelector(".card"), {
    max: 15,
    speed: 200,
    glare: true,
    "max-glare": 1,
});

window.addEventListener("load", () => {
    // forms
    let inputs = document.querySelectorAll("input");
    let ccList = document.querySelectorAll(".ccList li");
    let name = document.querySelector(".name");
    let year = document.querySelector(".year");
    let inputCon = document.querySelectorAll(".inputCon");
    let btn = document.querySelector('button');
    //credit card
    let cName = document.querySelector(".name");
    let cList = document.querySelector(".box ul li");
    let cYear = document.querySelector(".box .year");
    let length = inputs.length;
/* A regular expression that is used to validate the input of the user. */
    let regExp = [/^[A-Za-z\'\s\.\,]+$/, /^4[0-9]{12}(?:[0-9]{3})?$/, /^[0-9]{3,4}$/];
    //focusing the text->function
/**
 * It changes the color of the input field that is currently being typed in
 */
    let fieldColor = i => {
        for (j = 0; j < inputCon.length; j++) {
            if (window.CP.shouldStopExecution(0)) break;
            if (i == j) {
                inputCon[i].style.color = "rgb(64,146,181)";
            } else {
                inputCon[j].style.color = "rgb(193,193,193)";
            }
        } window.CP.exitedLoop(0);
    };
    let checkInput = i => {
        // Name
        /* Checking the input of the user and making sure that it is valid. */
        if (i == 0) {
            if (inputs[0].value.match(regExp[0])) {
                cName.innerText = inputs[0].value;
                inputCon[0].style.color = "rgb(64,146,181)";
                inputs[0].style.borderBottomColor = "rgb(64,146,181)";
            } else
                if (inputs[0].value == "" || !inputs[0].value.match(regExp[0])) {
                    cName.innerText = "Invalid input";
                    inputs[0].style.borderBottomColor = "red";
                }
        }

        //CCard NUmber
        if (i == 1) {
            if (inputs[1].value == "") {
                inputs[1].style.borderBottomColor = "red";
                cList.innerText = "Invalid input";
            } else {
                let cNumber = inputs[1].value;
                cNumber = cNumber.replace(/\s/g, "");
                /* Checking if the input is a number and if it is, it is formatting it to be displayed
                in the credit card. */
                if (Number(cNumber)) {
                    cNumber = cNumber.match(/.{1,4}/g);
                    cNumber = cNumber.join(" ");
                    inputs[1].value = cNumber;
                    if (cNumber.length <= 0) {
                        cList.innerText = "";
                    } else
                        if (cNumber.length > 19) {
                            cList.innerText = cNumber.substring(0, 20);
                            inputs[1].style.borderBottomColor = "red";

                        } else {
                            cList.innerText = cNumber;
                            inputs[1].style.borderBottomColor = "rgb(64,146,181)";
                        }
                } else {
                    inputs[1].style.borderBottomColor = "red";
                }
            }
        }
        // card Date
        else if (i == 2) {
            let dateValue = inputs[2].value;
            let d = dateValue.replace(/\s/g, "");
            // making sure its a number 
            if (Number(dateValue)) {
                d = dateValue.split("").map(i => {
                    return parseInt(i, 10);
                });

                let date = new Date();
                let twoDigitYear = parseInt(date.getFullYear().toString().substr(2), 10);
                //the first two digit in the month field
                /* Checking if the input is a valid date. */
                if (d.length == 2) {
                    //checking for first
                    if (d[0] == 0 && (d[1] !== 0 || d[1] <= 9) || d[0] == 1 && d[1] <= 2) {
                        /* Changing the color of the border of the input field. */
                        inputs[2].style.borderBottomColor = "rgb(64,146,181)";
                        cYear.innerText = dateValue + "/";
                    } else {
                        inputs[2].style.borderBottomColor = "red";
                    }
                } //End of Month
                else if (d.length == 4) {
                    /* Converting the year that the user has input into a number. */
                    let twoDigitYearN = parseInt(d[2].toString().concat(d[3].toString()), 10);
                    /* Checking if the year that the user has input is greater than the current year. */
                    if (twoDigitYearN > twoDigitYear) {
                        let stringDigit = twoDigitYearN.toString();
                        cYear.innerText += stringDigit;
                        inputs[2].value = cYear.innerText;
                        inputs[2].style.borderBottomColor = "rgb(64,146,181)";
                    } else {
                        inputs[2].style.borderBottomColor = "red";
                    }
                } //End of date + full date
            } //END of IF for [i = 2]
            else {
                cYear.innerText = "N/A";
                inputs[2].style.borderBottomColor = "red";
            }
        }

        if (i == 3) {
            let cV = inputs[i].value;
            /* Checking if the input is a number and if it is, it is formatting it to be displayed
            in the credit card. */
            if (Number(cV) && cV.match(regExp[2])) {
                inputs[i].style.borderBottomColor = "rgb(64,146,181)";
            } else {
                inputs[3].style.borderBottomColor = "red";
            }
        }
    };
    //setting value initially in the card to that of placeholder
    cName.innerText = inputs[0].getAttribute('placeholder');
    cList.innerText = inputs[1].getAttribute('placeholder');
    cYear.innerText = inputs[2].getAttribute('placeholder'); //Adding Event Listeners
    /* Adding an event listener to each input field. */
    for (i = 0; i < inputCon.length; i++) {
        if (window.CP.shouldStopExecution(1)) break;
        inputs[i].addEventListener('click', fieldColor.bind(this, i));
        inputs[i].addEventListener('input', checkInput.bind(this, i));
    } window.CP.exitedLoop(1);
    /* Preventing the default action of the button. */
    btn.addEventListener('click', e => {
        e.preventDefault();
        for (i = 0; i < length; i++) {
            if (window.CP.shouldStopExecution(2)) break;
            if (inputs[i].value == "") {
                inputs[i].style.borderBottomColor = "red";
            }
        } window.CP.exitedLoop(2);
        if (cList.innerText.length < 16) {
            inputs[1].style.borderBottomColor = "red";
        }
    });
});