import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const CategoryMealScreen = (props) => {
  const catId = props.route.params ? props.route.params.categoryId : null;

  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found, maybe check your filters?</DefaultText>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

export const screenOptions = (navData) => {
  const catObj = navData.route.params ? navData.route.params : {};

  const selectedCategory = CATEGORIES.find(
    (cat) => cat.id === catObj.categoryId
  );

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryMealScreen;
