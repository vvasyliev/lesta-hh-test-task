import { useQuery } from '@apollo/client';
import { useCallback, useMemo, useState } from 'react';
import {
  SimpleGrid,
  Text,
  Pagination,
  Loader,
  Center,
  Container,
  Grid,
  Select,
  GridCol,
  Blockquote,
} from '@mantine/core';

import { VEHICLES_QUERY, Vehicle } from '~/api';
import { VehicleCard } from '~/components/vehicle-card';
import { useSearchParams } from 'react-router-dom';
import { VehicleFilters } from '~/containers/vehicle-filters';

const DEFAULT_PAGE_SIZE = 9;

export function VehiclesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize, setPageSize] = useState(parseInt(searchParams.get('pageSize')!) || DEFAULT_PAGE_SIZE);
  const [currentPage, setCurentPage] = useState(parseInt(searchParams.get('page')!) || 1);
  const [levelRange, handleLevelFilter] = useState<[number, number]>([1, 11]);
  const [selectedNations, handleNationFilter] = useState<string[]>([]);
  const [selectedVehicleTypes, handleVehicleTypeFilter] = useState<string[]>([]);

  const { data, loading, error } = useQuery<{ vehicles: Vehicle[] }>(VEHICLES_QUERY);
  const filteredVehicles = useMemo(
    () =>
      data?.vehicles.filter(
        (vehicle) =>
          (!selectedNations.length || selectedNations.includes(vehicle.nation.name)) &&
          (!selectedVehicleTypes.length || selectedVehicleTypes.includes(vehicle.type.name)) &&
          vehicle.level >= levelRange[0] &&
          vehicle.level <= levelRange[1],
      ) || [],
    [selectedNations, selectedVehicleTypes, levelRange, data?.vehicles],
  );

  const totalPages = useMemo(() => Math.ceil(filteredVehicles.length / pageSize), [filteredVehicles, pageSize]);

  console.info('data: ', loading, data, totalPages);

  const handlePageChange = useCallback(
    (nextPage: number) => {
      setCurentPage(nextPage);
      setSearchParams((searchParams) => {
        searchParams.set('page', nextPage.toString());
        return searchParams;
      });

      window.scrollTo(0, 0);
    },
    [setSearchParams],
  );

  const handlePageSizeChange = useCallback(
    (newPageSize: string | null) => {
      if (!newPageSize) return;

      if (currentPage !== 1) {
        handlePageChange(1);
      }

      setSearchParams((searchParams) => {
        searchParams.set('pageSize', newPageSize);
        return searchParams;
      });

      setPageSize(parseInt(newPageSize));
    },
    [currentPage, handlePageChange, setSearchParams],
  );

  const handleSortChange = useCallback(
    (newSortByField: string) => {
      setSearchParams((searchParams) => {
        searchParams.set('sortBy', newSortByField);
        return searchParams;
      });
    },
    [setSearchParams],
  );

  if (loading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  return (
    <Container fluid>
      <Grid justify="space-between" align="center">
        <GridCol span={8} offset={2}>
          <Text>Warships found: {filteredVehicles.length}</Text>
        </GridCol>
        <GridCol span={2}>
          <Select
            allowDeselect={false}
            label="Items per page"
            defaultValue={pageSize.toString()}
            data={['3', '6', '9', '12', '15', '30', '60']}
            onChange={handlePageSizeChange}
          />
        </GridCol>
      </Grid>
      <Grid>
        <Grid.Col span={2}>
          <VehicleFilters
            levelRange={levelRange}
            selectedNations={selectedNations}
            selectedVehicleTypes={selectedVehicleTypes}
            onLevelRangeChange={handleLevelFilter}
            onNationFilterChange={handleNationFilter}
            onTypeFilterChange={handleVehicleTypeFilter}
          />
        </Grid.Col>
        <Grid.Col span={10}>
          {filteredVehicles.length ? (
            <SimpleGrid cols={{ md: 3, sm: 1 }}>
              {filteredVehicles.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((vehicle) => (
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
              No vehicles matching selected filters have been found, try something else.
            </Blockquote>
          )}
          <Pagination withEdges total={totalPages} value={currentPage} onChange={handlePageChange} mt="lg" />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
