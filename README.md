**Stock Market Web Application**
This is a stock market web application built using Node.js, Express.js, and MongoDB for the backend, and React for the frontend. The application allows users to view and subscribe to stock market data. It also provides real-time updates on stock prices.

**Features**
View Stock Listings: Users can view a list of available stocks, including their symbols, names, prices, new prices, changes, and percentage changes.

Subscribe to Stocks: Authenticated users can subscribe to their preferred stocks. Subscribed stocks are associated with the user's account.

Real-time Stock Updates: Stock prices are updated every 10 seconds to provide users with the latest market data.

User Authentication: Users can log in and access their subscribed stocks.

**Backend**
Node.js and Express.js: The backend server is built with Node.js and Express.js, providing a RESTful API for handling stock data and user subscriptions.

MongoDB: MongoDB is used as the database to store stock data and user information.

**Frontend**
React: The frontend is developed using React, allowing for a responsive and interactive user interface.

Auth0: User authentication is implemented using Auth0, ensuring secure access to user-specific stock subscriptions.

**API Endpoints**
GET /: Retrieve a list of available stocks.

GET /subscribed-stocks: Get a list of subscribed stocks for the authenticated user.

PUT /subscribe: Subscribe to a stock as an authenticated user.

GET /:sub: Retrieve the list of stocks subscribed by a user.

DELETE /remove-stock: Remove a subscribed stock from the user's list.
