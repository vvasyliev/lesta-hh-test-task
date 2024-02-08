import { Skeleton, Stack } from '@mantine/core';
import { FC } from 'react';

export interface ISkeletonLines {
  amount: number;
  height: string;
  width?: string;
}

export const SkeletonLines: FC<ISkeletonLines> = ({ amount, height, width }) => {
  return (
    <Stack>
      {Array.from({ length: amount }).map((curr, index) => (
        <Skeleton key={index} h={height} w={width} />
      ))}
    </Stack>
  );
};
