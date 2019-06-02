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
          if ((row > 15 && col > 4) || (row > 0 && row < 16 && col < 2) || (row === 1 && col < 5) || (row === 0 && col === 5)) {
            td.style.background = '#e8f3ff';
          }
          if ((row === 19 && col === 5)) {
            td.style.background = '#6da5ff';
            td.style.fontWeight = "bold";
          }
          if (((row === 17 || row === 18) && col > 4)) {
            td.style.fontSize = "0.8em"
          }
          if ((row === 1 && col > 4)) {
            if (![null].concat(getAllowedCodes()).includes(value))
              td.style.background = '#ffb7b7';
          }
          td.style.textAlign = "center"
          if ((row > 15 && col === 0)) {
            td.style.borderLeft = "0";
            td.style.borderBottom = "0";
            td.style.textAlign = "right"
          }
          if ((row > 1 && row < 16 && col === 4)) {
            td.style.textAlign = "left"
          }

          td.innerText = value;
          td.style.verticalAlign = "middle"
        },
        cells: (i, j) => {
          let meta: Handsontable.CellMeta = {};
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
