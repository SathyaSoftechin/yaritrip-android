// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ImageBackground,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';

// import styles from '../styles/HomeStyles';

// const HomeScreen = () => {
//   return (
//     <ImageBackground
//       source={{
//         uri: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
//       }}
//       style={styles.header}
//     >
//       {/* TITLE + PROFILE */}
//       <View style={styles.topRow}>
//         <Text style={styles.title}>
//           Where will your{'\n'}
//           <Text style={styles.highlight}>next adventure</Text> take you?
//         </Text>

//         <View style={styles.profileRow}>
//           <View style={styles.bell} />
//           <Image
//             source={{
//               uri: 'https://randomuser.me/api/portraits/women/44.jpg',
//             }}
//             style={styles.profile}
//           />
//         </View>
//       </View>

//       {/* SEARCH CARD */}
//       <View style={styles.searchCard}>
//         <View style={styles.inputRow}>
//           <TextInput placeholder="From City" style={styles.input} />
//           <TextInput placeholder="To Destination" style={styles.input} />
//         </View>

//         <View style={styles.inputRow}>
//           <TextInput placeholder="When" style={styles.input} />
//           <TextInput placeholder="Members" style={styles.input} />
//         </View>

//         <TouchableOpacity style={styles.searchButton}>
//           <Text style={styles.searchText}>Search</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// };

// export default HomeScreen;
// import React from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   ImageBackground,
// } from 'react-native';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';

// import styles from '../styles/HomeStyles';

// const HomeScreen = () => {
//   return (
//     <ImageBackground
//         source={require('../assets/onb1.jpeg')}
//       style={styles.header}
//     >
//       {/* TOP ROW */}
//       <View style={styles.topRow}>
//         <Text style={styles.title}>
//           Where will your{'\n'}
//           <Text style={styles.highlight}>next adventure</Text> take you?
//         </Text>

//         <View style={styles.profileRow}>
//           {/* Notification Icon */}
//           <View style={styles.iconCircle}>
//             <Ionicons name="notifications-outline" size={18} color="#000000" />
//           </View>
//         </View>
//       </View>

//       {/* SEARCH CARD */}
//       <View style={styles.searchCard}>

//         {/* FROM & TO */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputBox}>
//             <TextInput placeholder="From City" style={styles.input} />
//           </View>

//           {/* Swap Icon */}
//           <View style={styles.swapIcon}>
//             <Feather name="repeat" size={18} color="#4C6EDB" />
//           </View>

//           <View style={styles.inputBox}>
//             <TextInput placeholder="To Destination" style={styles.input} />
//           </View>
//         </View>

//         {/* WHEN & MEMBERS */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputWithIcon}>
//             <TextInput placeholder="When" style={styles.inputFlex} />
//             <Ionicons name="calendar-outline" size={18} color="#555" />
//           </View>

//           <View style={styles.inputWithIcon}>
//             <TextInput placeholder="Members" style={styles.inputFlex} />
//             <Ionicons name="person-outline" size={18} color="#555" />
//           </View>
//         </View>

//         {/* SEARCH BUTTON */}
//         <TouchableOpacity style={styles.searchButton}>
//           <Text style={styles.searchText}>Search</Text>
//         </TouchableOpacity>

//       </View>
//     </ImageBackground>
//   );
// };

// export default HomeScreen;
// import React from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   FlatList,
//   ImageBackground,
// } from 'react-native';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import styles from '../styles/HomeStyles';
// const categories = ['Packages', 'Flights', 'Cars', 'Hotels'];
// const destinations = [
//   { id: '1', name: 'Maldives', image: require('../assets/maldives.jpg') },
//   { id: '2', name: 'Bali', image: require('../assets/bali.jpg') },
//   { id: '3', name: 'Santorini', image: require('../assets/santorini.jpg') },
//   { id: '4', name: 'Maui', image: require('../assets/maui.jpg') },
//   { id: '5', name: 'Phuket', image: require('../assets/phuket.jpg') },
// ];
// const HomeScreen = () => {
//   return(
//  <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
//     <ImageBackground
//         source={require('../assets/onb1.jpeg')}
//       style={styles.header}
//     >
//       <View style={styles.overlay} />
//       {/* TOP ROW */}
//       <View style={styles.topRow}>
//         <Text style={styles.title}>
//           Where will your{'\n'}
//           <Text style={styles.highlight}>next adventure</Text> take you?
//         </Text>

