const mongoose = require('mongoose');
const chalk = require('chalk');
mongoose.set('autoIndex', false);

module.exports = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("%s MongoDB connect success", chalk.green('✓'));
    } catch (error) {
        console.log(error);
        console.log("%s MongoDB connect failed ", chalk.red('✗'));
        process.exit();
    }
}

