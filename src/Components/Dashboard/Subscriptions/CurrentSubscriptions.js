import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
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
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Alert
} from '@mui/material';
import { subscriptionService } from '../../../services';

export const CurrentSubscriptions = () => {

    const [confirmDialog, setConfirmDialog] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState();

    const user = JSON.parse(localStorage.getItem('user'));
    const { data, error, isLoading } = useQuery('currentSubscriptions', () => subscriptionService.fetchCurrentSubscriptions(user?.id));
    const [subscriptions, setSubscriptions] = useState([]);
    const [selectedSubscription, setSelectedSubscription] = useState();

    const removeSubscriptionMutation = useMutation(subscriptionService.removeSubscription)

    useEffect(() => {
        setSubscriptions(data);
    }, [data]);

    const removeSubscription = async () => {
        try {
            await removeSubscriptionMutation.mutateAsync(selectedSubscription);
            const updatedSubscriptions = subscriptions.filter(subscription => subscription.id !== selectedSubscription);
            setSubscriptions(updatedSubscriptions);
            setAlertMessage("Magazines has been successfully unsucsribed.");
            setAlertType('success');
            setAlert(true);
            setConfirmDialog(false);
        } catch (error) {
            console.log(error)
        }
    }

    const handleDialog = () => {
        setConfirmDialog(!confirmDialog)
    }

    const closeAlert = () => {
        setAlert(false);
        setAlertType('');
        setAlertMessage('');
    }

    return(<>
        { isLoading ? <CircularProgress /> : 
        <TableContainer component={Paper}>
            { alert ? <Alert severity={alertType} onClose={closeAlert}> {alertMessage} </Alert>
            : '' }
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name&nbsp;</TableCell>
                        <TableCell align="center">Start Date&nbsp;</TableCell>
                        <TableCell align="center">Actions&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {subscriptions && subscriptions.map((row) => (
                    <TableRow
                        key={row.magazine}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.magazine}
                        </TableCell>
                        <TableCell align="center">{moment(row.startDate).format('LL')}</TableCell>
                        <TableCell align="center">
                            <Button onClick={() => {setSelectedSubscription(row.id); handleDialog()}}>Unsubscribe</Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            <Dialog
                open={confirmDialog}
                onClose={handleDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Unsubscribe Magazine
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure? Your subscription will be cancelled.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDialog}>Cancel</Button>
                <Button onClick={removeSubscription} autoFocus>
                    Confirm
                </Button>
                </DialogActions>
            </Dialog>
        </TableContainer>}
    </>);
};