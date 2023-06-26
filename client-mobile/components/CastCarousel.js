import { ScrollView, StyleSheet } from 'react-native';
import { Card, Title } from 'react-native-paper';

const CastsCarousel = ({ data }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {data?.map((cast) => (
        <Card style={styles.card} key={cast.id}>
          <Card.Cover source={{ uri: cast.profilePict }} />
          <Card.Content>
            <Title>{cast.name}</Title>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 10,
    width: 150
  },
});

export default CastsCarousel;
