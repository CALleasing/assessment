import * as React from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView, Text } from 'react-native';

const VideoWebViewScreen = ({ route }) => {
    const URL = route.params.videoURL;
    console.log(URL);
    return (
        URL != undefined && URL != "" ?
            <WebView
                style={{ flex: 1 }}
                javaScriptEnabled={true}
                // source={{ uri: 'https://www.youtube.com/embed/ZZ5LpwO-An4?rel=0&autoplay=0&showinfo=0&controls=0' }}
                source={{ uri: URL }}
            />
            :
            <SafeAreaView>
                <Text style={{ alignSelf: 'center', marginTop: 50, fontSize: 24, color: 'red'}}>ไม่พบการอัพโหลดวิดีโอ</Text>
            </SafeAreaView>

    );
}

export default VideoWebViewScreen;