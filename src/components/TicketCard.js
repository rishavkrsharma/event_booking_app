import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";
const { width, height } = Dimensions.get("window");
const defaultHeight = height * 0.75;
import moment from "moment";

export default class TicketCard extends Component {
  state = {
    position: new Animated.Value(this.props.isOpen ? 0 : height),
    opacity: new Animated.Value(0),
    height: defaultHeight,
    visible: this.props.isOpen,
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.animateOpen();
    } else if (this.props.isOpen && !nextProps.isOpen) {
      this.animateClose();
    }
  }

  animateOpen() {
    this.setState({ visible: true }, () => {
      Animated.parallel(
        [
          Animated.timing(this.state.opacity, {
            toValue: 0.5,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.position, {
            toValue: 0,
            useNativeDriver: true,
          }),
        ],
        { useNativeDriver: true }
      ).start();
    });
  }

  animateClose() {
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.position, {
        toValue: height,
        useNativeDriver: true,
      }),
    ]).start(() =>
      this.setState({
        height: defaultHeight,
        visible: false,
      })
    );
  }

  render() {
    const { movie, cancelTicket, download } = this.props;

    const { title, poster, genre, time, date, seats, price, total, code } =
      movie || {};
    if (!this.state.visible) {
      return null;
    }
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.props.onClose}>
          <Animated.View
            style={[styles.backdrop, { opacity: this.state.opacity }]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            {
              backgroundColor: "white",
            },
            {
              height: this.state.height,
              transform: [
                { translateY: this.state.position },
                { translateX: 0 },
              ],
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              margin: 20,
              marginBottom: 0,
            }}
          >
            <View
              style={{
                flex: 1,
                marginBottom: 20,
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
                <Text
                  style={{ fontSize: 16, fontWeight: "500" }}
                  numberOfLines={1}
                >
                  {title}
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
                <Text style={{ fontSize: 16, color: "gray" }}>{genre}</Text>

                <Text style={{ color: "green", fontSize: 14 }}>
                  TICKET CONFIRMED
                </Text>
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
                  <Text
                    style={{ color: "gray", fontSize: 15, fontWeight: "500" }}
                  >
                    DATE & TIME
                  </Text>
                  <Text style={{ marginVertical: 4, fontSize: 16 }}>
                    {time}
                  </Text>
                  <Text>{moment(date).utc().format("DD/MM/YYYY")}</Text>
                </View>

                <Image
                  style={{
                    aspectRatio: 2 / 1,
                    height: 60,
                    borderRadius: 6,
                    marginRight: 10,
                  }}
                  source={{ uri: poster }}
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
                    {seats.length}
                  </Text>
                </View>

                <View style={{ marginRight: 15 }}>
                  <Text>SEATS</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {seats.map((item, index) => (
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
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <Image
                  style={{ width: 160, height: 160 }}
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/444px-QR_code_for_mobile_English_Wikipedia.svg.png",
                  }}
                />
              </View>

              <Text
                style={{ fontSize: 16, fontWeight: "500", textAlign: "center" }}
              >
                {code}
              </Text>
            </View>
          </View>

          <View
            style={{
              padding: 18,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableHighlight
              underlayColor="gray"
              style={{
                backgroundColor: "black",
                borderRadius: 100,
                width: 160,
                paddingVertical: 10,
                paddingHorizontal: 15,
                alignItems: "center",
              }}
              onPress={this.props.onClose}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                }}
              >
                Close
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor="red"
              style={{
                backgroundColor: "black",
                borderRadius: 100,
                paddingVertical: 10,
                width: 160,
                paddingHorizontal: 15,
                alignItems: "center",
              }}
              onPressIn={() => cancelTicket(code)}
              onPress={this.props.onClose}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                }}
              >
                Cancel Ticket
              </Text>
            </TouchableHighlight>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    borderRadius: 10,
    ...StyleSheet.absoluteFillObject,
  },
});
