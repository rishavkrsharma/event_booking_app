import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MoviesCards } from "../Context";
import Spinner from "react-native-loading-spinner-overlay";
import { ScrollView } from "react-native-gesture-handler";

const TheatreScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [spin, setSpin] = useState(false);
  const { seats, setSeats, occupied } = useContext(MoviesCards);
  const displaySeats = [...seats];
  const fee = 87;
  const noOfSeats = seats.length;
  const priceValue = noOfSeats * 240;
  const total = seats.length > 0 ? fee + noOfSeats * 240 : 0;

  const onSeatSelect = (item) => {
    const seatSelected = seats.find((seat) => seat === item);
    if (seatSelected) {
      setSeats(seats.filter((seat) => seat !== item));
    } else {
      setSeats([...seats, item]);
    }
  };
  const showSeats = () => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {seats.map((seat, index) => (
          <Text style={{ marginTop: 4, fontSize: 17, paddingHorizontal: 4 }}>
            {seat}
          </Text>
        ))}
      </View>
    );
  };
  const subscribe = () => {
    setSpin(true);
    occupied.push(...seats);
    setTimeout(() => {
      setSpin(false);
      navigation.navigate("Ticket", {
        name: route.params.name,
        timeSelected: route.params.timeSelected,
        total: total,
        image: route.params.image,
        date: route.params.date,
        selectedSeats: displaySeats,
        priceValue: priceValue,
        genre: route.params.genre,
      });
    }, 2000);
    setSeats([]);
  };
  
  return (
    <ScrollView>
      <Spinner
        visible={spin}
        textStyle={{
          color: "#FFF",
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 40,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 5 }}
            name="arrow-back"
            size={24}
            color="black"
          />
          <View style={{ marginLeft: 6 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              {route.params.name}
            </Text>
            <Text
              style={{
                marginTop: 2,
                color: "gray",
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              {route.params.genre}
            </Text>
          </View>
        </View>

        <AntDesign
          style={{ marginRight: 12 }}
          name="sharealt"
          size={24}
          color="black"
        />
      </View>

      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          fontWeight: "bold",
          marginTop: 5,
        }}
      >
        {route.params.timeSelected}
      </Text>

      <Text
        style={{
          textAlign: "center",
          fontSize: 13,
          marginTop: 5,
          color: "gray",
        }}
      >
        CLASSIC (240)
      </Text>

      <Text
        style={{
          textAlign: "center",
          fontSize: 15,
          fontWeight: "500",
          marginTop: 20,
          color: "black",
        }}
      >
        SCREEN THIS WAY
      </Text>

      <FlatList
          numColumns={10}
          data={route.params.tableSeats}
          keyExtractor={(item, index) => item.idx}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: "column", margin: 1 }}>
              <Pressable
                onPress={() => onSeatSelect(item.seat)}
                style={{
                  marginHorizontal: 4,
                  marginVertical: 4,
                  borderColor: "gray",
                  borderWidth: 0.5,
                  borderRadius: 5,
                }}
              >
                {seats.includes(item.seat) ? (
                  <Text style={{ backgroundColor: "#ffc40c", padding: 3, textAlign: "center" }}>
                    {item.seat}
                  </Text>
                ) : occupied.includes(item.seat) ? (
                  <Text style={{ backgroundColor: "#989898", padding: 3, textAlign: "center" }}>
                    {item.seat}
                  </Text>
                ) : (
                  <Text style={{ padding: 3, textAlign: "center" }}>
                    {item.seat}
                  </Text>
                )}
              </Pressable>
            </View>
          )}
        />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 100,
          marginTop: 20,
          backgroundColor: "#D8D8D8",
          padding: 8,
        }}
      >
        <View>
          <FontAwesome
            style={{ textAlign: "center", marginBottom: 4 }}
            name="square"
            size={24}
            color="#ffc40c"
          />
          <Text>Selected</Text>
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <FontAwesome
            style={{ textAlign: "center", marginBottom: 4 }}
            name="square"
            size={24}
            color="white"
          />
          <Text>Vacant</Text>
        </View>

        <View>
          <FontAwesome
            style={{ textAlign: "center", marginBottom: 4 }}
            name="square"
            size={24}
            color="#989898"
          />
          <Text>Occupied</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 14,
        }}
      >
        <View style={{ padding: 10 }}>
          <Text style={{ marginBottom: 4, fontSize: 14, fontWeight: "500" }}>
            Duration • 1 hour
          </Text>

          {seats.length > 0 ? (
            showSeats()
          ) : (
            <Text style={{ fontSize: 15 }}>No seats selected</Text>
          )}
        </View>

        <View
          style={{
            backgroundColor: "#E0E0E0",
            paddingVertical: 5,
            paddingHorizontal: 7,
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
          }}
        >
          <Text style={{ width: 100 }}>Now with ticket cancellation</Text>
        </View>
      </View>

      <Pressable
        style={{
          backgroundColor: "black",
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {seats.length > 0 ? (
          <Text style={{ fontSize: 17, fontWeight: "500", color: "white" }}>
            {seats.length} seat's selected
          </Text>
        ) : (
          <Text></Text>
        )}

        <Pressable onPress={subscribe}>
          <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
            PAY {total}
          </Text>
        </Pressable>
      </Pressable>
    </ScrollView>
  );
};

export default TheatreScreen;
