import { View, Text } from "react-native";
import React, { useState } from "react";

import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex gap-4 p-4">
      <View className="flex flex-col gap-4">
        <Label nativeID="airplane-mode">Usuário</Label>
        <Input
          placeholder="usuario"
          value={username}
          onChangeText={setUsername}
          aria-labelledby="textareaLabel"
        />
      </View>
      <View className="flex flex-col gap-4">
        <Label nativeID="airplane-mode">Senha</Label>
        <Input
          placeholder="senha"
          value={password}
          onChangeText={setPassword}
          aria-labelledby="textareaLabel"
        />
      </View>

      <Button className="bg-pink-600 text-white">
        <Text>Entrar</Text>
      </Button>
    </View>
  );
}
