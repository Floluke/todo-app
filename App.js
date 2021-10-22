import React, { useState, useEffect } from "react";
import { View, StatusBar, FlatList } from "react-native";
import styled from "styled-components";
import AddInput from "./components/AddInput";
import TodoList from "./components/TodoList";
import Empty from "./components/Empty";
import Header from "./components/Header";
import firestore from '@react-native-firebase/firestore';

export default function App() {
  const [data, setData] = useState([]);

  async function handleSend(mes, da) {
    const text = mes;
    const date = da;
    firestore()
      .collection('mylist')
      .add({
        t_list: text,
        t_listdate: date,
        key: Math.random().toString()
      });
  }
  useEffect(() => {
    const taskListener = firestore()
      .collection('mylist')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          return {
            list_id: doc.id,
            textlist: '',
            listdate: '',
            ...doc.data()
          };
        });
        setData(data);
      });
    return () => taskListener();
  }, []);




  const submitHandler = (value, date) => {
    setData((prevTodo) => {

      const dmy = date.getDate() + "-" + parseInt(date.getMonth() + 1) + "-" + parseInt(date.getFullYear() + 543);
      handleSend(value, dmy);
      return [
        {
          value: value,
          date: dmy,
          key: Math.random().toString(),
        },
        ...prevTodo,
      ];
    });
  };

  const deleteItem = (key) => {

    firestore()
      .collection('mylist')
      .doc(key).delete()
      .catch((error) => console.log(error));
  };

  const searchItem = (keyword) => {

  }

  return (
    <ComponentContainer>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="teal" />
      </View>
      <View>
        <FlatList
          data={data}
          ListHeaderComponent={() => <Header searchItem={searchItem} />}
          ListEmptyComponent={() => <Empty />}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TodoList item={item} deleteItem={deleteItem} />
          )}
        />
        <View>
          <AddInput submitHandler={submitHandler} />
        </View>
      </View>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  background-color: teal;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;