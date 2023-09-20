import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@mui/material';
import MenuPopover from 'components/MenuPopover/MenuPopover';

type MenuItem = {
    label: string;
    onClick: () => void;
  };

type CustomTableProps<T> = {
    columns: Array<{ header: string; field: keyof T; render?: (item: T) => React.ReactNode }>;
    data: T[]; 
    handleOpenPopover: () => void;
    openPopover: boolean;
    handleClosePopover: () => void;
    menuItems?: MenuItem[];
  };

  export const CustomTable = <T extends Record<string, any>>(props: CustomTableProps<T>) => {
    const { columns, data, menuItems,  openPopover, handleClosePopover } = props;
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
        {data?.map((item) => (
          <TableRow key={item.id}>
            {columns.map((column, index) => (
              <TableCell key={index}>
                {column.render ? column.render(item) : item[column.field]}
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
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
