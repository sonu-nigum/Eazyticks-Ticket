import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { WebView } from "react-native-webview";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GetTickets() {
  const [activeTab, setActiveTab] = useState("Tickets");

  const [quantities, setQuantities] = useState({
    students: 2,
    adults: 2,
    nachos: 0,
    nachosCheese: 0,
    water: 0,
    juice: 0,
    fries: 0,
    row1: 0,
    row2: 0,
  });

  const prices = {
    students: 5,
    adults: 7,
    nachos: 3,
    nachosCheese: 5,
    water: 2,
    juice: 3,
    fries: 2,
    row1: 5,
    row2: 5,
  };

  const items = [
    { key: "students", label: "Students", price: prices.students },
    { key: "adults", label: "Adults", price: prices.adults },
  ];

  const shopItems = [
    { key: "nachos", label: "Nachos", price: prices.nachos, image: require("../assets/images/Nachos.png") },
    { key: "nachosCheese", label: "Nachos w/ Chili & Cheese", price: prices.nachosCheese, image: require("../assets/images/nachos with chilli.png") },
    { key: "water", label: "Water Bottle", price: prices.water, image: require("../assets/images/Water Bottle.png") },
    { key: "juice", label: "Juice", price: prices.juice, image: require("../assets/images/Juice.png") },
    { key: "fries", label: "Fries", price: prices.fries, image: require("../assets/images/Fries.png") },
  ];

  const parkingItems = [
    { key: "row1", label: "Row 1", price: prices.row1 },
    { key: "row2", label: "Row 2", price: prices.row2 },
  ];

  const increase = (key) =>
    setQuantities((prev) => ({ ...prev, [key]: prev[key] + 1 }));

  const decrease = (key) =>
    setQuantities((prev) => ({
      ...prev,
      [key]: prev[key] > 0 ? prev[key] - 1 : 0,
    }));

  const totalPrice = Object.keys(quantities).reduce(
    (sum, key) => sum + quantities[key] * prices[key],
    0
  );

  const renderCounter = (item) => (
    <View style={tw`flex-row items-center`}>
      <TouchableOpacity
        onPress={() => decrease(item.key)}
        style={tw`w-8 h-8 rounded-full border border-gray-300 items-center justify-center`}
      >
        <Text style={tw`text-lg`}>-</Text>
      </TouchableOpacity>
      <Text style={tw`mx-3 font-semibold`}>{quantities[item.key]}</Text>
      <TouchableOpacity
        onPress={() => increase(item.key)}
        style={tw`w-8 h-8 rounded-full border border-gray-300 items-center justify-center bg-red-500`}
      >
        <Text style={tw`text-white text-lg`}>+</Text>
      </TouchableOpacity>
    </View>
  );

  const eventLayoutLink = "https://eazyticks.com/events/all-black-attire-live-entertainment"; 

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`} edges={["top", "left", "right", "bottom"]}>
      {/* Header */}
      <View style={tw`flex-row items-center p-4 bg-white border-b border-gray-200`}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="black" />
        </TouchableOpacity>
        <Text style={tw`ml-4 text-lg font-semibold`}>Get Tickets</Text>
      </View>

      {/* Event Info */}
      <View style={tw`px-4 py-3 bg-white`}>
        <Text style={tw`text-base font-bold text-gray-900`}>
          Plaquemine High School vs Morgan City
        </Text>
        <Text style={tw`text-xs font-semibold text-black mt-1`}>
          Starts: Sun, 17th December 2023, 1:00 pm
        </Text>
        <Text style={tw`text-xs font-semibold text-black`}>
          End: Sun, 17th December 2023, 11:59 pm
        </Text>
      </View>

      {/* Segmented Tabs */}
      <View style={tw`flex-row bg-gray-200 rounded-full m-4 p-1`}>
        {["Tickets", "Shop", "Parking", "Layout"].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={tw`flex-1 py-2 rounded-full items-center ${
                isActive ? "bg-red-500" : "bg-transparent"
              }`}
            >
              <Text style={tw`${isActive ? "text-white font-bold" : "text-gray-600"}`}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Content */}
      <ScrollView style={tw`flex-1`}>
        {/* Tickets */}
        {activeTab === "Tickets" &&
          items.map((item) => (
            <View
              key={item.key}
              style={tw`bg-white m-3 rounded-xl border border-gray-200 overflow-hidden`}
            >
              <View style={tw`flex-row justify-between items-center p-4`}>
                <View style={tw`flex-1 pr-4`}>
                  <Text
                    style={tw`font-semibold text-gray-800`}
                  >
                    {item.label}
                  </Text>
                  <Text style={tw`text-red-500 font-bold mt-1`}>
                    ${item.price}
                  </Text>
                </View>
                {renderCounter(item)}
              </View>
              <View style={tw`h-px bg-gray-300`} />
              <Text style={tw`text-xs text-gray-500 px-4 pb-3`}>
                Extra info about {item.label} ticket goes here.
              </Text>
            </View>
          ))}

        {/* Shop */}
        {activeTab === "Shop" &&
          shopItems.map((item) => (
            <View
              key={item.key}
              style={tw`bg-white m-3 p-4 rounded-xl border border-gray-200 flex-row`}
            >
              <Image source={item.image} style={tw`w-12 h-12 rounded mr-4`} />
              <View style={tw`flex-1`}>
                <View style={tw`flex-row justify-between items-center`}>
                  <View style={tw`flex-1 pr-4`}>
                    <Text
                      style={tw`font-semibold text-gray-800`}
                    >
                      {item.label}
                    </Text>
                    <Text style={tw`text-red-500 font-bold mt-1`}>
                      ${item.price}
                    </Text>
                  </View>
                  {renderCounter(item)}
                </View>
              </View>
            </View>
          ))}

        {/* Parking */}
        {activeTab === "Parking" &&
          parkingItems.map((item) => (
            <View
              key={item.key}
              style={tw`bg-white m-3 rounded-xl border border-gray-200 overflow-hidden`}
            >
              <View style={tw`flex-row justify-between items-center p-4`}>
                <View style={tw`flex-1 pr-4`}>
                  <Text
                    style={tw`font-semibold text-gray-800`}
                  >
                    {item.label}
                  </Text>
                  <Text style={tw`text-red-500 font-bold mt-1`}>
                    ${item.price}
                  </Text>
                </View>
                {renderCounter(item)}
              </View>
              <View style={tw`h-px bg-gray-300`} />
              <Text style={tw`text-xs text-gray-500 px-4 pb-3`}>
                Parking info for {item.label} goes here.
              </Text>
            </View>
          ))}
          </ScrollView>

        {/* Layout */}
        {activeTab === "Layout" && (
  <View style={[tw`bg-white m-3 rounded-xl border border-gray-200 overflow-hidden`, { height: 350 }]}>
    <WebView
      source={{ uri: eventLayoutLink }}
      style={tw`flex-1 w-full`}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      scalesPageToFit={true}   // makes it zoom properly
    />
  </View>
        )}

      {/* Footer */}
      <View style={tw`bg-white border-t border-gray-200 p-4`}>
        <View style={tw`bg-white border border-gray-200 rounded-xl p-4 flex-row justify-between items-center`}>
          <Text style={tw`text-gray-700 font-semibold`}>Estimated Price</Text>
          <Text style={tw`text-red-500 font-bold text-lg`}>
            ${totalPrice}/-
          </Text>
        </View>

        <TouchableOpacity
          style={tw`bg-red-500 py-4 rounded-full items-center mt-4 mb-2`}
          onPress={() => router.push("/features/refund-policy")}
        >
          <Text style={tw`text-white font-semibold text-lg`}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
