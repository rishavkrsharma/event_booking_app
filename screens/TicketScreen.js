import { Text, View, SafeAreaView, Image, Pressable } from "react-native";
import React, { useEffect, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import { MoviesCards } from "../Context";

const TicketScreen = () => {
  const navigation = useNavigation();
  const { ticket } = useContext(MoviesCards);
  const route = useRoute();
  const ticketDetails = route.params;
  const code = Math.random().toString(36).substring(6).toUpperCase();
  const idno = Math.random().toString(36).substring(3).toUpperCase();

  useEffect(() => {
    const loadTicket = () => {
      ticket.push(ticketDetails);
    };
    loadTicket();
  }, []);
  
  return (
    <SafeAreaView style={{ marginTop: 35 }}>
      <View
        style={{
          backgroundColor: "white",
          height: "90%",
          margin: 10,
          borderRadius: 6,
        }}
      >
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }} numberOfLines={1}>
            {route.params.name}
          </Text>
          
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "gray" }}>
            {route.params.genre}
          </Text>

          <Text style={{ color: "green", fontSize: 14 }}>TICKET CONFIRMED</Text>
        </View>

        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "#DCDCDC",
            height: 1,
            borderWidth: 0.5,
            margin: 10,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginTop: 2, marginLeft: 10 }}>
            <Text style={{ color: "gray", fontSize: 15, fontWeight: "500" }}>
              DATE & TIME
            </Text>
            <Text style={{ marginVertical: 4, fontSize: 16 }}>
              {route.params.timeSelected}
            </Text>
            <Text>{moment(route.params.date).utc().format("DD/MM/YYYY")}</Text>
          </View>

          <Image
            style={{
              aspectRatio: 2 / 1,
              height: 60,
              borderRadius: 6,
              marginRight: 10,
            }}
            source={{ uri: route.params.image }}
          />
        </View>

        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "#DCDCDC",
            height: 1,
            borderWidth: 0.5,
            margin: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginLeft: 14 }}>
            <Text>AUDI NO</Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "bold",
                marginTop: 6,
              }}
            >
              2
            </Text>
          </View>

          <View>
            <Text>TICKETS</Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "bold",
                marginTop: 6,
              }}
            >
              {route.params.selectedSeats.length}
            </Text>
          </View>

          <View style={{ marginRight: 15 }}>
            <Text>SEATS</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {route.params.selectedSeats.map((item, index) => (
                <Text
                  style={{
                    margin: 3,
                    fontSize: 15,
                    fontWeight: "bold",
                    marginTop: 6,
                  }}
                >
                  {item}
                </Text>
              ))}
            </View>
          </View>
        </View>

        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "#DCDCDC",
            height: 1,
            borderWidth: 0.5,
            margin: 10,
          }}
        />

        <View
          style={{
            height: 140,
            backgroundColor: "#8DA399",
            borderRadius: 6,
            margin: 10,
          }}
        >
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Price Details
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                {route.params.selectedSeats.length} Seat Charges
              </Text>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                ₹{route.params.priceValue}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                Convenience Fee
              </Text>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                ₹87
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                Grand Total
              </Text>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                ₹{route.params.total}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                ID NO
              </Text>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                {idno}
              </Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "#DCDCDC",
            height: 1,
            borderWidth: 0.5,
            margin: 10,
          }}
        />

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          <Image
            style={{ width: 160, height: 160 }}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/444px-QR_code_for_mobile_English_Wikipedia.svg.png",
            }}
          />
        </View>

        <Text style={{ fontSize: 16, fontWeight: "500", textAlign: "center" }}>
          {code}
        </Text>
        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "#DCDCDC",
            height: 1,
            borderWidth: 0.5,
            margin: 10,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
          Home
        </Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("BookedTickets")}
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
          All Tickets
        </Text>
      </Pressable>
      </View>
      
    </SafeAreaView>
  );
};

export default TicketScreen;
