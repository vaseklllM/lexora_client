import { CommonType } from "../en/common";

export const fr: CommonType = {
  sign_in: {
    title: "Se connecter",
    subtitle:
      "Entrez votre adresse e-mail et votre mot de passe pour vous connecter",
    email: {
      label: "E-mail",
    },
    password: {
      label: "Mot de passe",
    },
    button_sign_in: "Se connecter",
    dont_have_account: {
      title: "Vous n'avez pas de compte ?",
      link: "S'inscrire",
    },
    or_continue_with: "Ou continuer avec",
  },
  sign_up: {
    title: "S'inscrire",
    subtitle: "Remplissez le formulaire pour vous inscrire",
    full_name: {
      label: "Nom complet",
    },
    email: {
      label: "E-mail",
    },
    password: {
      label: "Mot de passe",
    },
    password_repeat: {
      label: "Répéter le mot de passe",
    },
    button_sign_up: "S'inscrire",
    already_have_account: {
      title: "Vous avez déjà un compte ?",
      link: "Se connecter",
    },
  },
  dashboard_section: {
    title: "Accueil",
  },
  section: {
    plus_dropdown_menu: {
      create_folder: "Dossier",
      create_deck: "Paquet",
    },
  },
  deck_section: {
    language: {
      iLearn: "J'apprends",
      iKnow: "Je connais",
    },
    add_card: {
      front: {
        button: "Ajouter une carte",
      },
    },
    card_fields_side: {
      word: {
        label: "Mot",
        errors: {
          required: "Le mot est obligatoire",
          tooShort: "Le mot est trop court",
          maxLength: "Le mot ne peut pas dépasser {{maxLength}} caractères",
        },
        generate: {
          tooltip: "Générer une carte",
        },
      },
      translation: {
        label: "Traduction",
        errors: {
          required: "La traduction est obligatoire",
          tooShort: "La traduction est trop courte",
          maxLength:
            "La traduction ne peut pas dépasser {{maxLength}} caractères",
        },
      },
      example: {
        label: "Exemple ou description",
        placeholder: "Exemple en {{languageName}}",
        errors: {
          maxLength: "L'exemple ne peut pas dépasser {{maxLength}} caractères",
        },
      },
      example_translation: {
        label: "Traduction de l'exemple ou description",
        placeholder: "Exemple en {{languageName}}",
        errors: {
          maxLength:
            "La traduction de l'exemple ne peut pas dépasser {{maxLength}} caractères",
        },
      },
    },
  },
  empty: {
    dashboard:
      "Vous n'avez aucun dossier ni paquet.\nVous pouvez créer un nouveau dossier ou paquet en cliquant sur le bouton plus.",
  },
  modal: {
    create_folder: {
      title: "Créer un dossier",
      description:
        "Un dossier est utilisé pour regrouper des paquets de cartes et d'autres dossiers.",
      fields: {
        name: {
          label: "Nom",
          errors: {
            required: "Le nom est obligatoire",
            noOnlySpaces: "Le nom ne peut pas contenir uniquement des espaces",
            maxLength: "Le nom ne peut pas dépasser {{maxLength}} caractères",
          },
        },
      },
      buttons: {
        cancel: "Annuler",
        create: "Créer",
      },
    },
    create_deck: {
      title: "Créer un paquet",
      description:
        "Un paquet est utilisé pour stocker des cartes de mots et les étudier",
      fields: {
        name: {
          label: "Nom",
        },
        languageWhatIKnow: {
          label: "Langue que je connais",
        },
        languageWhatILearn: {
          label: "Langue que j'apprends",
        },
      },
      buttons: {
        cancel: "Annuler",
        create: "Créer",
      },
    },
    delete_folder: {
      title: "Supprimer le dossier '{{folderName}}'",
      description: "Êtes-vous sûr de vouloir supprimer ce dossier ?",
      buttons: {
        cancel: "Annuler",
        delete: "Supprimer",
      },
    },
    rename: {
      fields: {
        name: {
          label: "Nom",
          errors: {
            required: "Le nom est obligatoire",
            noOnlySpaces: "Le nom ne peut pas contenir uniquement des espaces",
            maxLength: "Le nom ne peut pas dépasser {{maxLength}} caractères",
          },
        },
      },
      buttons: {
        cancel: "Annuler",
        save: "Enregistrer",
      },
    },
    rename_folder: {
      title: "Renommer le dossier '{{folderName}}'",
    },
    delete_deck: {
      title: "Supprimer le paquet '{{deckName}}'",
      description: "Êtes-vous sûr de vouloir supprimer ce paquet ?",
      buttons: {
        cancel: "Annuler",
        delete: "Supprimer",
      },
    },
    rename_deck: {
      title: "Renommer le paquet '{{deckName}}'",
    },
    choose_game: {
      title: "Choisissez le type de jeu",
      description: "Choisissez le type de jeu auquel vous voulez jouer.",
      buttons: {
        pair_it: "Associer",
        guess_it: "Deviner",
        recall_it: "Se souvenir",
        type_it: "Écrire",
      },
    },
  },
  deck_languages_select: {
    most_used_languages: "Langues les plus utilisées",
    other_languages: "Autres langues",
  },
  header: {
    buttons: {
      logout: "Se déconnecter",
    },
  },
  folder_breadcrumbs: {
    home: "Accueil",
  },
  folder: {
    buttons: {
      rename: "Renommer",
      delete: "Supprimer",
    },
  },
  deck: {
    buttons: {
      rename: "Renommer",
      delete: "Supprimer",
    },
  },
  learning_deck: {
    breadcrumbs: {
      learning_deck: "Apprentissage du paquet",
    },
    header: {
      steps: {
        review: "Réviser",
        pair_it: "Associer",
        guess_it: "Deviner",
        recall_it: "Se souvenir",
        type_it: "Écrire",
      },
    },
    step: {
      start: {
        button_start: {
          title: "Apprendre",
          no_words_to_learn: "pas de mots à apprendre",
        },
        button_repeat: {
          title: "Répéter ({{numberOfCardsNeedToReview}})",
        },
        button_repeat_all: {
          title: "Tout répéter ({{numberOfCardsInProgress}})",
        },
      },
    },
  },
  games: {
    recall_it: {
      buttons: {
        forgot: "Oublié",
        recalled: "Rappelé",
        next: "Suivant",
        show: "Montrer",
      },
    },
    type_it: {
      buttons: {
        help: "Aide",
        check: "Vérifier",
        try_again: "Réessayer",
        right: "Correct",
      },
    },
  },
  schemas: {
    email: {
      required: "Veuillez entrer votre adresse e-mail.",
      invalid: "Format d'adresse e-mail invalide.",
    },
    password: {
      required: "Veuillez entrer votre mot de passe.",
      minLength:
        "Le mot de passe doit contenir au moins {{minLength}} caractères",
      uppercase: "Le mot de passe doit contenir au moins une lettre majuscule",
      lowercase: "Le mot de passe doit contenir au moins une lettre minuscule",
      number: "Le mot de passe doit contenir au moins un chiffre",
    },
    passwordRepeat: {
      required: "Veuillez répéter votre mot de passe.",
      notMatch: "Les deux mots de passe ne correspondent pas.",
    },
    fullName: {
      required: "Veuillez entrer votre nom complet.",
      minLength: "Le nom complet est trop court.",
      noOnlySpaces:
        "Le nom complet ne peut pas avoir d'espaces au début ou à la fin.",
      specialCharacters:
        "Le nom complet ne peut pas contenir de caractères spéciaux.",
      multipleConsecutiveHyphens:
        "Le nom complet ne peut pas contenir plusieurs tirets consécutifs",
      numbers: "Le nom complet ne peut pas contenir de chiffres",
    },
  },
};
