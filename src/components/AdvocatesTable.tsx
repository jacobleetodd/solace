'use client';
import { Advocate } from '@/app/api/advocates/route';
import { AdvocatePageParams } from '@/app/page';
import { AdvocateResponse } from '@/queries/advocates';
import { Button } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  useGridApiRef,
} from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useMemo } from 'react';

interface AdvocatesPropsTable {
  advocateResponse: AdvocateResponse;
  handleSpecialtiesClick: (advocate: Advocate) => void;
  params: AdvocatePageParams;
}

export const AdvocatesTable: FC<AdvocatesPropsTable> = ({
  advocateResponse,
  handleSpecialtiesClick,
  params,
}) => {
  const router = useRouter();
  const apiRef = useGridApiRef();

  useEffect(() => {
    apiRef.current?.setPage(params.page ? Number(params.page) : 0);
  }, [apiRef, params.page]);

  const columns: GridColDef<Advocate>[] = useMemo(
    () => [
      {
        field: 'firstName',
        flex: 1,
        headerName: 'First Name',
        sortable: false,
      },
      { field: 'lastName', flex: 1, headerName: 'Last Name', sortable: false },
      { field: 'city', flex: 1, headerName: 'City', sortable: false },
      { field: 'degree', flex: 1, headerName: 'Degree', sortable: false },
      {
        field: 'specialties', // TODO: display these better
        flex: 1,
        headerName: 'Specialties',
        sortable: false,
        renderCell: (params) =>
          params.row.specialties && (
            <Button
              onClick={() => handleSpecialtiesClick(params.row)}
              variant="text"
            >{`View ${params.row.specialties.length} specialties`}</Button>
          ),
      },
      {
        field: 'yearsOfExperience',
        flex: 1,
        headerName: 'Years of Experience',
        sortable: false,
      },
      {
        field: 'phoneNumber',
        flex: 1,
        headerName: 'Phone Number',
        sortable: false,
      },
    ],
    []
  );

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    params.search
      ? router.push(`/?search=${params.search}&page=${model.page}`)
      : router.push(`/?page=${model.page}`);
  };

  return (
    <DataGrid
      apiRef={apiRef}
      columns={columns}
      disableColumnMenu
      disableRowSelectionOnClick
      initialState={{
        pagination: {
          paginationModel: { page: Number(params.page), pageSize: 5 },
        },
      }}
      onPaginationModelChange={handlePaginationModelChange}
      paginationMode="server"
      pageSizeOptions={[5]}
      rows={advocateResponse.data}
      // TODO: the default row count of 15 here is not correct
      // remove the default once the correct total number of rows is returned from the database
      rowCount={advocateResponse.count ?? 15}
      sx={{
        width: '100%',
        '.MuiDataGrid-cell:focus': {
          outline: 'none',
        },
        '& .MuiDataGrid-row:hover': {
          cursor: 'pointer',
        },
      }}
    />
  );
};
