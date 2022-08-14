import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppService } from '../app.service';

type CardProps = {
  imageName: string;
  title: string;
  cols: number;
  rows: number;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // Define the variable that is used in html file i.e. cards
  cards: CardProps[] = [];
  cardsForHandset: CardProps[] = [];
  cardsForWeb: CardProps[] = [];

  isHandset: boolean = false;

  isHandsetObserver = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
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

  ngOnInit() {
    this.isHandsetObserver.subscribe((currentObservableValue) => {
      this.isHandset = currentObservableValue;
      this.loadCards();
    });

    this.appService.getDeals().subscribe(
      (response) => {
        this.cardsForHandset = response.handsetCards;
        this.cardsForWeb = response.webCards;
        this.loadCards();
      },
      (error) => {
        alert('Cannot get deals');
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
