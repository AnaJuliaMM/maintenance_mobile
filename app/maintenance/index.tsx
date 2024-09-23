import * as React from "react";
import { ScrollView, View } from "react-native";
import { router } from "expo-router";

// React Native Reusables components imports
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";

// Custom components imports
import CustomTable from "~/components/custom/CustomTable";

// Mock data imports
import { MAINTENANCES } from "~/lib/mock_data";

/**
 * Componente principal para exibir a tela de manutenções.
 *
 * Esta tela exibe uma lista de manutenções em uma tabela rolável e permite
 * ao usuário navegar para a página de detalhes de uma manutenção específica
 * ou criar uma nova solicitação de manutenção.
 */
export default function ManuntencaoScreen() {
  
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
    router.navigate("/maintenance/id");
  };

  /**
   * Função de navegação para a página de solicitação de nova manutenção.
   *
   * Esta função redireciona o usuário para a página onde pode criar uma nova
   * solicitação de manutenção.
   */
  const handlePressButton = () => {
    router.navigate("/maintenance/request");
  };

  return (
    <View>
      <ScrollView
        alwaysBounceVertical={true}
        bounces={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex flex-col gap-2 pt-2">
          <CustomTable
            rows={MAINTENANCES}
            columns={["Nome", "Data", "Status"]}
            keys={["code", "title", "requisitionDate", "status"]}
            min_column_widths={[40, 10, 10]}
            onPressRow={handlePressRow}
          />
        </View>
      </ScrollView>
      <View className="p-4">
        <Button className="bg-blue-500" onPress={handlePressButton}>
          <Text>Nova Solicitação</Text>
        </Button>
      </View>
    </View>
  );
}
