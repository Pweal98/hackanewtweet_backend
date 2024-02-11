var express = require('express');
var router = express.Router();
const Messages = require('../models/message');
const { checkBody } = require('../modules/checkBody');
const Hashtags = require('../models/hashtag');
const Likes = require('../models/like');

/* GET users listing. */
router.get('/', function(req, res){
  try {
      Messages.find({})
      .populate('users') // Remplacez 'user' par le nom du champ de référence dans vos données de message
      .populate('likes')
      .populate('hashtags')
          .then(data => {
              if (data.length > 0) {
                  res.json({ result: true, data: data });
              } else {
                  res.json({ result: false, error: 'Aucun message trouvé' });
              }
          })
          .catch(error => {
              res.status(500).json({ result: false, error: error.message });
          });
  } catch (error) {
      res.status(500).json({ result: false, error: error.message });
  }
});


router.post('/addMessage', async (req, res) => {
    try {
      if (!checkBody(req.body, [ 'message'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
      }
  
      // Créer un nouveau message
      const newMessage = new Messages({
        message: req.body.message,
        users: req.body.users,
        date : Date.now()
      });
  
      // Sauvegarder le message
      const savedMessage = await newMessage.save();
  
      // Créer un nouveau like lié au message
      const newLike = new Likes({
        message: savedMessage._id,
        users: req.body.users,
      });
  
      // Sauvegarder le like
      const savedLike = await newLike.save();
  
      // Ajouter le like à la liste des likes du message
      savedMessage.likes.push(savedLike._id);
      
      // Si un hashtag est fourni, créer un nouveau hashtag et l'ajouter au message
      if (req.body.hashtag) {
        const existingHashtag = await Hashtags.findOne({ hashtag: req.body.hashtag });

        if (existingHashtag) {
          console.log('kkk')
            // Si un hashtag similaire existe déjà, ajoutez simplement l'ID du message au tableau
            existingHashtag.message.push(savedMessage._id);
            await existingHashtag.save();
            savedMessage.hashtags.push(existingHashtag._id);
        } else {
            // Si aucun hashtag similaire n'existe, créez un nouveau hashtag
            const newHashtag = new Hashtags({
                message: [savedMessage._id],
                hashtag: req.body.hashtag,
            });
            const savedHashtag = await newHashtag.save();
            savedMessage.hashtags.push(savedHashtag._id);
        }
      }
  
      // Sauvegarder le message mis à jour avec les likes et hashtags
      await savedMessage.save();
  
      res.json({ result: true, dataMessage: savedMessage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ result: false, error: 'Internal server error' });
    }
  });



  
  module.exports = router;