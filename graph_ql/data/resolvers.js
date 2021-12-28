import { Friends, Aliens } from "./dbConnectors";

export const resolvers = {
    Query: {
        getFriend: (root, { id }) => {
            return new Promise((resolve, reject) => {
                Friends.findById(id, (err, friend) => {
                    if (err) reject(err)
                    else resolve(friend)
                })
            })
        },
        getAliens: () => {
            return Aliens.findAll();
        }
    },
    Mutation: {
        createFriend: (root, { input }) => {
            const newFriend = new Friends({
                first_name: input.first_name,
                last_name: input.last_name,
                gender: input.gender,
                language: input.language,
                age: input.age,
                email: input.email,
                contacts: input.contacts,
            });

            newFriend.id = newFriend._id;

            return new Promise((resolve, reject) => {
                newFriend.save((err => {
                    if (err) reject(err)
                    else resolve(newFriend)
                }))
            })
        },
        updateFriend: (root, { input }) => {
            return new Promise((resolve, reject) => {
                Friends.findOneAndUpdate({ _id: input.id }, input, { new: true }, (err, friend) => {
                    if (err) reject(err)
                    else resolve(friend)
                })
            })
        },
        deleteFriend: (root, { id }) => {
            return new Promise((resolve, reject) => {
                Friends.remove({ _id: id }, (err) => {
                    if (err) reject(err)
                    else resolve("Deleted.")
                })
            })
        }
    }
}