'use strict';

import React , {Component} from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';


class HouseView extends Component{
	render(){
		var houseData = this.props.house;
		var price = houseData.month_rent;
        var houseImgeUrl = houseData.house_main_image;
        if(!houseImgeUrl){
        	houseImgeUrl = 'http://www.baletoo.com/Public/Img/3.7.8zhanweitu@2x.png';
        }

		return (
			<View style={styles.container}>
			<Image style={styles.image} 
			source={{uri: houseImgeUrl}} />
			<View style={styles.heading}>
			<Text style={styles.price}>￥{price}</Text>
			<Text style={styles.title}>{houseData.subdistrict_name}</Text>
			<View style={styles.separator}/>
			</View>
			<Text style={styles.description}>{houseData.house_info_concat}</Text>
			<Text style={styles.description}>{houseData.subway_desc}</Text>
			</View>
			);
	};
}


var styles = StyleSheet.create({
	container: {
		marginTop: 65
	},
	heading: {
		backgroundColor: '#F8F8F8',
	},
	separator: {
		height: 1,
		backgroundColor: '#DDDDDD'
	},
	image: {
		width: 400,
		height: 300
	},
	price: {
		fontSize: 25,
		fontWeight: 'bold',
		margin: 5,
		color: '#48BBEC'
	},
	title: {
		fontSize: 20,
		margin: 5,
		color: '#656565'
	},
	description: {
		fontSize: 18,
		margin: 5,
		color: '#656565'
	}
});

module.exports = HouseView;