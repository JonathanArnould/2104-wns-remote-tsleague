import React from "react";
import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import { globalStyles } from "../../styles/global";
import { Form, Formik } from "formik";
import * as yup from "yup";

const ClassroomSchema = yup.object({
  name: yup.string()
  .required()
  .min(5),
  email: yup.string()
  .required()
  .min(5),
  password: yup.string()
  .required(),
  confirmPassword: yup.string()
  .oneOf([yup.ref('password'), null], 'Les mots de passe ne sont pas les mêmes')
})

export default function MyAccountForm() {
  return (
    <View>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={ClassroomSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Nom"
              onChangeText={props.handleChange("name")}
              value={props.values.name}
            />

            <TextInput
              style={globalStyles.input}
              placeholder="Mail"
              onChangeText={props.handleChange("email")}
              value={props.values.email}
            />

            <TextInput
              style={globalStyles.input}
              placeholder="Mot de passe"
              secureTextEntry={true}
              onChangeText={props.handleChange("password")}
              value={props.values.password}
            />

            <TextInput
              style={globalStyles.input}
              placeholder="Verification mot de passe"
              secureTextEntry={true}
              onChangeText={props.handleChange("confirmPassword")}
              value={props.values.confirmPassword}
            />

            <Button color="blue" title="Suivant" onPress={() => props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}
