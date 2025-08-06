import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getBucketItemById, markItemAsCompleted } from "../services/DbService";

import React, { useEffect, useState } from "react";

type BucketItem = {
  id: string;
  title: string;
  description: string;
  due: string;
  priority: boolean;
  isCompleted: boolean;
};

const DetailsScreen = ({ route, navigation }) => {
  const { id } = route.params; // assuming that the id is successfully passed from list screen
  const [item, setItem] = useState<BucketItem | null>(null); //again for type safety
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      const data = await getBucketItemById(id);
      setItem(data);
      setLoading(false);
    };

    fetchItem();
  }, [id]);

  const handleComplete = async () => {
    await markItemAsCompleted(id);
    Alert.alert("Success", "Marked as completed");
    navigation.goBack(); // or refetch item if you want to stay on this screen
  };

  if (loading) return <ActivityIndicator />;

  if (!item) return <Text>Item not found.</Text>;

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>Due date: {item.due}</Text>
      <Text>Priority: {item.priority ? "Yes" : "No"}</Text>
      <Text>
        Status: {item.isCompleted ? "Completed ✅" : "Not completed ❌"}
      </Text>

      {!item.isCompleted && (
        <Button
          title="Mark as Completed"
          color="green"
          onPress={handleComplete}
        />
      )}
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
    marginTop: 20,
  },
});
