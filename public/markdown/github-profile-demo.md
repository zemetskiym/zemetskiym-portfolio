## Overview

This Next.js application serves as a demonstration of a GitHub profile page, utilizing the GitHub API to gather public user information and showcase it on a web platform.

## Technologies Used

- Next.js (HTML, CSS, TypeScript, Javascript, React.js, Node.js)
- Marked
- NextAuth.js
- Github API

## Features

- **Dynamic markdown parsing**: parsing markdown into HTML can be used to include dynamic content into the webpage. Search engines often prefer HTML content over Markdown or plain text.
- **HTTP status code error handling**: effective handling of status codes help the application to prompt the user on taking alternative actions based on the specific error encountered.
- **OAuth integration flow**: users have the option to authenticate with the OAuth protocol and the Github provider, allowing for convenient and centralized authentication and increasing the Github API rate limit.

## Challenges and Solutions

- **Challenge 1**: Integrating the user's README from their GitHub repository into a Next.js application to provide a comprehensive demonstration of their GitHub profile, while handling cases where no README exists.
    - **Solution**: To address this challenge, I designed a solution that involved calling the user's README repository using the standard format (username/username) and utilizing a Markdown library. I employed a parsing function to convert the README content into HTML. By setting up a React state and ensuring proper error checking, I effectively handled the scenario where no README was present, displaying a user-friendly message that directed users to GitHub documentation for further information. This approach enhanced the completeness and user-friendliness of the GitHub profile demonstration on the web platform.
- **Challenge 2**: Effectively retrieving and handling user data from the GitHub API within a Next.js application, while ensuring robust error handling for diverse API responses.
    - **Solution**: To address this challenge, I implemented a comprehensive solution by first inspecting the API fetch response for its status. If the response indicated an error, I skillfully stored the error message in a dedicated error state. This allowed me to present users with informative and actionable error messages, guiding them towards the next steps to resolve the issue. To further enhance user experience, I employed a custom Error component, ensuring that errors did not block user interactions, thereby improving the overall usability and resilience of the application.

## Code Sample

```typescript
// Create a new context with a default value
const AppContext = createContext<AppContextProps>({
    searchState: [{user: "", submitted: false}, () => null],
    userState: [null, () => null],
    repoState: [null, () => null],
});

// Export a wrapper function for the AppContext provider
export function AppWrapper({ children }: { children: React.ReactNode }) {

    // Set initial states using the useState hook
    const searchState = useState<UserSearch>({user: "", submitted: false})
    const userState = useState<object | null>(null)
    const repoState = useState<object | null>(null)

    // Combine the states into a single object
    const sharedState = {
        searchState,
        userState,
        repoState,
    };

    // Render the AppContext provider with the combined states
    return (
      <AppContext.Provider value={sharedState}>
          {children}
      </AppContext.Provider>
    );
}
```
