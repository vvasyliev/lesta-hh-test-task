import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import { Card, Loader, SimpleGrid, Image, Text, Group, Badge, Title, Pagination } from '@mantine/core';

import { GET_VEHICLES_QUERY, Vehicle } from '~/shared/api';

export function VehiclesPage() {
  const { data, loading, error } = useQuery<{ vehicles: Vehicle[] }>(GET_VEHICLES_QUERY);

  console.info('data: ', loading, data);

  const pageSize = 15;
  const totalPages = useMemo(() => (data ? data.vehicles.length / pageSize : 0), [data]);
  const [currentPage, setCurentPage] = useState(1);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : data?.vehicles.length ? (
        <SimpleGrid cols={3}>
          {data.vehicles.slice(0, pageSize).map((vehicle) => (
            <Card shadow="sm" withBorder key={`${vehicle.title}-${vehicle.level}`} ta="left">
              <Card.Section>
                <Image src={vehicle.icons.medium} alt={vehicle.title} />
              </Card.Section>
              <Group justify="space-between" my="md">
                <Title order={3}>{vehicle.title}</Title>
                <Badge variant="dot" color={vehicle.nation.color}>
                  {vehicle.nation.title}
                </Badge>
              </Group>
              <Text>Level: {vehicle.level}</Text>
              <Text>{vehicle.description}</Text>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <span>Sorry no results</span>
      )}
      <Pagination withEdges total={totalPages} value={currentPage} onChange={setCurentPage} mt='lg' />
    </div>
  );
}

