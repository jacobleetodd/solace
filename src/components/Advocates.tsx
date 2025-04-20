'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { AdvocatesTable } from './AdvocatesTable';
import { Clear, Search } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { AdvocateResponse } from '@/queries/advocates';
import { Advocate } from '@/app/api/advocates/route';
import { AdvocatePageParams } from '@/app/page';

interface AdvocatesProps {
  advocateResponse: AdvocateResponse;
  params: AdvocatePageParams;
}

export const Advocates: FC<AdvocatesProps> = ({ advocateResponse, params }) => {
  const router = useRouter();

  const [search, setSearch] = useState<string>(params.search ?? '');
  const [selectedAdvocate, setSelectedAdvocate] = useState<Advocate | null>(
    null
  );

  const handleSearch = () => {
    search ? router.push(`/?search=${search}&page=0`) : router.push('/?page=0');
  };

  const handleClearSearch = () => {
    setSearch('');
    router.push('/?page=0');
  };

  const handleSpecialtiesClick = (advocate: Advocate) => {
    setSelectedAdvocate(advocate);
  };

  return (
    <>
      <Typography variant="h3">Solace Advocates</Typography>
      <Stack alignItems="start" direction="row" spacing={1} width="100%">
        <FormControl margin="normal">
          <TextField
            aria-labelledby="name-label"
            id="search"
            label="Search"
            name="search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            size="small"
            value={search}
            variant="outlined"
          />
        </FormControl>
        <IconButton onClick={handleSearch}>
          <Search />
        </IconButton>
        <IconButton onClick={handleClearSearch}>
          <Clear />
        </IconButton>
      </Stack>
      <AdvocatesTable
        advocateResponse={advocateResponse}
        handleSpecialtiesClick={handleSpecialtiesClick}
        params={params}
      />
      <Dialog
        open={!!selectedAdvocate}
        onClose={() => setSelectedAdvocate(null)}
      >
        {selectedAdvocate && (
          <>
            <DialogTitle>{`${selectedAdvocate?.firstName} ${selectedAdvocate?.lastName}'s Specialties`}</DialogTitle>
            <DialogContent>
              <List>
                {selectedAdvocate?.specialties?.map((advocate) => (
                  <ListItem key={advocate}>{advocate}</ListItem>
                ))}
              </List>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
};
