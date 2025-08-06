import {
  collection,
  addDoc,
  getDocs,
  DocumentData,
  SnapshotOptions,
  query,
  orderBy,
  where,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

//All of our firestore functionality

// TODO: Create new list item function
export const createNewBucketItem = async (item: {
  title: string;
  priority: boolean;
  due: string;
  description: string;
  isCompleted: boolean;
}) => {
  try {
    // docRef = ref to our newly created document
    // addDoc = creates a unique ID for us
    const docRef = await addDoc(collection(db, "items"), item);
    console.log("Document written with ID: ", docRef.id);

    return true; //you can be more specific
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// TODO: Get all list items
export const getMyBucketList = async () => {
  var allItems: { [key: string]: any; id: string }[] = []; //array that we want to return
  //^ inferring all items for type script type safety

  //making a custom query to add orderby/limit to the data shown
  var q = query(collection(db, "items"), orderBy("priority", "desc"));
  //getDocs = fetches alllll the data in the selected doc
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());

    allItems.push({ ...doc.data(), id: doc.id });
    // allItems.push({ ...doc.data(), id: doc.data });
    //^ pushing each docs data to the array I want to return
  });

  //console.log(allItems);

  return allItems;

  //Can't just use query snapshot as the array of items, need to access the doc data
};

export const getBucketItemById = async (id: string) => {
  try {
    const docRef = doc(db, "items", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document: ", error);
    return null;
  }
};

export const markItemAsCompleted = async (id: string) => {
  try {
    const docRef = doc(db, "items", id);
    await updateDoc(docRef, {
      isCompleted: true,
    });
    console.log("Marked as completed.");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
