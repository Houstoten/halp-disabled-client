import * as Google from "expo-google-app-auth";
import React from "react";
import { Button } from "react-native";

export const LoginComponent = () => {
  <Button
    title="Google login"
    onPress={async () => {
      const result = await Google.logInAsync({
        iosClientId:
          "265204013790-b59b6kqoj0j5d4cme3pqd94bvfosudr0.apps.googleusercontent.com",
        scopes: ["profile"],
      });
      console.log(result);
    }}
  />;
};
