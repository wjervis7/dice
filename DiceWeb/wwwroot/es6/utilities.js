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

// eslint-disable-next-line import/prefer-default-export
export { getRandomValues };
