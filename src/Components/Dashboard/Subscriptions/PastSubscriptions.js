import React from 'react';
import { useQuery } from 'react-query';
import moment from 'moment';
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from '@mui/material';
import { subscriptionService } from '../../../services';

export const PastSubscriptions = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { data, error, isLoading } = useQuery('pastSubscriptions', () => subscriptionService.fetchPastSubscriptions(user?.id));
    return(<>
        { isLoading ? <CircularProgress /> : 
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name&nbsp;</TableCell>
                        <TableCell align="center">Start Date&nbsp;</TableCell>
                        <TableCell align="center">End Date&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {data && data.map((row) => (
                    <TableRow
                        key={row.magazine}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.magazine}
                        </TableCell>
                        <TableCell align="center">{moment(row.startDate).format('LL')}</TableCell>
                        <TableCell align="center">{moment(row.endDate).format('LL')}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>}
    </>);
};