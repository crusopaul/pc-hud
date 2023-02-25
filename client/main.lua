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
-- Event for managing state
local hunger = 0
local thirst = 0
local stress = 0

RegisterNetEvent('pc-hud:client:setStatusValue', function(name, value)
    if name == 'hunger' then
        hunger = value
    elseif name == 'thirst' then
        thirst = value
    elseif name == 'stress' then
        stress = value
    end
end)

-- Toggle visibility on login / logout & respect command state
local visibility = 'hidden'
local commandVisibility = true

CreateThread(function()
    while true do
        if ESX.PlayerLoaded then
            visibility = 'visible'
        else
            visibility = 'hidden'
        end

        if commandVisibility then
            SendNUIMessage({
                action = 'setVisibility',
                data = visibility
            })
        else
            SendNUIMessage({
                action = 'setVisibility',
                data = 'hidden'
            })
        end

        Wait(1000)
    end
end)

RegisterCommand('hud', function()
    commandVisibility = not commandVisibility
end, false)

-- Health, stamina, and stress thread
CreateThread(function()
    while true do
        while visibility == 'visible' do
            SendNUIMessage({
                action = 'setStatusIcons',
                data = {
                    {
                        name = "health",
                        color = "#A52A2A",
                        icon = "heart",
                        percent = GetEntityHealth(GetPlayerPed(-1)) - 100,
                    },
                    {
                        name = "stamina",
                        color = "#FFCC00",
                        icon = "person-running",
                        percent = GetPlayerStamina(PlayerId()),
                    },
                    {
                        name = "hunger",
                        color = "#FF9D00",
                        icon = "bread-slice",
                        percent = hunger,
                    },
                    {
                        name = "thirst",
                        color = "#8A2BE2",
                        icon = "droplet",
                        percent = thirst,
                    },
                    {
                        name = "stress",
                        color = "#00FCB9",
                        icon = "heart-circle-bolt",
                        percent = stress,
                    },
                }
            })

            Wait(500)
        end

        Wait(1000)
    end
end)

-- Speedometer thread
CreateThread(function()
    while true do
        while visibility == 'visible' do
            local vehicle = GetVehiclePedIsIn(GetPlayerPed(-1), false)

            if vehicle ~= 0 then
                local seatedPed = GetPedInVehicleSeat(vehicle, -1)

                if seatedPed == GetPlayerPed(-1) then
                    local speed = GetEntitySpeed(vehicle) * 2.23694

                    SendNUIMessage({
                        action = 'setSpeed',
                        data = {
                            speed = speed,
                            progress = speed / 180 * 100,
                            visibility = true,
                            fuelProgress = GetVehicleFuelLevel(vehicle)
                        }
                    })

                    Wait(100)
                else
                    SendNUIMessage({
                        action = 'setSpeed',
                        data = {
                            speed = 0,
                            progress = 0,
                            visibility = false,
                            fuelProgress = 0
                        }
                    })

                    Wait(1000)
                end
            else
                SendNUIMessage({
                    action = 'setSpeed',
                    data = {
                        speed = 0,
                        progress = 0,
                        visibility = false,
                        fuelProgress = 0
                    }
                })

                Wait(1000)
            end
        end

        Wait(1000)
    end
end)
