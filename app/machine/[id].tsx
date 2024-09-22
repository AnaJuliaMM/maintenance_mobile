import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, Button } from 'react-native';

// Mock data 
import { MACHINES } from '~/lib/mock_data';

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
  const machine = MACHINES.filter(item => (
    item.serialNumber == id
  ))[0]

  return (
    <View style={{ padding: 20 }}>
      <Text>Detalhes da Máquina {id}</Text>
      <Text>Nome: {machine.name}</Text>
      <Text>Status: {machine.location}</Text>
    </View>
  );
}
