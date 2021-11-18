import React, { ReactElement } from 'react';
import { Text, Modal, Spinner, Layout } from '@ui-kitten/components';
import { useState } from "react";
import { StyleSheet } from 'react-native';

function ModalLoading({visible, setVisible, isLoading, text, dismissable}){

    return(
        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={dismissable ? () => setVisible(false) : () => {}}
          >
          <Layout style={styles.modalCard}>
            { isLoading && <Spinner/>}
            <Text style={styles.modalCardText}>{text}</Text>
          </Layout>
        </Modal>
    )
}

export default ModalLoading

const styles = StyleSheet.create({
    modalCardText: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalCard: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 12,
      borderRadius: 12,
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})