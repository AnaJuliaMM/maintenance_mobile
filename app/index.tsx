import { Stack } from "expo-router";
import * as React from "react";
import { Alert, ScrollView, View, useWindowDimensions } from "react-native";

// Custom components imports
import CustomTable from "~/components/custom/CustomTable";

// Mock data imports
import { MACHINES } from "~/lib/mock_data";


export default function Example() {
  return (
    <ScrollView
      alwaysBounceVertical={true}
      bounces={false}
      showsHorizontalScrollIndicator={false}
    >
      <CustomTable
        rows={MACHINES}
        columns={["Nome", "Tipo", "Localização"]}
        min_column_widths={[20, 20, 20]}
      />
    </ScrollView>
  );
}
