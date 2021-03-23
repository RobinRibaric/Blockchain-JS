const express = require('express');
const app = express();
const blockchain = require('./blockchain');

app.get('/mine_block', (req, res) => {
    const previousBlock = blockchain.getPreviousBlock();
    const previousProof = previousBlock.proof;
    const proof = blockchain.proofOfWork(previousProof);
    const previousHash = blockchain.hash(previousBlock);
    const block = blockchain.createBlock(proof, previousHash);

    res.status(200).json(block);
});

app.get('/get_chain', (req, res) => {
    const response = {
        chain: blockchain.chain,
        length: blockchain.chain.length,
    };

    res.status(200).json(response);

});

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});