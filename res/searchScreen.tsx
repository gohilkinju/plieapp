import React from "react"
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native"
import colours from "./colours"

const searchScreen: React.FC = () => {

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />

                <View style={styles.header}>
                    <Text style={styles.greetingText}>Hello Renzo!</Text>
                    <Text style={styles.promptText}>Are you ready to dance?</Text>
                </View>
                <View style={styles.separator} />

            </View>
        </SafeAreaView>
    )
}
export default searchScreen
const styles = StyleSheet.create({
    promptText: {
        fontSize: 16,
        color: "#333",
        marginTop: 5,
    },
    separator: {
        height: 1,
        backgroundColor: "#eee",
        marginHorizontal: 20,
        marginBottom: 10,
    },
    header: {
        padding: 20,
        marginVertical: 15,
        backgroundColor: colours.white,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    greetingText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#000",
    },
    container: {
        flex: 1,
        backgroundColor: colours.lightGray,
    },
    screen: {
        flex: 1,
        // backgroundColor: "#fff",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
})