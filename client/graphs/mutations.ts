import gql from "graphql-tag";


// Hero

export const CREATE_HERO = gql`
  mutation CreateHero($id: ID!, $name: String, $created: Float) {
    CreateHero(id: $id, name: $name, created: $created) {
      id
    }
  }
`;