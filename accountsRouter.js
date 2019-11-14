const express = require('express');
const db = require('./data/dbConfig.js');
const router = express.Router();

router.get('/', (req, res) => { // WORKS
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem with database.', err });
        })
});

router.get('/:id', (req, res) => { // WORKS
    const { id } = req.params;
    db('accounts').select('*').where({ id })
        .then(account => {
            res.status(200).json(account);
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem with database.', err })
        })
});

router.post('/', (req, res) => { // WORKS
    const accountData = req.body;
    db('accounts').insert(accountData)
        .then(account => {
            const newAccount = {
                "id": account[0],
                ...accountData
            }
            res.status(200).json(newAccount);
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem with database.', err })
        })
});

router.put('/:id', (req, res) => { // WORKS 
    const { id } = req.params;
    const changes = req.body;
    db('accounts')
        .where({ id })
        .update(changes)
        .then(count => {
            if(count){
                newAccount = {
                    "id": id,
                    ...changes
                }
                res.status(200).json({ updated: newAccount });
            } else {
                res.status(404).json({ message: 'Invalid ID' })
            }
        })
        .catch(err => {
            res.status(500).json({ err });
        })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
        .where({ id })
        .del()
        .then(count => {
            count
            ? res.status(200).json({ deletedID: id })
            : res.status(404).json({ message: 'invalid ID' })
        })
        .catch(err => {
            res.status(500).json({ err })
        })

});

module.exports = router;