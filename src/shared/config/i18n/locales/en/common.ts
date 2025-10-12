export const en = {
  sign_in: {
    title: "Sign in",
    subtitle: "Enter your email and password to sign in",
    email: {
      label: "Email",
    },
    password: {
      label: "Password",
    },
    button_sign_in: "Sign in",
    dont_have_account: {
      title: "Don't have an account?",
      link: "Sign up",
    },
    or_continue_with: "Or continue with",
  },
  sign_up: {
    title: "Sign up",
    subtitle: "Fill in the form to sign up",
    full_name: {
      label: "Full name",
    },
    email: {
      label: "Email",
    },
    password: {
      label: "Password",
    },
    password_repeat: {
      label: "Password repeat",
    },
    button_sign_up: "Sign up",
    already_have_account: {
      title: "Already have an account?",
      link: "Sign in",
    },
  },
  dashboard_section: {
    title: "Home",
  },
  section: {
    plus_dropdown_menu: {
      create_folder: "Folder",
      create_deck: "Deck",
    },
  },
  empty: {
    dashboard:
      "You don't have any folders or decks.\nYou can create a new folder or deck by clicking the plus button.",
  },
  modal: {
    create_folder: {
      title: "Create folder",
      description:
        "A folder is used to group decks of cards and other folders.",
      fields: {
        name: {
          label: "Name",
          errors: {
            required: "Name is required",
            noOnlySpaces: "Name cannot be only spaces",
            maxLength: "Name cannot be longer than {{maxLength}} characters",
          },
        },
      },
      buttons: {
        cancel: "Cancel",
        create: "Create",
      },
    },
    create_deck: {
      title: "Create deck",
      description: "A deck is used to store word cards and study them",
      fields: {
        name: {
          label: "Name",
        },
        languageWhatIKnow: {
          label: "Language I know",
        },
        languageWhatILearn: {
          label: "Language I learn",
        },
      },
      buttons: {
        cancel: "Cancel",
        create: "Create",
      },
    },
  },
  deck_languages_select: {
    most_used_languages: "Most used languages",
    other_languages: "Other languages",
  },
  header: {
    buttons: {
      logout: "Logout",
    },
  },
  folder_breadcrumbs: {
    home: "Home",
  },
};

export type CommonType = typeof en;
