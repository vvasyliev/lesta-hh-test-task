import { useQuery } from '@apollo/client';
import { RangeSlider, Stack, Title } from '@mantine/core';
import { FC } from 'react';

import { NATION_QUERY, TYPE_QUERY } from '~/api';
import { ExpandableFilterGroup } from '~/components/expandable-filters';

export interface IVehicleFilters {
  selectedNations: string[];
  selectedVehicleTypes: string[];
  levelRange: [number, number];
  onLevelRangeChange: (levelRange: [number, number]) => void;
  onNationFilterChange: (nationFilter: string[]) => void;
  onTypeFilterChange: (vehicleType: string[]) => void;
}

export const VehicleFilters: FC<IVehicleFilters> = ({
  levelRange,
  selectedNations,
  selectedVehicleTypes,
  onLevelRangeChange,
  onNationFilterChange,
  onTypeFilterChange,
}) => {
  const { data: nationData } = useQuery(NATION_QUERY);
  const { data: typeData } = useQuery(TYPE_QUERY);

  console.info(nationData, typeData);
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
      <ExpandableFilterGroup
        title="Nations"
        filterList={nationFilters}
        selectedFilters={selectedNations}
        onChange={onNationFilterChange}
      />
      <ExpandableFilterGroup
        title="Type"
        filterList={vehicleTypeFilters}
        selectedFilters={selectedVehicleTypes}
        onChange={onTypeFilterChange}
      />
      <Stack>
        <Title order={6}>Level:</Title>
        <RangeSlider
          value={levelRange}
          onChange={onLevelRangeChange}
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
