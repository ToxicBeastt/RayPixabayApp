import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, TextInput, TouchableOpacity, Image, Text, ActivityIndicator} from 'react-native';
import {useFetchImagesQuery} from "@/store/apiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ImageItem} from "@/views/Home/Home.types";
import Button from "@/components/Button";
import {useRouter} from "expo-router";

const Home = () => {
    const router = useRouter();

    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [bookmarks, setBookmarks] = useState<number[]>([]);
    const [allHits, setAllHits] = useState<ImageItem[]>([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const { data, isLoading } = useFetchImagesQuery({ query, page, sizePerPage: 20 });
    const { hits = [] } = data || {}

    const handleSearch = (q: string) => {
        setPage(1);
        setAllHits([])
        setQuery(q)
    };

    const toggleBookmark = async (image: { id: number }) => {
        const newBookmarks = bookmarks.includes(image.id)
            ? bookmarks.filter((id) => id !== image.id)
            : [...bookmarks, image.id];

        setBookmarks(newBookmarks);
        await AsyncStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    };

    const loadBookmarks = useCallback(async () => {
        const storedBookmarks = await AsyncStorage.getItem('bookmarks');
        if (storedBookmarks) {
            setBookmarks(JSON.parse(storedBookmarks));
        }
    }, []);

    useEffect(() => {
        loadBookmarks();
    }, [loadBookmarks]);

    useEffect(() => {
        if (hits.length > 0) {
            setAllHits((prevHits) => [...prevHits, ...hits]);
        }
        setIsLoadingMore(false);
    }, [hits]);

    const loadMoreImages = () => {
        if (!isLoadingMore && !isLoading && hits.length > 0) {
            setIsLoadingMore(true);
            setPage((prev) => prev + 1);
        }
    };

    const renderFooter = () => {
        if (isLoadingMore) {
            return <ActivityIndicator size="large" color="#0000ff" style={{ margin: 16 }} />;
        }
        return null;
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        router.push('/sign-in');
    };


    return (
        <View style={{ flex: 1, padding: 16 }}>
            <View className="flex justify-end items-end mb-4">
                <View className="w-1/4">
                    <Button title="Logout" handlePress={handleLogout} />
                </View>

            </View>

            <TextInput
                placeholder="Search..."
                value={query}
                onChangeText={handleSearch}
                className="border-2 mb-4 p-2"
            />
            {allHits.length > 0 && (
                <FlatList
                    data={allHits}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={5}
                    onEndReached={loadMoreImages}
                    onEndReachedThreshold={0.1}
                    renderItem={({ item }) => (
                        <View className="flex-1" style={{ padding: 20 }}>
                            <Image source={{ uri: item.webformatURL }} className="w-full h-fit" style={{ aspectRatio: 1 }}/>
                            <Text>{item.user}</Text>
                            <Text>{item.tags}</Text>
                            <TouchableOpacity onPress={() => toggleBookmark(item)}>
                                <Text style={{ color: bookmarks.includes(item.id) ? 'red' : 'blue' }}>
                                    {bookmarks.includes(item.id) ? 'Unbookmark' : 'Bookmark'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    ListFooterComponent={renderFooter}
                />
            )}

            {isLoading && <ActivityIndicator size="large" color="#0000ff" style={{ margin: 16 }} />}
        </View>
    );
};

export default Home;
