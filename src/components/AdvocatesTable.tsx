'use client';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { FC, useMemo } from 'react';

interface TableAdvocatesProps {
  initialPage?: number;
  advocates: any[]; // TODO
  rowCount: number;
}

export const TableAdvocates: FC<TableAdvocatesProps> = ({
  initialPage = 0,
  advocates,
  rowCount,
}) => {
  const router = useRouter();

  const columns = useMemo(
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
        field: 'specialties',
        flex: 1,
        headerName: 'Specialties',
        sortable: false,
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

  return (
    <DataGrid
      columns={columns}
      disableColumnMenu
      disableRowSelectionOnClick
      getRowId={
        (row: any) => `${row.firstName}-${row.lastName}-${row.phoneNumber}` // TODO
      }
      initialState={{
        pagination: { paginationModel: { page: initialPage, pageSize: 20 } },
      }}
      paginationMode="server"
      pageSizeOptions={[20]}
      rows={advocates}
      rowCount={rowCount}
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
