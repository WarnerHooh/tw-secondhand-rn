import * as React from 'react'
import { StyleSheet, View, Text, Image,ListView } from 'react-native'
// import { connect, DispatchProp } from 'react-redux'
import { connect } from 'react-redux'
// import { NavigationActions } from 'react-navigation'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  rowContainer: {
    flex: 1,
    height: 120,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  rowImage: {
    height: 100,
    width: 100
  },
  rowContent: {
    height: 100,
    width: 150,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  rowName: {
    fontSize: 20
  },
  rowPrice: {
    color: '#F06220'
  },
  rowAuthor: {
    color: '#BEBEBE'
  }
})

class HomeScreen extends React.Component<{},{dataSource}> {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'row 1', 
        'row 2'
      ]),
    };
  }
  render() {
    return (
      <ListView style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <View style={styles.rowContainer}>
          <Image style={styles.rowImage}source={require('../../common/assets/avatar.png')}></Image>
          <View style={styles.rowContent}>
            <Text style={styles.rowName}>TestName</Text>
            <Text style={styles.rowPrice}>$111</Text>
            <Text style={styles.rowAuthor}>Test</Text>
          </View>
          </View>}
      />
    )
  }
}

export default connect(
  state => ({})
)(HomeScreen)
