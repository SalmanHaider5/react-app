import React, { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import {
    Container,
    Box,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Alert
} from '@mui/material';
import { magazineService } from '../../services';
import { magazines } from '../../constants';

const Magazines = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState();
    const { data, error, isLoading } = useQuery('magazines', magazineService.fetchAllMagazines);

    const subscribeMutation = useMutation((data) => magazineService.subscribeMagazine(data), {
        onSuccess: data => {
            if(data?.statusCode === 409){
                setAlertMessage(data.message);
                setAlertType('error');
                setAlert(true);
            }else{
                setAlertMessage("Magazines has been successfully sucsribed.");
                setAlertType('success');
                setAlert(true);
            }
        }
    });

    const addSubscription = async (magazineId) => {
        const userId = user?.id;
        const data = {
            userId,
            magazineId
        }
        await subscribeMutation.mutateAsync(data)
    }

    const closeAlert = () => {
        setAlert(false);
        setAlertType('');
        setAlertMessage('');
    }
    
    return(<Container maxWidth='xl'>
        <Box sx={{ textAlign: 'center' }}>
            {isLoading ? <CircularProgress /> : ''}
        </Box>
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                color: 'text.secondary',
                },
                '& .textPrimary': {
                color: 'text.primary',
                },
            }}
        >
            { alert ? <Alert severity={alertType} onClose={closeAlert}> {alertMessage} </Alert>
            : '' }
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name&nbsp;</TableCell>
                            <TableCell align="center">Description&nbsp;</TableCell>
                            <TableCell align="center">Actions&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data && data.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{row.description}</TableCell>
                            <TableCell align="center">
                                <Button onClick={() => addSubscription(row.id)}>Subscribe</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </Container>);
};

export default Magazines;