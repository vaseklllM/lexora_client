import { CommonType } from "../en/common";

export const pl: CommonType = {
  sign_in: {
    title: "Zaloguj się",
    subtitle: "Wprowadź swój adres e-mail i hasło, aby się zalogować",
    email: {
      label: "E-mail",
    },
    password: {
      label: "Hasło",
    },
    button_sign_in: "Zaloguj się",
    dont_have_account: {
      title: "Nie masz konta?",
      link: "Zarejestruj się",
    },
    or_continue_with: "Lub kontynuuj z",
  },
  sign_up: {
    title: "Zarejestruj się",
    subtitle: "Wypełnij formularz, aby się zarejestrować",
    full_name: {
      label: "Pełne imię i nazwisko",
    },
    email: {
      label: "E-mail",
    },
    password: {
      label: "Hasło",
    },
    password_repeat: {
      label: "Powtórz hasło",
    },
    button_sign_up: "Zarejestruj się",
    already_have_account: {
      title: "Masz już konto?",
      link: "Zaloguj się",
    },
  },
  dashboard_section: {
    title: "Strona główna",
  },
  section: {
    plus_dropdown_menu: {
      create_folder: "Folder",
      create_deck: "Talia",
    },
  },
  deck_section: {
    language: {
      iLearn: "Uczę się",
      iKnow: "Znam",
    },
    add_card: {
      front: {
        button: "Dodaj kartę",
      },
    },
    card_fields_side: {
      word: {
        label: "Słowo",
        errors: {
          required: "Słowo jest wymagane",
          tooShort: "Słowo jest za krótkie",
          maxLength: "Słowo nie może być dłuższe niż {{maxLength}} znaków",
        },
        generate: {
          tooltip: "Wygeneruj kartę",
        },
      },
      translation: {
        label: "Tłumaczenie",
        errors: {
          required: "Tłumaczenie jest wymagane",
          tooShort: "Tłumaczenie jest za krótkie",
          maxLength:
            "Tłumaczenie nie może być dłuższe niż {{maxLength}} znaków",
        },
      },
      example: {
        label: "Przykład lub opis",
        placeholder: "Przykład w języku {{languageName}}",
        errors: {
          maxLength: "Przykład nie może być dłuższy niż {{maxLength}} znaków",
        },
      },
      example_translation: {
        label: "Tłumaczenie przykładu lub opisu",
        placeholder: "Przykład w języku {{languageName}}",
        errors: {
          maxLength:
            "Tłumaczenie przykładu nie może być dłuższe niż {{maxLength}} znaków",
        },
      },
    },
  },
  empty: {
    dashboard:
      "Nie masz jeszcze żadnych folderów ani talii.\nMożesz utworzyć nowy folder lub talię, klikając przycisk plus.",
  },
  modal: {
    create_folder: {
      title: "Utwórz folder",
      description: "Folder służy do grupowania talii kart i innych folderów.",
      fields: {
        name: {
          label: "Nazwa",
          errors: {
            required: "Nazwa jest wymagana",
            noOnlySpaces: "Nazwa nie może składać się tylko ze spacji",
            maxLength: "Nazwa nie może być dłuższa niż {{maxLength}} znaków",
          },
        },
      },
      buttons: {
        cancel: "Anuluj",
        create: "Utwórz",
      },
    },
    create_deck: {
      title: "Utwórz talię",
      description: "Talia służy do przechowywania kart słownych i nauki ich",
      fields: {
        name: {
          label: "Nazwa",
        },
        languageWhatIKnow: {
          label: "Język, który znam",
        },
        languageWhatILearn: {
          label: "Język, którego się uczę",
        },
      },
      buttons: {
        cancel: "Anuluj",
        create: "Utwórz",
      },
    },
    delete_folder: {
      title: "Usuń folder '{{folderName}}'",
      description: "Czy na pewno chcesz usunąć ten folder?",
      buttons: {
        cancel: "Anuluj",
        delete: "Usuń",
      },
    },
    rename: {
      fields: {
        name: {
          label: "Nazwa",
          errors: {
            required: "Nazwa jest wymagana",
            noOnlySpaces: "Nazwa nie może składać się tylko ze spacji",
            maxLength: "Nazwa nie może być dłuższa niż {{maxLength}} znaków",
          },
        },
      },
      buttons: {
        cancel: "Anuluj",
        save: "Zapisz",
      },
    },
    rename_folder: {
      title: "Zmień nazwę folderu '{{folderName}}'",
    },
    delete_deck: {
      title: "Usuń talię '{{deckName}}'",
      description: "Czy na pewno chcesz usunąć tę talię?",
      buttons: {
        cancel: "Anuluj",
        delete: "Usuń",
      },
    },
    rename_deck: {
      title: "Zmień nazwę talii '{{deckName}}'",
    },
    choose_game: {
      title: "Wybierz typ gry",
      description: "Wybierz typ gry, w którą chcesz zagrać.",
      buttons: {
        pair_it: "Dopasuj pary",
        guess_it: "Zgadnij",
        recall_it: "Przypomnij sobie",
        type_it: "Wpisz",
      },
    },
  },
  deck_languages_select: {
    most_used_languages: "Najczęściej używane języki",
    other_languages: "Inne języki",
  },
  header: {
    buttons: {
      logout: "Wyloguj się",
    },
  },
  folder_breadcrumbs: {
    home: "Strona główna",
  },
  folder: {
    buttons: {
      rename: "Zmień nazwę",
      delete: "Usuń",
    },
  },
  deck: {
    buttons: {
      rename: "Zmień nazwę",
      delete: "Usuń",
    },
  },
  learning_deck: {
    breadcrumbs: {
      learning_deck: "Nauka talii",
    },
    header: {
      steps: {
        review: "Przegląd",
        pair_it: "Dopasuj pary",
        guess_it: "Zgadnij",
        recall_it: "Przypomnij sobie",
        type_it: "Wpisz",
      },
    },
    step: {
      start: {
        button_start: {
          title: "Ucz się",
          no_words_to_learn: "brak słów do nauki",
        },
        button_repeat: {
          title: "Powtórz ({{numberOfCardsNeedToReview}})",
        },
        button_repeat_all: {
          title: "Powtórz wszystko ({{numberOfCardsInProgress}})",
        },
      },
    },
  },
  games: {
    recall_it: {
      buttons: {
        forgot: "Zapomniałem",
        recalled: "Przypomniałem sobie",
        next: "Dalej",
        show: "Pokaż",
      },
    },
    type_it: {
      buttons: {
        help: "Pomoc",
        check: "Sprawdź",
        try_again: "Spróbuj ponownie",
        right: "Dobrze",
      },
    },
  },
  schemas: {
    email: {
      required: "Proszę wprowadzić swój adres e-mail.",
      invalid: "Nieprawidłowy format adresu e-mail.",
    },
    password: {
      required: "Proszę wprowadzić swoje hasło.",
      minLength: "Hasło musi zawierać co najmniej {{minLength}} znaków",
      uppercase: "Hasło musi zawierać co najmniej jedną wielką literę",
      lowercase: "Hasło musi zawierać co najmniej jedną małą literę",
      number: "Hasło musi zawierać co najmniej jedną cyfrę",
    },
    passwordRepeat: {
      required: "Proszę powtórzyć swoje hasło.",
      notMatch: "Hasła nie są identyczne.",
    },
    fullName: {
      required: "Proszę wprowadzić swoje pełne imię i nazwisko.",
      minLength: "Pełne imię i nazwisko jest za krótkie.",
      noOnlySpaces:
        "Pełne imię i nazwisko nie może mieć spacji na początku lub na końcu.",
      specialCharacters:
        "Pełne imię i nazwisko nie może zawierać znaków specjalnych.",
      multipleConsecutiveHyphens:
        "Pełne imię i nazwisko nie może zawierać wielu kolejnych myślników",
      numbers: "Pełne imię i nazwisko nie może zawierać cyfr",
    },
  },
};
