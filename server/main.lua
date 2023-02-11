--[[
pc-hud
Copyright (C) 2023 crusopaul <https://github.com/crusopaul>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
--]]
local pcNeeds = exports['pc-needs']

-- pc-needs Consumer
local function consumptionLoop()
    for _,v in pairs(ESX.GetExtendedPlayers()) do
        TriggerClientEvent('pc-hud:client:setStatusValue', v.source, 'hunger', pcNeeds:getStatusAmount(v.identifier, 'hunger') / 1000)
        TriggerClientEvent('pc-hud:client:setStatusValue', v.source, 'thirst', pcNeeds:getStatusAmount(v.identifier, 'thirst') / 1000)
        TriggerClientEvent('pc-hud:client:setStatusValue', v.source, 'stress', pcNeeds:getStatusAmount(v.identifier, 'stress') / 1000)
    end
end

AddEventHandler('pc-needs:server:tick', function()
    consumptionLoop()
end)