//         <View style={styles.profileRow}>
//           {/* Notification Icon */}
//           <View style={styles.iconCircle}>
//             <Ionicons name="notifications-outline" size={18} color="#000000" />
//           </View>

//         </View>
//       </View>

//       {/* SEARCH CARD */}
//       <View style={styles.searchCard}>

//         {/* FROM & TO */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputBox}>
//             <TextInput placeholder="From City" style={styles.input} />
//           </View>

//           {/* Swap Icon */}
//           <View style={styles.swapIcon}>
//             <Feather name="repeat" size={18} color="#4C6EDB" />
//           </View>

//           <View style={styles.inputBox}>
//             <TextInput placeholder="To Destination" style={styles.input} />
//           </View>
//         </View>

//         {/* WHEN & MEMBERS */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputWithIcon}>
//             <TextInput placeholder="When" style={styles.inputFlex} />
//             <Ionicons name="calendar-outline" size={18} color="#555" />
//           </View>

//           <View style={styles.inputWithIcon}>
//             <TextInput placeholder="Members" style={styles.inputFlex} />
//             <Ionicons name="person-outline" size={18} color="#555" />
//           </View>
//         </View>

//         {/* SEARCH BUTTON */}
//         <TouchableOpacity style={styles.searchButton}>
//           <Text style={styles.searchText}>Search</Text>
//         </TouchableOpacity>

//       </View>
//     </ImageBackground>
//     {/* ===== CATEGORY TABS ===== */}
//       <View style={styles.tabsContainer}>
//         {categories.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[
//               styles.tab,
//               index === 0 && styles.activeTab,
//             ]}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 index === 0 && styles.activeTabText,
//               ]}
//             >
//               {item}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* ===== DESTINATIONS ===== */}
//       <FlatList
//         horizontal
//         data={destinations}
//         keyExtractor={(item) => item.id}
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 15 }}
//         renderItem={({ item }) => (
//           <View style={styles.destinationItem}>
//             <Image source={item.image} style={styles.destinationImage} />
//             <Text style={styles.destinationText}>{item.name}</Text>
//           </View>
//              )}
//       />

//       {/* ===== PACKAGE CARDS ===== */}
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ padding: 15 }}
//       >
//         {[1, 2].map((item) => (
//           <View key={item} style={styles.card}>
//             <Image
//               source={require('../assets/maldives.jpg')}
//               style={styles.cardImage}
//             />

//             <View style={styles.exclusiveBadge}>
//               <Text style={styles.exclusiveText}>+ Exclusive</Text>
//             </View>

//             <View style={styles.heartIcon}>
//               <Ionicons name="heart" size={16} color="red" />
//             </View>

//             <View style={styles.cardContent}>
//               <Text style={styles.packageTitle}>Maldives Paradise</Text>
//               <Text style={styles.location}>Maldives • 5N/6D</Text>
//               <Text style={styles.rating}>4.9 (1284 reviews)</Text>

//               <View style={styles.iconRow}>
//                 <MaterialCommunityIcons name="airplane" size={16} />
//                 <MaterialCommunityIcons name="bed" size={16} />
//                 <MaterialCommunityIcons name="silverware-fork-knife" size={16} />
//                 <MaterialCommunityIcons name="wifi" size={16} />
//               </View>

//               <View style={styles.priceRow}>
//                 <Text style={styles.price}>₹89,999</Text>
//                 <Text style={styles.oldPrice}>₹1,49,999</Text>
//               </View>

//               <Text style={styles.perPerson}>per person</Text>

//               <TouchableOpacity style={styles.planButton}>
//                 <Text style={styles.planText}>
//                   What’s your Plan today
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}
//       </ScrollView>

//       {/* ===== DUBAI BANNER ===== */}
//       <View style={styles.banner}>
//         <Image
//           source={require('../assets/dubai.jpg')}
//           style={styles.bannerImage}
//         />
//         <View style={styles.bannerOverlay}>
//           <Text style={styles.bannerTitle}>Unlock Dubai Magic</Text>
//           <Text style={styles.bannerSub}>
//             5-star stays with complimentary desert safari
//           </Text>
//         </View>
//       </View>

//     </ScrollView>
//     );
//   };
// export default HomeScreen;
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../styles/HomeStyles';

