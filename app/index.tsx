import { View, Text } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import { useAuth } from "~/context/authContext";
import { authType } from "~/type/authType";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<authType>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * Função responsável por fazer o login do usuário.
   * Realiza a autenticação usando as credenciais fornecidas no formulário.
   * Se o login for bem-sucedido, redireciona o usuário para a página principal.
   * Caso contrário, exibe uma mensagem de erro.
   *
   * @async
   * @function
   * @returns {Promise<void>} Resolve quando o login for concluído, seja com sucesso ou erro.
   *
   * @throws {Error} Caso o login falhe, um erro é lançado e tratado.
   *
   * @example
   * await handleLogin(); // Chama a função para realizar o login do usuário
   */
  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      await login(formData);
      router.push("/(tabs)/machine");
    } catch (err) {
      setError("Usuário ou senha inválidos");
      console.error("Erro ao fazer login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex gap-4 p-4">
      <View className="flex flex-col gap-4">
        <Label nativeID="airplane-mode">Usuário</Label>
        <Input
          placeholder="usuario"
          value={formData.username}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
          aria-labelledby="textareaLabel"
        />
      </View>
      <View className="flex flex-col gap-4">
        <Label nativeID="airplane-mode">Senha</Label>
        <Input
          secureTextEntry={true}
          placeholder="senha"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          aria-labelledby="textareaLabel"
        />
      </View>

      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <Button onPress={handleLogin} className="bg-pink-600 text-white">
        {loading ? <Text>Carregando...</Text> : <Text>Entrar</Text>}
      </Button>
    </View>
  );
}
