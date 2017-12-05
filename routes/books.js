'use strict';

const express = require('express');
const knex = require('../knex.js')
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/books', (req,res,next) => {
  return knex('books')
  .select('id', 'title', 'author', 'genre', 'description', 'cover_url AS coverUrl','created_at AS createdAt', 'updated_at AS updatedAt')
  .orderBy('title', 'asc')
  .then((data) =>{
    res.status(200).send(data)
  })
})

router.get('/books/:id', (req,res,next) => {
  let bookId = req.params.id
  return knex('books')
  .select('id', 'title', 'author', 'genre', 'description', 'cover_url AS coverUrl','created_at AS createdAt', 'updated_at AS updatedAt')
  .where('id', bookId)
  .then((data) =>{
    res.status(200).send(data[0])
  })
})

router.post('/books', (req,res,next) => {
  return knex('books')
  .insert({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.coverUrl
  })
  .returning(['title', 'author', 'genre', 'description', 'cover_url AS coverUrl', 'id'])
  .then((data) => {
    res.status(200).send(data[0])
  })
})

router.patch('/books/:id', (req,res,next) => {
  return knex('books')
  .update({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.coverUrl
  })
  .returning(['title', 'author', 'genre', 'description', 'cover_url AS coverUrl', 'id'])
  .then((data) => {
    res.status(200).send(data[0])
  })
})

router.delete('/books/:id', (req, res, next) => {
  let bookId = req.params.id
  return knex('books')
  .where('id', bookId)
  .del()
  .first(['title', 'author', 'genre', 'description', 'cover_url AS coverUrl'])
  .then((data) => {
    res.status(200).send(data)
  })
})

module.exports = router;
