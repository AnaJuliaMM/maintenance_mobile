import React, { useState, useEffect } from "react";
import { ActivityIndicator, ScrollView, View, Text } from "react-native";

import CustomTable from "~/components/custom/CustomTable";

import WarehouseService from "~/services/warehouseService";
import { itemType } from "~/type/warehouseType";
import { Button } from "~/components/ui/button";

/**
 * Componente `inventoryScreen` que exibe uma tabela de inventário.
 *
 * A tela apresenta uma tabela com informações sobre o inventário, incluindo o nome,
 * o tipo e a quantidade de cada item. A tabela pode ser rolada verticalmente, e
 * algumas funcionalidades de rolagem horizontal são desabilitadas.
 */
export default function EstoqueScreen() {
  const [items, setItems] = useState<itemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Função que faz a requisição para buscar as máquinas.
   */
  const fetchItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await WarehouseService.get("");
      setItems(response);
    } catch (err) {
      setError("Erro ao buscar máquinas. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
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

        <Button onPress={fetchItems} className="bg-pink-600 text-white">
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
        rows={items}
        columns={["Nome", "Tipo", "Qtd"]}
        keys={["id", "name", "type", "quantity"]}
        min_column_widths={[40, 10, 10]}
      />
    </ScrollView>
  );
}
