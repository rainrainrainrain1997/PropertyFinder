
// @flow
import React,{Component} from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    TouchableOpacity,
    FlatList,
    Text,
    Button,
    Alert,
} from 'react-native';
import ModalDropdown from "react-native-modal-dropdown/components/ModalDropdown";



export default class newPage extends Component {
    selectTypes =['商品','书籍','药品'];

    render(){
        return(
            <View style={styles.container}>
                <Text>Hi !</Text>
                <View style={styles.row}>
                    <Text style={styles.text}>类别：</Text>
                    <View style={styles.selectBox}>
                        <ModalDropdown
                            defaultValue='+'
                            options={this.selectTypes}
                            textStyle={styles.text}
                            dropdownStyle={styles.dropdown}
                            onSelect={(index,value) => this._selectItemEvent(value)}
                        />
                    </View>
                </View>
            </View>
        );
    }

    _selectItemEvent(item:string){
        switch (item){
            case '商品' :
                console.log('goods works');
                break;
            case '书籍' :
                console.log('books works');
                break;
            case '药品' :
                console.log('medicine works');
                break;
            default:
                break;
        }
        console.log('here works');
        return false;
    }

}


const styles = StyleSheet.create({
   container:{
       flex: 1,
       alignItems:'center',
       justifyContent:'center',
   },
    text:{
       fontSize: 33,
    },
    row:{
       flexDirection:'row',
    },
    dropdown:{
        margin: -7,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 20,

    },
    selectBox:{

       height:40,
        width: 40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 45,
        backgroundColor:'lightgray',
    },
});
