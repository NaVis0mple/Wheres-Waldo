const express = require('express');
const router = express.Router();
const target = require('../model/target')
const jwt = require('jsonwebtoken')
const multer = require('multer');
const rank = require('../model/rank');
const upload = multer()
const {body} =require('express-validator')
// const target3 = new target({
//   name: 'catman',
//   top: 0.34647033347769596,
//   left: 0.025157232704402517,
//   right: 0.06558849955076371,
//   bottom: 0.4107248316862869,
// })

// const target1 = new target( {
//   name: 'fishman',
//   top: 0.8403480451986298,
//   left: 0.5103324348607368,
//   right: 0.5579514824797843,
//   bottom: 0.9386196306941218,
// })
// const target2 = new target( {
//   name: 'greenman',
//   top: 0.3389109807472735,
//   left: 0.44833782569631625,
//   right: 0.5076370170709793,
//   bottom: 0.42710342926886885,
// })


/* GET home page. */
router.get('/api/targetlist',async function(req, res, next) {
  try {
    const targetlist = await target.find().exec()   // [{},{}]
  
    res.json(targetlist)
  } catch (err){
    next(err)
  }
});

// post check logic user submit x,y   use multipart/form-data => npm multer
router.post('/api/check',upload.none(),async function(req,res,next){
  try{
    const checkData = await target.find({name:req.body.checkTarget}).exec()   // [{}]
    const checkTarget = checkData[0]
    //check and response the result
        if (checkTarget.left < req.body.x && req.body.x < checkTarget.right && checkTarget.top < req.body.y && req.body.y < checkTarget.bottom) {
          res.json({checkTarget:req.body.checkTarget,checkResult:true})
        } else {
          res.json({checkTarget:req.body.checkTarget,checkResult:false})
      } 
  }catch(err){
    next(err)
  }
})

// post rank  
router.post('/api/rank/Post',[
  body('time').trim().escape(),
  body('name').trim().escape(),
  upload.none(),
  async function(req,res,next){
    const rankAdd = new rank({
      useTime:req.body.time,
      name:req.body.name
    })
  try{
    await rankAdd.save()
    res.redirect('http://localhost:5173/rank')
  }catch(err){
    next(err)
  }
}])

// rank get 
router.get('/api/rank/Get',async function(req,res,next){
  try {
    const rankList = await rank.find().exec()
    res.json(rankList)
  } catch(err){
    next(err)
  }
})

module.exports = router;
