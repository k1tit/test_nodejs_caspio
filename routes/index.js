import CaspioHelper from '../helpers/caspio';

var express = require('express');
var router = express.Router();


router.get('/', async function(req, res, next) {
  const token = await CaspioHelper.getAccessToken();
  const rows = await CaspioHelper.getAll('tables', 'Users_ES', '', token);
  res.status(200).send(JSON.stringify(rows));
});

router.post('/add_user', async function(req, res, next) {
  const token = await CaspioHelper.getAccessToken();
  const data = req.body;
  const createResponse = await CaspioHelper.post('tables', 'Users_ES', data, token);
  res.status(201).send(JSON.stringify(createResponse));
});

router.put('/change_user/:UserID', async function(req, res, next) {
  const token = await CaspioHelper.getAccessToken();
  const UserID = req.params.UserID;
  const updatedUserData = req.body;
  const updateResponse = await CaspioHelper.put('tables', 'Users_ES', UserID, updatedUserData, token);
  res.status(200).send(JSON.stringify(updateResponse));
});

router.delete('/delete_user/:UserID', async function(req, res, next) {
  const token = await CaspioHelper.getAccessToken();
  const UserID = req.params.UserID;
  const deleteResponse = await CaspioHelper.deleteRows('tables', 'Users_ES', UserID, token);
  res.status(204).send();
});

module.exports = router;
