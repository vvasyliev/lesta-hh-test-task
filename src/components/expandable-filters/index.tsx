import { Button, Checkbox, Collapse, SimpleGrid, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC, useCallback } from 'react';
import { SkeletonLines } from '~/components/skeleton-lines';

export type Filter = {
  label: string;
  value: string;
};

export interface IExpandableFilterGroup {
  title: string;
  filterList: Filter[];
  selectedFilters: string[];
  onChange: (selectedFilters: string[]) => void;
  showAmount?: number;
  isLoading?: boolean;
}

export const ExpandableFilterGroup: FC<IExpandableFilterGroup> = ({
  title,
  filterList,
  selectedFilters,
  onChange,
  showAmount = 5,
  isLoading = false,
}) => {
  const [opened, { toggle }] = useDisclosure(false);

  const renderCheckbox = useCallback(
    (filter: Filter) => <Checkbox key={filter.value} label={filter.label} value={filter.value} size="xs" radius="xs" />,
    [],
  );

  return (
    <Stack mb="sm">
      <Title order={6}>{title}:</Title>
      {isLoading ? (
        <SkeletonLines height="20" amount={5} />
      ) : (
        <Checkbox.Group value={selectedFilters} onChange={onChange}>
          <SimpleGrid>
            {filterList.slice(0, showAmount).map(renderCheckbox)}
            <Collapse in={opened}>
              <SimpleGrid>{filterList.slice(showAmount).map(renderCheckbox)}</SimpleGrid>
            </Collapse>
          </SimpleGrid>
        </Checkbox.Group>
      )}
      {showAmount < filterList.length && (
        <Button variant="white" onClick={toggle}>
          {opened ? 'Hide' : 'Show all'}
        </Button>
      )}
    </Stack>
  );
};
