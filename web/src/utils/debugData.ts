/**
 * Code copied from: https://github.com/overextended/ox_inventory/blob/main/web/src/utils/debugData.ts
 * Licensed as follows:
 * Ox Inventory
 * Copyright © 2022 Linden, Dunak, Luke
 *
 * This program is free software: you can redistribute it and/or modify it under the terms
 * of the GNU General Public License as published by the Free Software Foundation, either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this
 * program. If not, see https://www.gnu.org/licenses/
 */
import { isEnvBrowser } from './misc';

interface DebugEvent<T = any> {
  action: string;
  data: T;
}

/**
 * Emulates dispatching an event using SendNUIMessage in the lua scripts.
 * This is used when developing in browser
 *
 * @param events - The event you want to cover
 * @param timer - How long until it should trigger (ms)
 */
export const debugData = <P>(events: DebugEvent<P>[], timer = 1000): void => {
  if (import.meta.env.DEV && isEnvBrowser()) {
    for (const event of events) {
      setTimeout(() => {
        window.dispatchEvent(
          new MessageEvent('message', {
            data: {
              action: event.action,
              data: event.data,
            },
          })
        );
      }, timer);
    }
  }
};
