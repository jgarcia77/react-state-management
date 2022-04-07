---
marp: true
author: Josh Garcia
title: ReduxToolkit Training
paginate: false
size: 4:3
theme: gaia
---

<style>
    :root {
        --color-background: #2E1A47;
        --color-foreground: #fff;
    }

    h1 {
        color: #7248BD;
    }

    h2 {
        color: #666;
    }

    img {
        width: 400px;
    }
</style>

![Netrix Logo](https://www.netrixllc.com/wp-content/uploads/2020/09/Netrix-Logo.png)

# React useContext()
-   Under the Hood
-   Implementation
-	Questions

---

# Under the Hood
-   Provider & Consumer
-   Sharing State

---

# Implementation
-   Component Tree
-   Instructions
-   Refactor Application

---

# Refactor Application
-   Create the context and custom wrapper
-   Move state from the `<App />` component to the custom wrapper
-   Replace prop drilling with `useContext()`
-   Clean up state by creating a custom hook
-   Leverage the `constate` library to simply context creation