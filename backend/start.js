const express = require('express');

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
    serveError(err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('UNHANDLED REJECTION:', reason);
    serveError(reason);
});

function serveError(err) {
    try {
        const app = express();
        app.get('*', (req, res) => {
            res.status(500).json({ error: err.message, stack: err.stack });
        });
        const port = process.env.PORT || 10000;
        app.listen(port, '0.0.0.0', () => {
            console.log('Dummy error server running on port', port);
        });
    } catch(e) {}
}

try {
    require('./app.js');
} catch (err) {
    console.error('REQUIRE ERROR:', err);
    serveError(err);
}
