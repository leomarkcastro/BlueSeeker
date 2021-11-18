import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Divider, IndexPath, Input, Layout, Select, SelectItem, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../../components/safe-area-layout.component';
import { MenuGridList } from '../../../components/menu-grid-list.component';
import { MenuIcon } from '../../../components/icons';
import { useDispatch, useSelector } from 'react-redux';

import { updateAccountInfo, getAccountInfo, getJobTypes } from "../../../service/firebase/firebase_init.js"
import ModalLoading from '../../../components/modal-loading.component';

//const workList = [
//  "Masonry",
//  "Stitcher",
//  "Painter",
//  "Construction",
//]

export default ({ navigation }): React.ReactElement => {

  const auth = useSelector( state => state.auth.auth );
  const data = useSelector( state => state.auth.authaccount );

  const [visible, setVisible] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>("Logging In");
  const [loading, setLoading] = React.useState<boolean>(true);
  const [workList, setWorkList] = React.useState([]);

  const dispatch = useDispatch()

  const onItemPress = async (): Promise<void> => {
    try{
      let updateForm = {
        ...dataForm,
        work_profile: [
          {
            title: workList[workFormIndex-1],
            ...workForm
          }
        ],
        first_run: false,
      }
      //console.log(updateForm)
      setVisible(true)
      setLoading(true)
      setText("Saving Information")
  
      await updateAccountInfo(auth.uid, updateForm)
      
      //navigation.navigate("FirstRun3");
  
      let new_data = await getAccountInfo(auth.uid)
      dispatch({type: "SET_AUTHACCOUNT", account: auth, info: new_data});
      
      if (!data.first_run){
        // This is a shit implementation
        navigation.navigate("Profile")
      }
      setVisible(false)
    }
    catch(e){
      setLoading(false)
      setText("Failed To Log In")
      console.log(e)
    }
  };

  const [dataForm, setDataForm] = useState({
    "work_time": "",
  })

  const [workForm, setWorkForm] = useState({
      rate: "",
      description: "",
  })

  const [workFormIndex, setWorkFormIndex] = useState(new IndexPath(0))

  async function loadPreData(){
    let nd = {
      "work_time" : "",
    }
    Object.keys(nd).map((e) => {
      nd[e] = data[e]
    })
    setDataForm({...dataForm, ...nd})

    // Load the work type

    if (data["work_profile"][0]){
      let nd2 = {
        rate: "",
        description: "",
      }
      Object.keys(nd2).map((e) => {
        nd2[e] = data["work_profile"][0][e]
      })
      setWorkForm({...workForm, ...nd2})
      
      let ind = workList.indexOf(data["work_profile"][0]["title"])
      if (ind > -1) setWorkFormIndex(new IndexPath(ind))
      
    }
    
  }

  async function loadJobType(){
    try{
      let rawData = await getJobTypes()
      let jobTypes = []
      rawData.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        jobTypes.push(doc.data().name);
      });
      setWorkList(jobTypes)
    }
    catch(e){
      console.error(e)
    }
   
  }

  useEffect(() => {
    loadPreData()
    loadJobType()
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
        <Text category='h6'>Work Details</Text>
        <ScrollView>
          <Layout style={styles.forms}>
              <Text>Work Time</Text>
              <Input
                value={dataForm.work_time}
                label={"Duration (in Hours per Day)"}
                placeholder={"How long are you willing to work per day?"}
                style={styles.formItem}
                //caption={() => <Text category="c2">Should contain at least 8 symbols</Text>}
                onChangeText={nextValue => setDataForm({...dataForm, "work_time" : nextValue})}
              />
              <Text>Work Type</Text>
              <Layout>
                <Select
                  label={"Main Work"}
                  style={styles.formItem}
                  selectedIndex={workFormIndex}
                  value={workList[workFormIndex-1]}
                  onSelect={index => setWorkFormIndex(index)}>
                    {
                      workList.map((e,i) => <SelectItem key={`work_sel${i}`} title={e}/>)
                    }
                </Select>
                <Input
                  value={workForm.rate}
                  label={"Rate (in Pesos per hour)"}
                  placeholder={"Your Working Pay Rate per Hour?"}
                  style={styles.formItem}
                  //caption={() => <Text category="c2">Should contain at least 8 symbols</Text>}
                  onChangeText={nextValue => setWorkForm({...workForm, rate : nextValue})}
                />
                <Input
                  value={workForm.description}
                  label={"Description"}
                  placeholder={"Describe Your Work Detail Of Choice"}
                  multiline={true}
                  textStyle={{ minHeight: 64 }}
                  style={styles.formItem}
                  //caption={() => <Text category="c2">Should contain at least 8 symbols</Text>}
                  onChangeText={nextValue => setWorkForm({...workForm, description : nextValue})}
                />
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
