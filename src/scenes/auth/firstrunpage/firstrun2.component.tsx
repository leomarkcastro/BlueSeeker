import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Divider, Input, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../../components/safe-area-layout.component';
import { MenuGridList } from '../../../components/menu-grid-list.component';
import { MenuIcon } from '../../../components/icons';
import { useSelector } from 'react-redux';

import { updateAccountInfo, getAccountInfo } from "../../../service/firebase/firebase_init.js"
import ModalLoading from '../../../components/modal-loading.component';

export default ({ navigation }): React.ReactElement => {

  const auth = useSelector( state => state.auth.auth );
  const data = useSelector( state => state.auth.authaccount );

  const [visible, setVisible] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>("Logging In");
  const [loading, setLoading] = React.useState<boolean>(true);

  const onItemPress = async (): Promise<void> => {
    try{
      setVisible(true)
      setLoading(true)
      setText("Saving Information")
  
      await updateAccountInfo(auth.uid, dataForm)
      
      setVisible(false)
  
      navigation.navigate("FirstRun3");
      //navigation.navigate("FirstRun2");
    }
    catch(e){
      setLoading(false)
      setText("Failed To Log In")
      console.log(e)
    }
    
  };

  const [ langs, setLangs ] = useState([])
  const [ skills, setSkills ] = useState([])


  const [dataForm, setDataForm] = useState({
    "language" : "",
    "skills" : "",
  })

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }

  useEffect(() => {
    let lListLocal = (dataForm["language"] || "").split(",")
    lListLocal = lListLocal.map((e) => titleCase(e.trim()))
    setLangs(lListLocal)
  }, [dataForm["language"]])
 

  useEffect(() => {
    let lListLocal = (dataForm["skills"] || "").split(",")
    lListLocal = lListLocal.map((e) => titleCase(e.trim()))
    setSkills(lListLocal)
  }, [dataForm["skills"]])

  async function loadPreData(){
    let nd = {
      "language" : "",
      "skills" : "",
    }
    Object.keys(dataForm).map((e) => {
      nd[e] = data[e]
    })
    setDataForm({...dataForm, ...nd})
  }

  useEffect(() => {
    loadPreData()
  }, [])

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      insets='top'>
      <TopNavigation
        title='BlueSeeker'
      />
      <Divider/>
      <ModalLoading 
          visible={visible} 
          setVisible={setVisible} 
          dismissable={loading}
          isLoading={loading} 
          text={text}
        />
      <Layout style={styles.main}>
        <Text category='h4'>Preparing Your Account</Text>
        <Text category='h6'>Education</Text>
        <ScrollView>
          <Layout style={styles.forms}>
              <Input
                value={dataForm.language}
                label={"Language"}
                placeholder={"What languages do you speak?"}
                style={styles.formItem}
                //caption={() => <Text category="c2">Should contain at least 8 symbols</Text>}
                onChangeText={nextValue => setDataForm({...dataForm, "language" : nextValue})}
              />
              <Layout
                style={styles.languageList}>
                  {
                    langs.map((e,i) => <Text category="c1" key={`lList${i}`} style={styles.languageCap}>{e}</Text>)
                  }
              </Layout>
              <Input
                value={dataForm.skills}
                label={"Skills"}
                placeholder={"What languages do you speak?"}
                style={styles.formItem}
                //caption={() => <Text category="c2">Should contain at least 8 symbols</Text>}
                onChangeText={nextValue => setDataForm({...dataForm, "skills" : nextValue})}
              />
              <Layout
                style={styles.languageList}>
                  {
                    skills.map((e,i) => <Text category="c1" key={`lList${i}`} style={styles.languageCap}>{e}</Text>)
                  }
              </Layout>
              
          </Layout>
          <Button onPress={onItemPress}>Next Page</Button>
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
    padding: 8,
  },
  forms : {
    marginTop : 12,
    marginBottom: 12,
  },
  formItem: {
    marginVertical: 6,
    marginHorizontal: 12,
  },
  languageList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: 'wrap',
    marginVertical: 6,
    marginHorizontal: 12,
  },
  languageCap : {
    borderWidth: 1,
    borderRadius: 25,
    padding: 4,
    marginRight: 8,
  }
});
