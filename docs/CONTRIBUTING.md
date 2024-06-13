# Contributing

## Coding guidelines

All submitted code should be consistent throughout.

-   Test your submitted code! Features and bug fixes.
-   Document main features well.
-   Document any new environment variables and how they should be used.
-   File naming should be consistent throughout
    -   Files in `src/app` follow
        [Expo router conventions](https://docs.expo.dev/router/create-pages/)
    -   Any elements, components and constants are named in `PascalCase`
    -   Hooks are in `camelCase` prefixed with `use` as per React conventions
    -   Other files and folders are either `camelCase` or seperated with `-` or `_`
-   Code is formatted and lintted as per rules setup in project configuration files

Other minor notes

-   Components should contain UI-components with a single purpose. Any collection of multiple
    components should be created in the `elements` folder
-   Don't just slap on `any` to everything

### Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) specification
in commit messages.

```
# In short
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```
