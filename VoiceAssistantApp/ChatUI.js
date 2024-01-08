import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatBubble = ({ type, content }) => (
  <View
    style={[
      styles.chatBubble,
      type === 'user' ? styles.userBubble : styles.assistantBubble,
    ]}
  >
    <Text style={styles.chatText}>{content}</Text>
  </View>
);

const styles = StyleSheet.create({
  chatBubble: {
    borderRadius: 20,
    marginVertical: 5,
    padding: 10,
  },
  userBubble: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  assistantBubble: {
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  chatText: {
    fontSize: 16,
  },
});

export default ChatBubble;
