import { CommonType } from "../en/common";

export const nl: CommonType = {
  sign_in: {
    title: "Inloggen",
    subtitle: "Voer uw e-mailadres en wachtwoord in om in te loggen",
    email: {
      label: "E-mail",
    },
    password: {
      label: "Wachtwoord",
    },
    button_sign_in: "Inloggen",
    dont_have_account: {
      title: "Heeft u nog geen account?",
      link: "Registreren",
    },
    or_continue_with: "Of ga verder met",
  },
  sign_up: {
    title: "Registreren",
    subtitle: "Vul het formulier in om u te registreren",
    full_name: {
      label: "Volledige naam",
    },
    email: {
      label: "E-mail",
    },
    password: {
      label: "Wachtwoord",
    },
    password_repeat: {
      label: "Herhaal wachtwoord",
    },
    button_sign_up: "Registreren",
    already_have_account: {
      title: "Heeft u al een account?",
      link: "Inloggen",
    },
  },
  dashboard_section: {
    title: "Thuis",
  },
  section: {
    plus_dropdown_menu: {
      create_folder: "Map",
      create_deck: "Stapel",
    },
  },
  deck_section: {
    language: {
      iLearn: "Ik leer",
      iKnow: "Ik ken",
    },
    add_card: {
      front: {
        button: "Kaart toevoegen",
      },
    },
    card_fields_side: {
      word: {
        label: "Woord",
        errors: {
          required: "Het woord is verplicht",
          tooShort: "Het woord is te kort",
          maxLength: "Het woord mag niet langer zijn dan {{maxLength}} tekens",
        },
        generate: {
          tooltip: "Kaart genereren",
        },
      },
      translation: {
        label: "Vertaling",
        errors: {
          required: "De vertaling is verplicht",
          tooShort: "De vertaling is te kort",
          maxLength:
            "De vertaling mag niet langer zijn dan {{maxLength}} tekens",
        },
      },
      example: {
        label: "Voorbeeld of beschrijving",
        placeholder: "{{languageName}} voorbeeld",
        errors: {
          maxLength:
            "Het voorbeeld mag niet langer zijn dan {{maxLength}} tekens",
        },
      },
      example_translation: {
        label: "Vertaling van voorbeeld of beschrijving",
        placeholder: "{{languageName}} voorbeeld",
        errors: {
          maxLength:
            "De voorbeeldvertaling mag niet langer zijn dan {{maxLength}} tekens",
        },
      },
    },
  },
  empty: {
    dashboard:
      "U heeft nog geen mappen of stapels.\nU kunt een nieuwe map of stapel maken door op de plus-knop te klikken.",
  },
  modal: {
    create_folder: {
      title: "Map maken",
      description:
        "Een map wordt gebruikt om kaartenstapels en andere mappen te groeperen.",
      fields: {
        name: {
          label: "Naam",
          errors: {
            required: "De naam is verplicht",
            noOnlySpaces: "De naam mag niet alleen uit spaties bestaan",
            maxLength: "De naam mag niet langer zijn dan {{maxLength}} tekens",
          },
        },
      },
      buttons: {
        cancel: "Annuleren",
        create: "Maken",
      },
    },
    create_deck: {
      title: "Stapel maken",
      description:
        "Een stapel wordt gebruikt om woordkaarten op te slaan en te bestuderen",
      fields: {
        name: {
          label: "Naam",
        },
        languageWhatIKnow: {
          label: "Taal die ik ken",
        },
        languageWhatILearn: {
          label: "Taal die ik leer",
        },
      },
      buttons: {
        cancel: "Annuleren",
        create: "Maken",
      },
    },
    delete_folder: {
      title: "Map '{{folderName}}' verwijderen",
      description: "Weet u zeker dat u deze map wilt verwijderen?",
      buttons: {
        cancel: "Annuleren",
        delete: "Verwijderen",
      },
    },
    rename: {
      fields: {
        name: {
          label: "Naam",
          errors: {
            required: "De naam is verplicht",
            noOnlySpaces: "De naam mag niet alleen uit spaties bestaan",
            maxLength: "De naam mag niet langer zijn dan {{maxLength}} tekens",
          },
        },
      },
      buttons: {
        cancel: "Annuleren",
        save: "Opslaan",
      },
    },
    rename_folder: {
      title: "Map '{{folderName}}' hernoemen",
    },
    delete_deck: {
      title: "Stapel '{{deckName}}' verwijderen",
      description: "Weet u zeker dat u deze stapel wilt verwijderen?",
      buttons: {
        cancel: "Annuleren",
        delete: "Verwijderen",
      },
    },
    rename_deck: {
      title: "Stapel '{{deckName}}' hernoemen",
    },
    choose_game: {
      title: "Kies speltype",
      description: "Kies het speltype dat u wilt spelen.",
      buttons: {
        pair_it: "Koppelen",
        guess_it: "Raden",
        recall_it: "Herinneren",
        type_it: "Typen",
      },
    },
  },
  deck_languages_select: {
    most_used_languages: "Meest gebruikte talen",
    other_languages: "Andere talen",
  },
  header: {
    buttons: {
      logout: "Uitloggen",
    },
  },
  folder_breadcrumbs: {
    home: "Thuis",
  },
  folder: {
    buttons: {
      rename: "Hernoemen",
      delete: "Verwijderen",
    },
  },
  deck: {
    buttons: {
      rename: "Hernoemen",
      delete: "Verwijderen",
    },
  },
  learning_deck: {
    breadcrumbs: {
      learning_deck: "Stapel leren",
    },
    header: {
      steps: {
        review: "Beoordelen",
        pair_it: "Koppelen",
        guess_it: "Raden",
        recall_it: "Herinneren",
        type_it: "Typen",
      },
    },
    step: {
      start: {
        button_start: {
          title: "Leren",
          no_words_to_learn: "geen woorden om te leren",
        },
        button_repeat: {
          title: "Herhalen ({{numberOfCardsNeedToReview}})",
        },
        button_repeat_all: {
          title: "Alles herhalen ({{numberOfCardsInProgress}})",
        },
      },
    },
  },
  games: {
    recall_it: {
      buttons: {
        forgot: "Vergeten",
        recalled: "Herinnerd",
        next: "Volgende",
        show: "Tonen",
      },
    },
    type_it: {
      buttons: {
        help: "Hulp",
        check: "Controleren",
        try_again: "Opnieuw proberen",
        right: "Juist",
      },
    },
  },
  schemas: {
    email: {
      required: "Voer uw e-mailadres in.",
      invalid: "Ongeldig e-mailformaat.",
    },
    password: {
      required: "Voer uw wachtwoord in.",
      minLength: "Het wachtwoord moet minimaal {{minLength}} tekens bevatten",
      uppercase: "Het wachtwoord moet minimaal één hoofdletter bevatten",
      lowercase: "Het wachtwoord moet minimaal één kleine letter bevatten",
      number: "Het wachtwoord moet minimaal één cijfer bevatten",
    },
    passwordRepeat: {
      required: "Herhaal uw wachtwoord.",
      notMatch: "De twee wachtwoorden komen niet overeen.",
    },
    fullName: {
      required: "Voer uw volledige naam in.",
      minLength: "De volledige naam is te kort.",
      noOnlySpaces:
        "De volledige naam mag geen spaties aan het begin of einde hebben.",
      specialCharacters: "De volledige naam mag geen speciale tekens bevatten.",
      multipleConsecutiveHyphens:
        "De volledige naam mag geen meerdere opeenvolgende koppeltekens bevatten",
      numbers: "De volledige naam mag geen cijfers bevatten",
    },
  },
};
