import React, { useState, useEffect } from "react";
import { ActivityIndicator, ScrollView, View, Text } from "react-native";

import { router } from "expo-router";

import CustomTable from "~/components/custom/CustomTable";

import MachineService from "~/services/machineService";
import { machineType } from "~/type/machineType";
import { Button } from "~/components/ui/button";

/**
 * Componente principal da página.
 *
 * Este componente exibe uma lista de máquinas em uma tabela rolável
 * e permite a navegação para a página de detalhes de uma máquina quando
 * uma linha é pressionada.
 */
export default function MaquinasScreen() {
  const [machines, setMachines] = useState<machineType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  /**
   * Função que faz a requisição para buscar as máquinas.
   */
  const fetchMachines = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await MachineService.get("");
      setMachines(response);
    } catch (err) {
      setError("Erro ao buscar máquinas. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

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

        <Button onPress={fetchMachines} className="bg-pink-600 text-white">
          <Text>Tentar novamente</Text>
        </Button>
      </View>
    );
  }

  return (
    <ScrollView
      alwaysBounceVertical={true}
      bounces={false}
      showsHorizontalScrollIndicator={false}
    >
      <CustomTable
        rows={machines.map((item) => {
          const updatedItem = { ...item };

          if (item.category) {
            updatedItem["categoryName"] = item.category.name;
          }
          if (item.location) {
            updatedItem["locationName"] = item.location.name;
          }
          return updatedItem;
        })}
        columns={["Nome", "Modelo", "Localização"]}
        keys={["serialNumber", "name", "model", "locationName"]}
        min_column_widths={[40, 10, 10]}
        onPressRow={handlePressRow}
      />
    </ScrollView>
  );
}
