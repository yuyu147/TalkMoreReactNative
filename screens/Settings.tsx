import { Auth, DataStore } from "aws-amplify";
import React from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { generateKeyPair } from "../utils/crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User as UserModel } from "../src/models";
import { inject, observer } from "mobx-react";
import { t } from "@/translations/translate";

export const PRIVATE_KEY = "PRIVATE_KEY";

const Settings = (props: any) => {

  const logOut = async () => {
    props.userStore.rootStore.logOut()
  };

  const toLanguageScreen = () => {
    props.navigation.navigate('LanguageScreen')
  }

  const updateKeyPair = async () => {
    // generate private/public key
    const { publicKey, secretKey } = generateKeyPair();
    console.log(publicKey, secretKey);

    // save private key to Async storage
    await AsyncStorage.setItem(PRIVATE_KEY, secretKey.toString());
    console.log("secret key was saved");

    // save public key to UserModel in Datastore
    const userData = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(UserModel, userData.attributes.sub);

    if (!dbUser) {
      Alert.alert("User not found!");
      return;
    }

    await DataStore.save(
      UserModel.copyOf(dbUser, (updated) => {
        updated.publicKey = publicKey.toString();
      })
    );

    console.log(dbUser);

    Alert.alert("Successfully updated the keypair.");
  };

  return (
    <View>
      {/* <Text>Setting</Text> */}

      <Pressable
        onPress={updateKeyPair}
        style={{
          backgroundColor: "white",
          height: 50,
          margin: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Update keypair</Text>
      </Pressable>

      <Pressable
        onPress={toLanguageScreen}
        style={{
          backgroundColor: "white",
          height: 50,
          margin: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>{t("settings.languageText")}</Text>
      </Pressable>

      <Pressable
        onPress={() => props.navigation.navigate('DarkModeScreen')}
        style={{
          backgroundColor: "white",
          height: 50,
          margin: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>{t("settings.darkModeText")}</Text>
      </Pressable>

      <Pressable
        onPress={logOut}
        style={{
          backgroundColor: "white",
          height: 50,
          margin: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default inject('userStore')(observer(Settings))
