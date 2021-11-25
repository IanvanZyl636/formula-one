import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WorldChampionCardComponent } from './world-champion-card.component';
import { SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IStandingModel } from 'src/app/integration/ergast/models/standing.model';
import { IDriverStandingModel } from 'src/app/integration/ergast/models/driver-standing.model';

// IMPORT Mock json data for testing
import * as driverStandingJson from 'src/mocks/edgast/driver-standing.json';

describe('WorldChampionCardComponent', () => {
  let component: WorldChampionCardComponent;
  let fixture: ComponentFixture<WorldChampionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [WorldChampionCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldChampionCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.seasonWorldChampion).toEqual(undefined);
    expect(component.driverStanding).toEqual(undefined);
  });

  it('should call ngOnChange and set setDriverStanding', () => {
    const expectSeasonWorldChampion = driverStandingJson;
    const expectedData = expectSeasonWorldChampion.DriverStandings[0];

    component.seasonWorldChampion = expectSeasonWorldChampion;

    const prevValue = undefined;
    const newValue = expectSeasonWorldChampion;
    const isFirstChange: boolean = true;

    component.ngOnChanges({
      seasonWorldChampion: new SimpleChange(prevValue, newValue, isFirstChange),
    });

    expect(component.driverStanding).toEqual(expectedData);

    fixture.detectChanges();
  });

  it('should hide content when no seasonWorldChampion or driverStanding and check inner content values', () => {
    const expectSeasonWorldChampion = driverStandingJson;
    const expectedDriverStanding = expectSeasonWorldChampion.DriverStandings[0];
    const cardContainerFunc = () =>
      fixture.debugElement.query(By.css('.wcc-card-container'));

    expect(cardContainerFunc()).toBeFalsy();

    component.seasonWorldChampion = expectSeasonWorldChampion;

    fixture.detectChanges();

    expect(cardContainerFunc()).toBeFalsy();

    component.driverStanding = expectedDriverStanding;

    fixture.detectChanges();

    expect(cardContainerFunc()).toBeTruthy();

    let seasonEl = fixture.debugElement.query(By.css('.wcc-season > span'));
    let championEl = fixture.debugElement.query(By.css('.wcc-champion > span'));
    let nationalityEl = fixture.debugElement.query(
      By.css('.wcc-nationality > span')
    );

    expect(seasonEl).toBeTruthy();
    expect(championEl).toBeTruthy();
    expect(nationalityEl).toBeTruthy();

    expect(seasonEl.nativeElement.textContent).toEqual(
      `${expectSeasonWorldChampion.season} Season Winner`
    );
    expect(championEl.nativeElement.textContent).toEqual(
      expectedDriverStanding.Driver.familyName
    );
    expect(nationalityEl.nativeElement.textContent).toEqual(
      expectedDriverStanding.Driver.nationality
    );
  });

  it('should keep driverStanding undefined if no seasonWorldChampion', () => {
    component['_setDriverStanding']();
    expect(component.driverStanding).toBeUndefined();

    component.seasonWorldChampion = {} as IStandingModel;

    component['_setDriverStanding']();
    expect(component.driverStanding).toBeUndefined();

    component.seasonWorldChampion = {
      DriverStandings: [] as IDriverStandingModel[],
    } as IStandingModel;
    expect(component.driverStanding).toBeUndefined();
  });
});
