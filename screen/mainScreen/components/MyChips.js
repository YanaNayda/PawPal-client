import * as React from 'react';
import { Chip } from 'react-native-paper';
import { View, ScrollView, StyleSheet } from 'react-native';
 import { Image } from 'react-native';


 

 const MyChips = ({ choseTags, setChoseTags  }) => {

   const toggleTag = (tag) => {
    if (choseTags.includes(tag)) {
      // Удаляем из выбранных
      setChoseTags(choseTags.filter(t => t !== tag));
    } else {
      // Добавляем в выбранные
      setChoseTags([...choseTags, tag]);
    }
  };

 
  return (
    <View style={styles.container}>
         <Chip icon={() => (
              <Image
                source={ require('../../../assets/information_icon.png')}
                style={{ width: 18, height: 18, tintColor: '#010365ff' }}
              />
            )}
        style={styles.chip}
        selected={choseTags.includes('Information')}
        onPress={() => toggleTag('Information')}
      >
        Information
      </Chip>


      <Chip icon={() => (
              <Image
                source={ require('../../../assets/paw_icon.png')}
                style={{ width: 18, height: 18, tintColor: '#010365ff' }}
              />
            )}
        style={styles.chip}
        selected={choseTags.includes('Animals')}
        onPress={() => toggleTag('Animals')}
      >
        Animals
      </Chip>

      <Chip icon={() => (
              <Image
                source={ require('../../../assets/question_icon.png')}
                style={{ width: 18, height: 18, tintColor: '#010365ff' }}
              />
            )}
        style={styles.chip}
        selected={choseTags.includes('Questions')}
        onPress={() => toggleTag('Questions')}
      >
        Questions
      </Chip>


      <Chip icon={() => (
              <Image
                source={ require('../../../assets/health_icon.png')}
                style={{ width: 18, height: 18, tintColor: '#010365ff' }}
              />
            )}
       style={styles.chip}
        selected={choseTags.includes('Health')}
        onPress={() => toggleTag('Health')}
      >
        Health
      </Chip>


        <Chip icon={() => (
              <Image
                source={ require('../../../assets/food_icon.png')}
                style={{ width: 18, height: 18, tintColor: '#010365ff' }}
              />
            )}
        style={styles.chip}
        selected={choseTags.includes('Food')}
        onPress={() => toggleTag('Food')}
      >
        Food
      </Chip>

      <Chip icon={() => (
              <Image
                source={ require('../../../assets/toys_icon.png')}
                style={{ width: 18, height: 18, tintColor: '#010365ff' }}
              />
            )}
       style={styles.chip}
        selected={choseTags.includes('Toys')}
        onPress={() => toggleTag('Toys')}
      >
        Toys
      </Chip>

      <Chip icon={() => (
              <Image
                source={ require('../../../assets/information_icon.png')}
                style={{ width: 18, height: 18, tintColor: '#010365ff' }}
              />
            )}
        style={styles.chip}
        selected={choseTags.includes('Help')}
        onPress={() => toggleTag('Help')}
      >
        Help
      </Chip>

        
         
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap', // 💡 вот это ключевой параметр
    justifyContent: 'flex-start',
    padding: 10,
  },
  chip: {
    margin: 5,
    backgroundColor: '#ffffffff',
    borderColor: '#010365ff',
    iconColor: '#d34e4eff',
     shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 4,
    borderRadius: 20,
    minHeight: 40,
  },
  selectedChip: {
    backgroundColor: '#030051ff', // зелёный
  },
});

export default MyChips;