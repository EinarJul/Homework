![Prettier](https://github.com/freelancerfy/frontend/workflows/Prettier/badge.svg?branch=main)

# Remember
  - Always create a branch

        $ git checkout -b <branch_name>
    
  - Commit all changes to the new branch
    
        $ git status
        $ git add <file_with_absolute_path>
        
      You can either commit like this, or use vim
        
        $ git commit -m "<comment_>"
      
      Then push it if you think ther``e is no more changes
        
        $ git push --set-upstream origin <branch_name>
        
- Create pull requests

      Go to the repo on github, there should be a warning asking you to create new pull request.
      Do it :)


# Running in docker
In the  project directory, you can run:

	$ docker-compose up

# Running without docker

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).



## Custom hooks
You can find the implementation in src/hooks

  ### List of hooks
  - appContext
  - currentUser
  - useFetch

  ## App context hook
  This hook provides functionality to check whenever user is logged in, or change logged in flag.
  ### Usage
    const { isAuthenticated, userHasAuthenticated } = useAppContext()

  ## Current user hook
  This hook automatically fetches currently innlogged users information
  ### Usage
    const {data, isLoading, isError} = useCurrentUser()

  ## Use fetch
  This is a hook that makes fetching data from the API easier.
  It is important to make an interface for the response data and pass it into useFetch, to utilize typescript
  Any data that you may want to send to the api just put it on body, it will get encoded automatically.
  You can also trigger the call with a callback function

  ### Usage - Normal
    const [{ data, isLoading, isError }] = useFetch<response_interface>({
      path: '/posts/get',
      method: 'POST',
      body: {
        slug: slug,
      },
    })

  ### Usage - Callback
    const [{ data, isLoading, isError }, refetch] = useFetch<response_interface>({
      path: '/posts/get',
      method: 'POST',
      body: {
        slug: slug,
      },
    })
    
   As you can see there is a "refetch" added, you can call it from any place in your current component.
   The refetch callback also can take the same object as passed into useFetch()

