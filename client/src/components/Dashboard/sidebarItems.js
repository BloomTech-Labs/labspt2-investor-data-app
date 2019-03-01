import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';
import FolderIcon from '@material-ui/icons/Folder';
import ChartIcon from '@material-ui/icons/ShowChart';
import SettingsIcon from '@material-ui/icons/Settings';
import MoneyIcon from '@material-ui/icons/AttachMoney';


export const sidebar = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ChartIcon />
            </ListItemIcon>
            <ListItemText primary="Targets" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <MoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Billing" />
        </ListItem>
    </div>
)