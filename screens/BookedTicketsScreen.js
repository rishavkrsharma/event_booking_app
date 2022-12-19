import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { MoviesCards } from "../Context";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import TicketCard from "../components/TicketCard";

const BookedTicketsScreen = () => {
  const { ticket } = useContext(MoviesCards);
  console.log(ticket);
  const navigation = useNavigation();
  const [cardData, setCardData] = useState([]);
  const [card, setCard] = useState(false);

  const openMovie = (movie) => {
    setCard(true), movie;
  };

  const closeMovie = () => {
    setCard(false);
  };

  return (
    <SafeAreaView
      style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 40,
          marginBottom: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            style={{ marginHorizontal: 5 }}
            name="arrow-back"
            size={24}
            color="black"
          />
          <View style={{ marginLeft: 6 }}>
            <Text style={{ fontSize: 20, fontWeight: "500" }}>
              Upcomming Tickets
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Ionicons
            onPress={() => navigation.navigate("Home")}
            style={{ marginRight: 10 }}
            name="home-outline"
            size={24}
            color="black"
          />
          <Ionicons
            // onPress={() => navigation.goBack()}
            style={{ marginRight: 10 }}
            name="filter"
            size={24}
            color="black"
          />
        </View>
      </View>

      <FlatList
        data={ticket}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              setCardData({
                title: item.name,
                poster: item.image,
                genre: item.genre,
                time: item.timing,
                seats: item.tableData,
                hall: item.hallName,
              });
              openMovie(cardData);
            }}
            style={{
              marginHorizontal: 10,
              paddingHorizontal: 10,
              paddingVertical: 10,
              backgroundColor: "white",              
              borderRadius: 10,
            }}
          >
            <Image
              style={{
                width: "100%",
                aspectRatio: 2 / 1,
                resizeMode: "cover",
                borderRadius: 10,
              }}
              source={{ uri: item.image }}
            />

            <Text
              style={{
                marginVertical: 5,
                color: "#5b5b5b",
              }}
            >
              {moment(item.date).utc().format("DD/MM/YYYY")} •{" "}
              {item.timeSelected}
            </Text>

            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                lineHeight: 25,
              }}
              numberOfLines={2}
            >
              {item.name}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, color: "gray" }}>{item.genre}</Text>

              <Text style={{ color: "green", fontSize: 14 }}>
                TICKET CONFIRMED
              </Text>
            </View>
          </Pressable>
        )}
      />

      <TicketCard
        navigation={navigation}
        movie={cardData}
        isOpen={card}
        onClose={closeMovie}
      />
    </SafeAreaView>
  );
};

export default BookedTicketsScreen;
