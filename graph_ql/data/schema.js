import { makeExecutableSchema } from "graphql-tools"
import { resolvers } from "./resolvers";

const typeDefs = `
    type Friend {
        id: ID,
        first_name: String,
        last_name: String,
        gender: Gender,
        language: String,
        age: Int,
        email: String,
        contacts: [Contact]
    }

    type Alien{
        id: ID,
        first_name: String,
        last_name: String,
        planet: String
    }

    type Contact{
        first_name: String,
        last_name: String
    }
    
    enum Gender {
        MALE,
        FEMALE,
        OTHER
    }

    type Query {
        getFriend(id: ID): Friend,
        getAliens: [Alien]
    }

    input FriendInput {
        id: ID,
        first_name: String,
        last_name: String,
        gender: Gender,
        language: String,
        age: Int,
        email: String,
        contacts: [ContactInput]
    }

    input ContactInput {
        first_name: String,
        last_name: String
    }

    type Mutation {
        createFriend(input: FriendInput): Friend,
        updateFriend(input: FriendInput): Friend,
        deleteFriend(id: ID!): String
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers })

export { schema };