import { trpc } from '@/utils/trpc';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text className="text-green-500 text-7xl "> I am styled using nativewind</Text>
      <Link href="/explore"> create a user</Link>
      <CreateUserScreen />
    </SafeAreaView>
  );
}

function CreateUserScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = trpc.createUser.useMutation({
    onSuccess: () => {
      Alert.alert('User created!');
      setName('');
      setEmail('');
      setPassword('');
    },
    onError: error => {
      Alert.alert('Error', error.message);
    },
  });

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 12, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{ marginBottom: 12, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 12, borderBottomWidth: 1 }}
      />
      <Button title="Create User" onPress={() => createUser.mutate({ name, email, password })} />
    </View>
  );
}
