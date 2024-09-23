import { useLocalSearchParams } from "expo-router";
import { View, Image } from "react-native";

// React Native Reusables components imports
import { Text } from "~/components/ui/text";

// Custom components imports
import CustomCard from "~/components/custom/CustomCard";

// Mock data
import { MACHINES } from "~/lib/mock_data";

/**
 * Tela que exibe os detalhes de uma máquina com base no ID fornecido na URL.
 *
 * Esta tela utiliza o parâmetro de busca `id` da URL para buscar e exibir
 * as informações de uma máquina específica a partir de um conjunto de dados mockado.
 *
 * @returns JSX.Element A tela de detalhes da máquina.
 */
export default function DetalhesMaquina() {
  // Obtém o ID da máquina a partir dos parâmetros da rota.
  const { id } = useLocalSearchParams();

  // Lógica para buscar detalhes da máquina com o ID (pode ser de uma API, etc.)
  const machine = MACHINES.filter((item) => item.serialNumber == id)[0];

  return (
    <View style={{ padding: 20, backgroundColor: '#7a49a5' }}>
      <CustomCard
        title={`${machine.name} ${machine.model}`}
        description={machine.serialNumber}
      >
        <Text>Tipo: {machine.type}</Text>
        <Text>Localização: {machine.location}</Text>
        <Text>Data de fabricação: {machine.manufactureDate}</Text>
        <Text>N° de Série: {machine.serialNumber}</Text>
      </CustomCard>
    </View>
  );
}
