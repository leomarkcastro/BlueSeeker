import React, { useEffect, useState } from 'react';
import { ImageBackground, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Divider, Input, List, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { MenuIcon } from '../../components/icons';

import { Article } from './data';
import { useDispatch, useSelector } from 'react-redux';

import { getJobListings, listenJobListings } from "../../service/firebase/firebase_init.js"

export const JobsScreen = (props): React.ReactElement => {

  const dispatch = useDispatch();

  const [data, setData] = useState([])
  const acctData = useSelector( state => state.auth.authaccount );

  async function loadJobs(){
    try{
      let rawData = await getJobListings(acctData ? acctData.work_profile[0].title : false)
      
      
      await listenJobListings(acctData ? acctData.work_profile[0].title : false, 
        (querySnapshot) => {
          let jobLists = []
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            jobLists.push({id: doc.id, ...doc.data()});
          });
          //console.log(jobLists)
          setData(jobLists);
        }
      )
    }
    catch(e){
      console.log(e)
    }
    
  }

  useEffect(() => {
    loadJobs()
  }, [])

  const [value, setValue] = useState("")

  const onItemPress = (index: number): void => {
    
    dispatch({type: "SET_JOBDATA", value: data[index]});
    props.navigation && props.navigation.navigate('JobView');
    //console.log(index);
    //setData([...data, data[0]])
  };

  const renderItemHeader = (info: ListRenderItemInfo<Article>): React.ReactElement => (
    <Text category='h5' style={styles.title}>
        {info.item.title}
    </Text>
  );

  const renderItemFooter = (info: ListRenderItemInfo<Article>): React.ReactElement => (
    <View style={styles.itemFooter}>
      <View style={styles.itemAuthoringContainer}>
        <Text
          category='s2'>
          {`${info.item.posted_by}`}
        </Text>
        <Text
          appearance='hint'
          category='c1'>
          {info.item.posted_date}
        </Text>
      </View>
      {/*
        <Button
          style={styles.iconButton}
          appearance='ghost'
          status='danger'
          accessoryLeft={MenuIcon}>
          {`${info.item.likes.length}`}
        </Button>
      */}
    </View>
  );

  const renderItem = (info: ListRenderItemInfo<Article>): React.ReactElement => (
    <Card
      style={styles.item}
      //header={() => renderItemHeader(info)}
      footer={() => renderItemFooter(info)}
      onPress={() => onItemPress(info.index)}
      status='primary'>
      <Text category='h5' style={styles.title}>
        {info.item.title}
      </Text>
      <Text
        style={styles.itemContent}
        appearance='hint'
        category='s1'>
        {`${info.item.description.substring(0,300)}${info.item.description.length > 300 ? "..." : ""}`}
      </Text>
    </Card>
  );

  const renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={props.navigation.toggleDrawer}
    />
  );

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      insets='top'>
      <TopNavigation
        title='Search Jobs'
        accessoryLeft={renderDrawerAction}
      />
      <Divider/>

      
      <Input
        placeholder='Search'
        value={value}
        onChangeText={nextValue => setValue(nextValue)}
        style={styles.search}
      />
      

      <List
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={data.filter(e => { return e.title.indexOf(value) > -1 })}
        renderItem={renderItem}
      />
      
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    padding: 8
  },
  safeArea: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  search:{
    margin: 8
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  item: {
    marginVertical: 4,
    padding: 0,
  },
  itemHeader: {
    height: 220,
  },
  itemContent: {
    marginVertical: 8,
    textAlign: 'left',
  },
  itemFooter: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginVertical: 4
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  itemAuthoringContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginHorizontal: 16,
  },
});
