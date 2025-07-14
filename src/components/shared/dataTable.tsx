"use client";

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "./pagination";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

export interface DataTableRef {
  table: any;
}

interface DataTableProps<TData, TValue> {
  columns: any[];
  data: TData[];
  currentPage?: number;
  totalItems?: number;
  itemsPerPage?: number;
  totalPages?: number;
}

const DataTable = forwardRef<DataTableRef, DataTableProps<any, any>>(
  (
    { columns, data, currentPage, totalItems, itemsPerPage, totalPages },
    ref
  ) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
      {}
    );
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
      data,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
    });

    useImperativeHandle(
      ref,
      () => ({
        table,
      }),
      [table]
    );

    const { rows } = table.getRowModel();

    const parentRef = useRef<HTMLDivElement>(null);

    const virtualizer = useVirtualizer({
      count: rows.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 34,
      overscan: 20,
    });

    useEffect(() => {
      table.setPageSize(itemsPerPage ?? 5);
    }, [itemsPerPage, table]);

    return (
      <div className="w-full" ref={parentRef}>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-primary">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="text-primary-foreground"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                // virtualizer.getVirtualItems().map((virtualRow, index) => {
                //   const row = rows[virtualRow.index];
                //   return (
                //     <TableRow
                //       key={row.id}
                //       data-state={row.getIsSelected() && "selected"}
                //       className={rankColor(row.getValue("rank"))}
                //     >
                //       {row.getVisibleCells().map((cell) => (
                //         <TableCell key={cell.id}>
                //           {flexRender(
                //             cell.column.columnDef.cell,
                //             cell.getContext()
                //           )}
                //         </TableCell>
                //       ))}
                //     </TableRow>
                //   );
                // })
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Pagination
            currentPage={currentPage as number}
            totalItems={totalItems as number}
            itemsPerPage={itemsPerPage as number}
            totalPages={totalPages as number}
          />
        </div>
      </div>
    );
  }
);

DataTable.displayName = "DataTable";
export default DataTable;
