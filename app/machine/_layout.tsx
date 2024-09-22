import { Stack } from "expo-router";

export default function MaquinasLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Lista de Máquinas",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Detalhes da Máquina",
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
