const mongoose = require('mongoose')

const databaseName='SaAnCode'
mongoose.connect(`mongodb+srv://SaAnCode:saancoder@saancode.xzdydi5.mongodb.net/${databaseName}?retryWrites=true&w=majority`);

