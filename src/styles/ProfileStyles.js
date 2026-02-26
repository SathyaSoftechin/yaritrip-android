// import { StyleSheet } from "react-native";

// export default StyleSheet.create({

// screen: {
// flex: 1,
// backgroundColor: "#F5F6FA",
// },

// scroll: {
// padding: 20,
// paddingBottom: 120,
// },

// headerTitle: {
// fontSize: 20,
// fontWeight: "700",
// marginBottom: 20,
// color: "#000",
// },

// profileCard: {
// flexDirection: "row",
// alignItems: "center",
// backgroundColor: "#fff",
// padding: 16,
// borderRadius: 14,
// marginBottom: 20,
// elevation: 3,
// },

// profileImage: {
// width: 55,
// height: 55,
// borderRadius: 30,
// marginRight: 12,
// },

// profileName: {
// fontSize: 16,
// fontWeight: "600",
// color: "#000",
// },

// profileEmail: {
// fontSize: 13,
// color: "#777",
// marginTop: 2,
// },

// menuContainer: {
// backgroundColor: "#fff",
// borderRadius: 18,
// padding: 10,
// marginBottom: 20,
// elevation: 3,
// },

// menuItem: {
// flexDirection: "row",
// alignItems: "center",
// justifyContent: "space-between",
// paddingVertical: 14,
// paddingHorizontal: 10,
// },

// menuItemActive: {
// flexDirection: "row",
// alignItems: "center",
// justifyContent: "space-between",
// paddingVertical: 14,
// paddingHorizontal: 10,
// borderWidth: 1.5,
// borderColor: "#2F6BFF",
// borderRadius: 10,
// marginBottom: 6,
// },

// menuLeft: {
// flexDirection: "row",
// alignItems: "center",
// },

// menuText: {
// fontSize: 14,
// color: "#000",
// marginLeft: 12,
// },

// menuTextActive: {
// fontSize: 14,
// color: "#2F6BFF",
// marginLeft: 12,
// fontWeight: "600",
// },

// iconCircleBlue: {
// width: 36,
// height: 36,
// borderRadius: 10,
// backgroundColor: "#EAF1FF",
// justifyContent: "center",
// alignItems: "center",
// },

// iconCircleOrange: {
// width: 36,
// height: 36,
// borderRadius: 10,
// backgroundColor: "#FFF1E6",
// justifyContent: "center",
// alignItems: "center",
// },

// iconCirclePink: {
// width: 36,
// height: 36,
// borderRadius: 10,
// backgroundColor: "#FFE8ED",
// justifyContent: "center",
// alignItems: "center",
// },

// iconCircleGreen: {
// width: 36,
// height: 36,
// borderRadius: 10,
// backgroundColor: "#E6F8EC",
// justifyContent: "center",
// alignItems: "center",
// },

// iconCirclePurple: {
// width: 36,
// height: 36,
// borderRadius: 10,
// backgroundColor: "#F1E6FF",
// justifyContent: "center",
// alignItems: "center",
// },

// logoutButton: {
// flexDirection: "row",
// alignItems: "center",
// justifyContent: "center",
// borderWidth: 1.5,
// borderColor: "#D8E3FF",
// paddingVertical: 14,
// borderRadius: 30,
// backgroundColor: "#fff",
// },

// logoutText: {
// color: "red",
// fontWeight: "600",
// fontSize: 14,
// marginRight: 6,
// },

// bottomNavWrapper: {
// position: "absolute",
// bottom: 20,
// left: 20,
// right: 20,
// alignItems: "center",
// },

// bottomNav: {
// flexDirection: "row",
// backgroundColor: "#000",
// paddingVertical: 14,
// paddingHorizontal: 30,
// borderRadius: 40,
// justifyContent: "space-between",
// width: "100%",
// elevation: 10,
// },

// iconCircle: {
// width: 40,
// height: 40,
// borderRadius: 20,
// backgroundColor: "#E5E5E5",
// justifyContent: "center",
// alignItems: "center",
// },

// iconCircleActive: {
// width: 40,
// height: 40,
// borderRadius: 20,
// backgroundColor: "#E5E5E5",
// justifyContent: "center",
// alignItems: "center",
// },

// });
import { StyleSheet } from "react-native";

export default StyleSheet.create({

screen:{
flex:1,
backgroundColor:"#F2F2F2"
},

scroll:{
padding:20,
paddingBottom:120
},

headerTitle:{
fontSize:20,
fontWeight:"700",
marginBottom:20
},

profileCard:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#e2dede",
padding:15,
borderRadius:15,
marginBottom:20
},

profileImage:{
width:55,
height:55,
borderRadius:27,
marginRight:15
},

profileName:{
fontSize:16,
fontWeight:"600"
},

profileEmail:{
fontSize:14,
color:"#252525",
marginTop:4
},

menuContainer:{
backgroundColor:"#fff",
borderRadius:18,
padding:10,
marginBottom:25
},

menuItem:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
paddingVertical:14,
paddingHorizontal:10
},

menuItemActive:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
paddingVertical:14,
paddingHorizontal:10,
borderWidth:1.5,
borderColor:"#2F6BFF",
borderRadius:12,
marginBottom:8
},

menuLeft:{
flexDirection:"row",
alignItems:"center"
},

menuText:{
marginLeft:12,
fontSize:14
},

menuTextActive:{
marginLeft:12,
fontSize:14,
fontWeight:"600",
color:"#2F6BFF"
},

iconBlue:{
backgroundColor:"#EAF1FF",
padding:8,
borderRadius:10
},

iconDefault:{
padding:8,
borderRadius:10
},

logoutButton:{
flexDirection:"row",
justifyContent:"center",
alignItems:"center",
borderWidth:1.5,
borderColor:"#2F6BFF",
padding:15,
borderRadius:30
},

logoutText:{
color:"red",
fontWeight:"600",
marginRight:5
},

bottomNavWrapper:{
position:"absolute",
bottom:25,
left:25,
right:25
},

bottomNav:{
flexDirection:"row",
justifyContent:"space-around",
alignItems:"center",
backgroundColor:"#000",
paddingVertical:15,
borderRadius:40,
shadowColor:"#000",
shadowOpacity:0.3,
shadowRadius:8,
elevation:10
},

navCircle:{
backgroundColor:"#fff",
padding:12,
borderRadius:50
},

navCircleActive:{
backgroundColor:"#fff",
padding:12,
borderRadius:50
}

});