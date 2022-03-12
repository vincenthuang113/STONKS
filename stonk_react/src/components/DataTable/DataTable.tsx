import React, { useEffect, useState } from 'react';
import { DataGrid, GridApi, GridColDef, GridColTypeDef, GridRenderCellParams, GridRowGroupingModel, GridRowId, GridSelectionModel, GridToolbar, GridValueFormatterParams, GridValueGetterParams, GRID_CHECKBOX_SELECTION_COL_DEF, useGridApiRef } from '@mui/x-data-grid';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Popper, Typography } from '@mui/material';
import { server_calls } from '../../api';
import { useGetData, useGetData_t } from '../../custom-hooks/FetchData';
import { TransactionForm } from '../TransactionForm';

import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { PieChart } from "react-minimal-pie-chart";

// Grid Cell Expand Function Create START
interface GridCellExpandProps {
    value: string;
    width: number;
}

function isOverflown(element: Element): boolean {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

    const GridCellExpand = React.memo(function GridCellExpand(
        props: GridCellExpandProps,
    ) {
        const { width, value } = props;
        const wrapper = React.useRef<HTMLDivElement | null>(null);
        const cellDiv = React.useRef(null);
        const cellValue = React.useRef(null);
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const [showFullCell, setShowFullCell] = React.useState(false);
        const [showPopper, setShowPopper] = React.useState(false);

        const handleMouseEnter = () => {
            const isCurrentlyOverflown = isOverflown(cellValue.current!);
            setShowPopper(isCurrentlyOverflown);
            setAnchorEl(cellDiv.current);
            setShowFullCell(true);
            };
        
            const handleMouseLeave = () => {
            setShowFullCell(false);
            };
        
            React.useEffect(() => {
            if (!showFullCell) {
                return undefined;
            }
        
            function handleKeyDown(nativeEvent: KeyboardEvent) {
                // IE11, Edge (prior to using Bink?) use 'Esc'
                if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                setShowFullCell(false);
                }
            }
        
            document.addEventListener('keydown', handleKeyDown);
        
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
            }, [setShowFullCell, showFullCell]);
        
            return (
            <Box
                ref={wrapper}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                alignItems: 'center',
                lineHeight: '24px',
                width: 1,
                height: 1,
                position: 'relative',
                display: 'flex',
                }}
            >
            <Box
                ref={cellDiv}
                sx={{
                    height: 1,
                    width,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
            }}
            />
            <Box
                ref={cellValue}
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                {value}
            </Box>
                {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{ width: 'fit-content', marginLeft: -17 }}
                >
                    <Paper
                    elevation={3}
                    style={{ minHeight: wrapper.current!.offsetHeight - 3 }}
                    >
                    <Typography variant="body2" style={{ padding: 8 }}>
                        {value}
                    </Typography>
                    </Paper>
                </Popper>
                )}
            </Box>
        );
});

function renderCellExpand(params: GridRenderCellParams<string>) {
    return (
        <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
    );
}
// Grid Cell Expand Create END


// USD format START
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const usdPrice: GridColTypeDef = {
    type: 'number',
    width: 130,
    valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
    cellClassName: 'font-tabular-nums',
};
// USD format END

// Capitalize first letter
function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// const columns - portfolio
const columns: GridColDef[] = [
    { 
        field: 'ticker', 
        headerName: 'Ticker', 
        width: 70, 
        renderCell: renderCellExpand,
        hideable: false
    },
    {
        field: 'company',
        headerName: 'Company',
        minWidth: 150,
        flex: 1,
        renderCell: renderCellExpand
    },
    {
        field: 'industry',
        headerName: 'Industry',
        width: 130,
        flex: 1,
    },
    {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        ...usdPrice,
        width: 80,
    },
    {
        field: 'shares',
        headerName: 'Shares',
        type: 'number',
        width: 130,
        flex: 1,
        editable: true,
    },
    {
        field: 'return',
        headerName: 'Return',
        type: 'number',
        width: 130,
        flex: 1,
        valueFormatter: (params: GridValueFormatterParams) => {
            const valueFormatted = Number(
                (params.value as number)*100
            ).toLocaleString();
            return `${valueFormatted} %`
        },
    },
    {
        field: 'avg_price',
        headerName: 'Avg Price',
        type: 'number',
        ...usdPrice,
        width: 130,
        flex: 1,
    },
    {
        field: 'investment',
        headerName: 'Investment',
        type: 'number',
        ...usdPrice,
        width: 130,
        flex: 1,
    },
    {
        field: 'equity',
        headerName: 'Equity',
        type: 'number',
        ...usdPrice,
        width: 130,
        flex: 1,
    },
    {
        field: 'gl',
        headerName: 'Gain/Loss',
        type: 'number',
        ...usdPrice,
        width: 130,
        flex: 1,
        editable: true,
    },
    
];

