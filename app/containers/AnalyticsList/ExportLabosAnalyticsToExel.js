import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { printLabosAnalytics } from './actions';
import PrintButton from '../Reporting/inputsList/PrintButton';

export const ExportLabosAnalyticsToExcel = ({ apiData, fileName, callback, dispatch }) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <PrintButton
      onClick={e => {
        dispatch(
          printLabosAnalytics({
            callback: (res, err) => {
              exportToCSV(res, fileName);
            },
          }),
        );
      }}
    />
  );
};
