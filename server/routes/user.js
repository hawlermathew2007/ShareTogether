const express = require('express')
const User = require('../models/users')
const router = express.Router()

function containsArray(arr, subArr) {
    return arr.some(inner => {
        return JSON.stringify(inner) === JSON.stringify(subArr)
    });
}

router.get('/info', async (req, res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name != ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const users = await User.find(searchOptions)
        res.json(users)
    } catch(e){
        console.log(e)
        res.json({error: e})
    }
})

router.get('/info/:id', async (req,res) => {
    try{
        const user = await User.findById(req.params.id)
        if(user){
            res.json(user)
            return
        }
        res.json({error: 'No user with this id'})
    } catch(e){
        res.json({error: e})
    }
})

router.put('/contactLink/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if(user && req.body){
            user.objectOfContactLink[req.body.type] = req.body.link
            user.markModified('objectOfContactLink')
            await user.save()
            res.json(user.objectOfContactLink)
        }
    } catch(e) {
        console.log(e)
    }
})

async function handleFollowRequest(req, res, user, author) {
    const userListOfFollowed = user.listOfFollowed;
    if (containsArray(userListOfFollowed, [author._id, author.name])) {
      await author.updateOne({ $inc: { numsOfFollowers: -1 } });
      userListOfFollowed.splice(userListOfFollowed.indexOf([author._id, author.name]), 1);
    } else {
      await author.updateOne({ $inc: { numsOfFollowers: 1 } });
      userListOfFollowed.push([author._id, author.name]);
    }
    user.FollowApplied = true;
    await user.save();
    res.json(user.listOfFollowed);
}

async function handleAddTodoRequest(req, res, user) {
    if(req.body.todo) user.listOfTodos.push(req.body.todo)
    await user.save()
    res.json(user.listOfTodos);
}

async function handleDeleteTodoRequest(req, res, user) {
    if(req.body.choosen) user.listOfTodos.splice(user.listOfTodos.indexOf(req.body.choosen),1)
    await user.save()
    res.json(user.listOfTodos);
}

async function handleClearTodosRequest(req, res, user) {
    if(req.body.todo) user.listOfTodos.push(req.body.todo)
    await user.save()
    res.json(user.listOfTodos);
}

router.put('/:id', async (req, res) => {
    let user
    let author
    try {
        user = await User.findById(req.params.id);
        if (!user) {
          res.json({ error: 'No user with this ID' });
          return;
        }
        switch (req.body.type) {
            case 'follow':
                author = await User.findById(req.body.author);
                await handleFollowRequest(req, res, user, author);
                break;
            case 'addTodo':
                await handleAddTodoRequest(req, res, user);
                break;
            case 'deleteTodo':
                await handleDeleteTodoRequest(req, res, user);
                break
            case 'clearTodos':
                await handleClearTodosRequest(req, res, user);
                break;
            default:
                res.json({ error: 'Invalid request type' });
                return;
        }
        await user.save();

    } catch(e) {
        res.json({error: e})
    }
})

module.exports = router