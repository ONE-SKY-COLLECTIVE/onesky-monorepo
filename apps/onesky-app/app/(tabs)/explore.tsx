import { trpc } from '@/utils/trpc';
import { Text, View } from 'react-native';

export default function HelloScreen() {
  const { data, isLoading, error } = trpc.sayHello.useQuery({ name: 'Buck4566' });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{data?.greeting}</Text>
    </View>
  );
}
