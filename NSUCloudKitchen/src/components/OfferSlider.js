import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import { colors } from "../globals/style";

// const carouseldata = [
//   {
//     id: 1,
//     image: "../../assets/promo1.png",
//   },
//   {
//     id: 2,
//     image: "../../assets/promo2.png",
//   },
//   {
//     id: 3,
//     image: "../../assets/promo3.png",
//   },
// ];

const OfferSlider = () => {
  return (
    <View>
      <View style={styles.offerSlider}>
        <Swiper
          autoplay={true}
          autoplayTimeout={5}
          showsButtons={true}
          dotColor={colors.text2}
          activeDotColor={colors.text1}
          nextButton={<Text style={styles.buttonText}>›</Text>}
          prevButton={<Text style={styles.buttonText}>‹</Text>}
        >
          <View style={styles.slide}>
            <Image
              source={require("../../assets/promo1.png")}
              style={styles.image}
            ></Image>
          </View>
          <View style={styles.slide}>
            <Image
              source={require("../../assets/promo2.png")}
              style={styles.image}
            ></Image>
          </View>
          <View style={styles.slide}>
            <Image
              source={require("../../assets/promo3.png")}
              style={styles.image}
            ></Image>
          </View>
        </Swiper>
      </View>
    </View>
  );
};

export default OfferSlider;

const styles = StyleSheet.create({
  offerSlider: {
    width: "100%",
    height: 200,
    backgroundColor: colors.col3,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
    marginTop: 10,
    marginBottom: 80,
  },
  slide: {
    width: "100%",
    height: 200,
    backgroundColor: colors.col3,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  buttonText: {
    color: colors.text1,
    fontSize: 50,
    fontWeight: 400,
    lineHeight: 40,
    // backgroundColor: "white",
    // borderRadius: 20,
    // width: 38,
    // height: 38,
    // textAlign: "center",
  },
});
