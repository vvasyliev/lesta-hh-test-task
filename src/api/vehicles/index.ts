import { gql } from '@apollo/client';

// directives available: skip & include

export const VEHICLES_QUERY = gql`
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
          small
          medium
          large
        }
      }
    }
  }
`;

export const LEVEL_QUERY = gql`
  query GlossaryQuery {
    levels
  }
`;

export const NATION_QUERY = gql`
  query Nation {
    nations {
      name
      title
      icons {
        default
      }
    }
  }
`;

export const TYPE_QUERY = gql`
  query VehicleType {
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

export const SCHEMA_QUERY = gql`
  query SchemaQuery {
    __schema {
      types {
        name
        fields {
          name
          description
        }
      }
      mutationType {
        name
      }
    }
  }
`;
