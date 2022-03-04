import { Client, GraphRequestOptions, PageCollection, PageIterator } from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { User, Event, MailFolder } from 'microsoft-graph';

let graphClient: Client | undefined = undefined;

function ensureClient(authProvider: AuthCodeMSALBrowserAuthenticationProvider) {
  if (!graphClient) {
    graphClient = Client.initWithMiddleware({
      authProvider: authProvider
    });
  }

  return graphClient;
}

export async function getUser(authProvider: AuthCodeMSALBrowserAuthenticationProvider): Promise<User> {
  ensureClient(authProvider);

  // Return the /me API endpoint result as a User object
  const user: User = await graphClient!.api('/me')
    // Only retrieve the specific fields needed
    .select('displayName,mail,mailboxSettings,userPrincipalName')
    .get();

  return user;
}


export async function getUserMailFolders(authProvider: AuthCodeMSALBrowserAuthenticationProvider,
                                          timeZone: string): Promise<MailFolder[]> {
  ensureClient(authProvider);

  var response: PageCollection = await graphClient!
    .api(`/me/mailfolders/inbox/messages`)
    .get();

    if (response["@odata.nextLink"]) {
      // Presence of the nextLink property indicates more results are available
      // Use a page iterator to get all results

      var events: Event[] = [];
      
      // Must include the time zone header in page 
      // requests too
      var options: GraphRequestOptions = {
      headers: { 'Prefer': `outlook.timezone="${timeZone}"` }
      };

    var pageIterator = new PageIterator(graphClient!, response, (event) => {
      events.push(event);
      return true;
    }, options);

    await pageIterator.iterate();
    return events;
  } else {
    console.log(response.value);
    return response.value;
  }
}

export async function updateReadMail(authProvider: AuthCodeMSALBrowserAuthenticationProvider,
                                     messageId: string,
                                     ): Promise<void> {
  ensureClient(authProvider);

  await graphClient!
    .api(`/me/mailfolders/inbox/messages/${messageId}`)
    .update({
      isRead: true
    });

  return;
}
