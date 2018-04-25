
import { cloneDeep } from '../function/data';

export interface DataTableConfigs {
  rows: number,
  pageLinks: number,
  lazy: boolean,
  paginator: boolean,
  alwaysShowPaginator: boolean,
  totalRecords?: number,
  value?: Array<any>
}

export function datatableConfigs() {
  let datatableConfigs: DataTableConfigs = {
    rows: 12,
    pageLinks: 5,
    lazy: true,
    paginator: true,
    alwaysShowPaginator: false,
    totalRecords: null,
    value: []
  }
  return cloneDeep(datatableConfigs);
}
