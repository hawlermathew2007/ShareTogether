const express = require('express')
const User = require('../models/users')
const Post = require('../models/posts')
const router = express.Router()

router.get('/info', async (req, res) => {
    let searchOptions = {}
    if(req.query.title != null && req.query.title != ''){
        searchOptions.title = new RegExp(req.query.title, 'i')
    }
    if(req.query.author != null && req.query.author != ''){
        searchOptions.author = req.query.author
    }
    
    try{
        const posts = await Post.find(searchOptions)
        res.json(posts)
    } catch(e){
        console.log(e)
        res.json({error: 'Unable to view your post :<'})
    }
})

router.get('/info/:id', async (req,res) => {
    try{
        const post = await Post.findById(req.params.id)
        if(post){
            res.json(post)
            return
        }
        res.json({error: 'No post with this id'})
    } catch(e){
        res.json({error: e})
    }
})

router.post('/', async (req,res) => {
    try{
        const post = new Post({
            title: req.body.title,
            topic: req.body.topic,
            essay: req.body.essay,
            author: req.body.author,
            authorName: req.body.authorName,
        })
        await post.save()
        console.log('sucess')
        res.json('New post born')
    } catch(e){ 
        res.json({error: e})
    }
})

router.put('/:id', async (req, res) => {
    let post
    let user
    let isLiked = null
    try{
        post = await Post.findById(req.params.id)
        user = await User.findById(req.body.userId)
        if(post == null){
            res.json({error: 'No post with this id'})
            return
            }
        if(user == null){
            res.json({error: 'No user with this id'})
            return
            }
        const userListOfliked = user.listOfliked
        if(req.body.type){
            if(req.body.type == 'like' && !post.likeApplied){
                if(userListOfliked.includes(req.params.id)){
                    post.liked -= 1;
                    isLiked = false
                    userListOfliked.splice(userListOfliked.indexOf(req.params.id), 1)
                } else{
                    post.liked += 1;
                    isLiked = true
                    userListOfliked.push(req.params.id)
                }
                post.likeApplied = true;
            }
            if(req.body.type == 'copy' && !post.copyApplied){
                post.copyed += 1;
                post.copyApplied = true;
            }
            await post.save()
            await user.save()
            res.json({liked: post.liked, copyed: post.copyed, isLiked: isLiked})
        }
    } catch(e){
        res.json({error: e})
        console.log(e)
    }
})

module.exports = router