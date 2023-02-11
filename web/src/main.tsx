/**
 * pc-hud
 * Copyright (C) 2023 crusopaul <https://github.com/crusopaul>
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Box, createTheme, ThemeProvider } from '@mui/material';

import './index.scss';
import { StatusBar, Speedometer } from './components';
import { useNuiEvent } from './hooks/useNuiEvent';
import { StatusIcon } from './types/StatusIcon';
import { VehicleInfo } from './types/VehicleInfo';
import { debugData } from './utils/debugData';
import { isEnvBrowser } from './utils/misc';

const root = document.getElementById('root');

const theme = createTheme({
    palette: {
        primary: {
            main: '#9177bf'
        },
        secondary: {
            main: '#8fbceb'
        }
    },
});

const App : React.FC = () => {
    const [statusIcons, setStatusIcons] = React.useState<StatusIcon[]>([]);

    useNuiEvent<StatusIcon[]>('setStatusIcons', (data) => {
        setStatusIcons(data);
    });

    const [speed, setSpeed] = React.useState<VehicleInfo>({ speed: 0, progress: 0, visibility: false, fuelProgress: 0 });

    useNuiEvent<VehicleInfo>('setSpeed', (data) => {
        setSpeed(data);
    });

    const [visibility, setVisibility] = React.useState<string>('hidden');

    useNuiEvent<string>('setVisibility', (data) => {
        setVisibility(data);
    });

    return (
        <Box component="div" sx={{ visibility: visibility }}>
            <StatusBar statusIcons={statusIcons} />
            <Speedometer vehicleInfo={speed}/>
        </Box>
    );
};

createRoot(root!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);

debugData([
  {
    action: 'setStatusIcons',
    data: [
        {
            name: "health",
            color: "#A52A2A",
            icon: "heart",
            percent: 10,
        },
        {
            name: "hunger",
            color: "#F5A742",
            icon: "bread-slice",
            percent: 75,
        },
        {
            name: "thirst",
            color: "#8A2BE2",
            icon: "droplet",
            percent: 95,
        },
    ],
  },
  {
    action: 'setSpeed',
    data: {
        speed: 40,
        progress: 30,
        visibility: true,
        fuelProgress: 80
    },
  },
]);
