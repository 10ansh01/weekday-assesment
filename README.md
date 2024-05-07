# I REUQUEST YOU TO READ THIS TILL THE END `:)`

# Getting Started

    - If possible try re-generating the package-lock.json (you can delete your package-lock.json and run npn install)
    - Run npm install (to install required packages)
    - Run npm start (to start deployment server)

# Folder Structure

    - public/
        - index.html

    - src/
        - app/
            (contains redux store)
        - components/
            (contains all the components)
            - Filters/
                (contains Individual filter component for each filter)
            - JobCardSubComponents
                (I have divided Job card in 3 parts: Head, Body, Foot. This folder has components for those.)
            - utilityComponents/
                (contains generalised components that can be used globally.)
        - hooks/
            (contains custom hooks)
        - reduxSlices
            (contains slices files for different redux states)
        - styles/
            (contains css)
        - utils/
            (contains js files for utility functions)
