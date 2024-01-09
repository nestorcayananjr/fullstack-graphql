const gql = require('graphql-tag')
const {ApolloServer} = require('apollo-server')

const typeDefs = gql`

    enum ShoeType{
        JORDAN
        NIKE
        ADIDAS
    }
    
    type User {
        email: String!
        avatar: String!
        friends: [User]!
    }

    input NewShoeInput{
        brand: String!
        size: Int!
    }

    type Query {
        me: User!
    }

    type Mutation {
        newShoe(input: NewShoeInput!): Shoe!
    }
`

const resolvers = {
    Query: {
      me(){
        return {
            email: 'yoda',
            avatar: 'http://yoda.png',
            friends: []
        }
      }  
    },

    Mutation: {
        newShoe(_, {input}){
            return input
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4000)
    .then(() => console.log('listening on port 4000'))