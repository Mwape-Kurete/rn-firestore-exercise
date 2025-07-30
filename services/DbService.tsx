import {
  collection,
  addDoc,
  getDocs,
  DocumentData,
  SnapshotOptions,
  query,
  orderBy,
  where,
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
  var allItems: { id: (options?: SnapshotOptions) => DocumentData }[] = []; //array that we want to  return
  //^ inferring all items for type script type safety

  //making a custom query to add orderby/limit to the data shown
  var q = query(collection(db, "items"), orderBy("priority", "desc"));
  //getDocs = fetches alllll the data in the selected doc
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());

    allItems.push({ ...doc.data(), id: doc.data });
    //^ pushing each docs data to the array I want to return
  });

  //console.log(allItems);

  return allItems;

  //Can't just use query snapshot as the array of items, need to access the doc data
};
