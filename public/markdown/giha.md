## Overview

GIHA is a web-based tool for analyzing GitHub profiles, providing valuable insights into programming languages, commit distribution, and fun facts about users' coding habits.

## Technologies Used

- Next.js (HTML, CSS, TypeScript, Javascript, Node.js)
- D3.js
- highlight.js
- NextAuth.js
- Github API

## Features

- **OAuth integration flow:** users have the option to authenticate with the OAuth protocol and the Github provider, allowing for convenient and centralized authentication and increasing the Github API rate limit.
- **Downloadable SVG chart generation:** SVG charts are resolution-independent vector graphics, which is particularly important for responsive web design and ensuring charts look good on various devices and screen sizes.
- **HTTP status code error handling:** effective handling of status codes help the application to prompt the user on taking alternative actions based on the specific error encountered.

## Challenges and Solutions

- **Challenge 1**: Gathering comprehensive data on a GitHub user's programming language usage over time posed a significant challenge. The standard approach of using the GitHub API to fetch repository languages had limitations, as it only provided insights into the languages used in the user's owned repositories, potentially missing languages used in forks or other contributions.
  - **Solution:** To overcome this challenge, I employed the highlight.js library, renowned for its language heuristics encompassing over 180 programming languages. Instead of relying solely on repository data, I utilized the GitHub API to extract a user's push events, enabling me to access commit information. For each commit, I employed highlight.js to analyze the code diff and file extensions. This approach allowed me to identify programming languages even when they were not explicitly specified in the repository data. Unidentified languages were omitted from the dataset to ensure accuracy and relevance.

- **Challenge 2:** Representing the gathered data as a visually informative and meaningful chart was another hurdle. Creating a dynamic chart that showcases a user's language usage over time in an organized manner required careful consideration.
  - **Solution:** Leveraging the identified language of each commit and the associated commit dates, I implemented a stacked cumulative area chart using D3.js. This chart effectively illustrates the evolution of a user's language preferences over time. To enhance clarity and aesthetics, each programming language was paired with an appropriate color on the chart. I accomplished this by mapping language names to their corresponding positions in a JavaScript object, which encompassed all languages supported by highlight.js. This approach ensured compatibility and readability, providing viewers with an insightful and visually engaging representation of a user's programming language journey.

- **Challenge 3:** Designing an eye-catching and contextually relevant graphic for the website landing page header presented a significant challenge. The graphic needed to visually convey the global nature of GitHub while maintaining a subdued color palette that adheres to WCAG AAA standards for text contrast on mobile devices, where the globe would serve as a backdrop for title text.
  - **Solution:** To address this challenge, I harnessed the power of GeoJSON data and D3.js's geographic projection tools. This approach allowed me to create a three-dimensional Earth visualization that not only symbolizes GitHub's global reach but also serves as an engaging focal point for the landing page. The choice of muted grey colors for the Earth's representation not only aligns with the website's overall tone but also ensures compliance with WCAG AAA standards for text contrast. This thoughtful combination of design and functionality results in a visually striking yet accessible header graphic that effectively captures the essence of GitHub's worldwide presence while maintaining a high level of user accessibility.

## Code Sample

```typescript

// Function to count the occurrences of programming conventions
countProgrammingConventions(filteredCommitData: Array<Commit>): string {
    // Initialize count object
    let count: Record<Convention, number> = {camelCase: 0, snakeCase: 0, pascalCase: 0, kebabCase: 0};

    // Regular expressions for different conventions
    const regexes = {
        camelCase: /[a-z][a-zA-Z0-9]*[A-Z][a-zA-Z0-9]*/g,
        snakeCase: /\b[a-z][a-zA-Z0-9]*_[a-z][a-zA-Z0-9]*\b/g,
        pascalCase: /[A-Z]([A-Z0-9]*[a-z][a-z0-9]*[A-Z]|[a-z0-9]*[A-Z][A-Z0-9]*[a-z])[A-Za-z0-9]*/g,
        kebabCase: /\b[a-z][a-zA-Z0-9]*-[a-z][a-zA-Z0-9]*\b/g,
    };
        
    // Function to count matches for a given regex
    function countMatches(regex: RegExp, diff: string) {
        return (diff.match(regex) || []).length;
    };
        
    // Iterate over filtered commit data
    for (let commit of filteredCommitData) {
        const patch = commit.files[0].patch;

        // Skip to the next iteration if patch is undefined
        if (typeof patch === "undefined") {
            continue;
        }

        // Count matches for each convention
        for (let convention in regexes) {
            count[convention as Convention] += countMatches(regexes[convention as Convention], patch);
        };
    };

    // Find the convention with the highest count
    const highestCount = findMaxProperty(count).prop
        
    // Return the most-used programming convention
    if (highestCount == "camelCase") return "camelCase";
    if (highestCount == "snakeCase") return "snake_case";
    if (highestCount == "pascalCase") return "PascalCase";
    if (highestCount == "kebabCase") return "kebab-case";
    return "camelCase"; // Default convention
};

```

## Project Demo

Access the project demo at [https://giha.netlify.app](https://giha.netlify.app).
