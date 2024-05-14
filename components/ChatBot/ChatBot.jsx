import React from 'react'
import classes from './ChatBot.module.css'

const ChatBot = () => {
  return (
    <div className={classes.chatbot}>
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/K_vhNWwE5TH19H3pld0KM"
          title="Chatbot"
          width="100%"
          // style="height: 100%; min-height: 700px"
          style={{height:"100%"}}
          frameborder="0"
        ></iframe>
      </div>
  )
}

export default ChatBot;