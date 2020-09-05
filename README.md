# React Web App - Exchange Rate Monitor

## Stack: React, Redux, Express, Node JS, MongoDB
A website application that enables users to set up accounts, read about exchange rates analysis, set up notifications and get on the waiting list for new features.

## Features:
## Authentication:
Used ```Express``` and ```Node JS``` for backend and set up two API routes: ```register``` and ```login```. Used ```password``` and ```jsonwebtoken``` for authentication and ```validator``` for validation. Passwords are hashed before being sent to the server. Users hashed credentials are stored in ```MongoDB``` database.

### Persistent Login:
Stored token in ```LocalStorage```. The app reads the token in ```LocalStorage``` for persistent login.

### Notification Turn On/Off:
Used the React ```Switch``` component to toggle the state of a single setting on or off.

### Waiting List:
Set up a API route ```‘/waitlist’``` to collect users’ emails in a new feature.

### Responsive design:
UI is responsive to users’ screen sizes and mobile friendly.

### Graphs and Tooltip:
Integrated ```Chart.js``` to illustrate analysis and used the React ```Tooltip``` component to explain financial terms. 
