const sha256 = require('js-sha256');

class Blockchain {
    constructor() {
        this.chain = [];
        this.createBlock(1, '0');
    }

    createBlock(proof, previousHash) {
        const block = {
            index: this.chain.length,
            timestamp: new Date(),
            previousHash,
            proof,
        }
        this.chain.push(block);
        return block;
    }

    getPreviousBlock() {
        return this.chain[this.chain.length - 1];
    }

    proofOfWork(previousProof) {
        let newProof = 1;
        let checkProof = true;
        while (checkProof) {
            const hashOperation = sha256((Math.pow(newProof, 2) - Math.pow(previousProof, 2)).toString());

            if (hashOperation.substring(0, 4) === '0000') {
                checkProof = false;
            } else {
                newProof += 1;
            }
        }

        return newProof;
    }

    hash(block) {
        const encodedBlock = JSON.stringify(block);
        return sha256(encodedBlock);
    }

    isChainValid(chain) {
        let previousBlock = chain[0];
        let blockIndex = 1;
        while (blockIndex < chain.length) {
            const block = chain[blockIndex];

            if (block.previousHash !== this.hash(previousBlock)) return false;

            const previousProof = previousBlock.proof;
            const proof = block.proof;
            const hashOperation = sha256((Math.pow(proof, 2) - Math.pow(previousProof, 2)).toString());

            if (hashOperation.substring(0, 4) !== '0000') return false;

            previousBlock = block;
            blockIndex += 1;
        }

        return true;
    }

}

module.exports = new Blockchain();


