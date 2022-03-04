const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const config = {
    appId: CLIENT_ID || '',
    redirectUri: 'http://localhost:3000',
    scopes: [
      'user.read',
      'mail.readwrite',
      'mailboxsettings.read',
      'calendars.readwrite'
    ]
  };
  
  export default config;
  