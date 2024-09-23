import * as React from "react";
import { ScrollView } from "react-native";

// Custom components imports
import CustomTable from "~/components/custom/CustomTable";

// Mock data imports
import { INVENTORY } from "~/lib/mock_data";

/**
 * Componente `inventoryScreen` que exibe uma tabela de inventário.
 * 
 * A tela apresenta uma tabela com informações sobre o inventário, incluindo o nome,
 * o tipo e a quantidade de cada item. A tabela pode ser rolada verticalmente, e 
 * algumas funcionalidades de rolagem horizontal são desabilitadas.
 */
export default function EstoqueScreen() {
  return (
    <ScrollView
      alwaysBounceVertical={true}
      bounces={false}
      showsHorizontalScrollIndicator={false}
    >
      <CustomTable
        rows={INVENTORY}
        columns={["Nome", "Tipo", "Qtd"]}
        keys={["id", "name", "type", "quantity"]}
        min_column_widths={[40, 10, 10]}
      />
    </ScrollView>
  );
}
