// "use client"
// import { useState } from 'react';

// import {
//     Webchat,
//     WebchatProvider,
//     Fab,
//     getClient,
//     Configuration,
// } from '@botpress/webchat';

// const clientId = "";

// const configuration: Configuration = {
//     color: '#000',
// };

// export default function Chat() {
//     const client = getClient({
//         clientId,
//     });

//     const [isWebchatOpen, setIsWebchatOpen] = useState(false);

//     const toggleWebchat = () => {
//         setIsWebchatOpen((prevState) => !prevState);
//     };

//     return (
//         <div style={{
//             position: 'fixed',
//             display: 'flex',
//             flexDirection: 'column',
//             bottom: 0,
//             right: 0,
//             alignItems: 'flex-end',
//             gap: '12px',
//             padding: '24px',
//             zIndex: 9999,
//         }}>
//             <WebchatProvider client={client} configuration={configuration}>

//                 <div
//                     style={{
//                         marginTop: '12px',
//                         marginBottom: '72px',
//                         width: '350px',
//                         maxHeight: '500px',
//                         overflow: 'scroll',
//                         transform: isWebchatOpen ? 'scale(1)' : 'scale(0)',
//                         transformOrigin: 'bottom right',
//                         transition: 'transform 0.3s ease-in-out',
//                     }}
//                 >
//                     <Webchat />
//                 </div>
//                 <Fab onClick={toggleWebchat} />
//             </WebchatProvider>
//         </div>
//     );
// }



import { Fab, Webchat } from '@botpress/webchat'
import { useState } from 'react'

function Chatbot() {
  const [isWebchatOpen, setIsWebchatOpen] = useState(false)
  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState)
  }
  return (
    <>
      <Webchat
        clientId="814ba273-2d89-459d-8b03-aed366bb9c18" // Your client ID here
        style={{
          width: '400px',
          height: '600px',
          display: isWebchatOpen ? 'flex' : 'none',
          position: 'fixed',
          bottom: '90px',
          right: '20px',
        }}
      />
      <Fab
        onClick={() => toggleWebchat()}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '64px',
          height: '64px'
        }}
      />
    </>
  )
}

export default Chatbot