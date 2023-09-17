import {

    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,

} from '@tanstack/react-table'
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SearchIcon from '@mui/icons-material/Search';
import React, {useEffect, useState} from 'react'
import {Search} from "@mui/icons-material";

export default function ResponsesTable({formQuestionsObject, responsesArray}) {

    const [columns, setColumns] = useState([])
    const [columnSizing, setColumnSizing] = useState({});
    const [data, setData] = useState(null)
    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')
    const [selectedCellValue, setSelectedCellValue] = useState({});

    const handleCellClick = (cell) => {
        const cellValue = cell.getValue(cell.column.id);
        let ele = document.getElementById(cell.id);
        let eleCoordinates = ele.getBoundingClientRect();
        setSelectedCellValue({
            value: cellValue,
            x: eleCoordinates.x,
            y: eleCoordinates.y,
        });
        console.log({
            value: cellValue,
            x: eleCoordinates.x,
            y: eleCoordinates.y,
        })


    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        columnResizeMode: "onChange",
        state: {
            sorting: sorting,
            globalFilter: filtering,
            columnSizing,


        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onColumnSizingChange: setColumnSizing,


    })


    const handleCellDoubleClick = (cell) => {
        setSelectedCell(cell);
    };

    useEffect(() => {

        const transformedResponses = responsesArray.map((response, index) => {
            const transformedResponse = {
                id: index + 1,
            };

            response.formObject.form_sections.forEach((section, index) => {
                const formSection = formQuestionsObject.form_sections[index];
                section.section_components.forEach((component, index) => {

                    const question = formSection?.section_components[index]?.component_prop_object?.question;
                    transformedResponse[question] = component.component_prop_object.answer;
                });
            });

            return transformedResponse;
        });
        let id = 1;
        const uniqueColumns = Array.from(
            new Set(
                transformedResponses.flatMap(response => Object.keys(response))
            )
        ).map(key => ({
            id: id++,
            header: key,
            accessorKey: key,
            footer: key,

        }));

        setColumns(uniqueColumns);
        setData(transformedResponses);


    }, [formQuestionsObject, responsesArray]);


    return (

        data && columns.length > 0 ? (

            <div className='table-elements-container'>

                <div className="pagination-and-searchbar-container">
                    <div className="pagination-buttons-container">
                        <button
                            className={`pagination-button ${!table.getCanPreviousPage() && "disabled"}`}

                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.setPageIndex(0)}>
                            <FirstPageIcon fontSize="smaller"/>
                        </button>
                        <button className={`pagination-button ${!table.getCanPreviousPage() && "disabled"}`}

                                disabled={!table.getCanPreviousPage()}
                                onClick={() => table.previousPage()}
                        >
                            <NavigateBeforeIcon fontSize="smaller"/>
                        </button>


                        <strong>
                            {table.getState().pagination.pageIndex + 1} of {Math.ceil(data.length / table.getState().pagination.pageSize)}

                        </strong>

                        <span className="go-to-input">
                           <p><span></span>Go to page</p>
                            <input
                                type="number"
                                defaultValue={table.getState().pagination.pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    table.setPageIndex(page)
                                }}

                            />
                        </span>
                        <select
                            className="select-page-rows"
                            value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value))
                            }}
                        >
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>

                        <button className={`pagination-button ${!table.getCanNextPage() && "disabled"}`}

                                disabled={!table.getCanNextPage()}
                                onClick={() => {
                                    table.nextPage();
                                }}
                        >
                            <NavigateNextIcon fontSize="smaller"/>
                        </button>
                        <button className={`pagination-button ${!table.getCanNextPage() && "disabled"}`}
                                disabled={!table.getCanNextPage()}
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                            <LastPageIcon fontSize="smaller"/>
                        </button>
                    </div>
                    <div className="table-search-bar">
                        <div className="icon">
                            <Search fontSize="small"/>
                        </div>
                        <input
                            className="input"
                            type="search"
                            placeholder="Search in table..."
                            value={filtering}
                            onChange={e => setFiltering(e.target.value)}


                        />
                    </div>
                </div>


                <div className="table-container">

                    <table
                        className='table' cellSpacing={0}
                        style={{
                            width: `${
                                table.getTotalSize() +
                                (table.getAllLeafColumns().length + 1) * 3 // I got better result when I added this which is related with the tr css borders !
                            }px`,
                        }}
                    >

                        <thead className=" table-head">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr
                                className="table-head-row"
                                key={headerGroup.id}>

                                {headerGroup.headers.map(header => (
                                    <th
                                        className="table-head-cell"
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        data-column-name={header.id} // useEffect depends on that !
                                        colSpan={header.colSpan}
                                        style={{width: header.getSize()}}
                                    >
                                        {header.column.getCanResize() ? (
                                            <div
                                                onMouseDown={header.getResizeHandler()}
                                                onTouchStart={header.getResizeHandler()}
                                                className={` resize-div ${
                                                    header.column.getIsResizing() ? "isResizing" : ""
                                                }`}

                                            />
                                        ) : null}
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {
                                                    {asc: '🔼', desc: '🔽'}[
                                                    header.column.getIsSorted() ?? null
                                                        ]
                                                }
                                            </div>
                                        )}


                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>

                        <tbody className="table-body">
                        {table.getRowModel().rows.map((row) => (
                            <tr className="table-body-row" key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        id={cell.id}
                                        className="table-body-cell"
                                        key={cell.id}
                                        onClick={() => handleCellClick(cell)}
                                        style={{width: cell.column.getSize()}}
                                    >
                                        <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>

                    </table>
                </div>
                {selectedCellValue && (
                    <div className="selected-cell-popup">
                        {selectedCellValue.value}
                    </div>
                )}

            </div>
        ) : (
            <div>No Responses available.</div>
        )

    )
}