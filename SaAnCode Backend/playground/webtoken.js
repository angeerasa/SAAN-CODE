const jwt = require('jsonwebtoken');

const token = jwt.sign({_id: 'angeerasa'}, 'privateKey');
console.log(token); 