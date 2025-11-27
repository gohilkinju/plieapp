import React from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import colours from "./colours";
import { hp, wp } from "./responsive";
import images from "./images";
import { toggleFavorite } from "./redux/eventsSlice";

const FavoriteScreen: React.FC = () => {

    const dispatch = useDispatch();
    const favoriteEvents = useSelector((state: any) => state.events.favorites);

    const EventListItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.listItemContainer}>
                <View style={styles.imageAndTags}>
                    <Image source={{ uri: item.event_profile_img || images.image }} style={styles.eventImage} />
                </View>

                <View style={styles.detailsContainer}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.title} numberOfLines={1}>
                            {item.event_name}
                        </Text>
                        <Image source={images.arrow} style={styles.arrow} />
                    </View>

                    <View style={styles.rowBetween}>
                        <Text style={styles.date}>{item.readable_from_date} {item.readable_to_date}</Text>
                        <Text style={styles.location}>{item.city}, {item.country}</Text>
                    </View>

                   <Text style={styles.price}>{"$"}{item.event_price_to}-{"$"}{item.event_price_from}</Text>
                   
                    <View style={styles.tagsRow}>
                        <View style={styles.tagsLeft}>
                            {item.keywords?.map((tag, index) => (
                                <View key={index} style={styles.tag}>
                                    <Text style={styles.tagText}>{tag}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.rightIconsContainer}>
                            <Image source={images.vector} style={styles.arrowIcon} />
                            <TouchableOpacity onPress={() => dispatch(toggleFavorite(item.event_id))}>
                                <Image
                                    source={item.isFavorite ? images.greenheart : images.heart}
                                    style={styles.heartIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />

                <View style={styles.header}>
                    <Text style={styles.greetingText}>Hello Renzo!</Text>
                    <Text style={styles.promptText}>Are you ready to dance?</Text>
                </View>

                <View style={styles.separator} />

                {favoriteEvents.length === 0 ? (
                    
                    <View style={styles.centered}>
                        <Text style={{ color: "red", fontSize: 16 }}>No favorites yet..!!</Text>
                    </View>
                ) : (
                    <FlatList
                        data={favoriteEvents}
                        renderItem={({ item }) => <EventListItem item={item} />}
                        keyExtractor={item => item.event_id.toString()}
                        contentContainerStyle={styles.listContent}
                        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                        extraData={favoriteEvents}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    heartIcon: {
        width: wp(5),
        height: hp(3),
        resizeMode: "contain",
    },
    arrow: {
        width: wp(5),
        height: hp(3),
        resizeMode: "contain",
    },
    rightIconsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    arrowIcon: {
        width: wp(4.5),
        height: hp(2.5),
        resizeMode: "contain",
        marginRight: wp(3),
    },
    container: { flex: 1, backgroundColor: colours.lightGray },
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        padding: 20,
        marginBottom:20,
        backgroundColor: colours.white,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    greetingText: {
        fontSize: 28,
        paddingTop: 30,
        fontWeight: "bold",
        color: "#000",
    },
    promptText: {
        fontSize: 16,
        color: "#333",
        marginTop: 5,
    },
    separator: {
        height: 1,
        backgroundColor: "#eee",
        marginHorizontal: 20,
    },
    listContent: {
        paddingHorizontal: 15,
        paddingBottom: hp(10),
    },
    itemSeparator: {
        height: 10,
    },
    listItemContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        elevation: 3,
    },
    eventImage: {
        width: wp(20),
        height: hp(10),
        borderRadius: 3,
    },
    imageAndTags: {
        marginRight: 10,
    },
    tagsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    tagsLeft: {
        flexDirection: "row",
        flexWrap: "wrap",
        maxWidth: wp(55),
    },
    tag: {
        backgroundColor: "#eee",
        borderRadius: 5,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginRight: 4,
        marginBottom: 4,
    },
    tagText: {
        fontSize: 12,
        color: "#555",
    },
    detailsContainer: {
        flex: 1,
        justifyContent: "space-between",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    date: {
        fontSize: 14,
        color: colours.primary,
    },
    price: {
        fontSize: 14,
        fontWeight: "600",
        color: colours.gray,
    },
    location: {
        fontSize: 12,
        color: "#666",
    },
});
