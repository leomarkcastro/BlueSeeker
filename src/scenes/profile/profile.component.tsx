import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { MenuGridList } from '../../components/menu-grid-list.component';
import { MenuIcon, PersonIcon } from '../../components/icons';
import { useSelector } from 'react-redux';

export const ProfileScreen = (props): React.ReactElement => {

  const acctData = useSelector( state => state.auth.authaccount );

  const onItemPress = (index: number): void => {
    //props.navigation.navigate(data[index].route);
  };

  const renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={props.navigation.toggleDrawer}
    />
  );

  const renderSetProfile = (): React.ReactElement => (
    <TopNavigationAction
      icon={PersonIcon}
      onPress={() => props.navigation.navigate("FirstRun1")}
    />
  );

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      insets='top'>
      <TopNavigation
        title='Profile'
        accessoryLeft={renderDrawerAction}
        accessoryRight={renderSetProfile}
      />
      <Divider/>
      <Layout style={styles.main}>
        
        <Layout style={styles.profile_avatar}>
          <Avatar style={styles.profile_avatar_image} source={require('./assets/img/profile.jpeg')}/>
          <Layout style={styles.profile_avatar_info}>
            <Text category='h4'>{acctData.fullname}</Text>
            <Text>@ {acctData.city}, {acctData.province}</Text>
          </Layout>
        </Layout>

        <Divider />
        
        <ScrollView>
          <Layout style={styles.info_box}>

            <Layout style={styles.section_box}>

              <Text category='h4' style={styles.list_header}>Work Profile</Text>

              {
                acctData.work_profile.map((wpe, wpi) =>
                  <Card key={`wp_${wpi}`} status="primary" style={styles.card_style} 
                    header={() => 
                      <>
                        <Text category='h5' style={styles.card_header}>{wpe.title}</Text>
                        <Text category='h6' style={styles.card_subheader}>P{wpe.rate} / hr</Text>
                      </>
                    }>
                    <Text>{wpe.description}</Text>
                  </Card>
                )
              }
              

            </Layout>

            <Divider />
            
            {/*
            <Layout style={styles.section_box}>

              <Text category='h4' style={styles.list_header}>Portfolio</Text>

              <Button appearance='ghost'>Add Portfolio</Button>

            </Layout>

            <Divider />
            */}

            <Layout style={styles.section_box}>

              <Text category='h4' style={styles.list_header}>Skills</Text>

              <Layout style={styles.skill_list}>

                {
                  acctData.skills ? acctData.skills.split(",").map((e,i) => <Text key={`skills_${i}`} style={styles.skill_cap}>{e}</Text>) : <Text></Text>
                }

                {/*<Button size="tiny" appearance='ghost'>Add Skill</Button>*/}

              </Layout>

            </Layout>

            <Divider />

            <Layout style={styles.section_box}>

              <Text category='h4' style={styles.list_header}>Work Information</Text>

              <Text category='h6' style={styles.list_header}>Available Work Times</Text>
              <Text style={styles.text_style}>{acctData.work_time} hours a Day</Text>
              <Divider />

              <Text category='h6' style={styles.list_header}>Languages</Text>
              <Layout style={styles.skill_list}>

                {
                  acctData.language ? acctData.language.split(",").map((e,i) => <Text key={`skills_${i}`} style={styles.skill_cap}>{e}</Text>) : <Text></Text>
                }

                {/*<Button size="tiny" appearance='ghost'>Add Skill</Button>*/}

              </Layout>
              
              {/*
              <Divider />
              
              <Text category='h6' style={styles.list_header}>Education</Text>

                <Layout style={styles.school_style}>
                  <Text category='s1'>High School</Text>
                  <Text category='s2'>Marcelo H. del Pilar National High School</Text>
                  <Text category='c1'>(2009-2015)</Text>
                </Layout>
              
                <Layout style={styles.school_style}>
                  <Text category='s1'>High School</Text>
                  <Text category='s2'>Marcelo H. del Pilar National High School</Text>
                  <Text category='c1'>(2009-2015)</Text>
                </Layout>
                
              <Divider />

              */}

            </Layout>

          </Layout>
        </ScrollView>
        

      </Layout>
      
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  main: {
    flex: 1,
  },
  profile_avatar:{
    flexDirection: 'row',
    margin: 12,
    padding: 12,
  },
  profile_avatar_image: {
    padding: 50,
  },
  profile_avatar_info: {
    marginVertical: 12,
    marginLeft: 6,
  },
  info_box : {
    margin: 12,
  },
  section_box: {
    marginTop: 6,
    marginBottom: 12,
  },
  card_header:{
    paddingTop: 12,
    paddingHorizontal: 12,
    fontWeight: 'bold',
  },
  card_subheader:{
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  list_header:{
    marginBottom: 12,
    fontWeight: 'bold',
  },
  card_style: {
    marginVertical: 6,
  },
  skill_list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  skill_cap: {
    padding: 4,
    margin: 4,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
  },
  text_style: {
    paddingTop: 2,
    padding: 4,
    paddingBottom: 12
  },
  school_style: {
    paddingTop: 2,
    padding: 4,
    paddingBottom: 12
  }
});
