"use client";

import Header from "@/components/Header";
import { useDeleteUserMutation, useGetUsersQuery } from "../../lib/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Trash } from "lucide-react";

export default function UsersPage() {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const columns: GridColDef[] = [
    { field: "userId", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 200, editable: true },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => [
        <IconButton
          key="delete"
          aria-label="Delete"
          onClick={() => deleteUser(id.toString())}
        >
          <Trash size={20} color="red" />
        </IconButton>,
      ],
    },
  ];

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !users) {
    return (
      <div className="py-4 text-center text-red-500">Failed to fetch users</div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <DataGrid
        rows={users}
        columns={columns}
        className="mt-5 h-fit rounded-lg border border-gray-200 bg-white !text-gray-700 shadow"
        getRowId={(row) => row.userId}
        checkboxSelection
        autoHeight
        pageSizeOptions={[10, 25, 50, 100]}
        editMode="row"
      />
    </div>
  );
}
