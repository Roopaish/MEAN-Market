# MEAN-Market
MongoDB, Express.js, Angular, Node.js

## Angular

### Creating the project

- install node and angular cli
` node install -g @angular/cli `

- create new project and select if routing(Navigate between pages and components) is used or not and which css stylesheet format you'll use
` ng new PROJECT_NAME `

- serve the app
` ng serve `

### Project Structure

./src/app
```bash
  app-routing.module.ts                            # To navigate the user to different pages/components of our app
  app.component.css                                # Styling of the COMPONENT
  app.component.html                               # View/Interface of the COMPONENT
  app.component.spec.ts                            # Testing of the COMPONENT
  app.module.ts                                    # Main module inside which we declare all the components and import other modules for our project
```

### ANgular Material UI

` ng add @angular/material `