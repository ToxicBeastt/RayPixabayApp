import React, { useEffect, useState} from 'react';
import {View, FlatList, TextInput, TouchableOpacity, Image, Text, ActivityIndicator} from 'react-native';
import {useFetchImagesQuery} from "@/store/apiSlice";
import {ImageItem} from "@/views/Home/Home.types";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { RootState } from "@/store/store";
import {useDispatch, useSelector} from "react-redux";
import { toggleBookmark } from '@/store/bookmarksSlice';

const Home = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const bookmarks = useSelector((state: RootState) => state.bookmarks.bookmarks);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [allHits, setAllHits] = useState<ImageItem[]>([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const { data, isLoading } = useFetchImagesQuery({ query, page, sizePerPage: 20 });
    const { hits = [] } = data || {};

    const handleSearch = (q: string) => {
        setPage(1);
        setAllHits([]);
        setQuery(q);
    };

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

    const handleLogout = () => {
        router.push('/sign-in');
    };

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <View style={{ alignItems: 'flex-end', marginBottom: 16 }}>
                <Button title="Logout" handlePress={handleLogout} />
            </View>
            <TextInput
                placeholder="Search..."
                value={query}
                onChangeText={handleSearch}
                style={{ borderWidth: 1, marginBottom: 16, padding: 8 }}
            />
            {allHits.length > 0 && (
                <FlatList
                    data={allHits}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={5}
                    onEndReached={loadMoreImages}
                    onEndReachedThreshold={0.1}
                    renderItem={({ item }) => (
                        <View style={{ padding: 20, flex: 1 }}>
                            <Image source={{ uri: item.webformatURL }} style={{ aspectRatio: 1, width: '100%' }} />
                            <Text>{item.user}</Text>
                            <Text>{item.tags}</Text>
                            <TouchableOpacity onPress={() => dispatch(toggleBookmark(item.id))}>
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