// const columns - transaction
const columns_t: GridColDef[] = [
    { 
        field: 'id', 
        headerName: 'ID', 
        width: 40, 
        hideable: false
    },
    { 
        field: 'ticker', 
        headerName: 'Ticker', 
        width: 70, 
        renderCell: renderCellExpand,
        hideable: false,
        flex: 0.5
    },
    {
        field: 'transacted_price',
        headerName: 'Price',
        type: 'number',
        ...usdPrice,
        width: 80,
        flex: 0.5
    },
    {
        field: 'transacted_shares',
        headerName: 'Shares',
        type: 'number',
        width: 80,
        flex: 0.7
    },
    {
        field: 'transacted_investment',
        headerName: 'Subtotal',
        type: 'number',
        ...usdPrice,
        width: 80,
        flex: 1
    },
    {
        field: 'dates',
        headerName: 'Date',
        type: 'dateTime',
        width: 80,
        flex: 1
    },
]
// const rows
// const rows = [
//     { id: 1, ticker: 'AAPL', company: 'Apple', industry: 'Technology', price: 165, shares: 5, return: 1, avg_price: 166, investment: 850, equity: 850, gl: 100 },
//     { id: 2, ticker: 'TSLA', company: 'Tesla', industry: 'Technology', price: 888, shares: 5, return: 1, avg_price: 887, investment: 4000, equity: 4000, gl: 100 },
// ];

// export
export const DataTable = () => {
    let { stonkData, getData } = useGetData();
    let { transData, getTransData } = useGetData_t();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])
    
    let handleOpen = () => {
        setOpen(true)
    }
    
    let handleClose = () => {
        setOpen(false)
    }
    
    let deleteData = async () => {
        for (let id in gridData) {
            await server_calls.delete(`${gridData[id]}`)
        }
        getTransData()
        window.location.reload()
        
    }
    // console.log(transData)


    return (
        <div className='datatable' style={{ height: 400, width: '100%', marginTop: '10px', justifyContent: 'center' }}>
            <div style={{display: 'flex', height: '100%'}}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid
                        getRowId={row => row.ticker}
                        rows={stonkData}
                        columns={columns}
                        components={{Toolbar: GridToolbar}}
                        // initialState={{
                        //     pinnedColumns: { 
                        //         left: ['ticker', GRID_CHECKBOX_SELECTION_COL_DEF.field],
                        //     },
                        // }}


                        pageSize={5}
                        rowsPerPageOptions={[15]}
                        // checkboxSelection
                        // disableSelectionOnClick
                        // disableColumnMenu
                        onSelectionModelChange = {(newSelectionModel) => {setData(newSelectionModel);}}
						{...stonkData} 
                        
                    />
                    <DataGrid
                        style={{display: 'flex', height: '100%', width: '65%', marginTop: '50px'}}
                        getRowId={row => row.ticker}
                        rows={transData}
                        columns={columns_t}
                        components={{Toolbar: GridToolbar}}
                        initialState={{
                            pinnedColumns: { 
                                left: ['ticker', GRID_CHECKBOX_SELECTION_COL_DEF.field],
                            },
                        }}
                        pageSize={5}
                        rowsPerPageOptions={[15]}
                        checkboxSelection
                        // disableSelectionOnClick
                        // disableColumnMenu
                        onSelectionModelChange = {(newSelectionModel) => {setData(newSelectionModel);}}
						{...stonkData} 
                        
                    />
                    <Button onClick={handleOpen}>Update</Button>
                    <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update A Transaction</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Transaction id: {gridData[0]}</DialogContentText>
                        <TransactionForm id={`${gridData[0]}`}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick = {handleClose} color="primary">Cancel</Button>
                        <Button onClick={handleClose} color = "primary">Done</Button> 
                    </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}