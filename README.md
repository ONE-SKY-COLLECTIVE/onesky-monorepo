## Requirements

To run this project, ensure you have the following installed on your system:

* **Yarn:** Version `1.22.19`
* **Node.js:** Version `>= 22`

## Installation

1.  Clone the repository to your local machine.
2.  Navigate to the project's root directory in your terminal.
3.  Install the project dependencies using Yarn:

    ```bash
    yarn install
    ```

## Running the Application

There are two ways to run the application, depending on whether you want to run the web version or the mobile version.

### Web Development

1.  From the project's root directory, start the development server:

    ```bash
    yarn dev
    ```

    This command will typically start a local development server, and the application will be accessible in your web browser (usually at `http://localhost:3000` or a similar address).

### Mobile Development

1.  Navigate to the mobile application's directory:

    ```bash
    cd app/onesky-app
    ```

2.  Start the mobile development server:

    ```bash
    yarn dev
    ```

    This command will likely start a development server for your mobile application, which you can then connect to using an emulator or a physical device, depending on your mobile development setup (e.g., React Native, Flutter). Refer to the specific documentation for your mobile development framework for instructions on how to view the running application.