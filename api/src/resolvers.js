/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    pets(_, {input}, ctx){
      if (!input) {
        const allPets = ctx.models.Pet.findMany({});
        return allPets
      }

      const allPetsOfOneType = ctx.models.Pet.findMany(input)
      return allPetsOfOneType
    },

    pet(_, {input}, ctx){
      console.log('Query --> Pet')
      const pet = ctx.models.Pet.findOne(input)
      return pet
    }
  },
  Mutation: {
    newPet(_, {input}, ctx){
      const newPet = ctx.models.Pet.create(input);
      return newPet;
    },
    deletePet(_, {input}, ctx){
      const deletedPet = ctx.models.Pet.delete(input);
      return deletedPet;
    }
  },
  Pet: {
    owner(_, __, ctx) {
      console.log("Pet --> Owner")
      return ctx.models.User.findOne()
    }
    // img(pet) {
    //   return pet.type === 'DOG'
    //     ? 'https://placedog.net/300/300'
    //     : 'http://placekitten.com/300/300'
    // }
  },
  User: {
    pets(user, __, ctx){
      console.log('User --> Pet')
      const pets = ctx.models.Pet.findMany()
      return pets
    }
    
  }
}
