import { CommonType } from "../en/common";

export const es: CommonType = {
  sign_in: {
    title: "Iniciar sesión",
    subtitle: "Ingresa tu correo electrónico y contraseña para iniciar sesión",
    email: {
      label: "Correo electrónico",
    },
    password: {
      label: "Contraseña",
    },
    button_sign_in: "Iniciar sesión",
    dont_have_account: {
      title: "¿No tienes una cuenta?",
      link: "Registrarse",
    },
    or_continue_with: "O continuar con",
  },
  sign_up: {
    title: "Registrarse",
    subtitle: "Completa el formulario para registrarte",
    full_name: {
      label: "Nombre completo",
    },
    email: {
      label: "Correo electrónico",
    },
    password: {
      label: "Contraseña",
    },
    password_repeat: {
      label: "Repetir contraseña",
    },
    button_sign_up: "Registrarse",
    already_have_account: {
      title: "¿Ya tienes una cuenta?",
      link: "Iniciar sesión",
    },
  },
  dashboard_section: {
    title: "Inicio",
  },
  section: {
    plus_dropdown_menu: {
      create_folder: "Carpeta",
      create_deck: "Mazo",
    },
  },
  deck_section: {
    language: {
      iLearn: "Estoy aprendiendo",
      iKnow: "Ya sé",
    },
    add_card: {
      front: {
        button: "Añadir tarjeta",
      },
    },
    card_fields_side: {
      word: {
        label: "Palabra",
        errors: {
          required: "La palabra es obligatoria",
          tooShort: "La palabra es demasiado corta",
          maxLength:
            "La palabra no puede tener más de {{maxLength}} caracteres",
        },
        generate: {
          tooltip: "Generar tarjeta",
        },
      },
      translation: {
        label: "Traducción",
        errors: {
          required: "La traducción es obligatoria",
          tooShort: "La traducción es demasiado corta",
          maxLength:
            "La traducción no puede tener más de {{maxLength}} caracteres",
        },
      },
      example: {
        label: "Ejemplo o descripción",
        placeholder: "Ejemplo en {{languageName}}",
        errors: {
          maxLength:
            "El ejemplo no puede tener más de {{maxLength}} caracteres",
        },
      },
      example_translation: {
        label: "Traducción del ejemplo o descripción",
        placeholder: "Ejemplo en {{languageName}}",
        errors: {
          maxLength:
            "La traducción del ejemplo no puede tener más de {{maxLength}} caracteres",
        },
      },
    },
  },
  empty: {
    dashboard:
      "No tienes ninguna carpeta o mazo.\nPuedes crear una nueva carpeta o mazo haciendo clic en el botón de suma.",
  },
  modal: {
    create_folder: {
      title: "Crear carpeta",
      description:
        "Una carpeta se utiliza para agrupar mazos de tarjetas y otras carpetas.",
      fields: {
        name: {
          label: "Nombre",
          errors: {
            required: "El nombre es obligatorio",
            noOnlySpaces: "El nombre no puede contener solo espacios",
            maxLength:
              "El nombre no puede tener más de {{maxLength}} caracteres",
          },
        },
      },
      buttons: {
        cancel: "Cancelar",
        create: "Crear",
      },
    },
    create_deck: {
      title: "Crear mazo",
      description:
        "Un mazo se utiliza para almacenar tarjetas de palabras y estudiarlas",
      fields: {
        name: {
          label: "Nombre",
        },
        languageWhatIKnow: {
          label: "Idioma que conozco",
        },
        languageWhatILearn: {
          label: "Idioma que aprendo",
        },
      },
      buttons: {
        cancel: "Cancelar",
        create: "Crear",
      },
    },
    delete_folder: {
      title: "Eliminar carpeta '{{folderName}}'",
      description: "¿Estás seguro de que deseas eliminar esta carpeta?",
      buttons: {
        cancel: "Cancelar",
        delete: "Eliminar",
      },
    },
    rename: {
      fields: {
        name: {
          label: "Nombre",
          errors: {
            required: "El nombre es obligatorio",
            noOnlySpaces: "El nombre no puede contener solo espacios",
            maxLength:
              "El nombre no puede tener más de {{maxLength}} caracteres",
          },
        },
      },
      buttons: {
        cancel: "Cancelar",
        save: "Guardar",
      },
    },
    rename_folder: {
      title: "Renombrar carpeta '{{folderName}}'",
    },
    delete_deck: {
      title: "Eliminar mazo '{{deckName}}'",
      description: "¿Estás seguro de que deseas eliminar este mazo?",
      buttons: {
        cancel: "Cancelar",
        delete: "Eliminar",
      },
    },
    rename_deck: {
      title: "Renombrar mazo '{{deckName}}'",
    },
    choose_game: {
      title: "Elige el tipo de juego",
      description: "Elige el tipo de juego que quieres jugar.",
      buttons: {
        pair_it: "Emparejar",
        guess_it: "Adivinar",
        recall_it: "Recordar",
        type_it: "Escribir",
      },
    },
  },
  deck_languages_select: {
    most_used_languages: "Idiomas más utilizados",
    other_languages: "Otros idiomas",
  },
  header: {
    buttons: {
      logout: "Cerrar sesión",
    },
  },
  folder_breadcrumbs: {
    home: "Inicio",
  },
  folder: {
    buttons: {
      rename: "Renombrar",
      delete: "Eliminar",
    },
  },
  deck: {
    buttons: {
      rename: "Renombrar",
      delete: "Eliminar",
    },
  },
  learning_deck: {
    breadcrumbs: {
      learning_deck: "Aprendiendo mazo",
    },
    header: {
      steps: {
        review: "Revisar",
        pair_it: "Emparejar",
        guess_it: "Adivinar",
        recall_it: "Recordar",
        type_it: "Escribir",
      },
    },
    step: {
      start: {
        button_start: {
          title: "Aprender",
          no_words_to_learn: "no hay palabras para aprender",
        },
        button_repeat: {
          title: "Repetir ({{numberOfCardsNeedToReview}})",
        },
        button_repeat_all: {
          title: "Repetir todo ({{numberOfCardsInProgress}})",
        },
      },
    },
  },
  games: {
    recall_it: {
      buttons: {
        forgot: "Olvidé",
        recalled: "Recordé",
        next: "Siguiente",
        show: "Mostrar",
      },
    },
    type_it: {
      buttons: {
        help: "Ayuda",
        check: "Comprobar",
        try_again: "Intentar de nuevo",
        right: "Correcto",
      },
    },
  },
  schemas: {
    email: {
      required: "Por favor, introduce tu correo electrónico.",
      invalid: "Formato de correo electrónico inválido.",
    },
    password: {
      required: "Por favor, introduce tu contraseña.",
      minLength: "La contraseña debe tener al menos {{minLength}} caracteres",
      uppercase: "La contraseña debe contener al menos una letra mayúscula",
      lowercase: "La contraseña debe contener al menos una letra minúscula",
      number: "La contraseña debe contener al menos un número",
    },
    passwordRepeat: {
      required: "Por favor, repite tu contraseña.",
      notMatch: "Las dos contraseñas no coinciden.",
    },
    fullName: {
      required: "Por favor, introduce tu nombre completo.",
      minLength: "El nombre completo es demasiado corto.",
      noOnlySpaces:
        "El nombre completo no puede tener espacios al principio o al final.",
      specialCharacters:
        "El nombre completo no puede contener caracteres especiales.",
      multipleConsecutiveHyphens:
        "El nombre completo no puede contener múltiples guiones consecutivos",
      numbers: "El nombre completo no puede contener números",
    },
  },
};
