import { CommonType } from "../en/common";

export const de: CommonType = {
  sign_in: {
    title: "Вхід",
    subtitle: "Введіть вашу електронну адресу та пароль для входу",
    email: {
      label: "Email",
    },
    password: {
      label: "Пароль",
    },
    button_sign_in: "Увійти",
    dont_have_account: {
      title: "Немає аккаунта?",
      link: "Зареєструватися",
    },
    or_continue_with: "Або продовжити з",
  },
  sign_up: {
    title: "Реєстрація",
    subtitle: "Заповніть форму для реєстрації",
    full_name: {
      label: "Повне ім'я",
    },
    email: {
      label: "Електронна адреса",
    },
    password: {
      label: "Пароль",
    },
    password_repeat: {
      label: "Повторіть пароль",
    },
    button_sign_up: "Зареєструватися",
    already_have_account: {
      title: "Уже є аккаунт?",
      link: "Увійти",
    },
  },
  dashboard_section: {
    title: "Головна",
  },
  section: {
    plus_dropdown_menu: {
      create_folder: "Папка",
      create_deck: "Колода",
    },
  },
  deck_section: {
    language: {
      iLearn: "Я вивчаю",
      iKnow: "Я знаю",
    },
    add_card: {
      front: {
        button: "Додати картку",
      },
    },
    card_fields_side: {
      word: {
        label: "Слово",
        errors: {
          required: "Слово є обов'язковим",
          tooShort: "Слово є надто коротким",
          maxLength: "Слово не може бути довше ніж {{maxLength}} символів",
        },
        generate: {
          tooltip: "Згенерувати картку",
        },
      },
      translation: {
        label: "Переклад",
        errors: {
          required: "Переклад є обов'язковим",
          tooShort: "Переклад є надто коротким",
          maxLength: "Переклад не може бути довше ніж {{maxLength}} символів",
        },
      },
      example: {
        label: "Приклад або опис",
        placeholder: "{{languageName}} приклад",
        errors: {
          maxLength: "Приклад не може бути довше ніж {{maxLength}} символів",
        },
      },
      example_translation: {
        label: "Приклад або опис в перекладі",
        placeholder: "{{languageName}} приклад",
        errors: {
          maxLength:
            "Приклад в перекладі не може бути довше ніж {{maxLength}} символів",
        },
      },
    },
  },
  empty: {
    dashboard:
      "У вас немає жодної папки або колоди.\nВи можете створити нову папку або колоду, натиснувши кнопку плюс.",
  },
  modal: {
    create_folder: {
      title: "Створити папку",
      description:
        "Папка використовується для групування колод карт та інших папок.",
      fields: {
        name: {
          label: "Назва",
          errors: {
            required: "Назва є обов'язковою",
            noOnlySpaces: "Назва не може бути лише пробілами",
            maxLength: "Назва не може бути довше ніж {{maxLength}} символів",
          },
        },
      },
      buttons: {
        cancel: "Скасувати",
        create: "Створити",
      },
    },
    create_deck: {
      title: "Створити колоду",
      description: "Колода використовується для зберігання карт та вивчення їх",
      fields: {
        name: {
          label: "Назва",
        },
        languageWhatIKnow: {
          label: "Мова, яку я знаю",
        },
        languageWhatILearn: {
          label: "Мова, яку я вивчаю",
        },
      },
      buttons: {
        cancel: "Скасувати",
        create: "Створити",
      },
    },
    delete_folder: {
      title: "Видалити папку '{{folderName}}'",
      description: "Ви впевнені, що хочете вилучити цю папку?",
      buttons: {
        cancel: "Скасувати",
        delete: "Видалити",
      },
    },
    rename: {
      fields: {
        name: {
          label: "Назва",
          errors: {
            required: "Назва є обов'язковою",
            noOnlySpaces: "Назва не може бути лише пробілами",
            maxLength: "Назва не може бути довше ніж {{maxLength}} символів",
          },
        },
      },
      buttons: {
        cancel: "Скасувати",
        save: "Зберегти",
      },
    },
    rename_folder: {
      title: "Перейменувати папку '{{folderName}}'",
    },
    delete_deck: {
      title: "Видалити колоду '{{deckName}}'",
      description: "Ви впевнені, що хочете видалити цю колоду?",
      buttons: {
        cancel: "Скасувати",
        delete: "Видалити",
      },
    },
    rename_deck: {
      title: "Перейменувати колоду '{{deckName}}'",
    },
    choose_game: {
      title: "Виберіть тип гри",
      description: "Виберіть тип гри, який ви хочете грати.",
      buttons: {
        pair_it: "Знайти пару",
        guess_it: "Вибрати один із",
        recall_it: "Згадати",
        type_it: "Написати",
      },
    },
  },
  deck_languages_select: {
    most_used_languages: "Часто використовувані мови",
    other_languages: "Інші мови",
  },
  header: {
    buttons: {
      logout: "Вийти",
    },
  },
  folder_breadcrumbs: {
    home: "Головна",
  },
  folder: {
    buttons: {
      rename: "Перейменувати",
      delete: "Видалити",
    },
  },
  deck: {
    buttons: {
      rename: "Перейменувати",
      delete: "Видалити",
    },
  },
  learning_deck: {
    breadcrumbs: {
      learning_deck: "Вивчення колоди",
    },
    header: {
      steps: {
        review: "Перегляд",
        pair_it: "Знайти пару",
        guess_it: "Вибрати один із",
        recall_it: "Згадати",
        type_it: "Написати",
      },
    },
    step: {
      start: {
        button_start: {
          title: "Вивчити",
          no_words_to_learn: "немає слів для вивчення",
        },
        button_repeat: {
          title: "Повторити ({{numberOfCardsNeedToReview}})",
        },
        button_repeat_all: {
          title: "Повторити всі ({{numberOfCardsInProgress}})",
        },
      },
    },
  },
  games: {
    recall_it: {
      buttons: {
        forgot: "Забув",
        recalled: "Згадав",
        next: "Далі",
        show: "Показати",
      },
    },
    type_it: {
      buttons: {
        help: "Допомога",
        check: "Перевірити",
        try_again: "Спробувати знову",
        right: "Правильно",
      },
    },
  },
  schemas: {
    email: {
      required: "Будь ласка, введіть вашу електронну адресу.",
      invalid: "Неправильний формат електронної адреси.",
    },
    password: {
      required: "Будь ласка, введіть ваш пароль.",
      minLength: "Пароль повинен бути не менше {{minLength}} символів",
      uppercase: "Пароль повинен містити принаймні одну велику літеру",
      lowercase: "Пароль повинен містити принаймні одну малу літеру",
      number: "Пароль повинен містити принаймні одну цифру",
    },
    passwordRepeat: {
      required: "Будь ласка, введіть ваш пароль повторно.",
      notMatch: "Паролі не збігаються.",
    },
    fullName: {
      required: "Будь ласка, введіть ваше повне ім'я.",
      minLength: "Повне ім'я є надто коротким.",
      noOnlySpaces: "Повне ім'я не може мати пробілів на початку або в кінці.",
      specialCharacters: "Повне ім'я не може містити спеціальні символи.",
      multipleConsecutiveHyphens:
        "Повне ім'я не може містити кілька послідовних тире.",
      numbers: "Повне ім'я не може містити цифри.",
    },
  },
};
