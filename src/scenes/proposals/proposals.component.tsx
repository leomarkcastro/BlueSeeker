import React, { useEffect, useState } from 'react';
import { ImageBackground, ListRenderItemInfo, ScrollView, SectionList, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Divider, Input, Layout, List, StyleService, Text, TopNavigation, TopNavigationAction, useStyleSheet } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { MenuIcon } from '../../components/icons';

import { useDispatch, useSelector } from 'react-redux';

import { Article } from './data';

export const ProposalsScreen = (props): React.ReactElement => {

  const styles = useStyleSheet(_styles);
  const acctData = useSelector( state => state.auth.authaccount );

  const dispatch = useDispatch();

  const [data, setData] = useState([])

  async function loadProposals(){
    let pr = acctData.projects
    const indx = {
      "Active": 0,
      "Proposals": 1,
      "Done": 2,
      "Archive": 3,
    }
    const indxlist = Object.keys(indx)
    let _da = [
      { title: "Active", data: [] },
      { title: "Proposals", data: [] },
      { title: "Done", data: [] },
      { title: "Archive", data: [] },
    ]
    pr.map((e,i) => {
      if (e.status && indxlist.indexOf(e.status))
        _da[indx[e.status]].data.push(e)
    })

    setData(_da)

  }

  useEffect(() => {
    loadProposals()
  }, [acctData])

  const onItemPress = (info): void => {
    
    dispatch({type: "SET_JOBDATA", value: info});
    props.navigation && props.navigation.navigate('JobView');
    //console.log(info);
    //setData([...data, data[0]])
  };

  const renderItem = (info: ListRenderItemInfo<Article>): React.ReactElement => (
    <Card
      style={styles.item}
      //header={() => renderItemHeader(info)}
      onPress={() => onItemPress(info.item)}
      status='primary'>
      <Text category='h5' style={styles.header}>
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

  //const Item = ({ data }) => (
  //  renderItem(data)
  //);

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      insets='top'>
      <TopNavigation
        title='Proposals'
        accessoryLeft={renderDrawerAction}
      />
      <Divider/>

      {/*
      <List
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={data}
        renderItem={renderItem}
      />
      */}

      <SectionList
        sections={data}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item, index) => item.title + index}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text category='h4' style={styles.listSection}>{title}</Text>
        )}
      />
      
      
    </SafeAreaLayout>
  );
};

const _styles = StyleService.create({
  listSection: {
    padding: 8,
    backgroundColor: 'color-primary-default',
    color: 'white',
    marginBottom:8,
  },
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
  },
  item: {
    marginVertical: 4,
    marginHorizontal: 16,
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
  header:{
    color: 'color-primary-default',

  }
});
