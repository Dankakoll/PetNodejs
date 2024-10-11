var express = require('express');
var router = express.Router();
const redis = require('redis');
const client = redis.createClient({
    url:'redis://default:123@0.0.0.0:6379/0'
  });  
client.on('error', (err) => {
  console.log(`Error ${err}`)
})

/* GET users listing. */
router.get('/', (req,res) =>
{
  res.send('Users info')
})

router.use('/settest', (req,res,next) =>
{
  console.log('Added user for test');
  next()
},
async (req,res) =>{
  await client.connect();

  await client.hSet('user-session:123', {
    name: 'John',
    surname: 'Smith',
    company: 'Redis',
    age: 29
  });
  await client.quit();
  res.send('ok');
})
router.use('/test/:id', (req,res,next) =>
{
 console.log(req.params.id)
 next()
},
async (req,res,next) =>
{
await client.connect();
let userSession = await client.hGetAll(req.params.id);
await client.quit();
ans=JSON.stringify(userSession, null, 2);
if (ans.length > 2)
{
  res.send(userSession);
}
else
{
  res.send('Not found');
}
})

module.exports = router;
