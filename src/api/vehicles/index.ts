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
    vehicles {
      level
    }
  }
`;

export const NATION_QUERY = gql`
  query GlossaryQuery {
    vehicles {
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

export const TYPE_QUERY = gql`
  query GlossaryQuery {
    vehicles {
      type {
        name
        title
        icons {
          default
        }
      }
    }
  }
`;