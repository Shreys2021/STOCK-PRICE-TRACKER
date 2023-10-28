const Stock = require('../models/stock')
const User = require('../models/user')


exports.getStocks = async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (error) {
        console.error('Error fetching stocks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.removeStock = async (req, res) => {
    const { stockId, userId } = req.query;
    try {
        const user = await User.findOne({ username: userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const updatedUserStocks = user.userStocks.filter(id => id.toString() !== stockId);
        user.userStocks = updatedUserStocks;
        await user.save();
        const stocks = await user.populate('userStocks');
        res.status(200).json({ message: 'Stock removed successfully', stocks });
    } catch (error) {
        console.error('Error removing stock:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


