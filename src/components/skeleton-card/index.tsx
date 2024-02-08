import { Card, Center, Group, Skeleton } from '@mantine/core';
import { SkeletonLines } from '~/components/skeleton-lines';

export const SkeletonCard = () => {
  return (
    <Card shadow="sm" withBorder ta="left">
      <Center>
        <Skeleton h="30" mb="sm" />
      </Center>
      <Skeleton h="200" />
      <Group justify="center" mt="sm" wrap='nowrap'>
        <Skeleton h="100" width="50%" />
        <Skeleton h="100" width="50%" />
      </Group>
      <Group justify="space-between" my="sm">
        <Skeleton height="20" width="60" />
        <Skeleton height="20" width="60" />
        <Skeleton height="20" width="60" />
      </Group>
      <SkeletonLines height="10" amount={10} />
    </Card>
  );
};
