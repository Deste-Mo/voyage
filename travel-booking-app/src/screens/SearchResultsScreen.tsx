import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppStack';
import { Journey, SearchParams } from '../types';
import { searchTrips } from '../services/searchService';
import ResultCard from '../components/ResultCard';
import Loader from '../components/Loader';

export default function SearchResultsScreen({ route, navigation }: NativeStackScreenProps<AppStackParamList, 'SearchResults'>) {
  const params = route.params.params as SearchParams;
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Journey[]>([]);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const journeys = await searchTrips(params);
      setResults(journeys);
      setLoading(false);
    };
    run();
  }, [route.params]);

  if (loading) return <Loader />;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ResultCard
            journey={item}
            onPress={() => navigation.navigate('Booking', { journey: item, params })}
          />
        )}
      />
    </View>
  );
}