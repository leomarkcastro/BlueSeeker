import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Button,
  Divider,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { SafeAreaLayout } from "../../components/safe-area-layout.component";
import { MenuGridList } from "../../components/menu-grid-list.component";
import { ArrowIosBackIcon, MenuIcon } from "../../components/icons";
import { useSelector } from "react-redux";

export const JobViewScreen = (props): React.ReactElement => {
  const jobData = useSelector((state) => state.jobs.job_data);

  const onItemPress = (index: number): void => {
    //props.navigation.navigate(data[index].route);
  };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={props.navigation.goBack}
    />
  );

  return (
    <SafeAreaLayout style={styles.safeArea} insets="top">
      <TopNavigation title="View Job" accessoryLeft={renderBackAction} />
      <Divider />
      <ScrollView>
        <Layout style={styles.main}>
          {jobData && (
            <>
              <Text category="h5" style={styles.title}>
                {jobData.title}
              </Text>

              <Divider style={styles.tstyle} />

              <Text category="h6" status="primary" style={styles.t3style}>
                Description
              </Text>
              <Text style={styles.t2style}>{jobData.header}</Text>
              <Text style={styles.t2style}>{jobData.description}</Text>

              <Divider style={styles.tstyle} />

              <Text style={styles.t2style}>
                Posted by:{" "}
                {jobData.posted_by}
              </Text>
              <Text style={styles.t2style}>Posted on: {jobData.posted_date}</Text>

              <Divider style={styles.tstyle} />

              <Text category="h6" status="primary" style={styles.t3style}>
                Payment
              </Text>
              <Text> * P{jobData.payment.rate} / hour</Text>
              {
                jobData.payment.extra.map((e,i) => <Text key={`pay_extra${i}`}> * {e}</Text>)
              }

              <Divider style={styles.tstyle} />

              <Text category="h6" status="primary" style={styles.t3style}>
                To Do
              </Text>
              {
                jobData.todo.map((e,i) => <Text key={`todo_${i}`}> * {e}</Text>)
              }

              <Divider style={styles.tstyle} />

              <Layout style={styles.proposal}>
                <Button>Submit A Proposal</Button>
              </Layout>
            </>
          )}
        </Layout>
      </ScrollView>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  proposal: {
    flex: 1,
    justifyContent: "flex-end",
  },
  safeArea: {
    flex: 1,
  },
  title: {
    textAlign: "center",
  },
  tstyle: {
    marginVertical: 16,
  },
  t2style: {
    marginVertical: 4,
  },
  t3style: {
    //textAlign: 'right',
    marginVertical: 4,
  },
  main: {
    padding: 16,
    flex: 1,
  },
});
