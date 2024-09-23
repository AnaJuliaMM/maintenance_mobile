import React from "react";
import { View, TextInput } from "react-native";

// React Native Reusables components imports
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

export default function RequestForm() {
  const [value, setValue] = React.useState("");

  const onChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <View className="flex flex-col gap-4 p-4">
      <View className="flex flex-col gap-4">
        <Label nativeID="airplane-mode">Prioridade</Label>
        <Input
          placeholder="Write some stuff..."
          value={value}
          onChangeText={onChangeText}
          aria-labelledby="inputLabel"
          aria-errormessage="inputError"
        />
      </View>

      <View className="flex flex-col gap-4">
        <Label nativeID="airplane-mode">Equipe</Label>
        <Input
          placeholder="Write some stuff..."
          value={value}
          onChangeText={onChangeText}
          aria-labelledby="inputLabel"
          aria-errormessage="inputError"
        />
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
