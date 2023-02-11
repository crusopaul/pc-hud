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

import { fas } from '@fortawesome/free-solid-svg-icons';
import { IconName, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';

import { StatusIcon } from "../types/StatusIcon";
import { colorPartialFill } from "../utils/colorPartialFill";

library.add(fas);

export const StatusBar: React.FC<{ statusIcons: StatusIcon[] }> = ({ statusIcons }) => {
    const statusItems = statusIcons.map((statusIcon) => {
        const percent = statusIcon.percent;
        const key = statusIcon.name+":"+percent.toString();
        const borderColor = statusIcon.color;
        const background = colorPartialFill(borderColor, percent);
        const icon = statusIcon.icon as IconName;

        return (
            <Box key={key} className="statusIcon" sx={{ background: background }}>
                <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
            </Box>
        );
    });

    const length = statusIcons.length

    return (
        <Box className="statusBar" sx={{ left: 'calc(50% - ('+length+' * 25px))' }}>
            {statusItems}
        </Box>
    );
};
