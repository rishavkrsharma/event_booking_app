import React, { Component, useState } from "react";
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
    // Animates slide ups and downs when popup open or closed
    position: new Animated.Value(this.props.isOpen ? 0 : height),
    // Backdrop opacity
    opacity: new Animated.Value(0),
    // Popup height that can be changed by pulling it up or down
    height: defaultHeight,
    // Visibility flag
    visible: this.props.isOpen,
  };

  // Handle isOpen changes to either open or close popup
  UNSAFE_componentWillReceiveProps(nextProps) {
    // isOpen prop changed to true from false
    if (!this.props.isOpen && nextProps.isOpen) {
      this.animateOpen();
    }
    // isOpen prop changed to false from true
    else if (this.props.isOpen && !nextProps.isOpen) {
      this.animateClose();
    }
  }

  // Open popup
  animateOpen() {
    // Update state first
    this.setState({ visible: true }, () => {
      Animated.parallel(
        [
          // Animate opacity
          Animated.timing(this.state.opacity, { toValue: 0.5 }),
          // And slide up
          Animated.timing(this.state.position, { toValue: 0 }),
        ],
        { useNativeDriver: true }
      ).start();
    });
  }

  // Close popup
  animateClose() {
    Animated.parallel(
      [
        Animated.timing(this.state.opacity, { toValue: 0 }),
        // Slide down
        Animated.timing(this.state.position, { toValue: height }),
      ],
      { useNativeDriver: true }
    ).start(() =>
      this.setState({
        // Reset to default values
        height: defaultHeight,
        visible: false,
      })
    );
  }

  render() {
    const { movie, onBook } = this.props;

    // Pull out movie data
    const { title, genre, poster, time, seats, hall } = movie || {};
    // Render nothing if not visible
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
              // Animates height
              height: this.state.height,
              // Animates position on the screen
              transform: [
                { translateY: this.state.position },
                { translateX: 0 },
              ],
            },
          ]}
        >
          {/* Content */}
          <View style={styles.content}>
            {/* Movie poster, title and genre */}
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

            {/* Showtimes */}
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
  // Main container
  container: {
    ...StyleSheet.absoluteFillObject, // fill up all screen
    justifyContent: "flex-end", // align popup at the bottom
    backgroundColor: "transparent", // transparent background
  },
  // Semi-transparent background below popup
  backdrop: {
    ...StyleSheet.absoluteFillObject, // fill up all screen
    backgroundColor: "black",
  },
  // Popup
  modal: {
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    margin: 20,
    marginBottom: 0,
  },
  // Movie container
  movieContainer: {
    flex: 1, // take up all available space
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1, // take up all available space
  },
  image: {
    borderRadius: 10, // rounded corners
    ...StyleSheet.absoluteFillObject, // fill up all space in a container
  },
});
