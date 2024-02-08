import { Avatar, Container, Flex, Title } from '@mantine/core';

export const Header = () => {
  return (
    <Container fluid py='xs' h='100%'>
      <Flex align='center'>
        <Avatar>WW</Avatar>
        <Title mx='sm' order={4}>World of Warships</Title>
      </Flex>
    </Container>
  );
};
