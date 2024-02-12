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
      if (!checkBody(req.body, ['message'])) {
          res.json({ result: false, error: 'Missing or empty fields' });
          return;
      }

      // Créer un nouveau message
      const newMessage = new Messages({
          message: req.body.message,
          users: req.body.users,
          date: Date.now()
      });

      // Sauvegarder le message
      const savedMessage = await newMessage.save();

      // Créer un tableau pour stocker les ID des hashtags associés au message
      const hashtagIDs = [];

      // Parcourir les hashtags fournis dans la requête
      for (let i = 0; i < req.body.hashtag.length; i++) {

          // Vérifier si le hashtag existe déjà dans la base de données
          const existingHashtag = await Hashtags.findOne({ hashtag: req.body.hashtag[i] });

          if (existingHashtag) {
              // Si un hashtag similaire existe déjà, ajoutez simplement l'ID du message au tableau
              existingHashtag.message.push(savedMessage._id);
              await existingHashtag.save();
              hashtagIDs.push(existingHashtag._id);
          } else {
              // Si aucun hashtag similaire n'existe, créez un nouveau hashtag
              const newHashtag = new Hashtags({
                  message: [savedMessage._id],
                  hashtag: req.body.hashtag[i],
              });

              const savedHashtag = await newHashtag.save();
              hashtagIDs.push(savedHashtag._id);
          }
      }

      // Ajouter les IDs des hashtags au message
      savedMessage.hashtags = hashtagIDs;

      // Enregistrer les modifications apportées au message
      await savedMessage.save();

      res.json({ result: true, message: 'Message ajouté avec succès' });
  } catch (error) {
      res.json({ result: false, error: error.message });
  }
});




  
  module.exports = router;