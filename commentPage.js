import React, {Component,} from 'react'

import {Alert, Button, ScrollView, Text, TextInput, View, StyleSheet, KeyboardAvoidingView,Animated} from "react-native";



export default class commentPage extends React.Component {


    static navigationOptions(nav: Props) {
        return {
            headerTitle: '评论'

        }
    };

    state = {
        showBox: false,
        fadeAnim: new Animated.Value(0),
        bottomAnim: new Animated.ValueXY({x:0,y:0}),
        barWidth: new Animated.Value(0),
    };


    popBox(){
        if(!this.state.showBox){
            Animated.timing(
                this.state.barWidth,
                {
                    toValue: 200,
                    duration: 600,
                }
            ).start();
            // Animated.timing(
            //     this.state.fadeAnim,
            //     {
            //         toValue: 1,
            //         duration: 1000,
            //     }
            // ).start();
            this.setState({showBox:!this.state.showBox});
        }else{
            Animated.timing(
                this.state.barWidth,
                {
                    toValue: 0,
                    duration: 600,
                }
            ).start();
            // Animated.timing(
            //     this.state.fadeAnim,
            //     {
            //         toValue: 0,
            //         duration: 1000,
            //     }
            // ).start();
            this.setState({showBox:!this.state.showBox});
        }
    }

    render(){
        return(
            <KeyboardAvoidingView ref="rootView" style={styles.container} behavior='padding' enabled>
                <View style={styles.commentList}>
                    <Button
                        title='按钮'
                        onPress={() => this.popBox()}
                    />
                    <Animated.View style={{
                        height:40,
                        width:this.state.barWidth,
                        backgroundColor:'red',
                        flexDirection:'row',
                        // borderWidth:1,
                        borderColor:'#63b4fc',
                        borderRadius:20,
                        alignItems: 'center',
                        // opacity: this.state.fadeAnim,
                        transform:[
                            {translateX: this.state.bottomAnim.x},
                        ]

                    }}>

                    </Animated.View>
                </View>
                <View style={styles.comment}>
                    <View style={styles.inputComment}>
                        <TextInput
                            placeholder='input your comment'
                        />
                    </View>
                    <View style={styles.submitComment}>
                        <Button
                            onPress={() => Alert.alert('此功能暂没开发')}
                            title={'提交'}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    };

}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    commentList:{
        height:'90%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    comment:{
        flexDirection:'row',
        height:80,
        width:'100%',
        justifyContent:'center',
        alignItems:'flex-end',
        borderWidth:1,
    },
    inputComment:{
        width:'70%',
        height: 40,
        borderRadius:4,
        borderWidth:1,
    },
    submitComment:{
        marginLeft: 10,
        borderRadius: 10,
        borderWidth: 2,
    },
});