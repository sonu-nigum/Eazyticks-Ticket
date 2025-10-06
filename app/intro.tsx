import React, { useEffect } from "react";
import { View, Image, Dimensions } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";

const { width, height } = Dimensions.get("window");

export default function IntroScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#F6472A", "#F6472A"]}
      style={tw`flex-1 justify-center items-center relative overflow-hidden`}
    >
      {/* Decorative Circles */}
      <View
        style={[
          tw`absolute rounded-full bg-white/15`,
          { width: width * 0.35, height: width * 0.35, top: -width * 0.15, left: -width * 0.15 },
        ]}
      />
      <View
        style={[
          tw`absolute rounded-full bg-white/15`,
          { width: width * 0.45, height: width * 0.45, bottom: -width * 0.2, right: -width * 0.2 },
        ]}
      />

      {/* Logo */}
      <View style={tw`items-center`}>
        <Image
          source={require("../assets/images/EZT VECTOR 1 (1).png")}
          style={{
            width: width * 0.8,   // 60% of screen width
            height: width * 0.8,  // keep square ratio
            marginBottom: 10,
          }}
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
}
