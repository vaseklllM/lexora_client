import { CommonType } from "../en/common";

export const it: CommonType = {
  sign_in: {
    title: "Accedi",
    subtitle: "Inserisci la tua email e password per accedere",
    email: {
      label: "Email",
    },
    password: {
      label: "Password",
    },
    button_sign_in: "Accedi",
    dont_have_account: {
      title: "Non hai un account?",
      link: "Registrati",
    },
    or_continue_with: "Oppure continua con",
  },
  sign_up: {
    title: "Registrati",
    subtitle: "Compila il modulo per registrarti",
    full_name: {
      label: "Nome completo",
    },
    email: {
      label: "Email",
    },
    password: {
      label: "Password",
    },
    password_repeat: {
      label: "Ripeti password",
    },
    button_sign_up: "Registrati",
    already_have_account: {
      title: "Hai già un account?",
      link: "Accedi",
    },
  },
  dashboard_section: {
    title: "Inizio",
  },
  section: {
    plus_dropdown_menu: {
      create_folder: "Cartella",
      create_deck: "Mazzo",
    },
  },
  deck_section: {
    language: {
      iLearn: "Sto imparando",
      iKnow: "Conosco",
    },
    add_card: {
      front: {
        button: "Aggiungi carta",
      },
    },
    card_fields_side: {
      word: {
        label: "Parola",
        errors: {
          required: "La parola è obbligatoria",
          tooShort: "La parola è troppo corta",
          maxLength:
            "La parola non può essere più lunga di {{maxLength}} caratteri",
        },
        generate: {
          tooltip: "Genera carta",
        },
      },
      translation: {
        label: "Traduzione",
        errors: {
          required: "La traduzione è obbligatoria",
          tooShort: "La traduzione è troppo corta",
          maxLength:
            "La traduzione non può essere più lunga di {{maxLength}} caratteri",
        },
      },
      example: {
        label: "Esempio o descrizione",
        placeholder: "Esempio in {{languageName}}",
        errors: {
          maxLength:
            "L'esempio non può essere più lungo di {{maxLength}} caratteri",
        },
      },
      example_translation: {
        label: "Traduzione dell'esempio o descrizione",
        placeholder: "Esempio in {{languageName}}",
        errors: {
          maxLength:
            "La traduzione dell'esempio non può essere più lunga di {{maxLength}} caratteri",
        },
      },
    },
  },
  empty: {
    dashboard:
      "Non hai ancora cartelle o mazzi.\nPuoi creare una nuova cartella o un nuovo mazzo cliccando sul pulsante più.",
  },
  modal: {
    create_folder: {
      title: "Crea cartella",
      description:
        "Una cartella viene utilizzata per raggruppare mazzi di carte e altre cartelle.",
      fields: {
        name: {
          label: "Nome",
          errors: {
            required: "Il nome è obbligatorio",
            noOnlySpaces: "Il nome non può contenere solo spazi",
            maxLength:
              "Il nome non può essere più lungo di {{maxLength}} caratteri",
          },
        },
      },
      buttons: {
        cancel: "Annulla",
        create: "Crea",
      },
    },
    create_deck: {
      title: "Crea mazzo",
      description:
        "Un mazzo viene utilizzato per memorizzare carte di parole e studiarle",
      fields: {
        name: {
          label: "Nome",
        },
        languageWhatIKnow: {
          label: "Lingua che conosco",
        },
        languageWhatILearn: {
          label: "Lingua che sto imparando",
        },
      },
      buttons: {
        cancel: "Annulla",
        create: "Crea",
      },
    },
    delete_folder: {
      title: "Elimina cartella '{{folderName}}'",
      description: "Sei sicuro di voler eliminare questa cartella?",
      buttons: {
        cancel: "Annulla",
        delete: "Elimina",
      },
    },
    rename: {
      fields: {
        name: {
          label: "Nome",
          errors: {
            required: "Il nome è obbligatorio",
            noOnlySpaces: "Il nome non può contenere solo spazi",
            maxLength:
              "Il nome non può essere più lungo di {{maxLength}} caratteri",
          },
        },
      },
      buttons: {
        cancel: "Annulla",
        save: "Salva",
      },
    },
    rename_folder: {
      title: "Rinomina cartella '{{folderName}}'",
    },
    delete_deck: {
      title: "Elimina mazzo '{{deckName}}'",
      description: "Sei sicuro di voler eliminare questo mazzo?",
      buttons: {
        cancel: "Annulla",
        delete: "Elimina",
      },
    },
    rename_deck: {
      title: "Rinomina mazzo '{{deckName}}'",
    },
    choose_game: {
      title: "Scegli il tipo di gioco",
      description: "Scegli il tipo di gioco a cui vuoi giocare.",
      buttons: {
        pair_it: "Abbina",
        guess_it: "Indovina",
        recall_it: "Ricorda",
        type_it: "Scrivi",
      },
    },
  },
  deck_languages_select: {
    most_used_languages: "Lingue più utilizzate",
    other_languages: "Altre lingue",
  },
  header: {
    buttons: {
      logout: "Esci",
    },
  },
  folder_breadcrumbs: {
    home: "Inizio",
  },
  folder: {
    buttons: {
      rename: "Rinomina",
      delete: "Elimina",
    },
  },
  deck: {
    buttons: {
      rename: "Rinomina",
      delete: "Elimina",
    },
  },
  learning_deck: {
    breadcrumbs: {
      learning_deck: "Apprendimento mazzo",
    },
    header: {
      steps: {
        review: "Revisione",
        pair_it: "Abbina",
        guess_it: "Indovina",
        recall_it: "Ricorda",
        type_it: "Scrivi",
      },
    },
    step: {
      start: {
        button_start: {
          title: "Impara",
          no_words_to_learn: "nessuna parola da imparare",
        },
        button_repeat: {
          title: "Ripeti ({{numberOfCardsNeedToReview}})",
        },
        button_repeat_all: {
          title: "Ripeti tutto ({{numberOfCardsInProgress}})",
        },
      },
    },
  },
  games: {
    recall_it: {
      buttons: {
        forgot: "Dimenticato",
        recalled: "Ricordato",
        next: "Avanti",
        show: "Mostra",
      },
    },
    type_it: {
      buttons: {
        help: "Aiuto",
        check: "Verifica",
        try_again: "Riprova",
        right: "Corretto",
      },
    },
  },
  schemas: {
    email: {
      required: "Per favore inserisci la tua email.",
      invalid: "Formato email non valido.",
    },
    password: {
      required: "Per favore inserisci la tua password.",
      minLength: "La password deve contenere almeno {{minLength}} caratteri",
      uppercase: "La password deve contenere almeno una lettera maiuscola",
      lowercase: "La password deve contenere almeno una lettera minuscola",
      number: "La password deve contenere almeno un numero",
    },
    passwordRepeat: {
      required: "Per favore ripeti la tua password.",
      notMatch: "Le due password non corrispondono.",
    },
    fullName: {
      required: "Per favore inserisci il tuo nome completo.",
      minLength: "Il nome completo è troppo corto.",
      noOnlySpaces:
        "Il nome completo non può avere spazi all'inizio o alla fine.",
      specialCharacters:
        "Il nome completo non può contenere caratteri speciali.",
      multipleConsecutiveHyphens:
        "Il nome completo non può contenere più trattini consecutivi",
      numbers: "Il nome completo non può contenere numeri",
    },
  },
};
