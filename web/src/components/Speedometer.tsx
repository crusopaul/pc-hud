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

import { LinearProgressWithLabel } from '../components/LinearProgressWithLabel';
import { ProgressLabelTuple } from '../types/ProgressLabelTuple';
import { VehicleInfo } from "../types/VehicleInfo";

export const Speedometer: React.FC<{ vehicleInfo: VehicleInfo }> = ({ vehicleInfo }) => {
    const speed = vehicleInfo.speed;
    const progress = vehicleInfo.progress;
    const visibility = vehicleInfo.visibility ? "speedometerVisible" : "speedometerHidden";
    const fuelProgress = vehicleInfo.fuelProgress;
    const speedText = speed != 0
        ? Math.round(speed).toString()+" mph"
        : "0 mph";
    const fuelText = Math.round(fuelProgress).toString()+"% fuel";
    const progressTable = [
        {
            label: speedText,
            value: progress,
            width: 40
        } as ProgressLabelTuple,
        {
            label: fuelText,
            value: fuelProgress,
            width: 40
        } as ProgressLabelTuple
    ];

    return (
        <div className={visibility}>
            <LinearProgressWithLabel data={progressTable}/>
        </div>
    );
};
