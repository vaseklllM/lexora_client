import { CommonType } from "../en/common";

export const de: CommonType = {
  sign_in: {
    title: "Anmelden",
    subtitle:
      "Geben Sie Ihre E-Mail-Adresse und Ihr Passwort ein, um sich anzumelden",
    email: {
      label: "E-Mail",
    },
    password: {
      label: "Passwort",
    },
    button_sign_in: "Anmelden",
    dont_have_account: {
      title: "Sie haben noch kein Konto?",
      link: "Registrieren",
    },
    or_continue_with: "Oder fortfahren mit",
  },
  sign_up: {
    title: "Registrieren",
    subtitle: "Füllen Sie das Formular aus, um sich zu registrieren",
    full_name: {
      label: "Vollständiger Name",
    },
    email: {
      label: "E-Mail",
    },
    password: {
      label: "Passwort",
    },
    password_repeat: {
      label: "Passwort wiederholen",
    },
    button_sign_up: "Registrieren",
    already_have_account: {
      title: "Sie haben bereits ein Konto?",
      link: "Anmelden",
    },
  },
  dashboard_section: {
    title: "Startseite",
  },
  section: {
    plus_dropdown_menu: {
      create_folder: "Ordner",
      create_deck: "Kartenstapel",
    },
  },
  deck_section: {
    language: {
      iLearn: "Ich lerne",
      iKnow: "Ich kenne",
    },
    add_card: {
      front: {
        button: "Karte hinzufügen",
      },
    },
    card_fields_side: {
      word: {
        label: "Wort",
        errors: {
          required: "Das Wort ist erforderlich",
          tooShort: "Das Wort ist zu kurz",
          maxLength:
            "Das Wort darf nicht länger als {{maxLength}} Zeichen sein",
        },
        generate: {
          tooltip: "Karte generieren",
        },
      },
      translation: {
        label: "Übersetzung",
        errors: {
          required: "Die Übersetzung ist erforderlich",
          tooShort: "Die Übersetzung ist zu kurz",
          maxLength:
            "Die Übersetzung darf nicht länger als {{maxLength}} Zeichen sein",
        },
      },
      example: {
        label: "Beispiel oder Beschreibung",
        placeholder: "{{languageName}} Beispiel",
        errors: {
          maxLength:
            "Das Beispiel darf nicht länger als {{maxLength}} Zeichen sein",
        },
      },
      example_translation: {
        label: "Übersetzung des Beispiels oder der Beschreibung",
        placeholder: "{{languageName}} Beispiel",
        errors: {
          maxLength:
            "Die Beispielübersetzung darf nicht länger als {{maxLength}} Zeichen sein",
        },
      },
    },
  },
  empty: {
    dashboard:
      "Sie haben noch keine Ordner oder Kartenstapel.\nSie können einen neuen Ordner oder Kartenstapel erstellen, indem Sie auf die Plus-Schaltfläche klicken.",
  },
  modal: {
    create_folder: {
      title: "Ordner erstellen",
      description:
        "Ein Ordner wird verwendet, um Kartenstapel und andere Ordner zu gruppieren.",
      fields: {
        name: {
          label: "Name",
          errors: {
            required: "Der Name ist erforderlich",
            noOnlySpaces: "Der Name darf nicht nur aus Leerzeichen bestehen",
            maxLength:
              "Der Name darf nicht länger als {{maxLength}} Zeichen sein",
          },
        },
      },
      buttons: {
        cancel: "Abbrechen",
        create: "Erstellen",
      },
    },
    create_deck: {
      title: "Kartenstapel erstellen",
      description:
        "Ein Kartenstapel wird verwendet, um Wortkarten zu speichern und zu lernen",
      fields: {
        name: {
          label: "Name",
        },
        languageWhatIKnow: {
          label: "Sprache, die ich kenne",
        },
        languageWhatILearn: {
          label: "Sprache, die ich lerne",
        },
      },
      buttons: {
        cancel: "Abbrechen",
        create: "Erstellen",
      },
    },
    delete_folder: {
      title: "Ordner '{{folderName}}' löschen",
      description: "Sind Sie sicher, dass Sie diesen Ordner löschen möchten?",
      buttons: {
        cancel: "Abbrechen",
        delete: "Löschen",
      },
    },
    rename: {
      fields: {
        name: {
          label: "Name",
          errors: {
            required: "Der Name ist erforderlich",
            noOnlySpaces: "Der Name darf nicht nur aus Leerzeichen bestehen",
            maxLength:
              "Der Name darf nicht länger als {{maxLength}} Zeichen sein",
          },
        },
      },
      buttons: {
        cancel: "Abbrechen",
        save: "Speichern",
      },
    },
    rename_folder: {
      title: "Ordner '{{folderName}}' umbenennen",
    },
    delete_deck: {
      title: "Kartenstapel '{{deckName}}' löschen",
      description:
        "Sind Sie sicher, dass Sie diesen Kartenstapel löschen möchten?",
      buttons: {
        cancel: "Abbrechen",
        delete: "Löschen",
      },
    },
    rename_deck: {
      title: "Kartenstapel '{{deckName}}' umbenennen",
    },
    choose_game: {
      title: "Spieltyp wählen",
      description: "Wählen Sie den Spieltyp, den Sie spielen möchten.",
      buttons: {
        pair_it: "Paare zuordnen",
        guess_it: "Erraten",
        recall_it: "Erinnern",
        type_it: "Tippen",
      },
    },
  },
  deck_languages_select: {
    most_used_languages: "Meist verwendete Sprachen",
    other_languages: "Andere Sprachen",
  },
  header: {
    buttons: {
      logout: "Abmelden",
    },
  },
  folder_breadcrumbs: {
    home: "Startseite",
  },
  folder: {
    buttons: {
      rename: "Umbenennen",
      delete: "Löschen",
    },
  },
  deck: {
    buttons: {
      rename: "Umbenennen",
      delete: "Löschen",
    },
  },
  learning_deck: {
    breadcrumbs: {
      learning_deck: "Kartenstapel lernen",
    },
    header: {
      steps: {
        review: "Überprüfen",
        pair_it: "Paare zuordnen",
        guess_it: "Erraten",
        recall_it: "Erinnern",
        type_it: "Tippen",
      },
    },
    step: {
      start: {
        button_start: {
          title: "Lernen",
          no_words_to_learn: "keine Wörter zum Lernen",
        },
        button_repeat: {
          title: "Wiederholen ({{numberOfCardsNeedToReview}})",
        },
        button_repeat_all: {
          title: "Alles wiederholen ({{numberOfCardsInProgress}})",
        },
      },
    },
  },
  games: {
    recall_it: {
      buttons: {
        forgot: "Vergessen",
        recalled: "Erinnert",
        next: "Weiter",
        show: "Zeigen",
      },
    },
    type_it: {
      buttons: {
        help: "Hilfe",
        check: "Überprüfen",
        try_again: "Erneut versuchen",
        right: "Richtig",
      },
    },
  },
  schemas: {
    email: {
      required: "Bitte geben Sie Ihre E-Mail-Adresse ein.",
      invalid: "Ungültiges E-Mail-Format.",
    },
    password: {
      required: "Bitte geben Sie Ihr Passwort ein.",
      minLength: "Das Passwort muss mindestens {{minLength}} Zeichen lang sein",
      uppercase: "Das Passwort muss mindestens einen Großbuchstaben enthalten",
      lowercase: "Das Passwort muss mindestens einen Kleinbuchstaben enthalten",
      number: "Das Passwort muss mindestens eine Zahl enthalten",
    },
    passwordRepeat: {
      required: "Bitte wiederholen Sie Ihr Passwort.",
      notMatch: "Die beiden Passwörter stimmen nicht überein.",
    },
    fullName: {
      required: "Bitte geben Sie Ihren vollständigen Namen ein.",
      minLength: "Der vollständige Name ist zu kurz.",
      noOnlySpaces:
        "Der vollständige Name darf keine Leerzeichen am Anfang oder Ende haben.",
      specialCharacters:
        "Der vollständige Name darf keine Sonderzeichen enthalten.",
      multipleConsecutiveHyphens:
        "Der vollständige Name darf keine mehrfachen aufeinanderfolgenden Bindestriche enthalten",
      numbers: "Der vollständige Name darf keine Zahlen enthalten",
    },
  },
};
