import { useQuery } from '@apollo/client';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
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
  const [levelRange, setLevelRange] = useState<[number, number]>([1, 11]);
  const [selectedNations, setSelectedNations] = useState<string[]>([]);
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>([]);

  const { data, loading } = useQuery<{ vehicles: Vehicle[] }>(VEHICLES_QUERY);
  const filteredVehicles = useMemo(
    () =>
      data?.vehicles.filter(
        (vehicle) =>
          (!selectedNations.length || selectedNations.includes(vehicle.nation.name)) &&
          (!selectedVehicleTypes.length || selectedVehicleTypes.includes(vehicle.type.name)) &&
          vehicle.level >= levelRange[0] &&
          vehicle.level <= levelRange[1],
      ) || [],
    [selectedNations, selectedVehicleTypes, levelRange, data],
  );
  const totalPages = useMemo(() => Math.ceil(filteredVehicles.length / pageSize), [filteredVehicles, pageSize]);

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

      setSearchParams((searchParams) => {
        searchParams.set('pageSize', newPageSize);
        return searchParams;
      });

      setPageSize(parseInt(newPageSize));
    },
    [setSearchParams],
  );

    useEffect(() => {
    if (currentPage !== 1) {
      handlePageChange(1);
    }
  // it's necessary to redirect user to page 1 only after filter changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelRange, selectedNations, selectedVehicleTypes]);

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
        <GridCol span={8} offset={{ base: 0, sm: 2 }}>
          <Text>Warships found: {filteredVehicles.length}</Text>
        </GridCol>
        <GridCol span={{ base: 4, sm: 2 }}>
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
        <Grid.Col span={{ base: 12, sm: 2 }} mb={{ base: 'sm', sm: 0 }}>
          <Suspense fallback={<Loader />}>
            <VehicleFilters
              levelRange={levelRange}
              selectedNations={selectedNations}
              selectedVehicleTypes={selectedVehicleTypes}
              onLevelRangeChange={setLevelRange}
              onNationFilterChange={setSelectedNations}
              onTypeFilterChange={setSelectedVehicleTypes}
            />
          </Suspense>
        </Grid.Col>
        <Grid.Col span={{ sm: 10, base: 12 }}>
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
              <Text>No vehicles matching selected filters have been found, try something else.</Text>
            </Blockquote>
          )}
          <Pagination withEdges total={totalPages} value={currentPage} onChange={handlePageChange} mt="lg" />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
