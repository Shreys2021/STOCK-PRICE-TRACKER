import React, { useEffect, useState } from 'react';
import './SubscribedStocks.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';


const SubscribeStock = ({ userSub }) => {
    const [subscribedStocks, setSubscribedStocks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user, isAuthenticated } = useAuth0();
    const [authMessage, setauthMessage] = useState(false)

    useEffect(() => {

        if (!isAuthenticated) {
            setauthMessage(true)
            return;
        } else {
            setauthMessage(false)
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://pricetracker-0npd.onrender.com/subscribed-stocks?sub=${user.sub}`);
                const { userStocks } = response.data;
                setSubscribedStocks(userStocks);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching stocks:', error);
            }
        };
        fetchData();
    }, [user]);

    useEffect(() => {
        const updateStockPrices = () => {
            setSubscribedStocks((prevStocks) => {
                const updatedStocks = prevStocks.map((stock) => ({
                    ...stock,
                    newPrice: generateRandomPrice(stock.price),

                }));
                return updatedStocks;
            });
        };

        const intervalId = setInterval(updateStockPrices, 10000);
        return () => clearInterval(intervalId);
    }, []);

    const generateRandomPrice = (price) => {
        const priceChange = Math.floor(Math.random() * 11) - 5;
        return (parseFloat(price) + parseFloat(priceChange)).toFixed(2);
    };

    const handleRemoveStock = (stockId) => {
        axios
            .delete(`https://pricetracker-0npd.onrender.com/remove-stock?stockId=${stockId}&userId=${user.sub}`)
            .then((response) => {
                if (response.status === 200) {
                    setSubscribedStocks(response.data.stocks.userStocks)
                    console.log(`Removed stock with ID ${stockId}`);
                }

            })
            .catch((error) => {
                console.error('Error removing stock:', error);
            });
    };

    return (

        <div className="subscribe-stock">
            <h2 className="market-heading">Subscribed Stocks</h2>
            {authMessage ? (
                <p className="login-message">You must log in first to view subscribed stocks.</p>
            ) : isLoading ? (
                <p>Data is on the way...</p>
            ) : subscribedStocks.length === 0 ? (
                <p>You haven't subscribed to any stocks yet.</p>
            ) : (
                <div className="stock-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Symbol</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>New Price</th>
                                <th>Change</th>
                                <th>% Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscribedStocks.map((stock, index) => (
                                <tr key={index}>
                                    <td>{stock.symbol}</td>
                                    <td>{stock.stockName}</td>
                                    <td>{stock.price}</td>
                                    <td>{stock.newPrice}</td>
                                    <td
                                        className={
                                            isNaN(stock.newPrice - stock.price) || stock.newPrice - stock.price >= 0
                                                ? 'positive'
                                                : 'negative'
                                        }
                                    >
                                        {isNaN(stock.newPrice - stock.price) ? '0' : (stock.newPrice - stock.price)}
                                    </td>
                                    <td
                                        className={
                                            isNaN((stock.newPrice - stock.price) / stock.price) ||
                                                (stock.newPrice - stock.price) / stock.price >= 0
                                                ? 'positive'
                                                : 'negative'
                                        }
                                    >
                                        {isNaN(((stock.newPrice - stock.price) / stock.price) * 100)
                                            ? '0%'
                                            : `${(((stock.newPrice - stock.price) / stock.price) * 100).toFixed(2)}%`}
                                    </td>
                                    <td>
                                        <button
                                            className="remove-button"
                                            onClick={() => handleRemoveStock(stock._id, user._id)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SubscribeStock;
