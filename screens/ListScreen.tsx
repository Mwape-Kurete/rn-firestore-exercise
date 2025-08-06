import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getMyBucketList } from "../services/DbService";

const ListScreen = () => {
  const navigation: any = useNavigation();

  const [bucketItems, setBucketItems] = useState<any[]>([]); //this is for type safety

  const goToAdd = () => {
    navigation.navigate("Add");
  };

  //below useEffect only runs on first load but when running back or adding data it doesn't update
  // useEffect(() => {
  //   handleFetchData();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      //Do something when the screen is focused
      handleFetchData();
      return () => {};
      //Do something when the screen is unfocused
      //useful for cleanup functions
      //DO NOTHING
    }, [])
  );

  const handleFetchData = async () => {
    var allData = await getMyBucketList();
    // console.log("All Data: " + allData);
    setBucketItems(allData);
  };

  return (
    //Optional drag to reload our data -> like pull down reload
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable style={styles.addButton} onPress={goToAdd}>
          <Text style={styles.addButtonText}>Add</Text>
          <Entypo name="bucket" size={16} color="green" />
        </Pressable>

        {/* THIS WILL LOOP FOR EACH ITEM - scrollview or flatlist (need to know why you used the on3e you chose) */}

        {bucketItems.length > 0 ? (
          // ^this is better since we are looking at an object and not just a value comparitevly
          bucketItems.map((item: any, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate("Details", { id: item.id })}
            >
              <Text>{item.title}</Text>

              {item.priority ? (
                <AntDesign name="star" size={24} color="orange" />
              ) : null}
              {/* ^shows the star icon if it's a priority */}
            </TouchableOpacity>
          ))
        ) : (
          <Text>Add A Bucket List Item it see it Here!</Text>
        )}

        {/* END LOOP */}
      </View>
    </SafeAreaView>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    padding: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "white",
    borderColor: "green",
    borderWidth: 2,
    padding: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  addButtonText: {
    textAlign: "center",
    color: "green",
    fontWeight: "bold",
  },
});
