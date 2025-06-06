import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import icons from "@/lib/icons";

// ✅ Define form fields interface
interface FormData {
  email: string;
}

// ✅ Validation Schema

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default function ExpoForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onSubmit = (data: FormData): void => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
    router.push("../(auth)/reset-password)");
  };

  const formFields = [
    {
      key: "email",
      label: "Email*",
      placeholder: "johndoe@email.com",
      icon: icons.email,
      secure: false,
    },
  ];

  return (
    <SafeAreaView edges={["top"]} className="entire-screen bg-[#C4EFF7]">
      <View style={{position: 'relative'}} className="flex-col h-full justify-between">
        <View className="z-20 block p-4">
          <Link href={"../(auth)/login"}>
            <Image
              source={icons.arrow}
              contentFit="cover"
              style={{ width: 20, height: 20 }}
            />
          </Link>
        </View>
        {/* <Image 
          source={icons.forgot}
          contentFit="contain"
          style={{ width: '100%', height: 500, position: 'absolute', top: 50}}
        /> */}

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[
            { position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10 },
            keyboardVisible ? {} : { position: "relative" }, // Revert to relative when keyboard is hidden
          ]}
        >
          <View
            className="h-fit rounded-t-3xl bg-white p-3 w-full pb-[80px]" 
            style={{ marginTop: keyboardVisible ? -80 : -40 }}
          >
            <View className="mt-4">
              <Text
                style={{ fontFamily: "Raleway" }}
                className="mb-4 text-[20px] font-bold"
              >
                Forgot password?
              </Text>
              <Text className="gray-800">
                Enter your email and we’ll send you a password reset link to
                your email.
              </Text>
            </View>

            {/* Reusable Input Fields */}
            {formFields.map(
              ({ key, label, placeholder, icon, secure }, index) => (
                <View key={index} className="mt-[30px] mb-[40px]">
                  <Text className="mb-1 text-sm text-[#7B7B7B]">{label}</Text>

                  <View
                    className={`flex-row items-center rounded-lg border px-3 ${
                      focusedField === key
                        ? "border-[var(--bright-lime)]"
                        : "border-gray-300"
                    }`}
                  >
                    <Image
                      className="h-4 w-4"
                      source={icon}
                      alt="An icon"
                      style={{ width: 16, height: 16 }}
                    />
                    <Controller
                      control={control}
                      name={key as keyof FormData}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          className="ml-2 flex-1 text-sm text-black focus:border-none p-2"
                          placeholder={placeholder}
                          placeholderTextColor="#B3B3B3"
                          secureTextEntry={secure}
                          value={value}
                          onChangeText={onChange}
                          onFocus={() => setFocusedField(key)}
                          onBlur={() => setFocusedField(null)}
                        />
                      )}
                    />
                  </View>
                  {errors[key as keyof FormData] && (
                    <Text className="text-xs text-red-500">
                      {errors[key as keyof FormData]?.message}
                    </Text>
                  )}
                </View>
              ),
            )}

            {/* Submit Button */}
            <Pressable
              onPress={handleSubmit(onSubmit)}
              className={`mt-2 rounded-lg py-3 text-center font-semibold transition-all ${
                isValid
                  ? "bg-[var(--bright-lime)] text-white"
                  : "bg-[var(--light-gray-bg)] text-[var(--light-slate-gray)]"
              }`}
              disabled={!isValid}
            >
              <Text className="text-center text-sm">Send</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
