import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

interface LinkTabProps {
    label?: string;
    to: string;
}

function LinkTab(props: LinkTabProps) {
    return (
        <Tab
            component={RouterLink}
            {...props}
        />
    );
}

export default function NavTabs() {
    const location = useLocation();
    const navigate = useNavigate();

    const pathToValue: { [key: string]: number } = {
        '/balance': 0,
        '/transfer': 1,
    };

    const valueToPath: { [key: number]: string } = {
        0: '/balance',
        1: '/transfer',
    };

    const currentValue = pathToValue[location.pathname] !== undefined ? pathToValue[location.pathname] : false;

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        const newPath = valueToPath[newValue];
        if (newPath) {
            navigate(newPath);
        }
    };

    return (
        <Box>
            <Tabs
                value={currentValue}
                onChange={handleChange}
                aria-label="nav tabs example"
                role="navigation"
                sx={{
                    '& .MuiTab-root': {
                        textTransform: 'none',
                        color: '#B5B5B5',
                        fontSize: 16,
                        '&.Mui-selected': {
                            color: '#00C5CB',
                        },
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#00C5CB',
                    },
                }}
            >
                <LinkTab label="Saldo" to="/balance" />
                <LinkTab label="Transferir" to="/transfer" />
            </Tabs>
        </Box>
    );
}