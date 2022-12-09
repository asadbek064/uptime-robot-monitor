# uptime-robot-monitor
Nodejs Server which hosts a custom status page for your uptimerobot.com page.

## Installation
```
npm install
```
.env provide required env 
```
Read_Only_API_Key=xxxxx
SetInterval=30
```

```js
node index.js
```

### Folder structor

```
    ├── src
    |   ├── public # static files 
    |   |   ├── assets
    |   │   ├── css
    |   │   ├── index.html
    |   ├── index.js    
    |   ├── uptimerobot.js               
```