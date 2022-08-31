// change the object format to meet select input criteria

import { useMemo } from 'react';
import _ from 'lodash';

/**
 *
 * @param {rows} __array
 * @param {
 * label:string,
 * value:string,
 * allow: string[]
 * } __criteria
 * @returns formated rows
 *
 */

export function useSelectFormat(__array, __criteria) {
  // prevent re-calculation every time the component re-render
  return useMemo(
    () => {
      return _.map(__array, item => {
        const obj = {
          value: item[__criteria.value],
          label: item[__criteria.label],
          id: item.id,
        };
        // check if there is any allowed keys
        if (__criteria && __criteria.allow) {
          _.map(__criteria.allow, key => {
            // map allowed key and set them with matched values
            _.merge(obj, {
              [key]: item[key],
            });
          });
        }
        return obj;
      });
    },
    [__array],
  );
}
