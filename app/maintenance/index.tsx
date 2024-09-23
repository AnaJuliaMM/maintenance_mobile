import * as React from "react";
import { ScrollView } from "react-native";

// External Package imports
import { router } from "expo-router";

// Custom components imports
import CustomTable from "~/components/custom/CustomTable";

// Mock data imports
import { MAINTENANCES } from "~/lib/mock_data";


export default function MaintenanceScreen() {

    /**
 * Navega para a página de detalhes da manutencao com base no ID fornecido.
 *
 * @param {string} id - O identificador único da manutencao.
 * 
 * A função utiliza o roteador para redirecionar o usuário para a página de
 * detalhes de uma máquina específica. A página de destino é definida por
 * "/machine/[id]" e o ID da máquina é passado como parâmetro de rota.
 */
  const handlePressRow = (id: string) => {
    router.navigate({ pathname: "/maintenance[id]", params: { id: id } });
  };

  return (
    <ScrollView
      alwaysBounceVertical={true}
      bounces={false}
      showsHorizontalScrollIndicator={false}
    >
      <CustomTable
        rows={MAINTENANCES}
        columns={["Nome", "Data", "Status"]}
        keys={["code","title", "requisitionDate", "status"]}
        min_column_widths={[40, 10, 10]}
      />
    </ScrollView>
  );
}