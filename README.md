# CMPE272 Application Frameworks

This is a chat application built used DropWizard as the backend and React as the front end.


## Prerequisites

Before setting up the project, ensure you have the following installed:

 **Java Development Kit (JDK)**: Version 8 or higher.
- **Apache Maven**: For project build and dependency management.
- **Node.js and npm**: Required for building and running the React frontend.
- **React**: Ensure that your environment is set up for React development.

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/AntVann/CMPE272Framework.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd CMPE272Framework
   ```

3. **Build the Project**:

   Use Maven to compile the project and resolve dependencies:

   ```bash
   mvn clean install
   ```

## Running the Application

### Step 1: Start the Dropwizard Server

1. **Navigate to the Dropwizard Server Directory**:

   ```bash
   cd ApplicationFrameworks
   ```

2. **Run the Dropwizard Server**:

   ```bash
   java -jar target/ApplicationFrameworks-1.0-SNAPSHOT.jar server config.yml
   ```

   Replace `1.0-SNAPSHOT` with the actual version number if it differs.

   This server will start using port 8080.

### Step 2: Start the React Frontend

1. **Navigate to the React Frontend Directory**:

   ```bash
   cd chat-client
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the React Application**:

   ```bash
   npm start
   ```

   This server will start using port 3000
