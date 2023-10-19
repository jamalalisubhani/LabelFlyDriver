import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import PromotionCard from "./PromotionCard";
import { RFValue } from "react-native-responsive-fontsize";

const data = [
  {
    id: "1",
    image: require("../assets/images/discount1.jpg"),
    title: "Eid Discount",
    description: "Know more about the Eid discount",
  },
  {
    id: "2",
    image: require("../assets/images/discount2.jpg"),
    title: "Family Code",
    description: "Know more about our Ramadan promo",
  },
  {
    id: "3",
    image: require("../assets/images/promotion.jpg"),
    title: "Ramadan Promo",
    description: "Know more about our Ramadan promo",
  },
];

export default function DiscountList() {
  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled
        contentContainerStyle={styles.contentContainer}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PromotionCard
            image={item.image}
            title={item.title}
            description={item.description}
            width={255}
            height={127}
            margin={RFValue(20)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: RFValue(20),
  },
  contentContainer: {
    marginLeft: RFValue(18),
    paddingRight: 40,
  },
});
