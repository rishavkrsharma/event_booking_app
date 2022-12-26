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
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";

const { width, height } = Dimensions.get("window");
const defaultHeight = height * 0.55;
let selectedDate = "";

export default class Card extends Component {
  state = {
    position: new Animated.Value(this.props.isOpen ? 0 : height),
    opacity: new Animated.Value(0),
    height: defaultHeight,
    visible: this.props.isOpen,
  };

  
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.animateOpen();
    }
    else if (this.props.isOpen && !nextProps.isOpen) {
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
    Animated.parallel(
      [
        Animated.timing(this.state.opacity, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.position, {
          toValue: height,
          useNativeDriver: true,
        }),
      ],
      { useNativeDriver: true }
    ).start(() =>
      this.setState({
        height: defaultHeight,
        visible: false,
      })
    );
  }

  render() {
    const { event } = this.props;
    const { title, genre, poster, time, seats } = event || {};
    
    if (!this.state.visible) {
      return null;
    }
    return (
      <View style={styles.container}>
        {/* Closes popup if user taps on semi-transparent backdrop */}
        <TouchableWithoutFeedback onPress={this.props.onClose}>
          <Animated.View
            style={[styles.backdrop, { opacity: this.state.opacity }]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.modal,
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
            <View style={styles.movieContainer}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: poster }} style={styles.image} />
              </View>

              <View
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {title}
                </Text>
                <Text
                  style={{
                    color: "#BBBBBB",
                    fontSize: 14,
                  }}
                >
                  {genre}
                </Text>
              </View>
            </View>

            <View>
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                Day
              </Text>
              <HorizontalDatepicker
                mode="gregorian"
                startDate={new Date("2022-12-14")}
                endDate={new Date("2022-12-24")}
                initialSelectedDate={new Date("2022-12-12")}
                onSelectedDateChange={(date) => (selectedDate = date)}
                selectedItemWidth={170}
                unselectedItemWidth={38}
                itemHeight={38}
                itemRadius={10}
                selectedItemTextStyle={styles.selectedItemTextStyle}
                unselectedItemTextStyle={styles.selectedItemTextStyle}
                selectedItemBackgroundColor="#222831"
                unselectedItemBackgroundColor="#ececec"
                flatListContainerStyle={{ backgroundColor: "transparent" }}
              />
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                Showtime • {time}
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View
            style={{
              padding: 18,
            }}
          >
            <TouchableHighlight
              underlayColor="gray"
              style={{
                backgroundColor: "black",
                borderRadius: 100,
                paddingVertical: 10,
                paddingHorizontal: 15,
                alignItems: "center",
              }}
              onPressIn={() => {
                this.props.navigation.navigate("Theatre", {
                  genre: genre,
                  name: title,
                  timeSelected: time,
                  tableSeats: seats,
                  date: selectedDate,
                  image: poster,
                });
              }}
              onPress={this.props.onClose}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                }}
              >
                Select Seats
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
  modal: {
    backgroundColor: "white",
  },
  movieContainer: {
    flex: 1,
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    borderRadius: 10,
    ...StyleSheet.absoluteFillObject,
  },
});
