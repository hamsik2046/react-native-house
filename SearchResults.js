'use strict';

import React, {Component} from 'react';
import {StyleSheet,
	Image, 
	View,
	TouchableHighlight,
	ListView,
	Text} from 'react-native';

	var HouseView = require('./HouseView');

	class SearchResults extends Component{
		constructor(props){
			super(props);
			var dataSource = new ListView.DataSource({
				rowHasChanged: (r1, r2) => ri.house_id !== r2.house_id
			});
			this.state = {
				dataSource: dataSource.cloneWithRows(this.props.listings)
			};
		}

		rowPressed(house_id){
            var houseData = this.props.listings.filter(prop => prop.house_id === house_id)[0];
            this.props.navigator.push({
            	title:'房源详情',
            	component: HouseView,
            	passProps:{house:houseData}
            });
		}

		renderRow(rowData, sectionID, rowID){
			var price = rowData.month_rent;
			var imageUrl = rowData.house_main_image;
			if (!imageUrl) 
				{imageUrl = 'http://www.baletoo.com/Public/Img/3.7.8zhanweituxiaotu2@2x.png'};

			return(

				<TouchableHighlight onPress={() => this.rowPressed(rowData.house_id)}
				underlayColor='#dddddd'>
				<View>
				<View style={styles.rowContainer}>
				<Image style={styles.thumb} source={{ uri: imageUrl }} />
				<View  style={styles.textContainer}>
				<Text style={styles.price}>￥{price}</Text>
				<Text style={styles.title} 
				numberOfLines={1}>{rowData.subdistrict_name}</Text>
				<Text style={styles.smalltext}>{rowData.house_info_concat}</Text>
				</View>
				</View>
				<View style={styles.separator}/>
				</View>
				</TouchableHighlight>
				);
		}

		render(){
			return(
				<ListView dataSource={this.state.dataSource}
				renderRow={this.renderRow.bind(this)}/>
				);
		}


	}

	var styles = StyleSheet.create({
		thumb: {
			width: 120,
			height: 90,
			marginRight: 10
		},
		textContainer: {
			flex: 1,
			alignItems:'stretch'
		},
		separator: {
			height: 1,
			backgroundColor: '#dddddd'
		},
		price: {
			fontSize: 20,
			fontWeight: 'bold',
			color: 'red',
			flex:1
		},
		title: {
			fontSize: 18,
			color: '#656565',
			flex:1
		},
		rowContainer: {
			flexDirection: 'row',
			padding: 10
		}
	});


	module.exports=SearchResults;