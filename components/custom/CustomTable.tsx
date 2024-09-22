import React from "react";
import { Alert, ScrollView, View, useWindowDimensions } from "react-native";

// Utils imports
import { cn } from "~/lib/utils";
import { MachineType } from "~/lib/types";

// External Package imports
import { useSafeAreaInsets } from "react-native-safe-area-context";

// React Native Reusables components imports
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Text } from "~/components/ui/text";

interface CustomTableProps {
  rows: MachineType[];
  columns: string[];
  min_column_widths: number[];
}

const CustomTable = ({
  rows,
  columns,
  min_column_widths,
}: CustomTableProps) => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const columnWidths = React.useMemo(() => {
    return min_column_widths.map((minWidth) => {
      const evenWidth = width / min_column_widths.length;
      return evenWidth > minWidth ? evenWidth : minWidth;
    });
  }, [width]);

  return (
    <Table aria-labelledby="invoice-table">
      <TableHeader>
        <TableRow>
          {columns.map((item) => (
            <TableHead style={{ width: columnWidths[0] }}>
              <Text>{item}</Text>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((item) => (
          <TableRow
            key={item.serialNumber}
            className={cn("active:bg-secondary", 20 % 2 && "bg-muted/40 ")}
          >
            <TableCell style={{ width: columnWidths[0] }}>
              <Text>{item.name}</Text>
            </TableCell>
            <TableCell style={{ width: columnWidths[1] }}>
              <Text>{item.type}</Text>
            </TableCell>
            <TableCell style={{ width: columnWidths[2] }}>
              <Text>{item.location}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomTable;
