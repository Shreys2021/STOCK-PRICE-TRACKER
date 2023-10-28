import React, { useEffect, useState } from 'react';
import './StocksList.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';


const StocksList = () => {
    const [stocks, setStocks] = useState([]);
    const { user, isAuthenticated } = useAuth0();
    const [newPrices, setNewPrices] = useState({});
    const [authMessage, setauthMessage] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {

        if (!isAuthenticated) {

            return;
        }

        const fetchStocks = async () => {
            try {
                const response = await axios.get('https://pricetracker-0npd.onrender.com/');
                setStocks(response.data);
            } catch (error) {
                console.error('Error fetching stocks:', error);
            }
        };
        fetchStocks();
    }, [isAuthenticated]);

    useEffect(() => {
        const updateStockPrices = () => {
            setStocks((prevStocks) => {
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

    const handleSubscribe = (stockId) => {
        const url = `https://pricetracker-0npd.onrender.com/subscribe?sub=${user.sub}&stockId=${stockId}`;
        axios
            .put(url)
            .then((response) => {
                navigate('/subscribed-stocks');
                console.log(`Subscribed to ${stockId}`);
            })
            .catch((error) => {
                console.error('Error subscribing:', error);
            });
    };


    return (
        <div className="stock-list">
            {isAuthenticated ? (
                <table>
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>New Price</th>
                            <th>Change</th>
                            <th>% Change</th>
                            <th>Subscribe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map((stock, index) => (
                            <tr key={index}>
                                <td>{stock.symbol}</td>
                                <td>{stock.stockName}</td>
                                <td>{stock.price}</td>
                                <td>{stock.newPrice}</td>
                                <td className={isNaN(stock.newPrice - stock.price) || stock.newPrice - stock.price >= 0 ? 'positive' : 'negative'}>
                                    {isNaN(stock.newPrice - stock.price) ? '0' : (stock.newPrice - stock.price)}
                                </td>
                                <td className={isNaN((stock.newPrice - stock.price) / stock.price) || ((stock.newPrice - stock.price) / stock.price) >= 0 ? 'positive' : 'negative'}>
                                    {isNaN(((stock.newPrice - stock.price) / stock.price) * 100) ? '0%' : `${(((stock.newPrice - stock.price) / stock.price) * 100).toFixed(2)}%`}
                                </td>

                                <td>
                                    <button onClick={() => handleSubscribe(stock._id)}>Subscribe</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="login-message">You must log in first to view stocks.</p>
            )}
        </div>
    );
};

export default StocksList;
