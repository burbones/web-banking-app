const getDashboard = (req, res) => {
    console.log(req.email);
    const balance = (Math.random() * 100).toFixed(2);

    res.send(`Your balance is: ${balance}`);
}

module.exports = {
    getDashboard
};