'use strict';

import React ,{Component} from 'react';
import {StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
  // ActivityIndicatorIOS,
  ActivityIndicator,
  Image} from 'react-native';

  var SearchResults = require('./SearchResults');

  var styles = StyleSheet.create({
  	description: {
  		marginBottom: 20,
  		fontSize: 18,
  		textAlign: 'center',
  		color: '#656565'
  	},
  	container: {
  		padding: 30,
  		marginTop: 65,
  		alignItems: 'center',
  		flexDirection:'column'
  	},

  	flowRight: {
  		flexDirection: 'row',
  		alignItems: 'center',
  		alignSelf: 'stretch'
  	},
  	buttonText: {
  		fontSize: 18,
  		color: 'white',
  		alignSelf: 'center'
  	},
  	button: {
  		height: 36,
  		flex: 1,
  		flexDirection: 'row',
  		backgroundColor: '#48BBEC',
  		borderColor: '#48BBEC',
  		borderWidth: 1,
  		borderRadius: 8,
  		marginBottom: 10,
  		alignSelf: 'stretch',
  		justifyContent: 'center'
  	},
  	searchInput: {
  		height: 36,
  		padding: 4,
  		marginRight: 5,
  		flex: 4,
  		fontSize: 18,
  		borderWidth: 1,
  		borderColor: '#48BBEC',
  		borderRadius: 8,
  		color: '#48BBEC'
  	},
  	image: {
  		borderRadius:15,
  		marginTop:20,
  		width: 120,
  		height: 120
  	}

  });

  function urlForQueryAndPage(key, value ,pageNumber){
  	var data = {
  		country: 'uk',
  		pretty: '1',
  		encoding: 'gzip',
  		listing_type: 'buy',
  		action: 'search_listings',
  		page: pageNumber,
  		dataType:'json'
  	};
  	data[key] = value;

  	var querystring = Object.keys(data)
  	.map(key => key +'=' + encodeURIComponent(data[key]))
  	.join('&');

  	return 'http://www.baletoo.com/App401/Index/getCurrentVersion.html';
  }


  class SearchPage extends Component{

  	constructor(props){
  		super(props);
  		this.state = {
  			searchString : '',
  			isLoading: false,
  			message:''
  		};
  	}

  	onSearchTextChanged(event){
  		console.log('onSearchTextChanged');
  		this.setState({searchString:event.nativeEvent.text});
  		console.log(this.state.searchString);
  	}

  	_executeQuery(query){
  		console.log(query);
  		this.setState({isLoading: true});

  		fetch(query)
  		.then(response => response.json())
  		.then(json => this._handlerResponse(json))
  		.catch(error => 
  			this.setState({isLoading:false,
  				message:'something has happened '+ error}
  				));

  	}

  	_handlerResponse(response){
  		this.setState({
  			isLoading:false,
  			message:''
  		});
  		if(!response){
  			console.log('response is undefined');
  		}
    	// console.log(response);
    	if(response.code==='0'){
    		var houselist = response.result;
    		// this.setState({message:'共为您找到'+ houselist.length+'套房'});
    		this.props.navigator.push({
    			title:'房源列表',
    			component:SearchResults,
    			passProps:{listings: houselist}
    		});
    	}else{
    		this.setState({message:'Location not recognized; please try again'});
    	}
    }

    onLocationPressed(){
    	navigator.geolocation.getCurrentPosition(
    		location => {
    			var lat = location.coords.latitude;
    			var lon = location.coords.longitude;
    			this.setState({message:'lat='+lat+' lon =' +lon});

    		},
    		error => {
    			this.setState({message:'ERROR(' + error.code + '): ' + error.message});
    			console.log('ERROR(' + error.code + '): ' + error.message);
    		}
    		);
    }

    onSearchPress(){
    	// var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    	var query = 'http://www.baletoo.com/App401/House/getList378.html?city_id=1&lat=31.261188&lon=121.507474&distance=0';
    	this._executeQuery(query);
    }

    render(){

    	var spinner = this.state.isLoading ?
    	(  <ActivityIndicator hidden = 'true' size = 'large'/> ):  (<View/>);


    	console.log('SearchPage.render');
    	return(
    		<View style={styles.container}>
    		<Text style={styles.description}>
    		搜索你想租的房源吧!
    		</Text>
    		<Text style={styles.description}>
    		可用通过小区名，或者你的位置搜索.
    		</Text>
    		<View style={styles.flowRight}>
    		<TextInput
    		style={styles.searchInput}
    		value = {this.state.searchString}
    		onChange={this.onSearchTextChanged.bind(this)}
    		placeHolder='通过小区名搜索'/>
    		<TouchableHighlight style={styles.button}
    		onPress = {this.onSearchPress.bind(this)}
    		underlayColor='#99d9f4'>
    		<Text style={styles.buttonText}>搜索</Text>
    		</TouchableHighlight>
    		</View>
    		<TouchableHighlight style={styles.button}
    		underlayColor='#99d9f4'>
    		<Text style={styles.buttonText}
    		onPress={this.onLocationPressed.bind(this)}>定位</Text>
    		</TouchableHighlight>
    		<Image source={require('image!house')} style={styles.image}/>
    		{spinner}
    		<Text style={styles.description}>{this.state.message}</Text>
    		</View>



    		);
    }
}

module.exports = SearchPage;
