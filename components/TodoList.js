import React from "react";
import { View, Alert } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components";



export default function TodoList({ item, deleteItem }) {
  const deletetask = () => {
    return Alert.alert(
      "ต้องการลบ?",
      "ต้องการที่จะลบ",
      [

        {
          text: "ใช่",
          onPress: () => {
            deleteItem(item.list_id);
          },
        },
        {
          text: "ไม่",
        },
      ]
    );
  };
  return (
    <ComponentContainer>
      <ListContainer>
        <CirlceContainer onPress={() => { }}>
          <Entypo name="circle" size={24} color="midnightblue" />
        </CirlceContainer>
        <View>
          <TextItem>{item.t_list}</TextItem>
          <TextDate>{item.t_listdate}</TextDate>
        </View>
        <IconContainer onPress={() => deletetask()}>
          <MaterialIcons name="delete" size={24} color="midnightblue" />
        </IconContainer>
      </ListContainer>
    </ComponentContainer>
  );
}

const ListContainer = styled.TouchableOpacity`
  background-color: whitesmoke;
  height: auto;
  width: 350px;
  margin-bottom: 30px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
`;

const TextItem = styled.Text`
  color: black;
  width: 260px;
  height: auto;
  font-size: 20px;
  margin-top: 10px;
  margin-right: 20px;
  font-family: Poppins-Regular;
`;

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-top: 15px;
  height: 40px;
  border-radius: 10px;
`;

const CirlceContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 5px;
`;

const TextDate = styled.Text`
  color: goldenrod;
  font-size: 15px;
  margin-right: 20px;
  font-family: Poppins-Regular;
  border-radius: 10px;
  width: 150px;
`;