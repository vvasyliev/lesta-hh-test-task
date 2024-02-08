import { Blockquote, Pagination, SimpleGrid, Text } from '@mantine/core';
import { FC } from 'react';

import { Vehicle } from '~/api';
import { SkeletonCard } from '~/components/skeleton-card';
import { VehicleCard } from '~/components/vehicle-card';

export interface IVehicleListing {
  vehicles: Vehicle[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const VehicleListing: FC<IVehicleListing> = ({
  vehicles,
  currentPage,
  pageSize,
  totalPages,
  onPageChange,
  isLoading = false,
}) => {

  if (isLoading) {
    return (
      <SimpleGrid cols={{ md: 3, sm: 1 }}>
        {Array.from({ length: 3 }).map((curr, index) => (
          <SkeletonCard key={index} />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <>
      {vehicles.length ? (
        <SimpleGrid cols={{ md: 3, sm: 1 }}>
          {vehicles.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((vehicle) => (
            <VehicleCard
              key={`${vehicle.title}-${vehicle.level}`}
              title={vehicle.title}
              level={vehicle.level}
              description={vehicle.description}
              vehicleIconSrc={vehicle.icons.medium}
              vehicleNation={{
                title: vehicle.nation.title,
                color: vehicle.nation.color,
                iconSrc: vehicle.nation.icons.large,
              }}
              vehicleType={{
                title: vehicle.type.title,
                iconSrc: vehicle.type.icons.default,
              }}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Blockquote color="red">
          <Text>No vehicles matching selected filters have been found, try something else.</Text>
        </Blockquote>
      )}
      <Pagination withEdges total={totalPages} value={currentPage} onChange={onPageChange} mt="lg" />
    </>
  );
};
