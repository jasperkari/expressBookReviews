const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!isValid(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registred. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    res.send(books);
});

// Task 10
public_users.get("/async", function (req, res) {
    const getBooks = new Promise((resolve, reject) => {
        // Add any asynchronous operations here
        resolve(books);
    });

    getBooks
        .then(books => {
            res.send(books);
        })
        .catch(error => {
            res.status(500).send(error.message);
        });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    res.send(books[req.params.isbn]);
});

// Task 11
public_users.get('/isbn/async/:isbn', function (req, res) {
    const getBookByISBN = new Promise((resolve, reject) => {
        // Add any asynchronous operations here
        resolve(books[req.params.isbn]);
    });

    getBookByISBN
        .then(book => {
            res.send(book);
        })
        .catch(error => {
            res.status(500).send(error.message);
        });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    res.send(Object.values(books).filter(book => book.author === req.params.author));
});

// Task 12
public_users.get('/author/async/:author', function (req, res) {
    const getBooksByAuthor = new Promise((resolve, reject) => {
        // Add any asynchronous operations here
        resolve(Object.values(books).filter(book => book.author === req.params.author));
    });

    getBooksByAuthor
        .then(books => {
            res.send(books);
        })
        .catch(error => {
            res.status(500).send(error.message);
        });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    res.send(Object.values(books).filter(book => book.title === req.params.title));
});

// Task 13
public_users.get('/title/async/:title', function (req, res) {
    const getBooksByTitle = new Promise((resolve, reject) => {
        // Add any asynchronous operations here
        resolve(Object.values(books).filter(book => book.title === req.params.title));
    });

    getBooksByTitle
        .then(books => {
            res.send(books);
        })
        .catch(error => {
            res.status(500).send(error.message);
        });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    res.send(books[req.params.isbn].reviews);
});


module.exports.general = public_users;
