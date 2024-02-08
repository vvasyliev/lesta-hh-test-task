import { Text, Image, Badge, Card, Center, Group, Title } from '@mantine/core';
import { FC } from 'react';

export interface IVehicleCard {
  title: string;
  level: number;
  description: string;
  vehicleIconSrc: string;
  vehicleNation: {
    title: string;
    color: string;
    iconSrc: string;
  };
  vehicleType: {
    title: string;
    iconSrc: string;
  };
}

export const VehicleCard: FC<IVehicleCard> = ({
  title,
  level,
  description,
  vehicleIconSrc,
  vehicleNation,
  vehicleType,
}) => {
  return (
    <Card shadow="sm" withBorder key={`${title}-${level}`} ta="left">
      <Center>
        <Title order={3} mb="sm">
          {title}
        </Title>
      </Center>
      <Card.Section>
        <Image src={vehicleIconSrc} alt={title} fit="contain" />
      </Card.Section>
      <Card.Section>
        <Group justify='center'>
          <Image my="md" src={vehicleNation.iconSrc} h="100" fit="contain" alt={vehicleNation.title} />
          <Image my="md" src={vehicleType.iconSrc} h="100" fit="contain" alt={vehicleType.title} />
        </Group>
      </Card.Section>
      <Group justify="space-between">
        <Badge variant="dot" color={vehicleNation.color} mt="xs" mb="sm">
          {vehicleNation.title}
        </Badge>
        <Badge variant="outline" color="dark" mt="xs" mb="sm">
          {vehicleType.title}
        </Badge>
        <Badge>Level: {level}</Badge>
      </Group>
      <Text>{description}</Text>
    </Card>
  );
};
