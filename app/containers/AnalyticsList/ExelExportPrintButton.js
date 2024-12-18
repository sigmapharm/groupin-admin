import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { printPharmaciesAnalytics } from './actions';
import PrintButton from '../Reporting/inputsList/PrintButton';

export const ExportToExcel = ({ apiData, fileName, callback, dispatch }) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (_apiData, fileName) => {
    // Transformer les données pour regrouper par nom et mois
    const formattedData = [];
    const groupedData = {};

    apiData = apiData.map(item => ({
      ...item,
      nom: item.denomination,
    }));

    // Initialiser la structure des données avec tous les laboratoires
    const uniqueLabs = [...new Set(apiData.map(item => item.nom))];
    uniqueLabs.forEach(labName => {
      groupedData[labName] = {
        nom: labName,
        janvier: 0,
        février: 0,
        mars: 0,
        avril: 0,
        mai: 0,
        juin: 0,
        juillet: 0,
        août: 0,
        septembre: 0,
        octobre: 0,
        novembre: 0,
        décembre: 0,
        total: 0,
      };
    });

    // Remplir les données pour chaque mois
    apiData.forEach(item => {
      const monthMap = {
        1: 'janvier',
        2: 'février',
        3: 'mars',
        4: 'avril',
        5: 'mai',
        6: 'juin',
        7: 'juillet',
        8: 'août',
        9: 'septembre',
        10: 'octobre',
        11: 'novembre',
        12: 'décembre',
      };

      const monthName = monthMap[item.mois];
      if (monthName && groupedData[item.nom]) {
        groupedData[item.nom][monthName] = Number(item.ca).toFixed(2);
        groupedData[item.nom].total += Number(item.ca);
      }
    });

    // Convertir en tableau et formater le total
    Object.values(groupedData).forEach(item => {
      item.total = Number(item.total).toFixed(2);
      formattedData.push(item);
    });

    // Trier par nom du laboratoire
    formattedData.sort((a, b) => a.nom.localeCompare(b.nom));

    console.log(apiData);

    apiData = formattedData;
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
          printPharmaciesAnalytics({
            callback: (res, err) => {
              exportToCSV(res, fileName);
            },
          }),
        );
      }}
    />
  );
};
