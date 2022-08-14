# MEAN-Market

MongoDB, Express.js, Angular, Node.js

## Angular

1. ### Creating the project

   - install node and angular cli
     `node install -g @angular/cli`

   - create new project and select if routing(Navigate between pages and components) is used or not and which css stylesheet format you'll use
     `ng new PROJECT_NAME`

   - serve the app
     `ng serve`

2. ### Project Structure

   ./src/app

   ```bash
     app-routing.module.ts                            # To navigate the user to different pages/components of our app
     app.component.css                                # Styling of the COMPONENT
     app.component.html                               # View/Interface of the COMPONENT
     app.component.spec.ts                            # Testing of the COMPONENT
     app.module.ts                                    # Main module inside which we declare all the components and import other modules for our project
   ```

3. ### Angular Material UI

   - adding it
     `ng add @angular/material`

   - creating nav component from material:navigation schematic
     `ng generate @angular/material:navigation nav`  
     app/nav folder with css, html, spec.ts and module.ts files will be created and is automatically imported in app.module.ts.

4. ### Angular Service

   Navigate to app folder and execute `ng g s app`, app.service.ts will be created.

   ```ts
   // app.service.ts
   export class AppService {
     constructor(public httpClient: HttpClient) {}

     // set the function observable so any changes on it is detectable
     getDeals(): Observable<any> {
       return this.httpClient.get("http://localhost:3000/deals");
     }
   }
   ```

   ```ts
   export class HomeComponent {
     cards: CardProps[] = [];
     cardsForHandset: CardProps[] = [];
     cardsForWeb: CardProps[] = [];

     isHandset: boolean = false;

     // observes screen width
     isHandsetObserver = this.breakpointObserver
       .observe(Breakpoints.Handset)
       .pipe(
         map(({ matches }) => {
           if (matches) {
             return true;
           }

           return false;
         })
       );

     constructor(
       private breakpointObserver: BreakpointObserver,
       public appService: AppService
     ) {}

     // runs as soon as component is mounted
     ngOnInit() {
       // subscribe to observer for getting information if the device is Handset (smaller width)
       this.isHandsetObserver.subscribe((currentObservableValue) => {
         this.isHandset = currentObservableValue;
         this.loadCards();
       });

       // subscribe to api request function
       this.appService.getDeals().subscribe(
         (response) => {
           this.cardsForHandset = response.handsetCards;
           this.cardsForWeb = response.webCards;
           this.loadCards();
         },
         (error) => {
           alert("Cannot get deals");
         }
       );
     }

     loadCards() {
       this.cards = this.isHandset ? this.cardsForHandset : this.cardsForWeb;
     }

     getImage(imageName: string): string {
       return `url(http://localhost:3000/images/${imageName}.jpg)`;
     }
   }
   ```

   ```html
   <!-- Remove async from *ngFor if the functionalities are already observable -->
   <mat-grid-tile
     *ngFor="let card of cards"
     [colspan]="card.cols"
     [rowspan]="card.rows"
   >
   </mat-grid-tile>
   ```

## Express.js

1. ### Settin up

   - add it globally
     `npm i -g express-generator`

   - create project
     `express PROJECT_NAME `

   - run
     `npm start app.js`

2. ### Project Structure

   ```bash
   ./bin/www                                   # configuration for the project
   ./public                                    # static files to serve frontend
   ./routes                                    # files for different routes
   ./views                                     # viewable html like content (optional)
   app.js                                      # main file, starting point
   ```

3. ### Routes

   routes/users.js

   ```js
   router.get("/", function (req, res, next) {
     res.send("respond with a resource");
   });
   // this points to /users

   router.get("/greetings", function (req, res, next) {
     res.send("respond with a resource");
   });
   // this points to /users/greetings
   ```

4. ### Nodemon to auto restart app when any changes occur

   - install
     `npm i nodemon`

   - start
     `nodemon --exec npm start app.js`

5. ### Cors to accept request from frontend ip-address

   - install `npm i cors`

   - import and add `app.use(cors());` before using routes.

## Notes

- \*ngFor attribute is loop, code with it runs in loop

  ```html
  <mat-grid-tile
    *ngFor="let card of cards | async"
    [colspan]="card.cols"
    [rowspan]="card.rows"
  >
    <mat-card class="dashboard-card">
      <mat-card-header>
        <mat-card-title> {{card.title}} </mat-card-title>
      </mat-card-header>
    </mat-card>
  </mat-grid-tile>
  ```

- setting individual styles

  ```html
  <mat-card
    class="dashboard-card card-image"
    [style.background-image]="getImage(card.imageName)"
  ></mat-card>
  <!-- getImage is present in associated ts file -->
  ```
