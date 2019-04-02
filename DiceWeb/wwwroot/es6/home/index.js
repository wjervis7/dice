import { getRandomValues } from "../utilities.js";

const numbers = [0, "One", "Two", "Three", "Four", "Five", "Six"];
(($, Vue) => {
    const min = 1;
    const max = 6;

    const roll = (quantity) => {
        const dice = [];
        const randomNumbers = getRandomValues(min, max, quantity);
        for (let i = 0; i < randomNumbers.length; i++) {
            const randomNumber = randomNumbers[i];
            dice.push({
                class: `fa-dice-${numbers[randomNumber].toLowerCase()}`,
                value: randomNumber,
                text: "rolling..."
            });
        }
        return dice;
    };

    $(() => new Vue({
        el: "#main",
        data: {
            dice: []
        },
        methods: {
            addDie() {
                this.dice.push({ class: "fa-dice", value: 0, text: "not rolled" });
            },
            removeDie() {
                this.dice.pop();
            },
            rollDice() {
                let iterations = 0;
                const interval = setInterval(() => {
                    this.dice = roll(this.dice.length);
                    if (++iterations === 6) {
                        clearInterval(interval);
                        this.dice = this.dice.map((dice) => {
                            dice.text = numbers[dice.value]; // eslint-disable-line no-param-reassign
                            return dice;
                        });
                    }
                }, 500);
            }
        }
    }));
})(window.jQuery, window.Vue);
