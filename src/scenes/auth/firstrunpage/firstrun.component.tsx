import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Divider, Input, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../../components/safe-area-layout.component';
import { MenuGridList } from '../../../components/menu-grid-list.component';
import { MenuIcon } from '../../../components/icons';
import { useSelector } from 'react-redux';

import { updateAccountInfo, getAccountInfo } from "../../../service/firebase/firebase_init.js"
import ModalLoading from '../../../components/modal-loading.component';

const formList = [
  {
    label: "Given Name",
    placeholder: "What do people call you?",
    variable_name: "givenname"
  },
  {
    label: "Full Name",
    placeholder: "What is your full name?",
    variable_name: "fullname"
  },
  {
    label: "Address Line",
    placeholder: "House No. Street. Block. Brgy.",
    variable_name: "address_line"
  },
  {
    label: "City",
    placeholder: "City",
    variable_name: "city"
  },
  {
    label: "Province",
    placeholder: "Province",
    variable_name: "province"
  },
  {
    label: "Zip",
    placeholder: "Zip/Postal Code",
    variable_name: "zip"
  },
  {
    label: "Country",
    placeholder: "Country",
    variable_name: "country"
  }
]

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

      navigation.navigate("FirstRun2");
    }
    catch(e){
      setLoading(false)
      setText("Failed To Log In")
      console.log(e)
    }
    
  };

  async function loadPreData(){
    let nd = {
      "givenname" : "",
      "fullname" : "",
      "address_line" : "",
      "city" : "",
      "province" : "",
      "zip" : "",
      "country" : "",
    }
    Object.keys(dataForm).map((e) => {
      nd[e] = data[e]
    })
    setDataForm({...dataForm, ...nd})
  }

  useEffect(() => {
    loadPreData()
  }, [])

  const [dataForm, setDataForm] = useState({
    "givenname" : "",
    "fullname" : "",
    "address_line" : "",
    "city" : "",
    "province" : "",
    "zip" : "",
    "country" : "",
  })

  

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
        <Text category='h6'>Basic Information</Text>
        <ScrollView>
          <Layout style={styles.forms}>
              {
                formList.map((e,i) => 
                  <Input
                    key={`form_${i}`}
                    value={dataForm[e.variable_name]}
                    label={e.label}
                    placeholder={e.placeholder}
                    style={styles.formItem}
                    //caption={() => <Text category="c2">Should contain at least 8 symbols</Text>}
                    onChangeText={nextValue => setDataForm({...dataForm, [e.variable_name] : nextValue})}
                  />
                )
              }
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
  }
});
