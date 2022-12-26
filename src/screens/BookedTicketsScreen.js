import React, { useContext, useState } from "react";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import { EventsCards } from "../Context";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import TicketCard from "../components/TicketCard";

const BookedTicketsScreen = () => {
  const { ticket, setTicket } = useContext(EventsCards);
  const navigation = useNavigation();
  const [cardData, setCardData] = useState([]);
  const [card, setCard] = useState(false);
  const [list, setList] = useState(ticket);

  const openMovie = (movie) => {
    setCard(true), movie, cancelTicket;
  };

  const closeMovie = () => {
    setCard(false);
  };

  const cancelTicket = (id) => {
    setList((oldValues) => {
      return oldValues.filter((ticket) => ticket.code !== id);
    });
    setTicket((oldValues) => {
      return oldValues.filter((ticket) => ticket.code !== id);
    });
  };

  const openFilter = () => {
    this.ActionSheet.show();
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
            style={{ marginRight: 10 }}
            name="filter"
            size={24}
            color="black"
          />
        </View>
      </View>

      {list.length > 0 ? (
        <FlatList
          style={{
            flexGrow: 0,
          }}
          data={list}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setCardData({
                  title: item.name,
                  poster: item.image,
                  genre: item.genre,
                  time: item.timeSelected,
                  date: item.date,
                  seats: item.selectedSeats,
                  price: item.priceValue,
                  total: item.total,
                  code: item.code,
                });
                openMovie(cardData);
              }}
              style={{
                marginHorizontal: 15,
                marginVertical: 10,
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
              <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
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
                  <Text style={{ fontSize: 16, color: "gray" }}>
                    {item.genre}
                  </Text>

                  <Text style={{ color: "green", fontSize: 14 }}>
                    TICKET CONFIRMED
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      ) : (
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        >
          <Image
            style={{ width: 200, height: 200 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/5891/5891105.png",
            }}
          />
          <Text
            style={{
              marginTop: 10,
              marginBottom: 5,
              fontSize: 18,
              fontWeight: "600",
              lineHeight: 25,
            }}
          >
            Oooppsss....! No Ticket Found
          </Text>
          <Text
            style={{
              marginVertical: 5,
              color: "#5b5b5b",
              fontSize: 15,
              marginBottom: 20,
            }}
          >
            Looks like you haven't booked any ticket yet.
          </Text>
          <Pressable
            onPress={() => navigation.navigate("Home")}
            style={{
              backgroundColor: "black",
              marginLeft: "auto",
              marginRight: "auto",
              width: 150,
              borderRadius: 20,
              padding: 10,
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 15 }}>
              Get One Now
            </Text>
          </Pressable>
        </View>
      )}

      <TicketCard
        navigation={navigation}
        movie={cardData}
        isOpen={card}
        onClose={closeMovie}
        cancelTicket={cancelTicket}
      />
    </SafeAreaView>
  );
};

export default BookedTicketsScreen;
