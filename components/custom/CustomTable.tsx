import React from "react";
import { Alert, ScrollView, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

// Utils imports
import { cn } from "~/lib/utils";
import { MachineType } from "~/lib/types";

// React Native Reusables components imports
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Text } from "~/components/ui/text";

interface CustomTableProps {
  rows: MachineType[];
  columns: string[];
  min_column_widths: number[];
  onPressRow: () => void;
}

const CustomTable = ({
  rows,
  columns,
  min_column_widths,
  onPressRow,
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
            onPress={onPressRow}
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
