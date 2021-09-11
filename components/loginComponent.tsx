import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Button } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export function GoogleLogin() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    // scopes: ["openid", "profile", "email", "offline"],
    redirectUri: "https://auth.expo.io/@keep-simple/Halp_disabled_client",
    expoClientId:
      "265204013790-5ru8rqcpa57tbru5hefopr2op3pdicun.apps.googleusercontent.com",
    webClientId:
      "265204013790-5ru8rqcpa57tbru5hefopr2op3pdicun.apps.googleusercontent.com",
  });

  //   console.log({ response });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log(authentication);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
