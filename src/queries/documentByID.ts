import { gql } from "@apollo/client";

export const GET_DOCUMENT_BY_ID = gql`
  query GET_DOCUMENT_BY_ID($documentId: String!) {
    Document(id: $documentId) {
      id
      createAt
      value {
        type
        children {
          text
        }
      }
    }
  }
`;
