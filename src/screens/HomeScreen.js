import { Text, View, Pressable, Image, ImageBackground } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { EventsCards } from "../Context";
import events from "../../assets/data/events";
import Card from "../components/Card";

const HomeScreen = () => {
  const data = events;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { ticket } = useContext(EventsCards);
  const [list, setList] = useState(data);
  const [filterActive, setFilterActive] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [card, setCard] = useState(false);
  let ticketCount;

  const types = [
    {
      id: "0",
      name: "Comedy",
    },
    {
      id: "1",
      name: "Play",
    },
    {
      id: "2",
      name: "Movie",
    },
  ];

  const filters = (genre) => {
    if (!filterActive) {
      setList(data);
      setList(list.filter((list) => list.genre == genre));
      setFilterActive(true);
    } else if (filterActive) {
      setList(data);
      setFilterActive(false);
    }
  };

  const openMovie = (event) => {
    setCard(true), event;
  };

  const closeMovie = () => {
    setCard(false);
  };

  const countTicket = () => {
    ticketCount = ticket.length;
  };

  useEffect(() => {
    isFocused && countTicket();
  }, [isFocused]);

  return (
    <View
      style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
    >
      <View>
        <ImageBackground
          source={require("../../assets/wallpaper.jpg")}
          style={{
            width: "100%",
            height: 200,
            resizeMode: "cover",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 60,
              fontWeight: "bold",
              color: "white",
              marginLeft: 20,
              marginTop: 80,
              lineHeight: 60,
            }}
          >
            Enjoy Extra with us
          </Text>
        </ImageBackground>
      </View>

      {ticket.length > 0 && (
        <View
          style={{
            height: 66,
            backgroundColor: "white",
            borderRadius: 10,
            marginHorizontal: 20,
            marginTop: 15,
            paddingHorizontal: 8,
            paddingTop: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              You have upcomming ticket
            </Text>

            <Pressable
              onPress={() => navigation.navigate("BookedTickets")}
              style={{
                backgroundColor: "black",
                padding: 6,
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "500",
                  textAlign: "center",
                  color: "white",
                }}
              >
                VIEW TICKETS
              </Text>
            </Pressable>
          </View>
        </View>
      )}

      <View
        style={{
          marginLeft: 20,
          marginTop: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>Explore Events</Text>
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {types.map((item, index) => (
            <Pressable
              onPress={() => {
                filters(item.name);
              }}
              style={{
                margin: 10,
                width: 104,
                borderColor: "C0C0C0",
                borderWidth: 0.5,
                borderRadius: 10,
                paddingHorizontal: 18,
                paddingVertical: 5,
              }}
              key={index}
            >
              <Text
                style={{ textAlign: "center", fontSize: 15, fontWeight: "500" }}
              >
                {item.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={list}
        renderItem={({ item }) => (
          <View>
            <Pressable
              style={{ marginTop: 10, marginHorizontal: 15, marginBottom: 15 }}
            >
              <Image
                style={{
                  aspectRatio: 2 / 1,
                  width: "100%",
                  resizeMode: "cover",
                  borderRadius: 10,
                }}
                source={{ uri: item.image }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      width: 170,
                      marginTop: 10,
                    }}
                  >
                    {item.name.substr(0.16)}
                  </Text>

                  <Text style={{ marginTop: 4, fontSize: 14, color: "gray" }}>
                    {item.genre} • {item.language}
                  </Text>
                  <Text style={{ marginTop: 2, fontSize: 14, color: "gray" }}>
                    Start time • {item.timing}
                  </Text>
                </View>

                <View>
                  <Pressable
                    onPress={() => {
                      setCardData({
                        title: item.name,
                        poster: item.image,
                        genre: item.genre,
                        time: item.timing,
                        seats: item.tableData,
                      });
                      openMovie(cardData);
                    }}
                    style={{
                      backgroundColor: "black",
                      padding: 10,
                      borderRadius: 6,
                      marginRight: 10,
                      width: 100,
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "500",
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      BOOK
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          </View>
        )}
      />

      <Card
        navigation={navigation}
        event={cardData}
        isOpen={card}
        onClose={closeMovie}
      />
    </View>
  );
};

export default HomeScreen;
