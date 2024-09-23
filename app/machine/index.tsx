import * as React from "react";
import { ScrollView } from "react-native";

// External Package imports
import { router } from "expo-router";

// Custom components imports
import CustomTable from "~/components/custom/CustomTable";

// Mock data imports
import { MACHINES } from "~/lib/mock_data";

export default function Example() {

  /**
 * Navega para a página de detalhes da máquina com base no ID fornecido.
 *
 * @param {string} id - O identificador único da máquina.
 * 
 * A função utiliza o roteador para redirecionar o usuário para a página de
 * detalhes de uma máquina específica. A página de destino é definida por
 * "/machine/[id]" e o ID da máquina é passado como parâmetro de rota.
 */
  const handlePressRow = (id: string) => {
    router.navigate({ pathname: "/machine/[id]", params: { id: id } });
  };

  return (
    <ScrollView
      alwaysBounceVertical={true}
      bounces={false}
      showsHorizontalScrollIndicator={false}
    >
      <CustomTable
        rows={MACHINES}
        columns={["Nome", "Tipo", "Localização"]}
        keys={["serialNumber", "name", "type", "location"]}
        min_column_widths={[40, 10, 10]}
        onPressRow={handlePressRow}
      />
    </ScrollView>
  );
}

//  router.navigate("/machineModal");
