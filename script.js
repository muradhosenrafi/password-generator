const inputslider = document.querySelector("#inputslider");
const slidevalue = document.querySelector("#slidevalue");
const symbols = document.querySelector("#symbols");
const number = document.querySelector("#number");
const upercase = document.querySelector("#upercase");
const lowercase = document.querySelector("#lowercase");
const passbox = document.querySelector("#passbox");
const getbtn = document.querySelector(".getbtn");

slidevalue.textContent = inputslider.value;

inputslider.addEventListener("input", () => {
    slidevalue.textContent = inputslider.value;
});

getbtn.addEventListener("click", () => {
    const password = generatepassword();
    if (password) {
        passbox.value = password;
    }
});

function getSecureRandomInt(max) {
    const range = 0x100000000;
    const limit = range - (range % max);
    const randomValues = new Uint32Array(1);
    let randomValue;

    do {
        window.crypto.getRandomValues(randomValues);
        randomValue = randomValues[0];
    } while (randomValue >= limit);

    return randomValue % max;
}

function generatepassword() {
    const length = Number.parseInt(inputslider.value, 10);
    const characterSets = [];

    if (lowercase.checked) characterSets.push("abcdefghijklmnopqrstuvwxyz");
    if (upercase.checked) characterSets.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if (number.checked) characterSets.push("0123456789");
    if (symbols.checked) characterSets.push("!@#$%^&*()-_=+[]{};:,.?/\\|");

    if (characterSets.length === 0) {
        alert("Please select at least one character type.");
        return "";
    }

    if (!Number.isInteger(length) || length < characterSets.length) {
        alert(`Choose a password length of at least ${characterSets.length} to include every selected character type.`);
        return "";
    }

    if (!window.crypto || typeof window.crypto.getRandomValues !== "function") {
        alert("Secure password generation is unavailable in this browser context.");
        return "";
    }

    const allCharacters = characterSets.join("");
    const passwordCharacters = characterSets.map((characterSet) => {
        return characterSet[getSecureRandomInt(characterSet.length)];
    });

    while (passwordCharacters.length < length) {
        passwordCharacters.push(allCharacters[getSecureRandomInt(allCharacters.length)]);
    }

    // Shuffle the characters so required character types do not appear in a fixed order.
    for (let index = passwordCharacters.length - 1; index > 0; index--) {
        const randomIndex = getSecureRandomInt(index + 1);
        [passwordCharacters[index], passwordCharacters[randomIndex]] = [
            passwordCharacters[randomIndex],
            passwordCharacters[index],
        ];
    }

    return passwordCharacters.join("");
}
