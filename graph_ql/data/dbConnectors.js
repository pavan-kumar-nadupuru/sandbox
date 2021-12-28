import mongoose from "mongoose";
import Sequelize from "sequelize";
import _ from "lodash";
import casual from "casual";

// Mongo Connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/friends", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.log("error while connectiong... ", err))

const friendSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String
    },
    gender: {
        type: String
    },
    age: {
        type: Number
    },
    language: {
        type: String
    },
    email: {
        type: String
    },
    contacts: {
        type: Array
    }
});

const Friends = mongoose.model('friends', friendSchema);

const sequelize = new Sequelize("database", null, null, {
    dialect: 'sqlite',
    storage: './alien.sqlite'
});

const Aliens = sequelize.define('aliens', {
    first_name: { type: Sequelize.STRING },
    last_name: { type: Sequelize.STRING },
    planet: { type: Sequelize.STRING }
});


Aliens.sync({ force: true }).then(() => {
    _.times(10, (i) => {
        Aliens.create({
            first_name: casual.first_name,
            last_name: casual.last_name,
            planet: casual.word
        })
    })
})



export { Friends, Aliens };