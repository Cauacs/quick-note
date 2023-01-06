import { gql } from "@apollo/client";

export const CREATE_DOCUMENT = gql`
  mutation Mutation($value: [blockElementInput]!) {
    createDocument(value: $value) {
      id
      value {
        type
        children {
          text
        }
      }
    }
  }
`;
