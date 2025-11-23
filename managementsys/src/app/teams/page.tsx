"use client";
import React from 'react'
import { useGetTeamsQuery } from '@/state/api'
import { useAppSelector } from '../redux';
import Header from '@/(components)/Header';
import { DataGrid,GridColDef,GridToolbarContainer,GridToolbarFilterButton,GridToolbarExport } from '@mui/x-data-grid';
import Image from 'next/image';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';

const CustomToolbar=()=>(
        <GridToolbarContainer className="toolbar flex gap-2">
            <GridToolbarFilterButton/>
            <GridToolbarExport/>
        </GridToolbarContainer>
   
);
const columns:GridColDef[]=[
    {field:"id",headerName:"TeamID",width:100},
    {field:"teamName",headerName:"Team Name",width:200},
    {field:"productOwnerUsername",headerName:"Product Owner",width:200},
    {field:"projectManagerUsername",headerName:"Project Manager",width:200},
];
const Teams = () => {
    
    const {data:teams,isLoading,isError,error} = useGetTeamsQuery();
    const isDarkMode=useAppSelector((state)=>state.global.isDarkMode);
    if(isLoading) return <div>Loading...</div>;
    if(isError) return <div>Error occurred while fetching teams</div>;
    return (
        <div className="flex w-full flex-col gap-4 p-8">
            <Header name="Teams"/>
            <div style={{height:650,width:"100%"}}>
                <DataGrid
                rows={teams || []}
                columns={columns}
                getRowId={(row)=>row.id}
                pagination
                slots={{
                    toolbar: CustomToolbar,
                }}
                className={dataGridClassNames}
                sx={dataGridSxStyles(isDarkMode)}
            
                />
            </div>
        </div>
    )
}
export default Teams;