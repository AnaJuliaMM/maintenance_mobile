import { Stack } from "expo-router";
import * as React from "react";
import { Alert, ScrollView, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
import { cn } from "~/lib/utils";
import { MACHINES } from "~/lib/mock_data";

const MIN_COLUMN_WIDTHS = [20, 20, 20];

export default function Example() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const columnWidths = React.useMemo(() => {
    return MIN_COLUMN_WIDTHS.map((minWidth) => {
      const evenWidth = width / MIN_COLUMN_WIDTHS.length;
      return evenWidth > minWidth ? evenWidth : minWidth;
    });
  }, [width]);

  return (
    <ScrollView
      alwaysBounceVertical={true}
      bounces={false}
      showsHorizontalScrollIndicator={false}
    >
      <Table aria-labelledby="invoice-table">
        <TableHeader>
          <TableRow>
            <TableHead className="px-0.5" style={{ width: columnWidths[0] }}>
              <Text>Nome</Text>
            </TableHead>
            <TableHead style={{ width: columnWidths[1] }}>
              <Text>Tipo</Text>
            </TableHead>
            <TableHead style={{ width: columnWidths[2] }}>
              <Text>Localização</Text>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {MACHINES.map((item) => (
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
    </ScrollView>
  );
}
