import { StyleSheet, ImageBackground, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import background from "../assets/background.gif"; //imges background
import axios from 'axios';
import onImage from '../assets/ON.jpg'; //image On
import offImage from '../assets/OFF.jpg'; // image Off

const Home = () => {
    // click ON OFF
    const [isOn, setIsOn] = useState(false);// Khởi tạo trạng thái isOn với giá trị ban đầu là false. Trạng thái này sẽ thay đổi khi người dùng nhấn nút.
    //API gửi về ESP32 để click on off
    const toggleSwitch = async () => {// hàm đc gọi khi người dùng nhấn nút gửi y/c đến địa chỉ ip của eps32 để bật tắt thiết bị
        const newState = !isOn;// đảo ngược trạng thái hiện tại
        try {
            const response = await axios.post('http://192.168.113.241/toggle', { state: newState });
            if (response.data && response.data.status === 'success') {
                setIsOn(newState);// nếu yêu cầu thanh công sẽ cập nhật trạng thái ison 
            }
            console.log(response.data);// in ra phản hồi từ máy chủ
        } catch (error) {
            console.error(error);
        }
    }
//Màn Hình
    return (
        <ImageBackground source={background} style={styles.container}>
        {/*click on off */}
            <TouchableOpacity //Thành phần này là một nút có thể nhấn. Khi nhấn, nó gọi hàm toggleSwitch.
                style={[styles.button, isOn ? styles.onButton : styles.offButton]}
                onPress={toggleSwitch}>{/*dòng dưới đổi hình khi click TouchableOpacity */}
                <Image source={isOn ? onImage : offImage} style={styles.buttonImage}/>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    onButton: {
        
    },
    offButton: {
        
    },
    buttonImage: {
        width: '100%', 
        height: '100%',
        borderRadius: 50, 
    },
});

export default Home;
