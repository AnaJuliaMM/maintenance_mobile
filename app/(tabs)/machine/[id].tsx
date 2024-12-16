import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Image, ScrollView, ActivityIndicator } from "react-native";

import { Text } from "~/components/ui/text";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";

import CustomCard from "~/components/custom/CustomCard";

import MachineService from "~/services/machineService";
import { machineType } from "~/type/machineType";
/**
 * Tela que exibe os detalhes de uma máquina com base no ID fornecido na URL.
 *
 * Esta tela utiliza o parâmetro de busca `id` da URL para buscar e exibir
 * as informações de uma máquina específica a partir de um conjunto de dados mockado.
 *
 * @returns JSX.Element A tela de detalhes da máquina.
 */
export default function DetalhesMaquina() {
  const [checked, setChecked] = useState(false);

  const [machine, setMachine] = useState<machineType>();
  const { id } = useLocalSearchParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Função que faz a requisição para buscar as máquinas.
   */
  const fetchMachine = async () => {
    setLoading(true);
    setError(null);

    try {
      let idParsed = Number(id);
      console.log(idParsed);

      const response = await MachineService.getById("", idParsed);
      console.log(response);

      setMachine(response);
    } catch (err) {
      setError("Erro ao buscar máquinas. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachine();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error}</Text>

        <Button onPress={fetchMachine} className="bg-pink-600 text-white">
          <Text>Tentar novamente</Text>
        </Button>
      </View>
    );
  }

  console.log(machine);

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
        title={`${machine?.name} ${machine?.model}`}
        description={machine?.serialNumber}
      >
        <Text>Tipo: {machine?.categoryName}</Text>
        <Text>Localização: {machine?.locationName}</Text>
        <Text>
          Data de fabricação:{" "}
          {machine?.manufactureDate
            ? new Date(machine?.manufactureDate).toLocaleDateString()
            : "Data não disponível"}
        </Text>
        <Text>N° de Série: {machine?.serialNumber}</Text>
      </CustomCard>
      {/* <View className="flex flex-1 flex-col p-2 pt-8">
        <Text className="text-2xl font-bold">Manutenções Recentes</Text>
        <CustomTable
          rows={MAINTENANCES}
          columns={["Nome", "Data", "Status"]}
          keys={["code", "title", "requisitionDate", "status"]}
          min_column_widths={[40, 10, 10]}
        />
      </View> */}

      {/* <View className="flex flex-1 gap-8 pt-8">
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
      </View> */}
    </ScrollView>
  );
}
