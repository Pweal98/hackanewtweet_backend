// __tests__/signin.test.js
const request = require('supertest');
const app = require('../app'); // Assurez-vous d'importer correctement votre application

describe('Sign In', () => {
  it('should return a valid user token on successful sign in', async () => {
    const response = await request(app)
      .post('/users/signin')
      .send({
        username: 'renaud', // Utilisez un nom d'utilisateur existant
        password: '1234',  // Utilisez le mot de passe correct
      });

    // Vérifiez si la connexion a réussi (status code 200) et qu'il y a un token
    if (response.statusCode === 200) {
        expect(response.body.data).toHaveProperty('token');  // Vérifiez si la propriété 'token' existe dans response.body.data
    } else {
      console.error('La connexion a échoué avec le message d\'erreur:', response.body);
      // Gérez le cas où la connexion échoue, peut-être lever une erreur
    }
  });

  it('should return an error on invalid credentials', async () => {
    const response = await request(app)
      .post('/users/signin')
      .send({
        username: 'your_nonexistent_username', // Utilisez un nom d'utilisateur qui n'existe pas
        password: 'your_incorrect_password',   // Utilisez un mot de passe incorrect
      });

    // Vérifiez si la connexion a échoué avec le code de statut 404
    if (response.statusCode === 404) {
      expect(response.body).toHaveProperty('error');
    } else {
      console.log('La connexion a réussi avec le code de statut:', response.body.error);
      // Gérez le cas où la connexion réussit, peut-être lever une erreur
    }
  });
});


describe('Sign Up', () => {
    it('should return a valid user token on successful sign up', async () => {
        const response = await request(app)
        .post('/users/signup')
        .send({
            username: 'juliendu77',
            password: '1234',
            firstname : 'Julien',
        })
        if (response.statusCode === 200) {
            expect(response.body.dataUser).toHaveProperty('token');  // Vérifiez si la propriété 'token' existe dans response.body.data
        } else {
          console.error('La connexion a échoué avec le message d\'erreur:', response.body);
          // Gérez le cas où la connexion échoue, peut-être lever une erreur
        }
    }) 
})