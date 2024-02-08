import { gql } from '@apollo/client';

// directives available: skip & include
export const vehiclesQuery = gql`
  query GlossaryQuery {
    vehicles {
      title
      description
      icons {
        large
        medium
      }
      level
      type {
        name
        title
        icons {
          default
        }
      }
      nation {
        name
        title
        color
        icons {
          large
        }
      }
    }
  }
`;

export const nationsQuery = gql`
  query NationsQuery {
    nations {
      name
      title
      icons {
        default
      }
    }
  }
`;

export const vehicleTypesQuery = gql`
  query VehicleTypesQuery {
    vehicleTypes {
      name
      title
      titleShort
      icons {
        default
      }
    }
  }
`;

export const schemaQuery = gql`
  query SchemaQuery {
    __schema {
      types {
        name
        fields {
          name
          description
        }
      }
    }
  }
`;
