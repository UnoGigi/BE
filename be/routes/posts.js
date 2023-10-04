const express = require('express')
const postModel = require('../models/post')
const posts = express.Router()

posts.get('/posts', async (req, res) => {
   const { page= 1, pageSize=3 } = req.query

   try {
      const posts = await postModel.find()
         .limit(pageSize)
         .skip((page -1) * pageSize)

      const totalPost = await postModel.count /*tiene il conto*/

      res.status(200)
         .send({
            statusCode: 200,
            currentPage: Number(page),
            totalPages: Math.ceil(totalPost / pageSize),
            totalPost,
            posts
         })
   } catch (e) {
      res.status(500)
         .send({
            statusCode: 500,
            message: "errore interno del server"
         })
   }
})

posts.post('/posts/create', async (req, res) => {

   const newPost = new postModel({
      title: req.body.title,
      category: req.body.category,
      cover: req.body.cover,
      price: Number(req.body.price),
      rate: Number(req.body.rate),
      author: req.body.author
   })

   try {
      const post = await newPost.save()
      res.status(200)
         .send({
            statusCode: 200,
            message: "post salvato",
            payload: post
         })
   } catch (error) {
      res.status(500)
         .send({
            statusCode: 500,
            message: "errore interno del server"
         })
   }
})

posts.patch('/posts/update/:postId', async (req, res) => {
   const { postId } = req.params;

   const postExist = await postModel.findById(postId)

   if (!postExist) {
      return res.status(404).send({
         statusCode: 404,
         message: "il post non esiste"
      })
   }

   try {
      const dataToUpdate = req.body;
      const options = { new: true }
      const result = await postModel.findByIdAndUpdate(postId, dataToUpdate, options)

      res.status(200).send({
         statusCode: 200,
         message: "post modificato"
      })
   } catch (error) {
      res.status(500)
         .send({
            statusCode: 500,
            message: "errore interno del server"
         })
   }
})

posts.delete('/posts/delete/:postId', async (req, res) => {
   const { postId } = req.params
   try {
      const post = await postModel.findByIdAndDelete(postId)
      if (!post) {
         return res.status(404).send({
            statusCode: 404,
            message: "post gia cancellato"
         })
      }

      res.status(200).send({
         statusCode: 200,
         message: "Post cancellato"

      })


   } catch (error) {
      res.status(500)
         .send({
            statusCode: 500,
            message: "errore interno del server"
         })
   }

})


module.exports = posts