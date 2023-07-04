import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import LuckyExcel from 'luckyexcel'
import { debounce } from 'lodash';

function App() {
  const workbookRef = useRef<HTMLDivElement>(null);

  const handleFileAsync = async (e: any) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();

    // After getting the xlsx file
    LuckyExcel.transformExcelToLucky(data,
      function (exportJson: any, luckysheetfile: any) {
        // Get the worksheet data after conversion
        const luckysheet = window.luckysheet;
        const options = {
          container: "luckysheet",
          data: exportJson.sheets,
          title: exportJson.info?.name,
          showtoolbar: false,
          sheetFormulaBar: false,
          showinfobar: false,
          allowUpdate: false,
          enableAddRow: false,
          showsheetbarConfig: {
            add: false, //Add worksheet
            menu: false, //Worksheet management menu
            sheet: true //Worksheet display
          },
          cellRightClickConfig: {
            copy: true, // copy
            copyAs: true, // copy as
            paste: false, // paste
            insertRow: false, // insert row
            insertColumn: false, // insert column
            deleteRow: false, // delete the selected row
            deleteColumn: false, // delete the selected column
            deleteCell: false, // delete cell
            hideRow: false, // hide the selected row and display the selected row
            hideColumn: false, // hide the selected column and display the selected column
            rowHeight: false, // row height
            columnWidth: false, // column width
            clear: false, // clear content
            matrix: false, // matrix operation selection
            sort: false, // sort selection
            filter: false, // filter selection
            chart: false, // chart generation
            image: false, // insert picture
            link: false, // insert link
            data: false, // data verification
            cellFormat: false // Set cell format
          },
          sheetRightClickConfig: {
            delete: false, //Delete
            copy: false, //Copy
            rename: false, //Rename
            color: false, //Change color
            hide: false, //Hide, unhide
            move: false, //Move to the left, move to the right
          },
          showstatisticBarConfig: {
            count: false, // Count bar
            view: false, // Print view
            zoom: true // Zoom
          },
          hook: {
            cellUpdateBefore: () => false,
            cellDeleteBefore: () => false,
            cellEditBefore: () => false,
            rangeMoveBefore: () => false,
            rangeEditBefore: () => false,
            rangePasteBefore: () => false,
            rangeCutBefore: () => false,
            rangeDeleteBefore: () => false,
            rangeClearBefore: () => false,
            rangePullBefore: () => false,
          }
        };
        luckysheet.create(options);
      },
      function (error: any) {
        // handle error if any thrown
      }
    )
  }

  return (
    <>
      <form>
        <input onChange={handleFileAsync} type="file" id="input_dom_element" />
      </form>
      <div id="luckysheet" ref={workbookRef} style={{
        height: '100vh'
      }}></div>
    </>
  );
}

export default App;
