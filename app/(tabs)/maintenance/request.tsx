import React from "react";
import { View, TextInput } from "react-native";

// React Native Reusables components imports
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

// Custom components imports
import { CustomSelect } from "~/components/custom/CustomSelect";

/**
 * Componente `RequestForm` que exibe um formulário de solicitação.
 *
 * O formulário contém campos de entrada para a prioridade, equipe, e descrição,
 * além de um botão para enviar uma nova solicitação.
 */
export default function RequisicaoForm() {
  // Estado local para armazenar um valor de texto.
  const [value, setValue] = React.useState("");

  /**
   * Função para atualizar o estado do valor de texto.
   *
   * @param {string} text - O novo valor de texto inserido pelo usuário.
   *
   * A função é chamada sempre que o texto em um campo de entrada é alterado.
   * Ela atualiza o estado `value` com o novo texto digitado, utilizando o
   * `setValue` para armazená-lo.
   */
  const onChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <View className="flex gap-4 p-4">
      <View className="flex flex-col gap-4">
        <Label nativeID="airplane-mode">Prioridade</Label>
        <CustomSelect options={["Alta", "Média", "Baixa"]} />
      </View>

      <View className="flex gap-4">
        <Label nativeID="airplane-mode">Equipe</Label>
        <CustomSelect options={["Equipe 1", "Equipe 2", "Equipe 3"]} />
      </View>

      <View className="flex flex-col gap-4">
        <Label nativeID="airplane-mode">Descrição</Label>
        <Textarea
          placeholder="Descrição"
          value={value}
          onChangeText={setValue}
          aria-labelledby="textareaLabel"
        />
      </View>

      <Button className="bg-pink-600">
        <Text>Nova Solicitação</Text>
      </Button>
    </View>
  );
}
