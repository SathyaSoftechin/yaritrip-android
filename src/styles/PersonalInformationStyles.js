import { StyleSheet } from "react-native";

export default StyleSheet.create({

screen:{
flex:1,
backgroundColor:"#F2F2F2",
paddingHorizontal:15
},

header:{
flexDirection:"row",
alignItems:"center",
justifyContent:"space-between",
marginTop:40,
marginBottom:15
},

headerTitle:{
fontSize:18,
fontWeight:"600"
},

scroll:{
paddingBottom:40
},

card:{
backgroundColor:"#fff",
borderRadius:18,
padding:18
},

title:{
fontSize:18,
fontWeight:"600",
marginBottom:15
},

profileSection:{
alignItems:"center",
marginBottom:20
},

profileImage:{
width:70,
height:70,
borderRadius:35
},

editIcon:{
position:"absolute",
bottom:0,
right:130,
backgroundColor:"#000",
padding:6,
borderRadius:20
},

label:{
fontSize:13,
color:"#444",
marginBottom:6
},

input:{
backgroundColor:"#F7F7F7",
borderRadius:10,
padding:12,
marginBottom:14
},

passwordBox:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#F7F7F7",
borderRadius:10,
paddingHorizontal:12,
marginBottom:14
},

passwordInput:{
flex:1,
paddingVertical:12
},

saveButton:{
backgroundColor:"#4C6EDB",
padding:16,
borderRadius:30,
alignItems:"center",
marginTop:10
},

saveText:{
color:"#fff",
fontSize:16,
fontWeight:"600"
}

});