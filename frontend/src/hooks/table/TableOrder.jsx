/*
import { useEffect, useRef, useState } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import "@styles/table.css";

function useTableOrder({ dataOrder, columnsOrder, filterOrder, dataToFilterOrder, initialSortNameOrder, onSelectionChangeOrder }) {
    const tableRefOrder = useRef(null);
    const [tableOrder, setTableOrder] = useState(null);
    const [isTableBuiltOrder, setIsTableBuiltOrder] = useState(false);

    useEffect(() => {
        if (tableRefOrder.current) {
            const updatedColumnsOrder = [
                { 
                    formatter: "rowSelection", 
                    titleFormatter: false, 
                    hozAlign: "center", 
                    headerSort: false, 
                    cellClick: function (e, cell) {
                        cell.getRow().toggleSelect();
                    } 
                },
                ...columnsOrder
            ];
            const tabulatorTableOrder = new Tabulator(tableRefOrder.current, {
                data: dataOrder,
                columns: updatedColumnsOrder,
                layout: "fitColumns",
                responsiveLayout: "collapse",
                pagination: true,
                paginationSize: 6,
                selectableRows: 1,
                rowHeight: 46,
                langs: {
                    "default": {
                        "pagination": {
                            "first": "Primero",
                            "prev": "Anterior",
                            "next": "Siguiente",
                            "last": "Último",
                        }
                    }
                },
                initialSort: [
                    { column: initialSortNameOrder, dir: "asc" }
                ],
            });
            tabulatorTableOrder.on("rowSelectionChanged", function(selectedData) {
                if (onSelectionChangeOrder) {
                    onSelectionChangeOrder(selectedData);
                }
            });
            tabulatorTableOrder.on("tableBuilt", function() {
                setIsTableBuiltOrder(true);
            });
            setTableOrder(tabulatorTableOrder);
            return () => {
                tabulatorTableOrder.destroy();
                setIsTableBuiltOrder(false);
                setTableOrder(null);
            };
        }
    }, [dataOrder, columnsOrder, filterOrder, dataToFilterOrder, initialSortNameOrder, onSelectionChangeOrder]);

    return { tableRefOrder, isTableBuiltOrder };
}

export default useTableOrder;
*/