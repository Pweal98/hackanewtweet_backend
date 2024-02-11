var express = require('express');
var router = express.Router();
const Messages = require('../models/message');
const { checkBody } = require('../modules/checkBody');
const Hashtags = require('../models/hashtag');
const Likes = require('../models/like');
const Users = require('../models/user')


/* GET home page. */
// affiche tous les hashtag trouvé
router.get('/', function(req, res){
    try {
        Hashtags.find({})
        .populate('message') // Remplacez 'user' par le nom du champ de référence dans vos données de message
            .then(data => {
                if (data.length > 0) {
                    res.json({ result: true, data: data });
                } else {
                    res.json({ result: false, error: 'Aucun hastag trouvé' });
                }
            })
            .catch(error => {
                res.status(500).json({ result: false, error: error.message });
            });
    } catch (error) {
        res.status(500).json({ result: false, error: error.message });
    }
  })


  // Recupere les infos message avec la recherche d'un hashtag
  router.get('/:uniqueHashtag', function(req, res){
    try {
        Hashtags.findOne({hashtag : req.params.uniqueHashtag })
        .populate({
            path: 'message',
            populate: { path: 'users' } // Peupler les informations sur l'utilisateur dans les messages
        })            .then(data => {
                if (data) {
                    res.json({ result: true, data: data });
                } else {
                    res.json({ result: false, error: 'Aucun hastag trouvé' });
                }
            })
            .catch(error => {
                res.status(500).json({ result: false, error: error.message });
            });
    } catch (error) {
        res.status(500).json({ result: false, error: error.message });
    }
  });
module.exports = router;
