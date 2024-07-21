const User = require('./User');
const Messages = require("./Messages");
const Group = require("./Group");
const Member = require("./Member");
const LikedMessage = require('./LikedMessage');

const models = [User, Messages, Group, Member, LikedMessage];

async function createModels() {
    try {
        for (let model of models) {
            await model.sync({ force: true })
        }
    } catch (err) {
        console.log(err.message)
    }
}
// createModels();

module.exports = {
    User,
    Messages,
    Group,
    Member,
    LikedMessage,
    createModels
}

