const express = require('express');
const router = express.Router();
const Quote = require('../modules/quotes_modules');

// Get all quotes
router.get('/', async (req, res) => {
    try {
        const quotes = await Quote.find();
        res.json({ status:"ds",  quotes: quotes ,msg:"d"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
    
});

// Get a specific quote by ID
router.get('/:id', getQuote, (req, res) => {
    res.json(res.quote);
});

// Create a new quote
router.post('/', async (req, res) => {
    const quote = new Quote({
        authorName: req.body.authorName,
        quote: req.body.quote,
        image:req.body.image,
        // Remove the image field from the creation process
    });

    try {
        const newQuote = await quote.save();
        res.status(201).json({ status:"ds",  quotes: newQuote ,msg:"d"});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a quote by ID
router.patch('/:id', getQuote, async (req, res) => {
    if (req.body.authorName != null) {
        res.quote.authorName = req.body.authorName;
    }
    if (req.body.quote != null) {
        res.quote.quote = req.body.quote;
    }
    // Remove the image field from the update process

    try {
        const updatedQuote = await res.quote.save();
        res.json({ status:"ds",  quotes: updatedQuote ,msg:"d"});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a quote by ID
router.delete('/:id', getQuote, async (req, res) => {
    try {
        await res.quote.deleteOne();
        res.json({ message: 'Quote deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a quote by ID
async function getQuote(req, res, next) {
    try {
        const quote = await Quote.findById(req.params.id);
        if (quote == null) {
            return res.status(404).json({ message: 'Quote not found' });
        }
        res.quote = quote;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router;
