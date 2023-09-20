import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import MenuPopover from 'components/MenuPopover/MenuPopover';

type MenuItem = {
  label: string;
  onClick: () => void;
};

type TableColumn<T> = {
  header: string;
  render?: (item: T) => React.ReactNode;
};

type CustomTableProps<T> = {
  columns: TableColumn<T>[];
  data: T[]; 
  openPopover: boolean;
  handleClosePopover: () => void;
  menuItems?: MenuItem[];
};

export const CustomTable = <T extends Record<string, any>>(props: CustomTableProps<T>) => {
  const { columns, data, openPopover, handleClosePopover, menuItems = [] } = props;
  const [isPopoverOpen, setIsPopoverOpen] = useState<HTMLElement | null>(null); 

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setIsPopoverOpen(event.currentTarget);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column, index) => (
            <TableCell key={index}>{column.header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((item, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column, colIndex) => (
              <TableCell key={colIndex}>
                      {column.render ? column.render(item) : item[column.header]}
              </TableCell>
            ))}
            <TableCell align="right">
              <div onClick={handleOpenPopover} style={{ cursor: 'pointer' }}>
                {/* Icon e MenuPopover aqui */}
              </div>
              {openPopover && (
                <MenuPopover
                  open={isPopoverOpen}
                  onClose={handleClosePopover}
                  menuItems={menuItems}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
