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
import React, {useEffect, useState} from 'react'

export default function ResponsesTable({formQuestionsObject, responsesArray}) {

    const [columns, setColumns] = useState([])

    const [data, setData] = useState(null)
    useEffect(() => {
        const transformedResponses = responsesArray.map((response, index) => {
            const transformedResponse = {
                id: index + 1,
            };

            response.formObject.form_sections.forEach((section, index) => {
                const formSection = formQuestionsObject.form_sections[index];
                section.section_components.forEach((component, index) => {
                    const question = formSection.section_components[index].component_prop_object.question;
                    transformedResponse[question] = component.component_prop_object.answer;
                });
            });

            return transformedResponse;
        });

        const uniqueColumns = Array.from(
            new Set(
                transformedResponses.flatMap(response => Object.keys(response))
            )
        ).map(key => ({
            header: key,
            accessorKey: key,
            footer: key,
        }));

        setColumns(uniqueColumns);
        setData(transformedResponses);
    }, [formQuestionsObject, responsesArray]);


    // const columns = [
    //     {
    //         header: "ID",
    //         accessorKey: "id",
    //         footer: "ID"
    //     }, ...
    //  ]
    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,


    })

    return (

        data && columns.length > 0 ? (

            <div className='table-elements-container'>

                <div className="pagination-and-searchbar-container">
                    <div className="pagination-buttons-container">
                        <button
                            className={`pagination-button ${!table.getCanPreviousPage() && "disabled"}`}

                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.setPageIndex(0)}>
                            <FirstPageIcon/>
                        </button>
                        <button className={`pagination-button ${!table.getCanPreviousPage() && "disabled"}`}

                                disabled={!table.getCanPreviousPage()}
                                onClick={() => table.previousPage()}
                        >
                            <NavigateBeforeIcon/>
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
                            <NavigateNextIcon/>
                        </button>
                        <button className={`pagination-button ${!table.getCanNextPage() && "disabled"}`}
                                disabled={!table.getCanNextPage()}
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                            <LastPageIcon/>
                        </button>
                    </div>
                    <div className="table-search-bar">
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
                            <g>
                                <path
                                    d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                            </g>
                        </svg>
                        <input
                            className="input"
                            type="search"
                            placeholder="Search in table..."
                            value={filtering}
                            onChange={e => setFiltering(e.target.value)}
                        />
                    </div>
                </div>

                <table className='table' cellSpacing={0}>
                    <thead className=" table-head">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr
                            className="table-head-row"
                            key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th className="table-head-cell"
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
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
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td
                                    className="table-body-cell"
                                    key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>

                </table>


                <div className="pagination-buttons-container">
                    <button
                        className={`pagination-button ${!table.getCanPreviousPage() && "disabled"}`}

                        disabled={!table.getCanPreviousPage()}
                        onClick={() => table.setPageIndex(0)}>
                        <FirstPageIcon/>
                    </button>
                    <button className={`pagination-button ${!table.getCanPreviousPage() && "disabled"}`}

                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.previousPage()}
                    >
                        <NavigateBeforeIcon/>
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
                                console.log(table.getCanNextPage())
                            }}
                    >
                        <NavigateNextIcon/>
                    </button>
                    <button className={`pagination-button ${!table.getCanNextPage() && "disabled"}`}
                            disabled={!table.getCanNextPage()}
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                        <LastPageIcon/>
                    </button>
                </div>


            </div>
        ) : (
            <div>No Responses available.</div>
        )

    )
}