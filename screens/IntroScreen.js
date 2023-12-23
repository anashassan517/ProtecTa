import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const {width, height} = Dimensions.get("window");

const slides = [
    {
        id: '1',
        image: require('../assets/images/slide1.png'),
        title: "Let's Begin",
        subtitle: "Secure your Account with Multi-Factor Authentication.",
    },
    {
        id: '2',
        image: require('../assets/images/slide2.png'),
        title: "Register Email & Password",
        subtitle: "Create Strong Credentials.",
    },
    {
        id: '3',
        image: require('../assets/images/slide3.png'),
        title: "Register Facial Face",
        subtitle: "Add an Extra Layer of Facial Features.",
    },
    {
        id: '4',
        image: require('../assets/images/slide4.png'),
        title: "Register Signature Pattern",
        subtitle: "Add an Extra Layer of Signature Features.",
    },
    {
        id: '5',
        image: require('../assets/images/slide5.png'),
        title: "Register Biometric Fingerprint",
        subtitle: "Enhance Security Layer by Fingerprint Features.",
    },
    {
        id: '6',
        image: require('../assets/images/slide6.png'),
        title: "Ready to Secure",
        subtitle: "Lets Get Started!",
    },
];

const Slide = ({item}) => {
  return (
    <View style={{alignItems: "center"}}>
      <Image source={item.image} style={{height:'75%', width: width, resizeMode: 'contain', marginTop: 40,}}/>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );
};

const IntroScreen = ({ navigation }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const ref = React.useRef(null);
    
    const Footer = () => {
        return (
            <View style={{height: height*0.15, justifyContent: "space-between", paddingHorizontal: 20}}>
                <View style={{flexDirection: "row", justifyContent: "center", marginTop: 20}}>
                    {slides.map((_,index) => (
                        <View key={index} style={[styles.indicator, currentSlideIndex == index && {
                            backgroundColor: "#3498db",
                        }]}/>
                    ))}
                </View>
                <View style={{marginBottom: 20}}>
                    {
                        currentSlideIndex == slides.length-1 
                        ?
                        <View style={{height: 50}}>
                            <TouchableOpacity style={[styles.btn]} onPress={getStarted}>
                                <Text style={{color: "white", fontWeight: "bold", fontSize: 15}}>GET STARTED</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{flexDirection: "row"}}>
                            <TouchableOpacity style={[styles.btn, {backgroundColor: "transperent", borderWidth: 1, borderColor: "#3498db"}]} onPress={skip}>
                                <Text style={{color: "#3498db", fontWeight: "bold", fontSize: 15}}>SKIP</Text>
                            </TouchableOpacity>
                            <View style={{width: 15}}></View>
                            <TouchableOpacity style={[styles.btn]} onPress={goNextSlide}>
                                <Text style={{color: "white", fontWeight: "bold", fontSize: 15}}>NEXT</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
             </View>
        );
    };
    
    const updateCurrentSlideIndex = (e) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX/width);
        setCurrentSlideIndex(currentIndex);
    };
    
    const goNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if(nextSlideIndex != slides.length){
            const offset = nextSlideIndex * width;
            ref?.current?.scrollToOffset({offset});
            setCurrentSlideIndex(nextSlideIndex);
        }
    };
    
    const skip = () => {
        const lastSlideIndex = slides.length - 1;
        const offset = lastSlideIndex * width;
        ref?.current?.scrollToOffset({offset});
        setCurrentSlideIndex(lastSlideIndex);
    };

    const getStarted = () => {
        navigation.replace("Home");
    };

    return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
        <FlatList 
        ref = {ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        pagingEnabled
        data={slides} 
        contentContainerStyle={{height: height*0.75}} 
        horizontal
        showHorizontalScrollIndicator={false}
        renderItem={({item}) => <Slide item={item}/>}
        />
        <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    title: {
        color: "black",
        fontSize: 21,
        fontWeight: "bold",
        marginTop: 40,
        textAlign: "center",
    },
    subtitle: {
        color: "black",
        fontSize: 14,
        marginTop: 25,
        maxWidth: "90%",
        maxHeight: "90%",
        textAlign: "center",
        lineHeight: 23,
    },
    indicator: {
        padding: 5,
        backgroundColor: "lightblue",
        marginHorizontal: 5,
        borderRadius: 10,
    },
    btn: {
        flex: 1,
        height: 50,
        borderRadius: 5,
        backgroundColor: "#3498db",
        justifyContent: "center",
        alignItems: "center",
    }
});

export default IntroScreen;
