import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, Container, Grid, Select, GridCol, Group, Loader } from '@mantine/core';

import { vehiclesQuery, Vehicle } from '~/api';
import { useSearchParams } from 'react-router-dom';
import { VehicleFilters } from '~/containers/vehicle-filters';
import { VehicleListing } from '~/components/vehicle-listing';

const DEFAULT_PAGE_SIZE = 9;
const PAGE_SIZE_OPTIONS = ['3', '6', '9', '12', '15', '30', '60'];
const LEVEL_RANGE_OPTIONS: [number, number] = [1, 11];

export function VehiclesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize, setPageSize] = useState(parseInt(searchParams.get('pageSize')!) || DEFAULT_PAGE_SIZE);
  const [currentPage, setCurentPage] = useState(parseInt(searchParams.get('page')!) || 1);
  const [levelRange, setLevelRange] = useState<[number, number]>(LEVEL_RANGE_OPTIONS);
  const [selectedNations, setSelectedNations] = useState<string[]>([]);
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>([]);

  const { data, loading } = useQuery<{ vehicles: Vehicle[] }>(vehiclesQuery);
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

  return (
    <Container fluid>
      <Grid justify="space-between" align="center">
        <GridCol span={8} offset={{ base: 0, sm: 2 }}>
          <Group gap="5">
            <Text>Warships found:</Text>
            {loading ? <Loader color="gray" size="xs" type="bars" /> : <Text>{filteredVehicles.length}</Text>}
          </Group>
        </GridCol>
        <GridCol span={{ base: 4, sm: 2 }}>
          <Select
            allowDeselect={false}
            label="Items per page"
            defaultValue={pageSize.toString()}
            data={PAGE_SIZE_OPTIONS}
            onChange={handlePageSizeChange}
          />
        </GridCol>
      </Grid>
      <Grid>
        <Grid.Col span={{ base: 12, sm: 2 }} mb={{ base: 'sm', sm: 0 }}>
          <VehicleFilters
            levelRange={levelRange}
            selectedNations={selectedNations}
            selectedVehicleTypes={selectedVehicleTypes}
            onLevelRangeChange={setLevelRange}
            onNationFilterChange={setSelectedNations}
            onTypeFilterChange={setSelectedVehicleTypes}
          />
        </Grid.Col>
        <Grid.Col span={{ sm: 10, base: 12 }}>
          <VehicleListing
            vehicles={filteredVehicles}
            currentPage={currentPage}
            pageSize={pageSize}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={loading}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
