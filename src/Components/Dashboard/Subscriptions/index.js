import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
    Container,
    Box,
    Tab
} from '@mui/material';
import {
    TabContext,
    TabList,
    TabPanel
} from '@mui/lab'
import { CurrentSubscriptions } from './CurrentSubscriptions';
import { PastSubscriptions } from './PastSubscriptions';

const Subscriptions = () => {
    const [tabValue, setTabValue] = useState('1');
    
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return(<Container maxWidth='xl'>
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
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Current Subscriptions" value="1" />
                    <Tab label="Past Subscriptions" value="2" />
                </TabList>
                </Box>
                <TabPanel value="1">
                    <CurrentSubscriptions />
                </TabPanel>
                <TabPanel value="2">
                    <PastSubscriptions />
                </TabPanel>
            </TabContext>
        </Box>
    </Container>);
};

export default Subscriptions;