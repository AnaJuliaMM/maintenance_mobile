import * as React from "react";
import { ScrollView } from "react-native";

// Importação do pacote de roteamento do Expo
import { router } from "expo-router";

// Importação de um componente personalizado de tabela
import CustomTable from "~/components/custom/CustomTable";

// Importação de dados fictícios de máquinas para serem exibidos na tabela
import { MACHINES } from "~/lib/mock_data";

/**
 * Componente principal da página.
 *
 * Este componente exibe uma lista de máquinas em uma tabela rolável
 * e permite a navegação para a página de detalhes de uma máquina quando
 * uma linha é pressionada.
 */
export default function MaquinasScreen() {
  
  /**
   * Função de navegação para a página de detalhes da máquina.
   *
   * @param {string} id - O identificador único da máquina.
   *
   * Esta função utiliza o roteador para redirecionar o usuário para a página
   * de detalhes de uma máquina específica. O ID da máquina é passado como
   * parâmetro de rota para exibir as informações correspondentes.
   */
  const handlePressRow = (id: string) => {
    router.navigate({ pathname: "/machine/[id]", params: { id: id } });
  };

  return (
    // Componente de scroll para permitir rolagem vertical
    <ScrollView
      alwaysBounceVertical={true} // Garante que o conteúdo tenha um "bounce" suave
      bounces={false} // Desativa o "bounce" horizontal
      showsHorizontalScrollIndicator={false} // Remove a barra de rolagem horizontal
    >
      {/* Componente de tabela personalizado que exibe os dados das máquinas */}
      <CustomTable
        rows={MACHINES} // Define os dados das linhas da tabela com base nos dados importados
        columns={["Nome", "Tipo", "Localização"]} // Define os títulos das colunas da tabela
        keys={["serialNumber", "name", "type", "location"]} // Define as chaves dos dados a serem exibidos em cada coluna
        min_column_widths={[40, 10, 10]} // Define a largura mínima de cada coluna
        onPressRow={handlePressRow} // Função que será executada quando uma linha for pressionada
      />
    </ScrollView>
  );
}
