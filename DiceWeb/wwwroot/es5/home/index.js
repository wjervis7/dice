(function () {
    'use strict';

    const crypto = window.crypto || window.msCrypto;

    const getRandomValues = (min, max, quantity = 1) => {
        const buffer = new Uint32Array(quantity);
        crypto.getRandomValues(buffer);

        const randomNumbers = buffer.map((i) => {
            const randomNumber = i / (0xffffffff + 1);
            return Math.floor(randomNumber * (max - min + 1)) + min;
        });

        return randomNumbers;
    };

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

}());
