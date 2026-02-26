import { StyleSheet } from "react-native";

export default StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F5F5F5"
},

/* HEADER */

packageHeader:{
alignItems:"center",
marginTop:20,
marginBottom:10
},

packageTitleTop:{
fontSize:20,
fontWeight:"700",
color:"#000"
},

/* SEARCH BAR */

searchRow:{
flexDirection:"row",
alignItems:"center",
paddingHorizontal:15,
marginBottom:10
},

searchInput:{
flex:1,
height:40,
backgroundColor:"#fff",
borderRadius:20,
paddingHorizontal:15,
borderWidth:1,
borderColor:"#ddd"
},

filterButton:{
width:40,
height:40,
borderRadius:20,
backgroundColor:"#fff",
justifyContent:"center",
alignItems:"center",
marginLeft:10,
elevation:2
},

/* PACKAGE CARD */

card:{
flex:1,
backgroundColor:"#fff",
borderRadius:12,
margin:8,
overflow:"hidden",
elevation:3
},

cardImage:{
width:"100%",
height:120
},

exclusiveBadge:{
position:"absolute",
top:10,
left:10,
backgroundColor:"#FFA500",
paddingHorizontal:8,
paddingVertical:3,
borderRadius:5
},

exclusiveText:{
fontSize:10,
fontWeight:"600",
color:"#000"
},

heartIcon:{
position:"absolute",
top:10,
right:10,
backgroundColor:"#fff",
width:28,
height:28,
borderRadius:14,
justifyContent:"center",
alignItems:"center"
},

cardContent:{
padding:10
},

packageTitle:{
fontSize:14,
fontWeight:"700",
marginBottom:2
},

location:{
fontSize:12,
color:"#777"
},

rating:{
fontSize:11,
color:"#777",
marginVertical:3
},

iconRow:{
flexDirection:"row",
justifyContent:"space-between",
marginVertical:5
},

priceRow:{
flexDirection:"row",
alignItems:"center"
},

price:{
fontSize:16,
fontWeight:"bold",
color:"#000"
},

oldPrice:{
fontSize:11,
color:"#999",
marginLeft:5,
textDecorationLine:"line-through"
},

perPerson:{
fontSize:11,
color:"#777"
},

bottomNavWrapper: {
  position: 'absolute',
  bottom: 20,
  left: 0,
  right: 0,
  alignItems: 'center',
},

bottomNav: {
  flexDirection: 'row',
  backgroundColor: '#000',
  width: '75%',
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingVertical: 15,
  borderRadius: 40,
  elevation: 10,
},

navItem: {
  backgroundColor: '#fff',
  width: 50,
  height: 50,
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
},
iconCircle: {
  width: 45,
  height: 45,
  borderRadius: 25,
  backgroundColor: '#E9E9E9',
  justifyContent: 'center',
  alignItems: 'center',
},

iconCircleActive: {
  width: 45,
  height: 45,
  borderRadius: 25,
  backgroundColor: '#E9E9E9',
  justifyContent: 'center',
  alignItems: 'center',
},
});