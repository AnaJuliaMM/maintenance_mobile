import React from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Utils imports
import { cn } from "~/lib/utils";
import { MachineType, MaintenanceType } from "~/lib/types";

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
  /**
   * As linhas que irão preencher a tabela.
   * Tipo: any[] (obrigatório)
   */
  rows: any[];

  /**
   * As colunas da tabela, que serão exibidas como cabeçalhos.
   * Tipo: string[] (obrigatório)
   */
  columns: string[];

  /**
   * As chaves usadas para acessar os valores de cada linha.
   * Tipo: any[] (obrigatório)
   */
  keys: any[];

  /**
   * Larguras mínimas das colunas para garantir que elas não fiquem muito pequenas.
   * Tipo: number[] (obrigatório)
   */
  min_column_widths: number[];

  /**
   * Função opcional que será chamada ao clicar em uma linha da tabela.
   * Tipo: (id: string) => void (opcional)
   */
  onPressRow?: (id: string) => void;
}

const CustomTable = ({
  rows,
  columns,
  keys,
  min_column_widths,
  onPressRow,
}: CustomTableProps) => {
  // Obtém a largura da tela para ajustar o layout da tabela dinamicamente
  const { width } = useWindowDimensions();

  // Calcula as larguras das colunas com base na largura da tela e nas larguras mínimas fornecidas
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
          {columns.map((item, index) => (
            <TableHead key={index} style={{ width: columnWidths[0] }}>
              <Text>{item}</Text>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((item, index) => (
          <TableRow
            key={index}
            className={cn("active:bg-secondary", 20 % 2 && "bg-muted/40 ")}
            onPress={() => onPressRow && onPressRow(item.id)}
          >
            <TableCell style={{ width: columnWidths[0] }}>
              <Text>{item[keys[1]]}</Text>
            </TableCell>
            <TableCell style={{ width: columnWidths[1] }}>
              <Text>{item[keys[2]]}</Text>
            </TableCell>
            <TableCell style={{ width: columnWidths[2] }}>
              <Text>{item[keys[3]]}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomTable;
