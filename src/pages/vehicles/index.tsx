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
  RangeSlider,
  Checkbox,
  Select,
  GridCol,
} from '@mantine/core';

import { VEHICLES_QUERY, Vehicle } from '~/api';
import { VehicleCard } from '~/components/vehicle-card/VehicleCard';

export function VehiclesPage() {
  const [pageSize, setPageSize] = useState(9);
  const [currentPage, setCurentPage] = useState(1);

  const { data, loading, error } = useQuery<{ vehicles: Vehicle[] }>(VEHICLES_QUERY);

  const totalPages = useMemo(() => (data ? data.vehicles.length / pageSize : 0), [data, pageSize]);

  console.info('data: ', loading, data);

  const handlePageChange = useCallback((nextPage: number) => {
    setCurentPage(nextPage);
    window.scrollTo(0, 0);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: string | null) => {
    if (!newPageSize) return;
    setPageSize(parseInt(newPageSize));
  }, []);

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
          <Text>Warships found: {data?.vehicles.length}</Text>
        </GridCol>
        <GridCol span={2}>
          <Select
            label="Items per page"
            defaultValue={pageSize.toString()}
            data={['3', '6', '9', '15', '30', '60']}
            onChange={handlePageSizeChange}
          />
        </GridCol>
      </Grid>
      <Grid>
        <Grid.Col span={2}>
          Nations:
          <Checkbox label="Japan" variant="outline" />
          Type:
          <Checkbox label="Warship" />
          Level:
          <RangeSlider />
        </Grid.Col>
        <Grid.Col span={10}>
          {data?.vehicles.length ? (
            <SimpleGrid cols={{ md: 3, sm: 1 }}>
              {data.vehicles.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((vehicle) => (
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
                />
              ))}
            </SimpleGrid>
          ) : (
            <span>Sorry no results</span>
          )}
          <Pagination withEdges total={totalPages} value={currentPage} onChange={handlePageChange} mt="lg" />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
