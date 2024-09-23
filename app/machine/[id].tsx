import React from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Image, ScrollView } from "react-native";

// React Native Reusables components imports
import { Text } from "~/components/ui/text";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

// Custom components imports
import CustomCard from "~/components/custom/CustomCard";
import CustomTable from "~/components/custom/CustomTable";

// Mock data
import { MACHINES } from "~/lib/mock_data";
import { MAINTENANCES } from "~/lib/mock_data";
import { INVENTORY } from "~/lib/mock_data";

/**
 * Tela que exibe os detalhes de uma máquina com base no ID fornecido na URL.
 *
 * Esta tela utiliza o parâmetro de busca `id` da URL para buscar e exibir
 * as informações de uma máquina específica a partir de um conjunto de dados mockado.
 *
 * @returns JSX.Element A tela de detalhes da máquina.
 */
export default function DetalhesMaquina() {
  const [checked, setChecked] = React.useState(false);
  const [value, setValue] = React.useState("");

  // Obtém o ID da máquina a partir dos parâmetros da rota.
  const { id } = useLocalSearchParams();

  // Lógica para buscar detalhes da máquina com o ID (pode ser de uma API, etc.)
  const machine = MACHINES.filter((item) => item.serialNumber == id)[0];

  return (
    <ScrollView
      alwaysBounceVertical={true}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      className="p-2 "
    >
      <View className="flex-row items-center gap-2 justify-between w-full p-4 pb-8">
        <Label
          nativeID="airplane-mode"
          onPress={() => {
            setChecked((prev) => !prev);
          }}
        >
          Em manutenção
        </Label>
        <Switch
          checked={checked}
          onCheckedChange={setChecked}
          nativeID="airplane-mode"
        />
      </View>
      <CustomCard
        title={`${machine.name} ${machine.model}`}
        description={machine.serialNumber}
      >
        <Text>Tipo: {machine.type}</Text>
        <Text>Localização: {machine.location}</Text>
        <Text>Data de fabricação: {machine.manufactureDate}</Text>
        <Text>N° de Série: {machine.serialNumber}</Text>
      </CustomCard>

      <View className="flex flex-1 flex-col p-2 pt-8">
        <Text className="text-2xl font-bold">Manutenções Recentes</Text>
        <CustomTable
            rows={MAINTENANCES}
            columns={["Nome", "Data", "Status"]}
            keys={["code", "title", "requisitionDate", "status"]}
            min_column_widths={[40, 10, 10]}
          />
      </View>

      <View className="flex flex-1 gap-8 pt-8">
        <Text className="font-bold text-2xl">Comentários</Text>
        <Textarea
          placeholder="Adicione comentários"
          value={value}
          onChangeText={setValue}
          aria-labelledby="textareaLabel"
        />
        <Button className="bg-blue-500">
          <Text>Enviar</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
