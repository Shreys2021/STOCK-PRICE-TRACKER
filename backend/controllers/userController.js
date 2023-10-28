const User = require('../models/user');
const Stock = require('../models/stock')


exports.getUserSubscriptions = async (req, res) => {
    const { sub } = req.query;
    try {
        const user = await User.findOne({ username: sub }).populate('userStocks');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const userStocks = user.userStocks;
        res.status(200).json({ userStocks });
    } catch (error) {
        console.error('Error fetching user subscriptions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.subscribeUserToStock = async (req, res) => {
    const { sub, stockId } = req.query;

    try {
        let user = await User.findOne({ username: sub });

        if (!user) {
            user = await User.create({ username: sub });
        }
        const stock = await Stock.findById(stockId);

        if (!stock) {
            return res.status(404).json({ error: 'Stock not found' });
        }

        if (user.userStocks.includes(stock._id)) {
            console.log("Already subscribed");
            return res.status(200).json({ error: 'Stock is already subscribed to a user' });
        }
        user.userStocks.push(stock);
        await user.save();

        console.log(`Associated Stock ID ${stockId} with User ID ${user._id}.`);
        res.status(200).json({ message: 'Stock updated with user association successfully' });

    } catch (error) {
        console.error('Error subscribing user to stock:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

