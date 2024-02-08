import { useQuery } from '@apollo/client';
import { RangeSlider, Stack, Title } from '@mantine/core';
import { FC } from 'react';

import { nationsQuery, Nation, vehicleTypesQuery, VehicleType } from '~/api';
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
  const { data: nationData, loading: nationsLoading } = useQuery<{ nations: Nation[] }>(nationsQuery);
  const { data: typeData, loading: typesLoading } = useQuery<{ vehicleTypes: VehicleType[] }>(vehicleTypesQuery);

  const nationFilters =
    nationData?.nations.map((nation: Nation) => ({
      label: nation.title,
      value: nation.name,
    })) || [];

  const vehicleTypeFilters =
    typeData?.vehicleTypes.map((type: VehicleType) => ({
      label: type.title,
      value: type.name,
    })) || [];

  return (
    <div>
      <ExpandableFilterGroup
        title="Nations"
        filterList={nationFilters}
        selectedFilters={selectedNations}
        onChange={onNationFilterChange}
        isLoading={nationsLoading}
      />
      <ExpandableFilterGroup
        title="Type"
        filterList={vehicleTypeFilters}
        selectedFilters={selectedVehicleTypes}
        onChange={onTypeFilterChange}
        isLoading={typesLoading}
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
