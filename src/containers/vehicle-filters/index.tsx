import { useQuery } from '@apollo/client';
import { RangeSlider, Stack, Title } from '@mantine/core';

import { NATION_QUERY, SCHEMA_QUERY, TYPE_QUERY } from '~/api';
import { ExpandableFilterGroup } from '~/components/expandable-filters';

export const VehicleFilters = () => {
  const { data: nationData } = useQuery(NATION_QUERY);
  const { data: typeData } = useQuery(TYPE_QUERY);
  const { data: schemaData } = useQuery(SCHEMA_QUERY);

  console.info(nationData, typeData, schemaData);
  const nationFilters =
    (nationData &&
      nationData.nations.map((nation) => ({
        label: nation.title,
        value: nation.name,
      }))) ||
    [];

  const vehicleTypeFilters =
    (typeData &&
      typeData.vehicleTypes.map((type) => ({
        label: type.title,
        value: type.name,
      }))) ||
    [];

  return (
    <div>
      <ExpandableFilterGroup title="Nations" filterList={nationFilters} />
      <ExpandableFilterGroup title="Type" filterList={vehicleTypeFilters} />
      <Stack>
        <Title order={6}>Level:</Title>
        <RangeSlider
          minRange={0}
          min={1}
          max={11}
          step={1}
          marks={[
            { value: 1, label: 1 },
            { value: 11, label: 11 },
          ]}
        />
      </Stack>
    </div>
  );
};
