# UnikStore

Welcome to UnikStore! UnikStore is a unique marketplace where you can find and purchase one-of-a-kind items. This project was created using Expo with TypeScript support and integrates various technologies to provide a seamless shopping experience.

# The app

<div align="center">
  <video src="https://github.com/IgorCastromann/unikStore/assets/66645319/85cd3acc-2529-40c8-8a0f-ed5f2805374a" width="400"  />
</div>

<div align="center">
   
## Home screen 
![home-screen](https://github.com/IgorCastromann/unikStore/assets/66645319/534ce986-a6b3-4472-b471-de03fb15c019)

## Filtered by category

![filtered-by-category](https://github.com/IgorCastromann/unikStore/assets/66645319/1087db00-f83b-4d75-995c-aa26fad28c08)

## Adding item to cart

![adding-item-to-cart](https://github.com/IgorCastromann/unikStore/assets/66645319/10d690f1-e5f8-4035-bb27-213952092d1b)

## Cart screen

![cart-screenn](https://github.com/IgorCastromann/unikStore/assets/66645319/7a19488f-93eb-4a0d-9b72-bba3ae88bb40)

## checkout form

![checkout-form](https://github.com/IgorCastromann/unikStore/assets/66645319/68102555-c8df-434f-b5f4-19a97e524683)
![checkout-form-valid](https://github.com/IgorCastromann/unikStore/assets/66645319/4d8a9a4b-f175-4bc9-94b1-82f7c69f5c63)

</div>

## Getting Started

To get started with UnikStore, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/IgorCastromann/unikStore
   ```

2. Navigate to the project directory:

   ```bash
   cd unikstore
   ```

3. Install dependencies:

   ```bash
   yarn
   ```

   4.a) To local development, it was used JSON server, to start it run in a new terminal:

   ```bash
   yarn server
   ```

   NOTE: depending on the ip of your emulator, you might have to change `package json` `server` with `--host ip-goes-here server/db.json` to match the emulator.
   example: mine is `"server": "npx json-server --host 192.168.15.12 server/db.json"`

   4.b) you can also use the mockApi creating a .env

4. create a `.env` file in the root of the project:

   ```bash
   // .env

   // mockApi link

   # EXPO_PUBLIC_API_BASE_URL=https://6413209fa68505ea732a0fc8.mockapi.io/api/v1/

   // json server
   EXPO_PUBLIC_API_BASE_URL=http://192.168.15.12:3000
   EXPO_PUBLIC_FRAMES_REACT_NATIVE_KEY=pk_test_4296fd52-efba-4a38-b6ce-cf0d93639d8a

   ```

   NOTE: you can choose only one `EXPO_PUBLIC_API_BASE_URL`

   ```

   ```

5. Start the Expo app:

   ```bash
   yarn start
   ```

6. Open the Expo Go app on your mobile device and scan the QR code to view the app or if you have an open emulator, just type `a` to open android.

7. You can also build with xCode or android studio, just run the following comand to create `android` and `ios` folders:
   ```bash
   npx expo prebuild
   ```

## Technologies Used

- React Native
- Expo
- Zustand
- @tanstack/react-query
- NativeWind
- @react-navigation/native-stack
- Expo Jest
- Json-server
- Axios

## Folder Structure

The project structure follows a typical React Native and Expo setup:

```
unikstore/
│
├── src/                   # Source files
│   ├── @types             # Interface files
│   ├── components/        # React components
│   ├── layouts/           # Layout wrapper component
│   ├── queries/           # react query queries
│   ├── routes/            # Navigation configuration
│   ├── screens/           # Screen components
│   ├── services/          # Axios api calls
│   ├── store/             # Zustand store configuration
│   └── utils/             # Utility functions
│
├── server/                # JSON server configuration
│   └── db.json            # Mock database file
│
├── test/                  # Source files
│   ├── mocks              # Utility mocks
│   └── render             # Test render provider
│
├── .env                   # environment secrets
│
├── AppProviders.tsx       # Providers wrapper
├── App.tsx                # Main app component
└── README.md              # Project documentation
```

# Architecture inside folders

## Controller Architecture

The Controller Architecture is a structured approach to organizing frontend applications, separating UI components from logic to enhance modularity and maintainability.

## Key Components:

#### UI Components:

Responsible for rendering the user interface and receiving data and actions from controllers. UI components remain focused on presentation.

#### Controllers:

Manage state, data fetching, and business logic. They handle user interactions, data manipulation, and orchestrate information flow within the application.

#### Nested Controllers:

Controllers may be nested to encapsulate related functionality or handle specific UI parts, promoting better organization and modularity.

## Benefits:

#### Separation of Concerns:

Cleanly separates UI logic from business logic, improving code maintainability and testability.

#### Modularity:

Encapsulates functionality into reusable modules, facilitating feature addition, modification, and removal without disrupting other parts.

#### Scalability:

Scales well with application growth, enabling the addition of new controllers to manage expanding features or sections of the UI.

# test coverage

![test-coverage](https://github.com/IgorCastromann/unikStore/assets/66645319/8f329642-3e4b-499c-84d9-0f0ec44b24a4)

---

unikStore was build for avaliations purposes! 🚀