const categories = ['Packages', 'Flights', 'Cars', 'Hotels'];

const destinations = [
  { id: '1', name: 'Maldives', image: require('../assets/maldives.jpg') },
  { id: '2', name: 'Bali', image: require('../assets/bali.jpg') },
  { id: '3', name: 'Santorini', image: require('../assets/santorini.jpg') },
  { id: '4', name: 'Maui', image: require('../assets/maui.jpg') },
  { id: '5', name: 'Phuket', image: require('../assets/phuket.jpg') },
];

const HomeScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* HEADER */}
      <ImageBackground
        source={require('../assets/onb1.jpg')}
        style={styles.header}
      >
        <View style={styles.overlay} />

        <View style={styles.topRow}>
          <Text style={styles.title}>
            Where will your{'\n'}
            <Text style={styles.highlight}>next adventure</Text> take you?
          </Text>

          <View style={styles.profileRow}>
            <View style={styles.iconCircle}>
              <Ionicons
                name="notifications-outline"
                size={18}
                color="#000000"
              />
            </View>
          </View>
        </View>

        {/* SEARCH CARD */}
        <View style={styles.searchCard}>

          <View style={styles.inputRow}>
            <View style={styles.inputBox}>
              <TextInput
                placeholder="From City"
                style={styles.input}
              />
            </View>

            <View style={styles.swapIcon}>
              <Feather name="repeat" size={18} color="#4C6EDB" />
            </View>

            <View style={styles.inputBox}>
              <TextInput
                placeholder="To Destination"
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputWithIcon}>
              <TextInput
                placeholder="When"
                style={styles.inputFlex}
              />
              <Ionicons name="calendar-outline" size={18} color="#555" />
            </View>

            <View style={styles.inputWithIcon}>
              <TextInput
                placeholder="Members"
                style={styles.inputFlex}
              />
              <Ionicons name="person-outline" size={18} color="#555" />
            </View>
          </View>

          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>

      {/* CATEGORY TABS */}
      <View style={styles.tabsContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              index === 0 && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                index === 0 && styles.activeTabText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* DESTINATIONS */}
      <FlatList
        horizontal
        data={destinations}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalPadding}
        renderItem={({ item }) => (
          <View style={styles.destinationItem}>
            <Image
              source={item.image}
              style={styles.destinationImage}
            />
            <Text style={styles.destinationText}>
              {item.name}
            </Text>
          </View>
        )}
      />

      {/* PACKAGE CARDS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.padding15}
      >
        {[1, 2].map((item) => (
          <View key={item} style={styles.card}>
            <Image
              source={require('../assets/maldives.jpg')}
              style={styles.cardImage}
            />

            <View style={styles.exclusiveBadge}>
              <Text style={styles.exclusiveText}>+ Exclusive</Text>
            </View>

            <View style={styles.heartIcon}>
              <Ionicons name="heart" size={16} color="red" />
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.packageTitle}>
                Maldives Paradise
              </Text>
              <Text style={styles.location}>
                Maldives • 5N/6D
              </Text>
              <Text style={styles.rating}>
                4.9 (1284 reviews)
              </Text>

              <View style={styles.iconRow}>
                <MaterialCommunityIcons name="airplane" size={16} />
                <MaterialCommunityIcons name="bed" size={16} />
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={16}
                />
                <MaterialCommunityIcons name="wifi" size={16} />
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.price}>₹89,999</Text>
                <Text style={styles.oldPrice}>₹1,49,999</Text>
              </View>

              <Text style={styles.perPerson}>
                per person
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* DUBAI BANNER */}
      <View style={styles.banner}>
        <Image
          source={require('../assets/dubai.jpg')}
          style={styles.bannerImage}
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>
            Unlock Dubai Magic
          </Text>
          <Text style={styles.bannerSub}>
            5-star stays with complimentary desert safari
          </Text>
          <View style={styles.bottomNavWrapper}>
  <View style={styles.bottomNav}>
    
    <TouchableOpacity style={styles.navItemActive}>
      <Ionicons name="home" size={22} color="#4C6EDB" />
    </TouchableOpacity>

    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="briefcase" size={22} color="#777" />
    </TouchableOpacity>

    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="person-circle" size={22} color="#777" />
    </TouchableOpacity>

  </View>
</View>
        </View>
      </View>

    </ScrollView>
  );
};

export default HomeScreen;