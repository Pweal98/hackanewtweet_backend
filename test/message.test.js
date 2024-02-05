const request = require('supertest');
const app = require('../app'); // Assurez-vous d'importer correctement votre application


describe('POST /addMessage', () => {
    it('devrait ajouter un nouveau message avec like et hashtag', async () => {
      // Supposons que vous ayez une base de données en mémoire pour les tests
      const fakeDB = {
        Messages: [],
        Likes: [],
        Hashtags: [],
      };
  
      // Utilisez une méthode de test pour intercepter la requête HTTP
      app.use('/votre-route', messageRoute(fakeDB));
  
      // Utilisez Supertest pour effectuer une requête POST
      const response = await request(app)
        .post('/votre-route/addMessage')
        .send({
          token: 'votre_token',
          message: 'Votre message',
          _id: 'id_utilisateur',
          hashtag: 'votre_hashtag',
        });
  
      // Vérifiez la réponse de la route
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(true);
      expect(response.body.dataMessage).toBeDefined();
  
      // Vérifiez que le message, le like et le hashtag ont été ajoutés à la base de données
      expect(fakeDB.Messages.length).toBe(1);
      expect(fakeDB.Likes.length).toBe(1);
      expect(fakeDB.Hashtags.length).toBe(1);
  
      // Ajoutez d'autres assertions en fonction de votre logique métier
    });
  
    it('devrait renvoyer une erreur en cas de champs manquants', async () => {
      // ... Ajoutez un test similaire pour vérifier la gestion des champs manquants
    });
  
    it('devrait renvoyer une erreur en cas d\'erreur interne du serveur', async () => {
      // ... Ajoutez un test similaire pour vérifier la gestion des erreurs internes du serveur
    });
  });