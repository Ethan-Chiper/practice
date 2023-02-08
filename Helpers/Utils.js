const { customAlphabet } = require('nanoid');

function utils() {

    /**
     * getNanoId
     * @returns 
     */

    this.getNanoId = () => {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
        const randomId = customAlphabet(alphabet, 8);
        return randomId();
    }
}



module.exports = new utils();