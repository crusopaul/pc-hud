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
import { Box, LinearProgress, Typography } from '@mui/material';

import { ProgressLabelTuple } from '../types/ProgressLabelTuple';
import { ProgressTable } from '../types/ProgressTable';

export function LinearProgressWithLabel(props: ProgressTable) {
    return (
        <Box sx={{ backgroundColor: 'black', borderRadius: '5px', p: '1px' }}>
            {props.data.map((progress: ProgressLabelTuple) => {
                const percent = progress.value;
                const label = progress.label;
                const textWidth = progress.width.toString();

                return (
                    <Box key={label} sx={{ display: 'flex', alignItems: 'center', m: '10px', color: 'white' }}>
                        <LinearProgress variant="determinate" value={percent} sx={{ width: 'calc(90% - '+textWidth+'px - 10px)', mr: '10px' }}/>
                        <Typography variant="body2" color="text">
                            {label}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
};
