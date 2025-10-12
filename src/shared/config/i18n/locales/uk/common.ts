import { CommonType } from "../en/common";

export const uk: CommonType = {
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
};
