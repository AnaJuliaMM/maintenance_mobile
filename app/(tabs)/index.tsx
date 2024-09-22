import * as React from "react";
import { ScrollView } from "react-native";

// External Package imports
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

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
        onPressRow={() => {
          router.navigate("/machineModal");
        }}
      />
    </ScrollView>
  );
}
