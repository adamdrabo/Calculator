# Calculatrice

Calculatrice web réactive inspirée de la calculatrice de l'iPhone, réalisée dans le cadre du test technique de Syvra.

**Démo en ligne :** https://calculator-rho-cyan-51.vercel.app

---

## Fonctionnalités

- Opérations de base : addition, soustraction, multiplication, division
- Respect de la priorité des opérations (`3 + 5 × 2 = 13`)
- Affichage de l'expression pendant la saisie, puis de l'expression au-dessus du résultat après `=`
- Nombres décimaux avec virgule, adaptés au format québécois
- Enchaînement de calculs à partir d'un résultat
- Gestion des erreurs (division par zéro) et des très grands nombres (notation scientifique)
- Interface adaptative, du petit téléphone à l'ordinateur

## Stack technique

| Outil | Rôle |
| --- | --- |
| [Next.js](https://nextjs.org) (App Router) | Cadriciel React, export statique |
| [React](https://react.dev) | Interface et gestion de l'état |
| [Tailwind CSS](https://tailwindcss.com) v4 | Style adaptatif |
| [Vitest](https://vitest.dev) | Tests unitaires |
| [Biome](https://biomejs.dev) | Linter et formateur |
| [Vercel](https://vercel.com) | Hébergement statique et déploiement continu |

## Démarrage

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement (http://localhost:3000)
npm run dev

# Lancer les tests unitaires
npm test

# Générer le site statique dans le dossier out/
npm run build
```

## Architecture

```
calculator/
├── app/
│   ├── layout.js          # Structure HTML, langue et métadonnées
│   ├── page.js            # Page d'accueil (composant serveur)
│   ├── globals.css        # Import de Tailwind
│   └── icon.png           # Icône de l'onglet
├── components/
│   └── Calculator.js      # Interface : écran, touches, état React ("use client")
└── utils/
    ├── calculatorLogic.js       # Logique pure de la calculatrice
    └── calculatorLogic.test.js  # Tests unitaires
```

La logique est entièrement séparée de l'interface. `calculatorLogic.js` ne contient ni React ni Next.js : chaque fonction reçoit l'état actuel et retourne un nouvel état, sans jamais le modifier. Le composant `Calculator` se contente d'appeler ces fonctions et d'afficher le résultat.

### L'état

| Élément | Rôle | Valeur initiale |
| --- | --- | --- |
| `tokens` | L'expression en cours, découpée en nombres et opérateurs | `[]` |
| `justEvaluated` | Vrai juste après `=` | `false` |
| `previousExpression` | L'expression affichée au-dessus du résultat | `""` |

Exemple : la saisie de `7 + 7` produit `tokens = ["7", "+", "7"]`. Après `=`, on obtient `tokens = ["14"]` et `previousExpression = "7 + 7"`.

### Les fonctions

| Touche | Fonction |
| --- | --- |
| `0` à `9` | `inputDigit(state, digit)` |
| `,` | `inputDecimal(state)` |
| `÷` `×` `−` `+` | `inputOperator(state, operator)` |
| `=` | `evaluate(state)` |
| `AC` | `clear()` |

`evaluate` s'appuie sur `calculate(tokens)`, qui ne fait que les mathématiques.

## Choix techniques

**Évaluation en deux passages, sans `eval()`.** `calculate` parcourt l'expression une première fois pour effectuer `×` et `÷` de gauche à droite, puis une seconde fois pour `+` et `−`. `eval()` a été écarté car il exécute du code arbitraire, ce qui pose un risque de sécurité, et ne permet pas de contrôler les erreurs.

**Séparation entre calcul et gestion d'état.** `calculate` lance une erreur en cas de division par zéro ; `evaluate` l'attrape et affiche `Erreur`. Chaque fonction garde une seule responsabilité.

**Précision des nombres décimaux.** Les nombres JavaScript suivent la norme IEEE 754, où `0.1 + 0.2` donne `0.30000000000000004`. Le résultat est arrondi à 12 chiffres significatifs avant l'affichage. Au-delà de mille milliards, il passe en notation scientifique.

**Point en interne, virgule à l'écran.** La logique manipule des points, seuls compris par JavaScript. La conversion en virgule se fait uniquement à l'affichage.

**Export statique.** La calculatrice n'a besoin d'aucun serveur à l'exécution, d'où `output: 'export'` dans `next.config.mjs`. Le site peut être hébergé sur n'importe quel service de fichiers statiques.

**JavaScript plutôt que TypeScript.** Le délai étant court et Next.js comme Tailwind étant nouveaux pour moi, j'ai limité le nombre de nouveautés. L'absence de typage est compensée par les tests unitaires.

## Cas limites gérés

| Saisie | Résultat |
| --- | --- |
| `7 + ×` | L'opérateur est remplacé : `7 ×` |
| `3,5` puis `,` | La seconde virgule est ignorée |
| `7 ÷ 0 =` | `Erreur` |
| `0,1 + 0,2 =` | `0,3` |
| `99999999 × 99999999 =` | `9,9999998e+15` |
| Un chiffre après `=` | Démarre un nouveau calcul |
| Un opérateur après `=` | Continue à partir du résultat |

## Tests

Les tests unitaires couvrent la logique de `calculatorLogic.js` : priorité des opérations, ordre de gauche à droite, division par zéro, saisie des chiffres, des opérateurs et des décimales, arrondi et remise à zéro.

```bash
npm test
```

## Améliorations possibles

- Touches `⌫`, `±` et `%`
- Saisie au clavier
- Historique des calculs
- Parenthèses

## Sources et outils

- **Claude (Anthropic)** : utilisé comme tuteur pour discuter des choix de conception (modèle d'état, algorithme de priorité, cas limites) et pour fournir certaines portions de code, notamment le composant `Calculator`, que j'ai relues, testées et adaptées.
- [Documentation Next.js : Static Exports](https://nextjs.org/docs/app/guides/static-exports)
- [Documentation Next.js : Vitest](https://nextjs.org/docs/app/guides/testing/vitest)
- Design inspiré de la calculatrice d'iOS 18
- Icône : [Calculator icons created by Magnific - Flaticon](https://www.flaticon.com/free-icons/calculator)

## Auteur

Adam Drabo : [github.com/adamdrabo](https://github.com/adamdrabo/Calculator)