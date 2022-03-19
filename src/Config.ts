const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const config = {
    appId: CLIENT_ID || '',
    redirectUri: 'https://outlook-api-task.vercel.app/',
    scopes: [
      'user.read',
      'mail.readwrite',
      'mailboxsettings.read',
    ]
  };
  
  export default config;
  