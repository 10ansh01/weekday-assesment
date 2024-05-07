# I REUQUEST YOU TO READ THIS TILL THE END `:)`

# Getting Started

    - If possible try re-generating the package-lock.json (you can delete your
    package-lock.json and run npn install)
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
                (I have divided Job card in 3 parts: Head, Body, Foot. This folder has components
                for those.)
            - utilityComponents/
                (contains generalised components that can be used globally.)
        - hooks/
            (contains custom hooks)
        - reduxSlices/
            (contains slices files for different redux states)
        - styles/
            (contains css)
        - utils/
            (contains js files for utility functions)

# Approach explaination for different areas of project

## General

    - Everything is tied up with redux. The flow is: Data comes -> Gets stored in redux ->
    fetched from redux -> rendered to frontend.
    I did this because I wanted to keep just one source of truth.

    - I have kept minimum height for some elements, just so that in case they are null,
    the height of overall Job card is not decreased. Because it will look bad if one job
    card's height is smalled than others.

## Job Listing functionality

    - Each Job Card is being loaded in a lazy manner to optimise performance

## Custom hooks

    - I have built custom hooks for different areas of project like:
        useDebounce -> I am using this to debounce the state updation when the user is
        typing in the company name filter.

        useInfiniteScrol -> I created this hook to implement infinite scroll functionality

        useFilteredJobsUpdater -> I created this hook to filter out jobs on addition/removal
        of different filters

## Filter functionality

    - I have a global component built out to render filter.
    - I have set some filter where the user can select multiple options. one eg is: Locations
    - I have set some filter where the user can only select one option.
    one eg is: Min base pay filter
    - Filter updation flow is explained in the useFilteredJobsUpdater hooks file.
    I have tried my best to handle it in the best way possible.

### - I myself have some questions on the behaviour of filters. I would love to discuss them and I think I can make the functionality more robust if we can discuss more on this

    - The company name filter is not tied up with all other filters.
    Currently, it is filtering out the jobs from all the jobs irrespective of the fact
    if there was any other filter already applied or not.

### - There can be so many combinations if we want to have multiple filters interact together to filter out jobs. I implemented some of them in 2 days. The funtionality can be built in a more robust manner given the fact if we can have a discussion on this.

## Areas to improve

    - Overall the filtering functionality can be worked upon.
    Because of the number of combination filters can have, it is a little time taking

    - Although I did implement the lazy loading for listing og job cards.
    But I would love to discuss how can we can further make this better.

# My Observations about Weekday:

- I was going through your website/extension and I thought if we can implement the below mentioned behaviour, it will make UX overall better for a user
  - Lets say there are 200 Jobs loaded and the user scrolls to the bottom,
  - Now if he/she wants to filter jobs, the user will have to scroll all the way to the top to apply filter
  - I would suggest that in this case, if the user scrolls a little bit up, a floating header should pop-up/fall from the top with all the filters
  - This way user can apply filters without scrolling all the way to the top.

# THIS WAS A REALLY EXCITING CHALLENGE FOR ME. I HONESTLY ENJOYED IT.

# HOPING TO DISCUSS MORE ON THIS.

THANKS
Ansh
