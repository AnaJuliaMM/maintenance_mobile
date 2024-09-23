import React from "react";
import { ScrollView, Image, View } from "react-native";

// Utils
import { MaintenanceType } from "~/lib/types";

// React Native Reusables components imports
import { Text } from "~/components/ui/text";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

// Custom components imports
import CustomCard from "~/components/custom/CustomCard";

// Mock data
import { MAINTENANCES } from "~/lib/mock_data";

/**
 * Tela que exibe os detalhes de uma máquina com base no ID fornecido na URL.
 *
 * Esta tela utiliza o parâmetro de busca `id` da URL para buscar e exibir
 * as informações de uma máquina específica a partir de um conjunto de dados mockado.
 *
 * @returns JSX.Element A tela de detalhes da máquina.
 */
export default function DetalhesManutencao() {
  const maintenance: MaintenanceType = MAINTENANCES[0];
  const [value, setValue] = React.useState("");

  return (
    <ScrollView
      alwaysBounceVertical={true}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      className="p-4"

    >
      <CustomCard
        title={maintenance.title}
        description={maintenance.description}
      >
        <Text>Data: {maintenance.requisitionDate} </Text>
        <Text>Responsável: {maintenance.responsableTeam} </Text>
      </CustomCard>

      <View className="flex gap-8 pt-8">
        <Text className="font-bold text-xl">Detalhes</Text>
        <Text className="font-bold text-md">Lista de Recursos</Text>
        <Textarea
          placeholder="Lista de Recursos"
          value={value}
          onChangeText={setValue}
          aria-labelledby="textareaLabel"
        />
        <Button className="bg-blue-500">
          <Text>Enviar</Text>
        </Button>
        <Text className="font-bold text-md">Comentário</Text>

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
