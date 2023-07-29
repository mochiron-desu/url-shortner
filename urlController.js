const shortId = require('shortid');
const dataManager = require('./dataManager');

function shortenUrl(req, res) {
    const url = req.query.url;
    const id = shortId.generate();

    dataManager.addUrl(id, url);

    res.send(`http://localhost:3000/${id}`);
}

async function redirectToUrl(req, res) {
    const id = req.params.id;

    try {
        const url = await dataManager.getUrl(id);

        if (url) {
            res.redirect(url);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Error retrieving URL:', error);
        res.sendStatus(500);
    }
}

module.exports = {
    shortenUrl,
    redirectToUrl,
};
