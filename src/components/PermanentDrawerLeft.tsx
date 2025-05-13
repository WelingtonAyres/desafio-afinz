// import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { Outlet } from 'react-router-dom'; // Importar Outlet
import NavTabs from './NavTabs'; // Importar o novo componente NavTabs
import IconCobrancas from '../assets/IconCobrancas.svg';
import IconExtrato from '../assets/IconExtrato.svg';
import IconPagamentos from '../assets/IconPagamentos.svg';
import IconTransferencia from '../assets/IconTransferencia.svg';
import logoVector from '../assets/Vector.svg';

const drawerWidth = 193;

export default function PermanentDrawerLeft() {

    // ['Extrato', 'Transferências', 'Pagamentos', 'Cobrança']
    const itemsMenu: {
        text: string;
        icon: string;
    }[] = [{
        text: "Extrato",
        icon: IconCobrancas
    },
    {
        text: "Transferências",
        icon: IconExtrato
    },
    {
        text: "Pagamentos",
        icon: IconPagamentos
    },
    {
        text: "Cobrança",
        icon: IconTransferencia
    },
        ]

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: 'white' }}
            >
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
                        <NavTabs />
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: 'black',
                        color: 'white',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar sx={{ pt: 2 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: -5, marginBottom: 2 }}>
                    <Avatar
                        src={logoVector}
                        alt="Logo"
                        sx={{
                            width: 67,
                            height: 60,
                            mb: 1,
                            borderRadius: 0,
                            '& .MuiAvatar-img': {
                                objectFit: 'contain',
                            },
                        }}
                        variant="square"
                    />
                    <Typography component="div" sx={{ color: 'white', fontSize: 16 }}>
                        TechSolutions LTDA
                    </Typography>
                    <Typography component="div" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}>
                        CNPJ: 95.279.038/0001-51
                    </Typography>
                </Box>
                <Typography sx={{ color: '#AAAAAA', pl: 2, pt: 2, pb: 1, fontSize: 12 }}>
                    CONTA
                </Typography>
                <List>
                    {itemsMenu.map((item) => {
                        return (<ListItem key={item.text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{ minWidth: 'auto', marginRight: 1.5, color: 'white' }}>
                                    <Avatar src={item.icon}
                                        sx={{
                                            width: 13.3,
                                            height: 13.3,
                                            borderRadius: 0,
                                        }}
                                    ></Avatar>
                                </ListItemIcon>
                                <ListItemText primary={item.text} slotProps={{ primary: { sx: { fontSize: 12 } } }} />
                            </ListItemButton>
                        </ListItem>);
                    })}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box >
    );
}