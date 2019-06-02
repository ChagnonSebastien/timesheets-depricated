import Handsontable from "handsontable";

export const PAY_TEMPLATE: any[][] = [
    ['', '', '', '', '', 'CODES'],
    ['DATE', 'JOUR', 'ARRIVÉE', 'DÉPART', 'DESCRIPTION'],
    ['', 'Dim'],
    ['', 'Lun'],
    ['', 'Mar'],
    ['', 'Mer'],
    ['', 'Jeu'],
    ['', 'Ven'],
    ['', 'Sam'],
    ['', 'Dim'],
    ['', 'Lun'],
    ['', 'Mar'],
    ['', 'Mer'],
    ['', 'Jeu'],
    ['', 'Ven'],
    ['', 'Sam'],
    ['TOTAL HEURES PAR TÂCHE'],
    ['TAUX PAR TÂCHE'],
    ['TOTAL PAR TÂCHE'],
    ['TOTAL PAIE'],
  ];

export interface GetAllowedCodesFunction {
    () : number[];
}

export function getSettings(getAllowedCodes: GetAllowedCodesFunction): Handsontable.GridSettings {
    return  {
        minRows: 20,
        minCols: 10,
        renderer: (instance, td, row, col, prop, value, cellProperties) => {

          // Uneditable cells
          if ((row > 15 && col > 4) || (row > 0 && row < 16 && col < 2) || (row === 1 && col < 5) || (row === 0 && col === 5)) {
            td.style.background = '#e8f3ff';
          }

          // Period total
          if ((row === 19 && col === 5)) {
            td.style.background = '#6da5ff';
            td.style.fontWeight = "bold";
          }

          // Smaller sum fonts
          if (((row === 17 || row === 18) && col > 4)) {
            td.style.fontSize = `${1 - ((String(value).length - 4)  * 0.1)}em`
          }

          // The code must be allowed
          if (row === 1 && col > 4) {
            if (![null].concat(getAllowedCodes()).includes(value))
              td.style.background = '#ffb7b7';
          }

          // A description and hours must be provided
          if (row > 1 && row < 16 && col > 1 && col < 5) {
            if (instance.getData(row, 5, row, instance.countCols())[0].join('').trim() !== '')
              if (value === null || String(value).trim() === '' || String(value) === "00:00")
                td.style.background = '#ffb7b7'
          }

          // Content alignement
          td.style.textAlign = "center"
          td.style.verticalAlign = "middle"

          // Bottom sum labels
          if ((row > 15 && col === 0)) {
            td.style.borderLeft = "0";
            td.style.borderBottom = "0";
            td.style.textAlign = "right"
          }

          // Day descriptions
          if ((row > 1 && row < 16 && col === 4)) {
            td.style.textAlign = "left"
          }

          // Content
          td.innerText = value;
        },
        cells: (i, j) => {
          let meta: Handsontable.CellMeta = {};

          // Uneditable cells
          if ((i < 2 || j < 2 || i > 15) && !(i === 1 && j > 4)) {
            meta.readOnly = true;
          }

          return meta;
        },
        colWidths: i => {
          switch(i) {
            case 0:
            case 1:
              return 50
            case 2:
            case 3:
              return 80
            case 4:
              return 300
            default:
              return 45
    
          }
        },
        mergeCells: [
          {col: 5, colspan: 5, row: 0, rowspan: 1},
          {col: 0, colspan: 5, row: 0, rowspan: 1},
          {col: 0, colspan: 5, row: 16, rowspan: 1},
          {col: 0, colspan: 5, row: 17, rowspan: 1},
          {col: 0, colspan: 5, row: 18, rowspan: 1},
          {col: 0, colspan: 5, row: 19, rowspan: 1},
          {col: 5, colspan: 5, row: 19, rowspan: 1},
        ],
        customBorders: [
          {
           range: {from: {row: 2, col: 5}, to:{row: 15, col: 9}},
           top: {},
           bottom: {},
          },
        ],
    };
}
