export default {
  common: {
    welcome: 'Welcome!',
    error: 'Error',
  },
  auth: {
    welcomeBack: 'Welcome Back',
    createAccount: 'Create Account',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    noAccount: "Don't have an account? Sign Up",
    hasAccount: 'Already have an account? Sign In',
  },
  home: {
    tryIt: {
      title: 'Step 1: Try it',
      description: 'Edit {{file}} to see changes.',
      press: 'Press',
      toOpen: 'to open developer tools.',
    },
    explore: {
      title: 'Step 2: Explore',
      description: "Tap the Explore tab to learn more about what's included in this starter app.",
    },
    freshStart: {
      title: 'Step 3: Get a fresh start',
      description:
        "When you're ready, run {{command}} to get a fresh {{appDir}} directory. This will move the current {{appDir}} to {{exampleDir}}.",
    },
  },
  explore: {
    title: 'Explore',
    description: 'This app includes example code to help you get started.',
    sections: {
      routing: {
        title: 'File-based routing',
        description: 'This app has two screens: {{screen1}} and {{screen2}}',
        layout: 'The layout file in {{file}} sets up the tab navigator.',
        learnMore: 'Learn more',
      },
      platform: {
        title: 'Android, iOS, and web support',
        description:
          'You can open this project on Android, iOS, and the web. To open the web version, press {{key}} in the terminal running this project.',
      },
      images: {
        title: 'Images',
        description:
          'For static images, you can use the {{suffix1}} and {{suffix2}} suffixes to provide files for different screen densities',
      },
      fonts: {
        title: 'Custom fonts',
        description: 'Open {{file}} to see how to load custom fonts such as this one.',
      },
      themes: {
        title: 'Light and dark mode components',
        description:
          "This template has light and dark mode support. The {{hook}} hook lets you inspect what the user's current color scheme is, and so you can adjust UI colors accordingly.",
      },
      animations: {
        title: 'Animations',
        description:
          'This template includes an example of an animated component. The {{component}} component uses the powerful {{library}} library to create a waving hand animation.',
        ios: 'The {{component}} component provides a parallax effect for the header image.',
      },
    },
  },
  notFound: {
    title: "This screen doesn't exist.",
    goHome: 'Go to home screen!',
  },
  menu: {
    title: 'Menu',
    signOut: 'Sign Out',
  },
};
