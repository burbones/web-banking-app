const secretKey = "ffc676bc7dfcd2b4dcee1712e6ff5f1be09e57bfcaf03d4f4ecb4c24922cc131";

const getRandomStartBalance = () => (Math.random() * 100).toFixed(2);

module.exports = {
    secretKey,
    getRandomStartBalance
}